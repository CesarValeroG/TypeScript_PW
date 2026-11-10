import { test, expect } from '../../src/fixtures/BaseTest';

test.describe('ProductsTest', () => {

    // Verifies that adding one product to the cart updates the cart badge to 1.
    test.skip('testProductListy', async ({ loginPage, productsPage, username, password }) => {
        await loginPage.validateLoginPageIsDisplayed();
        await loginPage.login(username, password);
        await productsPage.validateIsOnProductsPage();
        await productsPage.selectItem('Sauce Labs Backpack');
        const itemCount = await productsPage.getNumberOfItemsInCart();
        expect(itemCount, 'The number of items in the cart is not as expected.').toBe(1);
    });

    // Verifies that adding multiple products increases the cart badge beyond 3 items.
    test.skip('testAddingMultipleProducts', async ({ loginPage, productsPage, username, password }) => {
        await loginPage.validateLoginPageIsDisplayed();
        await loginPage.login(username, password);
        await productsPage.validateIsOnProductsPage();
        await productsPage.selectItem('Sauce Labs Backpack');
        await productsPage.selectItem('Sauce Labs Bike Light');
        await productsPage.selectItem('Sauce Labs Bolt T-Shirt');
        await productsPage.selectItem('Sauce Labs Onesie');

        const itemCount = await productsPage.getNumberOfItemsInCart();
        expect(
             itemCount,
            `The cart was expected to contain more than 3 items, but it contained: ${itemCount}`
            ).toBeGreaterThan(3);
    });
        
});