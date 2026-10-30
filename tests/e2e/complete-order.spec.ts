import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard, addProductByIndex, goToCheckoutInformation, fillCheckout } from '../../utils/sauce-demo.js';

test.describe('Order overview and completion', { tag: ['@e2e', '@checkout'] }, () => {
  test('TC-ORDER-001: overview includes selected product', async ({ page }) => {
    await loginAsStandard(page);
    const productName = await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(productName);
  });

  test('TC-ORDER-002: displayed subtotal matches selected product prices', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page, 0);
    await addProductByIndex(page, 1);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    const prices = (await page.locator('.cart_item .inventory_item_price').allTextContents())
      .map(value => Number(value.replace('$', '').trim()));
    const expectedSubtotal = prices.reduce((sum, value) => sum + value, 0);
    const subtotalText = await page.locator('.summary_subtotal_label').innerText();
    expect(Number(subtotalText.replace('Item total: $', '').trim())).toBeCloseTo(expectedSubtotal, 2);
  });

  test('TC-ORDER-003: displayed tax and total arithmetic are consistent', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    const subtotal = Number((await page.locator('.summary_subtotal_label').innerText()).replace('Item total: $', '').trim());
    const tax = Number((await page.locator('.summary_tax_label').innerText()).replace('Tax: $', '').trim());
    const total = Number((await page.locator('.summary_total_label').innerText()).replace('Total: $', '').trim());
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('TC-ORDER-004: back navigation from overview preserves checkout context', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/inventory\.html|cart\.html/);
  });

  test('TC-ORDER-005: overview shows readable summary and action controls', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
    await expect(page.locator('[data-test="finish"]')).toBeVisible();
  });

  test('TC-ORDER-006: user can complete a valid order', async ({ page, orderCompletePage }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await orderCompletePage.expectOrderCompleted();
    await orderCompletePage.expectConfirmationMessage();
  });

  test('TC-ORDER-007: confirmation state clearly communicates order completion', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back Home' })).toBeVisible();
  });

  test('TC-ORDER-008: post-completion state provides a path back to inventory', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

  test('TC-ORDER-009: repeated completion interaction does not create another checkout step', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    const finish = page.locator('[data-test="finish"]');
    await finish.click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  });

  test('TC-REG-001: complete primary login-to-order journey', async ({ page }) => {
    await loginAsStandard(page);
    await addProductByIndex(page);
    await goToCheckoutInformation(page);
    await fillCheckout(page);
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  });
});