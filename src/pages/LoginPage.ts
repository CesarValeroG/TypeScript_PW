import { Page, Locator , expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly loginLogo: Locator;
    private readonly userNameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        
        this.loginLogo = page.getByText('Swag Labs');
        this.userNameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.locator("#login-button");
        this.errorMessage = page.locator(".error-message-container");
    }

    // Checks that the login page is displayed.
    async validateLoginPageIsDisplayed() {
        await expect(this.loginLogo).toBeVisible(); 
    }

    // Enters the username.
    async enterName(userName: string) {
        await this.userNameInput.fill(userName);
    }

    // Enters the password.
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    // Clicks the login button.
    async clickLoginButton() {
        await this.loginButton.click();
    }

    // Logs in with the provided username and password.
    async login(userName: string, password: string) {
        await this.enterName(userName);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    // Gets the error message shown on the page.
    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }
}