'use client';

import { useMemo, useState } from 'react';
import { calculateRouteModel, type RouteResult, type SellingDay } from '../lib/engine';

type RouteId = 'formal' | 'prepa';
type RouteStatus = 'VERIFICADO' | 'PROVISIONAL' | 'NO DISPONIBLE';
type Inputs = {
  cash: number;
  weeklyFloor: number;
  formalMonthly: number;
  sellingDays: SellingDay[];
};

const pesos = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const initialDays: SellingDay[] = [
  { gross: 320, restock: 80, transport: 20, other: 0, hours: 5 },
  { gross: 360, restock: 90, transport: 20, other: 0, hours: 5 },
  { gross: 300, restock: 75, transport: 20, other: 0, hours: 5 },
  { gross: 410, restock: 100, transport: 20, other: 10, hours: 6 },
  { gross: 340, restock: 85, transport: 20, other: 0, hours: 5 },
  { gross: 390, restock: 95, transport: 20, other: 0, hours: 5 },
  { gross: 460, restock: 110, transport: 20, other: 0, hours: 5 },
];

const initialInputs: Inputs = {
  cash: 2680,
  weeklyFloor: 1200,
  formalMonthly: 9500,
  sellingDays: initialDays,
};

const routeMeta = {
  formal: {
    source: 'Oferta simulada para probar el cálculo',
    evidenceDate: '02 SEP 2026',
    responsible: 'Empleador simulado',
    requirements: 'Horario, salario, fecha de pago y contratación sin cuota',
    schedule: 'Horario simulado documentado: 08:00–16:00',
    firstPayment: 'Día 14, sólo en escenario de prueba',
    missing: 'Ninguno dentro del escenario; no representa una vacante real',
  },
  prepa: {
    source: 'Ruta educativa simulada; no es una oferta vigente',
    evidenceDate: '02 SEP 2026',
    responsible: 'Proveedor educativo por confirmar',
    requirements: 'Horario compatible, gratuidad y constancia del programa',
    schedule: 'Falta confirmar clases y traslados',
    firstPayment: 'Sin ingreso confirmado: MXN 0 contabilizados',
    missing: 'Horario, gratuidad, cupo y responsable institucional',
  },
};

const steps = {
  formal: [
    ['HOY · 5 MIN', 'Confirmar horario', 'Verifica por escrito que puedes conservar 12 h de venta.'],
    ['MAÑANA', 'Preparar documentos', 'INE, CURP y comprobante sólo fuera de este prototipo.'],
    ['EN 3 DÍAS', 'Confirmar alta', 'Solicita fecha de nómina y compromiso de alta en IMSS.'],
    ['DÍA 14', 'Revisar primer pago', 'Confirma que el depósito coincida con lo acordado.'],
  ],
  prepa: [
    ['HOY · 8 MIN', 'Validar horario escolar', 'Confirma clases y traslados antes de inscribirte.'],
    ['MAÑANA', 'Confirmar gratuidad', 'No pagues gestores ni cuotas no documentadas.'],
    ['EN 3 DÍAS', 'Ajustar venta de dulces', 'Conserva 18 h semanales durante la transición.'],
    ['DÍA 14', 'Revisar la ruta', 'Continúa sólo si piso y reserva siguen protegidos.'],
  ],
};

const safeSteps = [
  ['HOY · 5 MIN', 'Separar piso y reserva', 'Aparta el dinero de casa y el valor de tu día más bajo.'],
  ['MAÑANA', 'Verificar una ruta gratis', 'Confirma horario, primer pago y costos sin pagar gestores.'],
  ['DESPUÉS', 'Elegir sin presión', 'Explora una ruta sólo cuando el puente ya no sea negativo.'],
];

