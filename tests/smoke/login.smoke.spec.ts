
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('Smoke Tests - Login', () => {
  test('TC-AUTH-001: valid user can log in', async ({
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

    await expect(page).toHaveURL(/inventory\.html/);
  });
});
