import { deterministicObservation, parseRewriteObservation, rewriteViolatesBoundary } from '../../../lib/llm';

const headers = { 'Cache-Control': 'no-store', 'Content-Type': 'application/json; charset=utf-8' };

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 4_096) {
    return Response.json({ error: 'Solicitud demasiado grande.' }, { status: 413, headers });
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 4_096) {
      return Response.json({ error: 'Solicitud demasiado grande.' }, { status: 413, headers });
    }
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'JSON inválido.' }, { status: 400, headers });
  }

  const observation = parseRewriteObservation(body);
  if (!observation) {
    return Response.json({ error: 'Observación inválida.' }, { status: 400, headers });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'El LLM todavía no está configurado.' }, { status: 503, headers });
  }

  const deterministicText = deterministicObservation(observation);
  let response: Response;
  try {
    response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        store: false,
        max_output_tokens: 180,
        instructions: [
          'Reescribe únicamente los hechos deterministas recibidos en español sencillo para una persona que lee despacio.',
          'Máximo 70 palabras. No agregues hechos, no hagas inferencias y no menciones rasgos personales.',
          'Nunca puntúes, verifiques, clasifiques ni recomiendes aprobar, rechazar o elegir una ruta.',
          'Explica los montos y estados; la decisión sigue perteneciendo a la persona.',
        ].join(' '),
        input: deterministicText,
      }),
    });
  } catch {
    return Response.json({ error: 'El servicio de lenguaje no respondió.' }, { status: 502, headers });
  }

  if (!response.ok) {
    const providerError = await response.json().catch(() => ({})) as {
      error?: { code?: unknown; type?: unknown };
    };
    return Response.json({
      error: 'El servicio de lenguaje no respondió.',
      providerStatus: response.status,
      providerCode: typeof providerError.error?.code === 'string' ? providerError.error.code : 'unknown',
      providerType: typeof providerError.error?.type === 'string' ? providerError.error.type : 'unknown',
    }, { status: 502, headers });
  }

  const data = await response.json() as { output_text?: unknown };
  const output = typeof data.output_text === 'string' ? data.output_text.trim() : '';
  if (!output || output.length > 600 || rewriteViolatesBoundary(output)) {
    return Response.json({
      text: deterministicText,
      source: 'guarded_fallback',
      model: 'gpt-5-mini',
    }, { headers });
  }

  return Response.json({ text: output, source: 'openai', model: 'gpt-5-mini' }, { headers });
}
