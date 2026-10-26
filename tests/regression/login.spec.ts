
import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';

test.describe('Regression Tests - Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC-AUTH-002: invalid credentials are rejected', async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(
      users.invalid.username,
      users.invalid.password,
    );

    await loginPage.expectLoginError(
      'Username and password do not match',
    );

    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('TC-AUTH-003: locked-out user cannot log in', async ({
    loginPage,
  }) => {
    await loginPage.login(
      users.lockedOut.username,
      users.lockedOut.password,
    );

    await loginPage.expectLoginError(
      'Sorry, this user has been locked out',
    );
  });

  test('TC-AUTH-004: empty credentials are rejected', async ({
    loginPage,
  }) => {
    await loginPage.login(
      users.empty.username,
      users.empty.password,
    );

    await loginPage.expectLoginError('Username is required');
  });
});
