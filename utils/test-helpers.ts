
/**
 * Converts a displayed currency value such as "$29.99"
 * into a number for assertions.
 */
export function parseCurrency(value: string): number {
  const normalized = value.replace(/[$,\s]/g, '');
  const amount = Number(normalized);

  if (!Number.isFinite(amount)) {
    throw new Error(`Invalid currency value: "${value}"`);
  }

  return amount;
}
