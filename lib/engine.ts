export type CashInputs = {
  cash: number;
  weeklyFloor: number;
  candyNet: number;
  candyHours: number;
  formalMonthly: number;
};

export type RouteResult = {
  candyKept: number;
  opportunity: number;
  bridge: number;
  closing: number;
  transition: number;
  retainedHours: number;
};

export function calculateRouteModel(inputs: CashInputs, period: 7 | 14) {
  const sanitized = Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => [key, Number.isFinite(value) ? Math.max(0, value) : 0]),
  ) as CashInputs;
  const weeks = period / 7;
  const floor = sanitized.weeklyFloor * weeks;
  const hourly = sanitized.candyHours > 0 ? sanitized.candyNet / sanitized.candyHours : 0;

  const makeRoute = (retainedHours: number, transition: number, outsideIncome: number): RouteResult => {
    const candyKept = hourly * retainedHours * weeks;
    const opportunity = hourly * Math.max(sanitized.candyHours - retainedHours, 0) * weeks;
    const bridge = sanitized.cash + candyKept - transition - floor;
    return {
      candyKept,
      opportunity,
      bridge,
      closing: bridge + (period === 14 ? outsideIncome : 0),
      transition,
      retainedHours,
    };
  };

  return {
    floor,
    availableMargin: sanitized.cash - floor,
    formal: makeRoute(12, 1150, sanitized.formalMonthly / 2),
    prepa: makeRoute(18, 650, 3800),
  };
}
