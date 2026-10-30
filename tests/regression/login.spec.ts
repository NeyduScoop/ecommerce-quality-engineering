import { test, expect } from '../../fixtures/test-fixtures.js';
import { users } from '../../test-data/users.js';
import { loginAsStandard } from '../../utils/sauce-demo.js';

test.describe('Authentication coverage', { tag: ['@regression', '@auth'] }, () => {
  test.beforeEach(async ({ loginPage }) => { await loginPage.goto(); });

  test('TC-AUTH-002: incorrect password is rejected', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, 'wrong_password');
    await loginPage.expectLoginError('Username and password do not match');
  });

  test('TC-AUTH-003: unknown username is rejected', async ({ loginPage }) => {
    await loginPage.login('unknown_portfolio_user', users.standard.password);
    await loginPage.expectLoginError('Username and password do not match');
  });

  test('TC-AUTH-004: empty username and password are rejected', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectLoginError('Username is required');
  });

  test('TC-AUTH-005: missing username is rejected', async ({ loginPage }) => {
    await loginPage.login('', users.standard.password);
    await loginPage.expectLoginError('Username is required');
  });

  test('TC-AUTH-006: missing password is rejected', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');
    await loginPage.expectLoginError('Password is required');
  });

  test('TC-AUTH-007: password field masks typed characters', async ({ page }) => {
    const password = page.locator('[data-test="password"]');
    await password.fill(users.standard.password);
    await expect(password).toHaveAttribute('type', 'password');
  });

  test('TC-AUTH-008: user can recover from invalid login', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, 'wrong_password');
    await loginPage.expectLoginError('Username and password do not match');
    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.passwordInput.fill(users.standard.password);
    await loginPage.loginButton.click();
    await inventoryPage.expectInventoryLoaded();
  });

  test('TC-AUTH-009: locked-out demo user is rejected', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectLoginError('locked out');
  });

  test('TC-AUTH-010: login can be completed with keyboard only', async ({ page, inventoryPage }) => {
    await page.locator('[data-test="username"]').focus();
    await page.keyboard.type(users.standard.username);
    await page.keyboard.press('Tab');
    await page.keyboard.type(users.standard.password);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await inventoryPage.expectInventoryLoaded();
  });

  test('TC-REG-006: logout ends the authenticated session', async ({ page }) => {
    await loginAsStandard(page);
    await page.locator('#react-burger-menu-btn').click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});