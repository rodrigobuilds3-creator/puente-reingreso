'use client';

import { useMemo, useState } from 'react';
import { calculateRouteModel } from '../lib/engine';

type RouteId = 'formal' | 'prepa';
type RouteStatus = 'VERIFICADO' | 'PROVISIONAL' | 'NO DISPONIBLE';
type Inputs = {
  cash: number;
  weeklyFloor: number;
  candyNet: number;
  candyHours: number;
  formalMonthly: number;
};

const pesos = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const initialInputs: Inputs = {
  cash: 2680,
  weeklyFloor: 1200,
  candyNet: 1800,
  candyHours: 36,
  formalMonthly: 9500,
};

const steps = {
  formal: [
    ['HOY · 5 MIN', 'Confirmar horario', 'Verifica por escrito que puedes conservar 12 h de venta.'],
    ['MAÑANA', 'Preparar documentos', 'INE, CURP, comprobante y cuenta bancaria.'],
    ['EN 3 DÍAS', 'Confirmar alta', 'Solicita fecha de nómina y compromiso de alta en IMSS.'],
    ['DÍA 14', 'Recibir primer pago', 'Revisa que el depósito coincida con lo acordado.'],
  ],
  prepa: [
    ['HOY · 8 MIN', 'Validar horario escolar', 'Confirma clases y traslados antes de inscribirte.'],
    ['MAÑANA', 'Confirmar gratuidad', 'No pagues gestores ni cuotas no documentadas.'],
    ['EN 3 DÍAS', 'Ajustar venta de dulces', 'Conserva 18 h semanales durante la transición.'],
    ['DÍA 14', 'Revisar la ruta', 'Continúa sólo si la base sigue protegida.'],
  ],
};

const safeSteps = [
  ['HOY · 5 MIN', 'Separar tu base', 'Aparta primero el dinero de casa para los próximos 14 días.'],
  ['MAÑANA', 'Verificar una ruta', 'Confirma horario, primer pago y costos sin pagar gestores.'],
  ['DESPUÉS', 'Elegir sin presión', 'Explora una ruta sólo cuando el puente ya no sea negativo.'],
];

