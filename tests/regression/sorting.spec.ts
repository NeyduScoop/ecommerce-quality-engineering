
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('Regression Tests - Product Sorting', {
  tag: ['@regression', '@sorting'],
}, () => {
  test('TC-SORT-003: products can be sorted by price low to high', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.expectInventoryLoaded();
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices.length).toBeGreaterThan(0);
    expect(prices).toEqual(sortedPrices);
  });
});
