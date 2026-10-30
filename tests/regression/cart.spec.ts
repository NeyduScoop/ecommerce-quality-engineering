import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard, addProductByIndex } from '../../utils/sauce-demo.js';

test.describe('Shopping cart', { tag: ['@regression', '@cart'] }, () => {
  test.beforeEach(async ({ page }) => { await loginAsStandard(page); });

  test('TC-CART-001: cart opens with no products', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
  });

  test('TC-CART-002: one added product appears in cart', async ({ page }) => {
    const name = await addProductByIndex(page);
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(name);
  });

  test('TC-CART-003: product can be removed from cart', async ({ page }) => {
    await addProductByIndex(page);
    await page.locator('.shopping_cart_link').click();
    await page.locator('.cart_item').getByRole('button', { name: 'Remove' }).click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });

  test('TC-CART-004: cart badge matches selected item count', async ({ page }) => {
    await addProductByIndex(page, 0);
    await addProductByIndex(page, 1);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await addProductByIndex(page, 2);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  });

  test('TC-CART-005: multiple selected products appear in cart', async ({ page }) => {
    const first = await addProductByIndex(page, 0);
    const second = await addProductByIndex(page, 1);
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.cart_item .inventory_item_name')).toContainText([first, second]);
  });

  test('TC-CART-006: removing one item preserves other cart items', async ({ page }) => {
    const first = await addProductByIndex(page, 1);
    const second = await addProductByIndex(page, 2);
    await page.locator('.shopping_cart_link').click();
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    await cartItems.first().getByRole('button', { name: 'Remove' }).click();
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems.locator('.inventory_item_name')).toHaveText([second]);
    await expect(page.locator('.cart_item .inventory_item_name')).not.toContainText(first);
  });

  test('TC-CART-007: continue shopping returns to inventory', async ({ page }) => {
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-CART-008: checkout can be started from a non-empty cart', async ({ page }) => {
    await addProductByIndex(page);
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-CART-009: cart contents persist after refreshing cart page', async ({ page }) => {
    const name = await addProductByIndex(page);
    await page.locator('.shopping_cart_link').click();
    await page.reload();
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(name);
  });

  test('TC-CART-010: cart actions are keyboard operable', async ({ page }) => {
    await addProductByIndex(page);
    await page.locator('.shopping_cart_link').click();
    const checkout = page.getByRole('button', { name: 'Checkout' });
    await checkout.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-REG-002: cart actions remain consistent across navigation', async ({ page }) => {
    await addProductByIndex(page);
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await addProductByIndex(page, 1);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });
});