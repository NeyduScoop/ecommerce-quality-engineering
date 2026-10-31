import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard } from '../../utils/sauce-demo.js';

test.describe('Product details', { tag: ['@regression', '@inventory'] }, () => {
  test.beforeEach(async ({ page }) => { await loginAsStandard(page); });

  test('TC-DETAIL-001: product name and price match inventory and details', async ({ page }) => {
    const card = page.locator('.inventory_item').first();
    const name = (await card.locator('.inventory_item_name').innerText()).trim();
    const price = (await card.locator('.inventory_item_price').innerText()).trim();
    await card.locator('.inventory_item_name').click();
    await expect(page.locator('.inventory_details_name')).toHaveText(name);
    await expect(page.locator('.inventory_details_price')).toHaveText(price);
  });

  test('TC-DETAIL-002: add product from details view', async ({ page }) => {
    const productName = page.locator('.inventory_item_name').first();
    await productName.click();
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    const addToCartButton = page.getByRole('button', {name: 'Add to cart',});
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('TC-DETAIL-003: cart state survives returning to inventory', async ({ page }) => {
    const productName = page.locator('.inventory_item_name').first();
    await productName.click();
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.getByRole('button', { name: 'Back to products' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
 });

  test('TC-DETAIL-004: product details controls are keyboard accessible', async ({ page }) => {
    const productDetails = page.getByRole('button', {name: 'View details for Sauce Labs Backpack'}).first();
    await productDetails.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.getByRole('button', { name: 'Back to products' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });
});
  