export default function Home() {
  const [period, setPeriod] = useState<7 | 14>(14);
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [selected, setSelected] = useState<RouteId | null>(null);
  const [rejected, setRejected] = useState(false);

  const calculation = useMemo(() => calculateRouteModel(inputs, period), [inputs, period]);
  const hasInvalidNumber = [inputs.cash, inputs.weeklyFloor, inputs.formalMonthly]
    .some((value) => !Number.isFinite(value) || value < 0 || value > 1_000_000)
    || inputs.sellingDays.some((day) => Object.entries(day).some(([key, value]) => (
      !Number.isFinite(value) || value < 0 || value > (key === 'hours' ? 24 : 100_000)
    )));
  const logReady = calculation.isComplete && !hasInvalidNumber;
  const logMessage = hasInvalidNumber
    ? 'Corrige los valores negativos o inválidos. PUENTE no calculará rutas con esos datos.'
    : calculation.hasNegativeNet
      ? 'Un día tiene más costos que ventas. Revisa ese registro antes de comparar rutas.'
      : calculation.validDayCount < 5
        ? `Faltan ${5 - calculation.validDayCount} días válidos. Registra ventas y horas en al menos cinco días.`
        : 'Registro suficiente: la reserva usa el día neto más bajo.';

  const formalStatus: RouteStatus = logReady && calculation.formal.safetyStatus === 'available' ? 'VERIFICADO' : 'NO DISPONIBLE';
  const prepaStatus: RouteStatus = logReady && calculation.prepa.safetyStatus === 'available' ? 'PROVISIONAL' : 'NO DISPONIBLE';
  const activeSteps = selected ? steps[selected] : safeSteps;

  const changeInput = (key: 'cash' | 'weeklyFloor' | 'formalMonthly', value: string) => {
    setInputs((current) => ({ ...current, [key]: value === '' ? 0 : Number(value) }));
    setSelected(null);
    setRejected(false);
  };

  const changeDay = (index: number, key: keyof SellingDay, value: string) => {
    setInputs((current) => ({
      ...current,
      sellingDays: current.sellingDays.map((day, dayIndex) => dayIndex === index
        ? { ...day, [key]: value === '' ? 0 : Number(value) }
        : day),
    }));
    setSelected(null);
    setRejected(false);
  };

  const reset = () => {
    if (!window.confirm('¿Borrar los cambios y volver al escenario simulado inicial?')) return;
    setInputs({ ...initialInputs, sellingDays: initialDays.map((day) => ({ ...day })) });
    setPeriod(14);
    setSelected(null);
    setRejected(false);
  };

  const rejectRoutes = () => {
    setSelected(null);
    setRejected(true);
  };

  const exportSummary = () => {
    const summary = {
      exportedAt: new Date().toISOString(),
      prototype: 'PUENTE - academic simulation',
      period,
      sellingLog: {
        validDays: calculation.validDayCount,
        weeklyNet: calculation.weeklyNet,
        weeklyHours: calculation.weeklyHours,
        reserve: calculation.reserve,
      },
      protectedAmount: calculation.protectedAmount,
      selectedRoute: selected,
      routes: {
        formal: { status: formalStatus, bridge: calculation.formal.bridge },
        prepa: { status: prepaStatus, bridge: calculation.prepa.bridge },
      },
      note: 'Invented academic scenario. Not an employment or admission decision.',
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'puente-resumen-simulado.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const selectRoute = (route: RouteId) => {
    setSelected(route);
    setRejected(false);
  };

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const aiSummary = selected
    ? `Elegiste explorar ${selected === 'formal' ? 'empleo formal ahora' : 'prepa más empleo parcial'}. Conserva el piso de ${pesos.format(calculation.floor)} y la reserva de ${pesos.format(calculation.reserve)} antes de pagar cualquier transición.`
    : rejected
      ? 'Decidiste no explorar estas rutas. Puedes conservar la venta de dulces, cambiar tus datos o volver más tarde sin penalización.'
      : `Todavía no elegiste una ruta. Tu monto protegido es ${pesos.format(calculation.protectedAmount)} entre piso y reserva.`;

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Puente, inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span>PUENTE<small>by TRAJECTORY</small></span>
        </a>
        <nav className="nav" aria-label="Secciones">
          <a href="#base">MI BASE</a><a href="#registro">7 DÍAS</a><a href="#rutas">RUTAS</a><a href="#paso">SIGUIENTE PASO</a>
        </nav>
        <button className="quiet-button" type="button" onClick={reset}>Borrar datos</button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">TU DINERO PRIMERO</p>
          <h1>Tu regreso.<br /><em>Tu decisión.</em></h1>
          <p className="dek">Compara caminos hacia un empleo formal sin poner en riesgo el dinero que hoy llevas a casa.</p>
          <button className="primary-button" type="button" onClick={() => goTo('base')}>CALCULAR MI BASE <span>→</span></button>
          <p className="privacy">Sin cuenta · sin score · tus datos no se guardan · escenario inventado</p>
        </div>

        <div className="route-panel" aria-label="Resumen de tu base segura">
          <div className="route-line" aria-hidden="true"><b /><b /><b /></div>
          <div className="panel-head">
            <div><p className="dark-eyebrow">MI SEMANA</p><h2>Base protegida</h2></div>
            <div className="period" aria-label="Periodo de cálculo">
              <button className={period === 7 ? 'active' : ''} onClick={() => { setPeriod(7); setSelected(null); }} type="button">7 DÍAS</button>
              <button className={period === 14 ? 'active' : ''} onClick={() => { setPeriod(14); setSelected(null); }} type="button">14 DÍAS</button>
            </div>
          </div>
          <div className="metric-grid">
            <article className="metric main-metric"><span>EFECTIVO DISPONIBLE</span><strong>{pesos.format(Math.max(inputs.cash, 0))}</strong><small>Antes de iniciar</small></article>
            <article className="metric"><span>PISO {period} DÍAS</span><strong>{pesos.format(calculation.floor)}</strong><small>No se toca</small></article>
            <article className="metric"><span>RESERVA</span><strong>{pesos.format(calculation.reserve)}</strong><small>Día neto más bajo</small></article>
          </div>
          <div className="protected-total"><span>TOTAL PROTEGIDO</span><strong>{pesos.format(calculation.protectedAmount)}</strong><small>Piso + reserva</small></div>
          <div className="week-bars" aria-label="Composición del efectivo">
            <div style={{ width: `${Math.min((calculation.protectedAmount / Math.max(inputs.cash, 1)) * 100, 100)}%` }}><span>PROTEGIDO</span></div>
            <p><b>{pesos.format(calculation.protectedAmount)}</b> de {pesos.format(Math.max(inputs.cash, 0))}</p>
          </div>
          <button className="inline-link" type="button" onClick={() => goTo('base')}>REVISAR MIS NÚMEROS ↓</button>
        </div>
      </section>

      <section className="calculator" id="base" aria-labelledby="base-title">
        <div className="section-number">01</div>
        <div className="section-intro">
          <p className="eyebrow">MI BASE REAL</p>
          <h2 id="base-title">Primero, lo que no puedes perder.</h2>
          <p>Usa datos inventados para probar. PUENTE no guarda ni transmite este registro.</p>
        </div>
        <form className="input-grid" onSubmit={(event) => event.preventDefault()}>
          <MoneyInput label="Efectivo disponible hoy" value={inputs.cash} onChange={(value) => changeInput('cash', value)} />
          <MoneyInput label="Aporte mínimo a casa / semana" value={inputs.weeklyFloor} onChange={(value) => changeInput('weeklyFloor', value)} />
          <MoneyInput label="Sueldo formal mensual del escenario" value={inputs.formalMonthly} onChange={(value) => changeInput('formalMonthly', value)} />
        </form>
        <div className={calculation.availableMargin >= 0 ? 'base-result safe' : 'base-result danger'} aria-live="polite">
          <span>{calculation.availableMargin >= 0 ? 'PISO Y RESERVA CUBIERTOS' : 'TU BASE TODAVÍA NO ESTÁ CUBIERTA'}</span>
          <strong>{pesos.format(Math.abs(calculation.availableMargin))}</strong>
          <small>{calculation.availableMargin >= 0 ? `libres después de separar ${period} días y una reserva` : 'por cubrir antes de reducir tus ventas'}</small>
        </div>
      </section>

      <section className="cash-log" id="registro" aria-labelledby="log-title">
        <div className="section-number">02</div>
        <div className="section-intro">
          <p className="eyebrow">7 DÍAS · 5 MÍNIMO</p>
          <h2 id="log-title">Tu venta, día por día.</h2>
          <p>El neto es venta menos reposición, transporte y otros costos. La reserva toma el neto positivo más bajo.</p>
        </div>
        <div className="log-summary" aria-live="polite">
          <span><b>{calculation.validDayCount}/7</b>DÍAS VÁLIDOS</span>
          <span><b>{pesos.format(calculation.weeklyNet)}</b>NETO SEMANAL</span>
          <span><b>{calculation.weeklyHours} H</b>HORAS REGISTRADAS</span>
          <span><b>{pesos.format(calculation.reserve)}</b>RESERVA</span>
        </div>
        <div className="day-grid">
          {inputs.sellingDays.map((day, index) => (
            <fieldset className="day-card" key={index}>
              <legend>DÍA {index + 1}</legend>
              <CompactInput label="Venta" value={day.gross} onChange={(value) => changeDay(index, 'gross', value)} />
              <CompactInput label="Reposición" value={day.restock} onChange={(value) => changeDay(index, 'restock', value)} />
              <CompactInput label="Transporte" value={day.transport} onChange={(value) => changeDay(index, 'transport', value)} />
              <CompactInput label="Otros" value={day.other} onChange={(value) => changeDay(index, 'other', value)} />
              <CompactInput label="Horas" value={day.hours} unit="H" onChange={(value) => changeDay(index, 'hours', value)} />
              <output>Neto <b>{pesos.format(calculation.dayNets[index] ?? 0)}</b></output>
            </fieldset>
          ))}
        </div>
        <p className={logReady ? 'validation valid' : 'validation error'} role="status">{logMessage}</p>
      </section>

      <section className="routes" id="rutas" aria-labelledby="routes-title">
        <div className="section-number">03</div>
        <div className="section-intro"><p className="eyebrow">DOS CAMINOS · MISMO PESO</p><h2 id="routes-title">Compara con la cuenta clara.</h2><p>El estado habla de la evidencia y la seguridad del puente, no de tu capacidad. Estas rutas son simuladas.</p></div>
        <div className="route-cards">
          <RouteCard id="formal" selected={selected === 'formal'} status={formalStatus} title="Empleo formal ahora" data={calculation.formal} meta={routeMeta.formal} onSelect={selectRoute} />
          <RouteCard id="prepa" selected={selected === 'prepa'} status={prepaStatus} title="Prepa + empleo parcial" data={calculation.prepa} meta={routeMeta.prepa} onSelect={selectRoute} />
        </div>
        <div className="decision-note"><b>¿Por qué no quitamos de golpe la venta de dulces?</b><p>Porque el primer pago formal puede llegar hasta la quincena. Las horas conservadas mantienen ingreso inmediato; el costo de oportunidad muestra lo que se deja de vender sin descontarlo dos veces.</p></div>
      </section>

      <section className="next-step" id="paso" aria-labelledby="next-title">
        <div className="section-number">04</div>
        <div className="next-copy"><p className="eyebrow">UN PASO A LA VEZ</p><h2 id="next-title">La ruta sigue bajo tu control.</h2><p>{selected ? <>Elegiste explorar: <strong>{selected === 'formal' ? 'Empleo formal ahora' : 'Prepa + empleo parcial'}</strong>. Puedes cambiarla sin penalización.</> : rejected ? <>Rechazaste ambas rutas. <strong>Tu alternativa permanece visible</strong> y puedes volver a calcular cuando quieras.</> : <>Todavía no has elegido una ruta. <strong>Primero protege tu base</strong> y después explora la que encaje contigo.</>}</p></div>
        <ol className="timeline">
          {activeSteps.map(([time, title, copy], index) => <li className={index === 0 ? 'current' : ''} key={title}><span>{index + 1}</span><article><small>{time}</small><h3>{title}</h3><p>{copy}</p></article></li>)}
        </ol>
        <div className="choice-controls">
          <button type="button" onClick={rejectRoutes}>RECHAZAR AMBAS RUTAS</button>
          <button type="button" onClick={exportSummary}>EXPORTAR RESUMEN JSON</button>
        </div>
        <aside className="fallback"><div><span>PLAN B · EN MENOS DE 24 H</span><h3>Volver a venta de dulces por 7 días</h3><p>Si cambia el horario, el pago o la vacante, recuperas tu fuente inmediata y buscas en paralelo por un canal público gratuito.</p></div><b>↘</b></aside>
        <div className="ai-output">
          <div><strong>SIMULATED AI OUTPUT</strong><span>No verifica, no puntúa y no cambia el cálculo.</span></div>
          <p>{aiSummary}</p>
          <label htmlFor="message-draft">Borrador para verificar con una persona responsable</label>
          <textarea id="message-draft" readOnly value="Hola. Antes de decidir, ¿puede confirmar por escrito el horario, los costos, la fecha del primer pago y quién responde por esta información? No autorizo que este mensaje se envíe automáticamente." />
        </div>
        <p className="human-note"><b>HUMANO RESPONSABLE:</b> PUENTE no envía mensajes ni confirma instituciones en este prototipo. Copia el borrador sólo si tú decides contactar a la organización responsable.</p>
      </section>

      <footer className="footer"><span>PUENTE · PROTOTIPO ACADÉMICO · DATOS SIMULADOS</span><span>CLARIDAD&nbsp;&nbsp;•&nbsp;&nbsp; CONTROL&nbsp;&nbsp;•&nbsp;&nbsp; CAMINO</span></footer>
    </main>
  );
}

