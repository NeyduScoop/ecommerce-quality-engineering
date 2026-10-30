import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard, addProductByIndex, goToCheckoutInformation, fillCheckout } from '../../utils/sauce-demo.js';

test.describe('Checkout validation and navigation', { tag: ['@regression', '@checkout'] }, () => {
  test.beforeEach(async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
  });

  test('TC-CHECK-001: valid customer information advances to overview', async ({ page }) => {
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
  });

  test('TC-CHECK-002: all empty fields trigger required validation', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('TC-CHECK-003: missing first name is rejected', async ({ page }) => {
    await fillCheckout(page, '', 'Portfolio', '100001');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('TC-CHECK-004: missing last name is rejected', async ({ page }) => {
    await fillCheckout(page, 'QA', '', '100001');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  test('TC-CHECK-005: missing postal code is rejected', async ({ page }) => {
    await fillCheckout(page, 'QA', 'Portfolio', '');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('TC-CHECK-006: checkout recovers after validation error', async ({ page }) => {
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-CHECK-007: valid fields remain populated after validation error', async ({ page }) => {
    await fillCheckout(page, 'QA', 'Portfolio', '');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('QA');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('Portfolio');
  });

  test('TC-CHECK-008: checkout can be cancelled and returned to inventory', async ({ page }) => {
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/cart\.html/);
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-CHECK-009: checkout information can be entered using keyboard only', async ({ page }) => {
    const first = page.locator('[data-test="firstName"]');
    await first.focus();
    await page.keyboard.type('QA');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Portfolio');
    await page.keyboard.press('Tab');
    await page.keyboard.type('100001');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-CHECK-010: long and special-character values are handled without breaking checkout', async ({ page }) => {
    await fillCheckout(page, "QA-User O'Neil", 'Portfolio-Test', '10000-1');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });
});