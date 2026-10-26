
import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Products', { exact: true });
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator(
      '[data-test="product-sort-container"]',
    );
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectInventoryLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    return priceTexts.map((price) =>
      Number(price.replace('$', '').trim()),
    );
  }

  async addFirstProductToCart(): Promise<void> {
    await this.inventoryItems
      .first()
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
