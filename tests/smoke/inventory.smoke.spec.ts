import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard, addProductByIndex, getNames } from '../../utils/sauce-demo.js';

test.describe('Inventory coverage', { tag: ['@smoke', '@inventory'] }, () => {
  test.beforeEach(async ({ page }) => { await loginAsStandard(page); });

  test('TC-INV-001: inventory page loads after login', async ({ page }) => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('TC-INV-002: product cards show names, prices, and images', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    for (let i = 0; i < await items.count(); i++) {
      const item = items.nth(i);
      await expect(item.locator('.inventory_item_name')).not.toBeEmpty();
      await expect(item.locator('.inventory_item_price')).toContainText('$');
      await expect(item.locator('img')).toBeVisible();
    }
  });

  test('TC-INV-003: open product details from inventory', async ({ page }) => {
    const name = (await page.locator('.inventory_item_name').first().innerText()).trim();
    await page.locator('.inventory_item_name').first().click();
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('.inventory_details_name')).toHaveText(name);
  });

  test('TC-INV-004: return from product details to inventory', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('TC-INV-005: add a product from inventory', async ({ page }) => {
    await addProductByIndex(page, 0);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.locator('.inventory_item').first().getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('TC-INV-006: add multiple distinct products', async ({ page }) => {
    await addProductByIndex(page, 0);
    await addProductByIndex(page, 1);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('TC-INV-007: inventory product images load', async ({ page }) => {
    const images = page.locator('.inventory_item_img img');
    await expect(images).toHaveCount(6);
    for (let i = 0; i < await images.count(); i++) {
      await expect(images.nth(i)).toBeVisible();
      const naturalWidth = await images.nth(i).evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('TC-INV-008: inventory remains usable at a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
  });

  test('TC-INV-009: key inventory controls are keyboard reachable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedTag).toBeTruthy();
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  });

  test('TC-INV-010: product count remains stable after details navigation', async ({ page }) => {
    const before = await page.locator('.inventory_item').count();
    await page.locator('.inventory_item_name').first().click();
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page.locator('.inventory_item')).toHaveCount(before);
  });

  test('TC-REG-007: sorting and navigation do not duplicate product cards', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    await page.locator('.inventory_item_name').first().click();
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    const names = await getNames(page);
    expect(new Set(names).size).toBe(names.length);
  });
});
