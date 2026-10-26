
import { expect, type Page } from '@playwright/test';

export class OrderCompletePage {
  constructor(private readonly page: Page) {}

  async expectOrderCompleted(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);

    await expect(
      this.page.getByText('Checkout: Complete!', { exact: true }),
    ).toBeVisible();

    await expect(
      this.page.getByText('Thank you for your order!', { exact: true }),
    ).toBeVisible();
  }

  async expectConfirmationMessage(): Promise<void> {
    await expect(
      this.page.getByText(
        'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
        { exact: true },
      ),
    ).toBeVisible();
  }
}
