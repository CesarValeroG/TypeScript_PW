import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckOutPage extends BasePage {

    private readonly checkOutTitle: Locator;
    private readonly verifyItemNames: Locator;
    private readonly totalCost: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        super(page);
         // Initialize locators using Playwright's best practices
        this.checkOutTitle = page.getByTestId("title");
        this.verifyItemNames = page.getByTestId("inventory-item-name");
        this.totalCost = page.getByTestId("total-label");
        this.finishButton = page.getByRole('button', { name: 'Finish' });
    }

    async getCheckOutTitle(): Promise<string> {
        return await this.checkOutTitle.textContent() ?? '';
    }

    async isProductInOrder(productName: string): Promise<boolean> {
        return this.verifyItemNames.filter({ hasText: productName }).isVisible();
    }

    async getAllItemNames(): Promise<string[]> {
    return this.verifyItemNames.allTextContents();
  }

    // Verify the total
  async getTotal(): Promise<number> {
    const text = (await this.totalCost.textContent()) ?? ''; // "Total: $28.06"
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }    
}