import { test, expect } from '../fixtures/testSetup.js';
import HomePage from '../pages/HomePage.js';

import logintestdata from '../testdata/logintestdata.json';
import addtocartdata from '../testdata/addtocartdata.json';
import checkoutdata from '../testdata/checkoutdata.json';
import LoginPage from '../pages/LoginPage';
import AddToCart from '../pages/AddtoCart'; // Fixed import name to match constructor
import Checkout from '../pages/Checkout';
import LogoutPage from '../pages/LogoutPage.js';
import logoutdata from '../testdata/logoutdata.json'
import { attachStepScreenshot } from '../utilities/screenshot.js';


test("pom smoke test", async ({ page }) => {

    const login = new LoginPage(page);
    const logout = new LogoutPage(page);

    const loginData = logintestdata.validUsers[0];
    const logoutData = logoutdata.MessageLogout[0];

    // LOGIN
    await test.step("Login with valid credentials", async () => {
        await login.login(loginData.username, loginData.password);
    });

    // VERIFY
    await test.step("Verify login success message", async () => {
        await expect(login.validmessageLocator).toHaveText(loginData.message);
        await attachStepScreenshot(page, '05 - Products');
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
    // cart
    // ADD TO CART PAGE
    const cartpage = new AddToCart(page);

    // ADD ALL PRODUCTS
    for (const product of addtocartdata.products) {
        await test.step(`Add product: ${product.name}`, async () => {
            await cartpage.addtoCart(product.testId);
        });
    }

    // OPEN CART
    await test.step('Open Cart', async () => {
        await cartpage.openCart();
    });

    // VERIFY ALL PRODUCTS + SCREENSHOT
    await test.step('Verify all products in Cart', async () => {
        for (const product of addtocartdata.products) {
            await expect(
                page.locator('.cart_item')
                    .filter({ hasText: product.name })
            ).toBeVisible();
        }

        await attachStepScreenshot(page, '06 - Cart Verification');
    });


    // CHECKOUT
    const checkout = new Checkout(page);
        const checkoutData = checkoutdata.checkoutUsers[0];

    await test.step("fill form for checkout", async () => {
        await checkout.checkout(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );
    })


    // VERIFY CHECKOUT COMPLETE
    await test.step("Verify login success message", async () => {
        await expect(checkout.checkoutEnd)
            .toHaveText(checkoutData.message);
        await attachStepScreenshot(page, '05 - checkout Complete ');
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




})
