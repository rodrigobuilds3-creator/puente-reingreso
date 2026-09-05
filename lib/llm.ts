export type RouteLabel = 'VERIFICADO' | 'PROVISIONAL' | 'NO DISPONIBLE';
export type SelectedRoute = 'formal' | 'prepa' | null;

export type RewriteObservation = {
  period: 7 | 14;
  floor: number;
  reserve: number;
  protectedAmount: number;
  availableMargin: number;
  selected: SelectedRoute;
  rejected: boolean;
  formalStatus: RouteLabel;
  formalBridge: number;
  prepaStatus: RouteLabel;
  prepaBridge: number;
};

const statuses = new Set<RouteLabel>(['VERIFICADO', 'PROVISIONAL', 'NO DISPONIBLE']);
const finiteMoney = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && Math.abs(value) <= 1_000_000;

export function parseRewriteObservation(value: unknown): RewriteObservation | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  if (item.period !== 7 && item.period !== 14) return null;
  if (![item.floor, item.reserve, item.protectedAmount, item.availableMargin, item.formalBridge, item.prepaBridge].every(finiteMoney)) return null;
  if (item.selected !== null && item.selected !== 'formal' && item.selected !== 'prepa') return null;
  if (typeof item.rejected !== 'boolean') return null;
  if (!statuses.has(item.formalStatus as RouteLabel) || !statuses.has(item.prepaStatus as RouteLabel)) return null;
  return item as RewriteObservation;
}

export function deterministicObservation(item: RewriteObservation) {
  const choice = item.selected === 'formal'
    ? 'La persona eligió explorar la ruta de empleo formal.'
    : item.selected === 'prepa'
      ? 'La persona eligió explorar la ruta de preparatoria con empleo parcial.'
      : item.rejected
        ? 'La persona rechazó ambas rutas.'
        : 'La persona todavía no eligió una ruta.';

  return [
    `Periodo: ${item.period} días.`,
    `Piso del hogar: MXN ${Math.round(item.floor)}.`,
    `Reserva: MXN ${Math.round(item.reserve)}.`,
    `Total protegido: MXN ${Math.round(item.protectedAmount)}.`,
    `Margen disponible antes de cualquier ruta: MXN ${Math.round(item.availableMargin)}.`,
    `Ruta empleo formal: ${item.formalStatus}; margen sobre piso y reserva MXN ${Math.round(item.formalBridge)}.`,
    `Ruta preparatoria con empleo parcial: ${item.prepaStatus}; margen sobre piso y reserva MXN ${Math.round(item.prepaBridge)}.`,
    choice,
  ].join(' ');
}

export function rewriteViolatesBoundary(text: string) {
  const normalized = text.toLocaleLowerCase('es-MX');
  return [
    'te recomiendo',
    'debes elegir',
    'deberías elegir',
    'mejor ruta',
    'ruta ideal',
    'aprobado',
    'rechazado por',
    'calificación',
    'puntaje',
    'eres apto',
    'no eres apto',
  ].some((phrase) => normalized.includes(phrase));
}
