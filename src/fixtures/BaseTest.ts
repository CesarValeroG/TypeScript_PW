import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckOutPage;
  username: string;
  password: string;
};

export const test = base.extend<Fixtures>({
  // Override the built-in page: navigate to the base URL before every test
  page: async ({ page }, use) => {
    await page.goto('/');
    await use(page);
  },
  username: async ({}, use) => {
    await use(process.env.SAUCE_USER ?? '');
  },
  password: async ({}, use) => {
    await use(process.env.SAUCE_PASS ?? '');
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  },
});

export { expect } from '@playwright/test';