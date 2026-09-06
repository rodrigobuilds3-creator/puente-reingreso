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

  const groqKey = process.env.GROQ_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
  const provider = groqKey ? 'groq' : openAiKey ? 'openai' : null;
  const apiKey = groqKey ?? openAiKey;
  if (!apiKey) {
    return Response.json({ error: 'El LLM todavía no está configurado.' }, { status: 503, headers });
  }

  const deterministicText = deterministicObservation(observation);
  const endpoint = provider === 'groq'
    ? 'https://api.groq.com/openai/v1/chat/completions'
    : 'https://api.openai.com/v1/responses';
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(provider === 'groq'
        ? {
            model: 'openai/gpt-oss-20b',
            temperature: 0.1,
            reasoning_effort: 'low',
            reasoning_format: 'hidden',
            max_completion_tokens: 512,
            messages: [{
              role: 'user',
              content: [
                'Reescribe únicamente los hechos deterministas siguientes en español sencillo para una persona que lee despacio.',
                'Máximo 70 palabras. No agregues hechos, no hagas inferencias y no menciones rasgos personales.',
                'Nunca puntúes, verifiques, clasifiques ni recomiendes aprobar, rechazar o elegir una ruta.',
                'Explica los montos y estados; la decisión sigue perteneciendo a la persona.',
                `Hechos: ${deterministicText}`,
              ].join(' '),
            }],
          }
        : {
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

  const data = await response.json() as {
    output_text?: unknown;
    choices?: Array<{ message?: { content?: unknown } }>;
  };
  const output = provider === 'groq'
    ? typeof data.choices?.[0]?.message?.content === 'string' ? data.choices[0].message.content.trim() : ''
    : typeof data.output_text === 'string' ? data.output_text.trim() : '';
  if (!output || output.length > 600 || rewriteViolatesBoundary(output)) {
    return Response.json({
      text: deterministicText,
      source: 'guarded_fallback',
      model: provider === 'groq' ? 'openai/gpt-oss-20b' : 'gpt-5-mini',
    }, { headers });
  }

  return Response.json({
    text: output,
    source: provider,
    model: provider === 'groq' ? 'openai/gpt-oss-20b' : 'gpt-5-mini',
  }, { headers });
}