function MoneyInput({ label, value, onChange }: { label: string; value: number; onChange: (value: string) => void }) {
  return <label><span>{label}</span><b>MXN</b><input aria-label={label} min="0" max="1000000" type="number" value={value} onChange={(event) => onChange(event.target.value)} /></label>;
}

function CompactInput({ label, value, unit = 'MXN', onChange }: { label: string; value: number; unit?: string; onChange: (value: string) => void }) {
  return <label><span>{label}</span><input aria-label={`${label} del día`} min="0" max={unit === 'H' ? '24' : '100000'} type="number" value={value} onChange={(event) => onChange(event.target.value)} /><small>{unit}</small></label>;
}

function RouteCard({ id, selected, status, title, data, meta, onSelect }: {
  id: RouteId;
  selected: boolean;
  status: RouteStatus;
  title: string;
  data: RouteResult;
  meta: typeof routeMeta.formal;
  onSelect: (id: RouteId) => void;
}) {
  return (
    <article className={`route-card ${status === 'VERIFICADO' ? 'verified' : status === 'PROVISIONAL' ? 'provisional' : 'unavailable'} ${selected ? 'selected' : ''}`}>
      <header><span>{id === 'formal' ? 'RUTA 01' : 'RUTA 02'}</span><b>{status === 'VERIFICADO' ? '●' : status === 'PROVISIONAL' ? '○' : '×'} {status}</b></header>
      <div className="route-title"><h3>{title}</h3><p>{meta.source}</p></div>
      <dl className="evidence-list">
        <div><dt>Fecha de evidencia</dt><dd>{meta.evidenceDate}</dd></div>
        <div><dt>Responsable</dt><dd>{meta.responsible}</dd></div>
        <div><dt>Requisitos</dt><dd>{meta.requirements}</dd></div>
        <div><dt>Horario</dt><dd>{meta.schedule}</dd></div>
        <div><dt>Primer pago / apoyo</dt><dd>{meta.firstPayment}</dd></div>
        <div><dt>Evidencia faltante</dt><dd>{meta.missing}</dd></div>
      </dl>
      <dl>
        <div><dt>Venta conservada</dt><dd>{data.retainedHours} h/sem</dd></div>
        <div><dt>Ingreso de dulces</dt><dd>{pesos.format(data.candyKept)}</dd></div>
        <div><dt>Costos de transición</dt><dd>− {pesos.format(data.transition)}</dd></div>
        <div className="opportunity"><dt>Costo de oportunidad</dt><dd>{pesos.format(data.opportunity)}</dd></div>
        <div><dt>Margen sobre piso + reserva</dt><dd className={data.bridge >= 0 ? 'positive' : 'negative'}>{pesos.format(data.bridge)}</dd></div>
      </dl>
      <details><summary>VER DESGLOSE DE COSTOS</summary><ul>{data.transitionCosts.map((item) => <li key={item.label}><span>{item.label}</span><b>{pesos.format(item.amount)}</b></li>)}</ul></details>
      <footer><span>EFECTIVO AL CIERRE</span><strong>{pesos.format(data.closingCash)}</strong></footer>
      <button className="select-route" aria-pressed={selected} disabled={status === 'NO DISPONIBLE'} type="button" onClick={() => onSelect(id)}>{status === 'NO DISPONIBLE' ? 'PROTEGE TU BASE PRIMERO' : selected ? 'RUTA ELEGIDA ✓' : 'EXPLORAR ESTA RUTA →'}</button>
    </article>
  );
}
