import { Page, Locator , expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    private readonly inventoryTitle: Locator;
    private readonly inventoryItemName: Locator;
    private readonly addToCartButton: Locator;
    private readonly backToProductsButton: Locator;
    private readonly shoppingCartBadge: Locator;
    

    constructor(page: Page) {
        super(page);
        this.inventoryTitle = page.locator("[data-test='title']");
        this.inventoryItemName = page.locator('.inventory_item_name');
        this.addToCartButton = page.locator("[data-test^='add-to-cart-']");
        this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
        this.shoppingCartBadge = page.locator("[data-test='shopping-cart-badge']"); // badge that shows the number of items in the cart
    }

    async validateIsOnProductsPage() {
        await expect(this.inventoryTitle).toHaveText('Products');
    }

   async selectItem(itemName: string) {
        const itemLocator = this.inventoryItemName.filter({ hasText: itemName });
        await expect(itemLocator).toBeVisible();
        await itemLocator.click();

        // Use first() to avoid strict mode violation with multiple "Add to cart" buttons
        const addToCartForItem = this.page.getByRole('button', { name: 'Add to cart' }).first();
        await expect(addToCartForItem).toBeVisible();
        await addToCartForItem.click();
        await this.backToProductsButton.click();
   }

   async goToCart() {
    await this.shoppingCartBadge.click();
  }

  /* async addMultipleItemsToCart(itemNames: string[]) {
    for (const name of itemNames) {
      await this.selectItem(name);
    }
  } */

    //return the number of items in the cart
    async getNumberOfItemsInCart() {  // same as writing 'async getNumberOfItemsInCart(): Promise<number>'
        const badgeText = await this.shoppingCartBadge.textContent();
        return badgeText ? parseInt(badgeText, 10) : 0;
    }
}