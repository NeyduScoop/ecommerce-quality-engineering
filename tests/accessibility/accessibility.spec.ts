import { test, expect } from '../../fixtures/test-fixtures.js';
import { loginAsStandard } from '../../utils/sauce-demo.js';

test.describe('Basic accessibility checks', { tag: ['@regression', '@accessibility'] }, () => {
  test('TC-A11Y-001: keyboard focus is visible on primary controls', async ({ page }) => {
    await loginAsStandard(page);
    const sort = page.locator('[data-test="product-sort-container"]');
    await sort.focus();
    await expect(sort).toBeFocused();
    const focusStyle = await sort.evaluate(element => {
      const style = window.getComputedStyle(element);
      return `${style.outlineStyle} ${style.outlineWidth} ${style.boxShadow}`;
    });
    // This is a basic computed-style signal, not a full WCAG contrast/focus audit.
    expect(focusStyle).not.toBe('none 0px none');
  });

  test('TC-A11Y-002: login and checkout form controls have accessible names', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('textbox', { name: /username/i })).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('.inventory_item').first().getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/zip\/postal code/i)).toBeVisible();
  });
});
