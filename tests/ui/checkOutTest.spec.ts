import { test, expect } from '../../src/fixtures/BaseTest';

test.describe('CheckOutTest', () => {
  // Verifies that the checkout process completes successfully with valid information.
  test('testSuccessfulCheckout', async ({
                                        loginPage, productsPage, cartPage,
                                        checkoutPage, username, password,
  }) => {
    await loginPage.validateLoginPageIsDisplayed();
    await loginPage.login(username, password);

    await productsPage.validateIsOnProductsPage();
    await productsPage.selectItem('Sauce Labs Backpack');
    await productsPage.selectItem('Sauce Labs Onesie');
    await productsPage.goToCart();

    await cartPage.completeCheckout('John', 'Doe', '12345');

    // Validate that is on the checkout overview page
    expect(await checkoutPage.getCheckOutTitle(), 'Not on the Checkout Overview page.').toBe(
      'Checkout: Overview'
    );

    // Validate that the selected products are in the checkout overview
    const expectedProducts = ['Sauce Labs Backpack', 'Sauce Labs Onesie'];
    const actualProducts = await checkoutPage.getAllItemNames();
    expect(actualProducts).toEqual(expect.arrayContaining(expectedProducts));

    // Validate that the total price is not greater than 60
    const total = await checkoutPage.getTotal();
    expect(total, `Total price is greater than 60: ${total}`).toBeLessThanOrEqual(60);

    await checkoutPage.clickFinish();
  });
});