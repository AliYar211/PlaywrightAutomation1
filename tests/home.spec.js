import { test, expect } from '../fixtures/testSetup.js';
import LogoutPage from '../pages/LogoutPage.js';
import logoutdata from '../testdata/logoutdata.json'
import logintestdata from '../testdata/logintestdata.json';

import LoginPage from '../pages/LoginPage.js';
import HomePage from '../pages/HomePage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';


test('Home page inventory', async ({ page }) => {

      const login = new LoginPage(page);
    const logout = new LogoutPage(page);

    const loginData = logintestdata.validUsers[0];
    const logoutData = logoutdata.MessageLogout[0];

    // LOGIN
    await test.step('Login with valid credentials', async () => {
        await login.login(
            loginData.username,
            loginData.password
        );
    });

    // VERIFY LOGIN
    await test.step('Verify login success message', async () => {
        await expect(login.validmessageLocator)
            .toHaveText(loginData.message);

        await attachStepScreenshot(
            page,
            '01 - Login Success'
        );
    });

    // HOME PAGE
    const homePage = new HomePage(page);

    await test.step('Open home page', async () => {
        await homePage.home();
    });

    // VERIFY PRODUCTS PAGE
    await test.step('Verify products page', async () => {

        await expect(homePage.expectSortZtoA)
            .toBeVisible();

        await expect(homePage.sortButton)
            .toHaveValue('za');

        await attachStepScreenshot(
            page,
            '02 - Products Page'
        );
    });

    // LOGOUT
    await test.step('Logout from Application', async () => {

        await logout.hamburger.click();

        await test.step('Click Logout button', async () => {
            await logout.logoutButton.click();
        });

    });

    // VERIFY LOGOUT
    await test.step('Verify Logout Success', async () => {

        await expect(logout.messagelocator)
            .toHaveText(logoutData.message);

        await attachStepScreenshot(
            page,
            '02 - Logout Success'
        );
    });
});