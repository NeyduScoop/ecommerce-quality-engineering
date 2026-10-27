
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('E2E Tests - Complete Order', {
  tag: ['@e2e', '@checkout'],
}, () => {
  test('TC-ORDER-006: user can complete a valid order', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    orderCompletePage,
  }) => {
    // 1. Log in
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.expectInventoryLoaded();

    // 2. Add a product to the cart
    await inventoryPage.addFirstProductToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // 3. Open the cart
    await inventoryPage.openCart();
    await cartPage.expectCartLoaded();
    await expect(cartPage.cartItems).toHaveCount(1);

    // 4. Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.expectInformationPageLoaded();

    // 5. Enter customer information
    await checkoutPage.fillCustomerInformation(
      'QA',
      'Portfolio',
      '100001',
    );

    await checkoutPage.continueToOverview();

    // 6. Verify order overview
    await checkoutPage.expectOverviewLoaded();
    await expect(checkoutPage.summaryItems).toHaveCount(1);
    await expect(checkoutPage.itemTotal).toBeVisible();
    await expect(checkoutPage.tax).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();

    const displayedTotal = await checkoutPage.getDisplayedTotal();
    expect(displayedTotal).toMatch(/Total: \$\d+\.\d{2}/);

    // 7. Finish the order
    await checkoutPage.finishOrder();

    // 8. Verify order confirmation
    await orderCompletePage.expectOrderCompleted();
    await orderCompletePage.expectConfirmationMessage();
  });
});
