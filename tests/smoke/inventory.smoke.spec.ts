
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('Smoke Tests - Inventory', {
  tag: ['@smoke', '@inventory'],
}, () => {
  test('TC-INV-001: inventory page loads after login', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password,
    );

    await inventoryPage.expectInventoryLoaded();

    await expect(inventoryPage.inventoryItems).not.toHaveCount(0);
  });
});