export default function Home() {
  const [period, setPeriod] = useState<7 | 14>(14);
  const [inputs, setInputs] = useState(initialInputs);
  const [selected, setSelected] = useState<RouteId | null>(null);

  const calculation = useMemo(() => calculateRouteModel(inputs, period), [inputs, period]);

  const changeInput = (key: keyof Inputs, value: string) => {
    const next = Math.max(0, Number(value) || 0);
    setInputs((current) => ({ ...current, [key]: next }));
  };

  const reset = () => {
    setInputs(initialInputs);
    setPeriod(14);
    setSelected(null);
  };

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Puente, inicio">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span>PUENTE<small>by TRAJECTORY</small></span>
        </a>
        <nav className="nav" aria-label="Secciones">
          <a href="#base">MI BASE</a><a href="#rutas">RUTAS</a><a href="#paso">SIGUIENTE PASO</a>
        </nav>
        <button className="quiet-button" type="button" onClick={reset}>Borrar datos</button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">TU DINERO PRIMERO</p>
          <h1>Tu regreso.<br /><em>Tu decisión.</em></h1>
          <p className="dek">Compara caminos hacia un empleo formal sin poner en riesgo el dinero que hoy llevas a casa.</p>
          <button className="primary-button" type="button" onClick={() => goTo('base')}>CALCULAR MI BASE <span>→</span></button>
          <p className="privacy">Sin cuenta · sin score · tus datos no se guardan</p>
        </div>

        <div className="route-panel" aria-label="Resumen de tu base segura">
          <div className="route-line" aria-hidden="true"><b /><b /><b /></div>
          <div className="panel-head">
            <div><p className="dark-eyebrow">MI SEMANA</p><h2>Base protegida</h2></div>
            <div className="period" aria-label="Periodo de cálculo">
              <button className={period === 7 ? 'active' : ''} onClick={() => setPeriod(7)} type="button">7 DÍAS</button>
              <button className={period === 14 ? 'active' : ''} onClick={() => setPeriod(14)} type="button">14 DÍAS</button>
            </div>
          </div>
          <div className="metric-grid">
            <article className="metric main-metric"><span>EFECTIVO DISPONIBLE</span><strong>{pesos.format(inputs.cash)}</strong><small>Antes de iniciar</small></article>
            <article className="metric"><span>PISO {period} DÍAS</span><strong>{pesos.format(calculation.floor)}</strong><small>No se toca</small></article>
            <article className="metric"><span>MARGEN LIBRE</span><strong>{pesos.format(calculation.availableMargin)}</strong><small>{calculation.availableMargin >= 0 ? 'Disponible' : 'Falta cubrir'}</small></article>
          </div>
          <div className="week-bars" aria-label="Composición del efectivo">
            <div style={{ width: `${Math.min((calculation.floor / Math.max(inputs.cash, 1)) * 100, 100)}%` }}><span>BASE</span></div>
            <p><b>{pesos.format(calculation.floor)}</b> protegidos de {pesos.format(inputs.cash)}</p>
          </div>
          <button className="inline-link" type="button" onClick={() => goTo('base')}>REVISAR MIS NÚMEROS ↓</button>
        </div>
      </section>

      <section className="calculator" id="base" aria-labelledby="base-title">
        <div className="section-number">01</div>
        <div className="section-intro">
          <p className="eyebrow">MI BASE REAL</p>
          <h2 id="base-title">Primero, lo que no puedes perder.</h2>
          <p>Usa aproximaciones. PUENTE no guarda estos datos y no evalúa tu perfil.</p>
        </div>
        <form className="input-grid" onSubmit={(event) => event.preventDefault()}>
          <label><span>Efectivo disponible hoy</span><b>MXN</b><input aria-label="Efectivo disponible hoy" min="0" type="number" value={inputs.cash} onChange={(e) => changeInput('cash', e.target.value)} /></label>
          <label><span>Aporte mínimo a casa / semana</span><b>MXN</b><input aria-label="Aporte mínimo semanal al hogar" min="0" type="number" value={inputs.weeklyFloor} onChange={(e) => changeInput('weeklyFloor', e.target.value)} /></label>
          <label><span>Ganancia neta de dulces / semana</span><b>MXN</b><input aria-label="Ganancia neta semanal de dulces" min="0" type="number" value={inputs.candyNet} onChange={(e) => changeInput('candyNet', e.target.value)} /></label>
          <label><span>Horas de venta / semana</span><b>H</b><input aria-label="Horas de venta semanales" min="1" type="number" value={inputs.candyHours} onChange={(e) => changeInput('candyHours', e.target.value)} /></label>
          <label><span>Sueldo formal mensual esperado</span><b>MXN</b><input aria-label="Sueldo formal mensual esperado" min="0" type="number" value={inputs.formalMonthly} onChange={(e) => changeInput('formalMonthly', e.target.value)} /></label>
        </form>
        <div className={calculation.availableMargin >= 0 ? 'base-result safe' : 'base-result danger'}>
          <span>{calculation.availableMargin >= 0 ? 'TU BASE ESTÁ CUBIERTA' : 'TU BASE TODAVÍA NO ESTÁ CUBIERTA'}</span>
          <strong>{pesos.format(Math.abs(calculation.availableMargin))}</strong>
          <small>{calculation.availableMargin >= 0 ? `libres después de separar ${period} días` : 'por cubrir antes de reducir tus ventas'}</small>
        </div>
      </section>

      <section className="routes" id="rutas" aria-labelledby="routes-title">
        <div className="section-number">02</div>
        <div className="section-intro"><p className="eyebrow">DOS CAMINOS · MISMA META</p><h2 id="routes-title">Compara con la cuenta clara.</h2><p>Ambas rutas se presentan con el mismo peso visual. El estado habla de la evidencia, no de tu capacidad.</p></div>
        <div className="route-cards">
          <RouteCard id="formal" selected={selected === 'formal'} status={calculation.formal.safetyStatus === 'unavailable' ? 'NO DISPONIBLE' : 'VERIFICADO'} title="Empleo formal ahora" subtitle="Vacante y pago confirmados" data={calculation.formal} onSelect={setSelected} />
          <RouteCard id="prepa" selected={selected === 'prepa'} status={calculation.prepa.safetyStatus === 'unavailable' ? 'NO DISPONIBLE' : 'PROVISIONAL'} title="Prepa + empleo parcial" subtitle="Falta confirmar horario escolar" data={calculation.prepa} onSelect={setSelected} />
        </div>
        <div className="decision-note"><b>¿Por qué no quitamos las 12 horas de dulces?</b><p>Porque el primer pago formal llega hasta la quincena. Esas horas conservan ingreso inmediato y reducen el riesgo de romper tu piso antes del depósito.</p></div>
      </section>

      <section className="next-step" id="paso" aria-labelledby="next-title">
        <div className="section-number">03</div>
        <div className="next-copy"><p className="eyebrow">UN PASO A LA VEZ</p><h2 id="next-title">La ruta sigue bajo tu control.</h2><p>{selected ? <>Elegiste explorar: <strong>{selected === 'formal' ? 'Empleo formal ahora' : 'Prepa + empleo parcial'}</strong>. Puedes cambiarla sin penalización.</> : <>Todavía no has elegido una ruta. <strong>Primero protege tu base</strong> y después explora la que encaje contigo.</>}</p></div>
        <ol className="timeline">
          {(selected ? steps[selected] : safeSteps).map(([time, title, copy], index) => <li className={index === 0 ? 'current' : ''} key={title}><span>{index + 1}</span><article><small>{time}</small><h3>{title}</h3><p>{copy}</p></article></li>)}
        </ol>
        <aside className="fallback"><div><span>PLAN B · EN MENOS DE 24 H</span><h3>Volver a venta de dulces por 7 días</h3><p>Si cambia el horario, el pago o la vacante, recuperas tu fuente inmediata sin quedar atrapado.</p></div><b>↘</b></aside>
        <div className="ai-note"><strong>✦ IA SIMULADA</strong><span>Resume información; no decide, no califica y puede equivocarse. Verifica los datos marcados.</span></div>
      </section>

      <footer className="footer"><span>PUENTE · PROTOTIPO ACADÉMICO · DATOS SIMULADOS</span><span>CLARIDAD&nbsp;&nbsp;•&nbsp;&nbsp; CONTROL&nbsp;&nbsp;•&nbsp;&nbsp; CAMINO</span></footer>
    </main>
  );
}

