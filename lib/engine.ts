export type SellingDay = {
  gross: number;
  restock: number;
  transport: number;
  other: number;
  hours: number;
};

export type CashInputs = {
  cash: number;
  weeklyFloor: number;
  formalMonthly: number;
  sellingDays: SellingDay[];
};

export type TransitionCost = {
  label: string;
  amount: number;
};

export type RouteResult = {
  candyKept: number;
  opportunity: number;
  bridge: number;
  closingCash: number;
  transition: number;
  transitionCosts: TransitionCost[];
  retainedHours: number;
  safetyStatus: 'available' | 'unavailable';
};

const finiteNonNegative = (value: number) => Number.isFinite(value) && value >= 0;

export function calculateSellingLog(days: SellingDay[]) {
  const normalized = days.slice(0, 7).map((day) => ({
    gross: finiteNonNegative(day.gross) ? day.gross : 0,
    restock: finiteNonNegative(day.restock) ? day.restock : 0,
    transport: finiteNonNegative(day.transport) ? day.transport : 0,
    other: finiteNonNegative(day.other) ? day.other : 0,
    hours: finiteNonNegative(day.hours) ? day.hours : 0,
  }));
  const dayNets = normalized.map((day) => day.gross - day.restock - day.transport - day.other);
  const validIndexes = normalized
    .map((day, index) => ({ day, index }))
    .filter(({ day }) => day.gross > 0 && day.hours > 0)
    .map(({ index }) => index);
  const validNets = validIndexes.map((index) => dayNets[index]);
  const hasNegativeNet = validNets.some((net) => net < 0);
  const validDayCount = validIndexes.length;

  return {
    dayNets,
    weeklyNet: validNets.reduce((sum, net) => sum + net, 0),
    weeklyHours: validIndexes.reduce((sum, index) => sum + normalized[index].hours, 0),
    reserve: validNets.length ? Math.min(...validNets) : 0,
    validDayCount,
    isComplete: validDayCount >= 5 && !hasNegativeNet,
    hasNegativeNet,
  };
}

export function calculateRouteModel(inputs: CashInputs, period: 7 | 14) {
  const cash = finiteNonNegative(inputs.cash) ? inputs.cash : 0;
  const weeklyFloor = finiteNonNegative(inputs.weeklyFloor) ? inputs.weeklyFloor : 0;
  const formalMonthly = finiteNonNegative(inputs.formalMonthly) ? inputs.formalMonthly : 0;
  const log = calculateSellingLog(inputs.sellingDays);
  const weeks = period / 7;
  const floor = weeklyFloor * weeks;
  const protectedAmount = floor + log.reserve;
  const hourly = log.weeklyHours > 0 ? log.weeklyNet / log.weeklyHours : 0;

  const makeRoute = (
    retainedHours: number,
    transitionCosts: TransitionCost[],
    confirmedIncomeAfterTransition: number,
  ): RouteResult => {
    const safeRetainedHours = Math.min(retainedHours, log.weeklyHours);
    const candyKept = hourly * safeRetainedHours * weeks;
    const opportunity = hourly * (log.weeklyHours - safeRetainedHours) * weeks;
    const transition = transitionCosts.reduce((sum, item) => sum + item.amount, 0);
    const bridge = cash + candyKept - transition - protectedAmount;
    const safetyStatus = log.isComplete && bridge >= 0 ? 'available' : 'unavailable';
    return {
      candyKept,
      opportunity,
      bridge,
      closingCash: cash + candyKept - transition + (period === 14 ? confirmedIncomeAfterTransition : 0),
      transition,
      transitionCosts,
      retainedHours: safeRetainedHours,
      safetyStatus,
    };
  };

  return {
    ...log,
    floor,
    protectedAmount,
    availableMargin: cash - protectedAmount,
    formal: makeRoute(
      12,
      [
        { label: 'Transporte (14 días)', amount: 420 },
        { label: 'Teléfono y datos', amount: 0 },
        { label: 'Documentos y fotos', amount: 180 },
        { label: 'Calzado, uniforme o equipo', amount: 300 },
        { label: 'Comidas fuera de casa', amount: 250 },
        { label: 'Banco, onboarding o capacitación no pagada', amount: 0 },
      ],
      formalMonthly / 2,
    ),
    prepa: makeRoute(
      18,
      [
        { label: 'Transporte (14 días)', amount: 280 },
        { label: 'Datos y llamadas', amount: 120 },
        { label: 'Materiales', amount: 250 },
        { label: 'Documentos, comidas o equipo', amount: 0 },
        { label: 'Banco, onboarding o capacitación no pagada', amount: 0 },
      ],
      0,
    ),
  };
}
