import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';


export class CartPage extends BasePage {
    private readonly checkoutButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async clickCheckout() { 
        await expect(this.checkoutButton).toBeVisible();
        await this.checkoutButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
        // Wait for the navigation so callers don't read the previous step's title
        await this.page.waitForURL('**/checkout-step-two.html');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await expect(this.firstNameInput).toBeVisible();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async completeCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.clickCheckout();
        await this.fillCheckoutInformation(firstName, lastName, postalCode);
        await this.clickContinue();
    }
}