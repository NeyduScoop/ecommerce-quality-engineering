import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard, getNames, getPrices, addProductByIndex } from '../../utils/sauce-demo.js';

test.describe('Product sorting', { tag: ['@regression', '@sorting'] }, () => {
  test.beforeEach(async ({ page }) => { await loginAsStandard(page); });

  test('TC-SORT-001: sort products by name ascending', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const names = await getNames(page);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('TC-SORT-002: sort products by name descending', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const names = await getNames(page);
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('TC-SORT-003: sort products by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const prices = await getPrices(page);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-SORT-004: sort products by price high to low', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const prices = await getPrices(page);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('TC-SORT-005: selected sort option matches the displayed order', async ({ page }) => {
    const sort = page.locator('[data-test="product-sort-container"]');
    await sort.selectOption('za');
    await expect(sort).toHaveValue('za');
    const names = await getNames(page);
    expect(names[0]).toBe([...names].sort((a, b) => b.localeCompare(a))[0]);
  });

  test('TC-SORT-006: repeated sorting changes keep the inventory populated', async ({ page }) => {
    const sort = page.locator('[data-test="product-sort-container"]');
    for (const value of ['az', 'lohi', 'hilo', 'za', 'az']) {
      await sort.selectOption(value);
      await expect(page.locator('.inventory_item')).toHaveCount(6);
    }
  });

  test('TC-SORT-007: price sorting uses numeric order', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const prices = await getPrices(page);
    expect(prices.every(Number.isFinite)).toBeTruthy();
    expect(prices.every((price, i) => i === 0 || prices[i - 1]! <= price)).toBeTruthy();
  });

  test('TC-REG-003: sorting does not change selected cart product identity', async ({ page }) => {
    const selectedName = await addProductByIndex(page, 0);
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.inventory_item_name, .cart_item .inventory_item_name')).toContainText(selectedName);
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });
});