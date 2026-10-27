
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('Regression Tests - Checkout Validation', {
  tag: ['@regression', '@checkout'],
}, () => {
  test('TC-CHECK-002: checkout requires customer information', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.expectInventoryLoaded();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    await cartPage.expectCartLoaded();
    await cartPage.proceedToCheckout();

    await checkoutPage.expectInformationPageLoaded();
    await checkoutPage.continueToOverview();

    await checkoutPage.expectCheckoutError('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
