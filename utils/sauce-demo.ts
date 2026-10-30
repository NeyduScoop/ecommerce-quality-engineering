import { expect, type Page } from '@playwright/test';
import { users } from '../test-data/users.js';

export async function loginAsStandard(page: Page): Promise<void> {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
}

export async function addProductByIndex(page: Page, index = 0): Promise<string> {
  const item = page.locator('.inventory_item').nth(index);
  const name = (await item.locator('.inventory_item_name').innerText()).trim();
  await item.getByRole('button', { name: 'Add to cart' }).click();
  return name;
}

export async function goToCheckoutInformation(page: Page): Promise<void> {
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
}

export async function fillCheckout(page: Page, first = 'QA', last = 'Portfolio', postal = '100001'): Promise<void> {
  await page.locator('[data-test="firstName"]').fill(first);
  await page.locator('[data-test="lastName"]').fill(last);
  await page.locator('[data-test="postalCode"]').fill(postal);
}

export async function getNames(page: Page): Promise<string[]> {
  return (await page.locator('.inventory_item_name').allTextContents()).map(v => v.trim());
}

export async function getPrices(page: Page): Promise<number[]> {
  return (await page.locator('.inventory_item_price').allTextContents())
    .map(v => Number(v.replace('$', '').trim()));
}
