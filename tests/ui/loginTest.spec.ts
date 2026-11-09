import { test, expect } from '../../src/fixtures/BaseTest';

test.describe('LoginTest', () => {
  // Verifies that submitting empty username and password shows the required username validation message.
  test('emptyCredentialsShowsError', async ({ loginPage }) => {
    await loginPage.validateLoginPageIsDisplayed();
    await loginPage.login('', '');
    expect(await loginPage.getErrorMessage()).toContain('Username is required');
  });

  // Verifies that leaving the password empty shows the required password validation message.
  test('emptyPasswordShowsError', async ({ loginPage }) => {
    await loginPage.validateLoginPageIsDisplayed();
    await loginPage.login('standard_user', '');
    expect(await loginPage.getErrorMessage()).toContain('Password is required');
  });

  // Verifies that entering invalid credentials shows the authentication error message.
  test('invalidUsernameShowsError', async ({ loginPage }) => {
    await loginPage.validateLoginPageIsDisplayed();
    await loginPage.login('invalid_user', 'invalid_password');
    expect(await loginPage.getErrorMessage()).toContain(
      'Username and password do not match any user in this service'
    );
  });

  // Verifies that valid credentials redirect the user to the Products page after login.
  test('testSuccessfulLogin', async ({ loginPage, productsPage, username, password }) => {
    await loginPage.validateLoginPageIsDisplayed();
    await loginPage.login(username, password);
    await productsPage.validateIsOnProductsPage();
  });
});