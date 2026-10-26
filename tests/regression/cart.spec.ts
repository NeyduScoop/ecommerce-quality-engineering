
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('Regression Tests - Shopping Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.expectInventoryLoaded();
  });

  test('TC-CART-002: user can add a product to the cart', async ({
    inventoryPage,
    page,
  }) => {
    await inventoryPage.addFirstProductToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('TC-CART-003: user can remove a product from the cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();

    await cartPage.expectCartLoaded();
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeFirstProduct();

    await expect(cartPage.cartItems).toHaveCount(0);
  });
});
