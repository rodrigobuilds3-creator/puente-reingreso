import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateRouteModel, calculateSellingLog, type CashInputs, type SellingDay } from '../lib/engine.ts';

const days: SellingDay[] = [
  { gross: 320, restock: 80, transport: 20, other: 0, hours: 5 },
  { gross: 360, restock: 90, transport: 20, other: 0, hours: 5 },
  { gross: 300, restock: 75, transport: 20, other: 0, hours: 5 },
  { gross: 410, restock: 100, transport: 20, other: 10, hours: 6 },
  { gross: 340, restock: 85, transport: 20, other: 0, hours: 5 },
  { gross: 390, restock: 95, transport: 20, other: 0, hours: 5 },
  { gross: 460, restock: 110, transport: 20, other: 0, hours: 5 },
];

const base: CashInputs = { cash: 2680, weeklyFloor: 1200, formalMonthly: 9500, sellingDays: days };

test('calculates seven daily nets and the conservative reserve', () => {
  const result = calculateSellingLog(days);
  assert.equal(result.validDayCount, 7);
  assert.equal(result.weeklyNet, 1795);
  assert.equal(result.weeklyHours, 36);
  assert.equal(result.reserve, 205);
  assert.equal(result.isComplete, true);
});

test('requires at least five valid selling days', () => {
  const result = calculateSellingLog(days.slice(0, 4));
  assert.equal(result.validDayCount, 4);
  assert.equal(result.isComplete, false);
});

test('rejects a selling day whose costs exceed gross sales', () => {
  const result = calculateSellingLog([{ ...days[0], restock: 400 }, ...days.slice(1, 5)]);
  assert.equal(result.hasNegativeNet, true);
  assert.equal(result.isComplete, false);
});

test('protects the 14-day floor plus the lowest-day reserve', () => {
  const result = calculateRouteModel(base, 14);
  assert.equal(result.floor, 2400);
  assert.equal(result.protectedAmount, 2605);
});

test('uses a 7-day floor while preserving one reserve', () => {
  const result = calculateRouteModel(base, 7);
  assert.equal(result.floor, 1200);
  assert.equal(result.protectedAmount, 1405);
});

test('preserves 12 weekly candy-selling hours in the formal route', () => {
  const result = calculateRouteModel(base, 14).formal;
  assert.equal(result.retainedHours, 12);
  assert.ok(Math.abs(result.candyKept - 1196.6666666666667) < 0.001);
});

test('exposes opportunity cost without deducting it twice', () => {
  const result = calculateRouteModel(base, 14).formal;
  assert.ok(Math.abs(result.opportunity - 2393.3333333333335) < 0.001);
  assert.ok(Math.abs(result.bridge - 121.66666666666652) < 0.001);
});

test('includes the complete transition-cost breakdown', () => {
  const result = calculateRouteModel(base, 14).formal;
  assert.equal(result.transition, 1150);
  assert.deepEqual(result.transitionCosts.map((item) => item.amount), [420, 0, 180, 300, 250, 0]);
});

test('does not count unconfirmed education-route income', () => {
  const result = calculateRouteModel(base, 14).prepa;
  assert.equal(result.closingCash, base.cash + result.candyKept - result.transition);
});

test('blocks every route when the seven-day record is incomplete', () => {
  const result = calculateRouteModel({ ...base, sellingDays: days.slice(0, 4) }, 14);
  assert.equal(result.formal.safetyStatus, 'unavailable');
  assert.equal(result.prepa.safetyStatus, 'unavailable');
});

test('sanitizes negative and non-finite top-level values', () => {
  const result = calculateRouteModel({ ...base, cash: -100, weeklyFloor: Number.NaN }, 14);
  assert.equal(result.availableMargin, -205);
});

test('never preserves more selling hours than the user reports', () => {
  const shortDays = days.map((day, index) => ({ ...day, hours: index < 5 ? 1 : 0, gross: index < 5 ? day.gross : 0 }));
  const result = calculateRouteModel({ ...base, sellingDays: shortDays }, 14).formal;
  assert.equal(result.retainedHours, 5);
  assert.equal(result.opportunity, 0);
});

test('keeps evidence status conceptually separate from cash safety', () => {
  const lowCash = calculateRouteModel({ ...base, cash: 500 }, 14);
  assert.equal(lowCash.formal.safetyStatus, 'unavailable');
  assert.equal(lowCash.prepa.safetyStatus, 'unavailable');
});