function RouteCard({ id, selected, status, title, subtitle, data, onSelect }: {
  id: RouteId;
  selected: boolean;
  status: RouteStatus;
  title: string;
  subtitle: string;
  data: { candyKept: number; opportunity: number; bridge: number; closing: number; transition: number; retainedHours: number; safetyStatus: 'available' | 'unavailable' };
  onSelect: (id: RouteId) => void;
}) {
  return (
    <article className={`route-card ${status === 'VERIFICADO' ? 'verified' : status === 'PROVISIONAL' ? 'provisional' : 'unavailable'} ${selected ? 'selected' : ''}`}>
      <header><span>{id === 'formal' ? 'RUTA 01' : 'RUTA 02'}</span><b>{status === 'VERIFICADO' ? '●' : status === 'PROVISIONAL' ? '○' : '×'} {status}</b></header>
      <div className="route-title"><h3>{title}</h3><p>{subtitle}</p></div>
      <dl>
        <div><dt>Venta de dulces conservada</dt><dd>{data.retainedHours} h/sem</dd></div>
        <div><dt>Ingreso de dulces en el periodo</dt><dd>{pesos.format(data.candyKept)}</dd></div>
        <div><dt>Costos de transición</dt><dd>− {pesos.format(data.transition)}</dd></div>
        <div className="opportunity"><dt>Costo de oportunidad</dt><dd>{pesos.format(data.opportunity)}</dd></div>
        <div><dt>Puente antes del primer pago</dt><dd className={data.bridge >= 0 ? 'positive' : 'negative'}>{pesos.format(data.bridge)}</dd></div>
      </dl>
      <footer><span>EFECTIVO AL CIERRE</span><strong>{pesos.format(data.closing)}</strong></footer>
      <button className="select-route" aria-pressed={selected} disabled={data.safetyStatus === 'unavailable'} type="button" onClick={() => onSelect(id)}>{data.safetyStatus === 'unavailable' ? 'PROTEGE TU BASE PRIMERO' : selected ? 'RUTA ELEGIDA ✓' : 'EXPLORAR ESTA RUTA →'}</button>
    </article>
  );
}
