import { test, expect } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class Checkout {
    constructor(page) {
        this.page = page;

        this.checkoutButton = page.locator('#checkout');
        this.infopage = page.locator('#header_container > div:nth-child(2) > span');

        this.firstname = page.locator('#first-name');
        this.lastname = page.locator('#last-name');
        this.zip = page.locator('#postal-code');

        this.continueButton = page.locator('#continue');

        this.overviewpage = page.locator('#header_container > div:nth-child(2) > span');

        this.finishButton = page.locator('#finish');

        this.checkoutEnd = page.locator('#header_container > div:nth-child(2) > span');

        this.generatepdf = page.locator('#generate-pdf-order');
    }

    async checkout(firstName, lastName, postalCode) {

        await test.step('Click checkout button', async () => {
            await this.checkoutButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '01 - Click Checkout Button'
        );

        await test.step('Enter first name', async () => {
            await this.firstname.fill(firstName);
        });

        await attachStepScreenshot(
            this.page,
            '02 - Enter Firstname'
        );

        await test.step('Enter last name', async () => {
            await this.lastname.fill(lastName);
        });

        await attachStepScreenshot(
            this.page,
            '03 - Enter Lastname'
        );

        await test.step('Enter zip code', async () => {
            await this.zip.fill(postalCode);
        });

        await attachStepScreenshot(
            this.page,
            '04 - Enter Zip Code'
        );

        // Verify that the values were actually entered
        await expect(this.firstname).toHaveValue(firstName);
        await expect(this.lastname).toHaveValue(lastName);
        await expect(this.zip).toHaveValue(postalCode);

        await test.step('Click Continue button', async () => {
            await expect(this.continueButton).toBeVisible();
            await expect(this.continueButton).toBeEnabled();

            await this.continueButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '05 - Click Continue Button'
        );

        // Check for a SauceDemo validation error
        const errorMessage = this.page.locator('[data-test="error"]');

        if (await errorMessage.isVisible()) {
            console.log(
                'CHECKOUT ERROR:',
                await errorMessage.textContent()
            );
        }

        await test.step('Verify checkout overview page', async () => {
            await expect(this.overviewpage)
                .toHaveText('Checkout: Overview');
        });

        await test.step('Click Finish button', async () => {
            await expect(this.finishButton).toBeVisible();
            await expect(this.finishButton).toBeEnabled();

            await this.finishButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '06 - Click Finish Button'
        );
    }
}

export default Checkout;