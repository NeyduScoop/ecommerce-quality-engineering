
import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async expectCartLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(
      this.page.getByText('Your Cart', { exact: true }),
    ).toBeVisible();
  }

  async removeFirstProduct(): Promise<void> {
    await this.cartItems
      .first()
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
