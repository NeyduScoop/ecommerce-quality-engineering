import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard, addProductByIndex, goToCheckoutInformation, fillCheckout } from '../../utils/sauce-demo.js';

test.describe('Exploratory charters - repeatable checks', { tag: ['@regression', '@exploratory'] }, () => {
  test('TC-EXP-001: explore cart state through inventory/cart navigation paths', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page, 0);
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('TC-EXP-002: explore recovery after leaving checkout information', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/cart\.html/);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('TC-EXP-003: login and checkout validation messages are visible and understandable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
