import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateRouteModel } from '../lib/engine.ts';

const base = { cash: 2680, weeklyFloor: 1200, candyNet: 1800, candyHours: 36, formalMonthly: 9500 };

test('protects a 14-day floor of MXN 2,400', () => {
  assert.equal(calculateRouteModel(base, 14).floor, 2400);
});

test('uses a 7-day floor when the period changes', () => {
  assert.equal(calculateRouteModel(base, 7).floor, 1200);
});

test('preserves 12 weekly candy-selling hours in the formal route', () => {
  const result = calculateRouteModel(base, 14).formal;
  assert.equal(result.retainedHours, 12);
  assert.equal(result.candyKept, 1200);
});

test('exposes opportunity cost without deducting it twice', () => {
  const result = calculateRouteModel(base, 14).formal;
  assert.equal(result.opportunity, 2400);
  assert.equal(result.closing, 5080);
});

test('shows a negative bridge when upfront cash is insufficient', () => {
  const result = calculateRouteModel({ ...base, cash: 500 }, 14).formal;
  assert.ok(result.bridge < 0);
  assert.equal(result.safetyStatus, 'unavailable');
});

test('sanitizes negative and non-finite values', () => {
  const result = calculateRouteModel({ ...base, cash: -100, candyNet: Number.NaN }, 7);
  assert.equal(result.availableMargin, -1200);
  assert.equal(result.formal.candyKept, 0);
});

test('never preserves more candy-selling hours than the user actually works', () => {
  const result = calculateRouteModel({ ...base, candyHours: 8 }, 14).formal;
  assert.equal(result.retainedHours, 8);
  assert.equal(result.opportunity, 0);
});

test('keeps evidence status separate from cash safety', () => {
  const result = calculateRouteModel({ ...base, cash: 1800, candyNet: 1500, candyHours: 42 }, 14);
  assert.ok(Math.abs(result.formal.bridge - -892.8571428571429) < 0.001);
  assert.equal(result.formal.safetyStatus, 'unavailable');
  assert.equal(result.prepa.safetyStatus, 'available');
});
