import { test, expect } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

class Checkout {
    constructor(page) {
        this.page = page;

        this.checkoutButton = page.locator('#checkout');
        this.infopage = page.locator(
            '#header_container > div:nth-child(2) > span'
        );

        this.firstname = page.locator('#first-name');
        this.lastname = page.locator('#last-name');
        this.zip = page.locator('#postal-code');

        this.continueButton = page.locator('#continue');

        this.overviewpage = page.locator(
            '#header_container > div:nth-child(2) > span'
        );

        this.finishButton = page.locator('#finish');

        this.checkoutEnd = page.locator(
            '#header_container > div:nth-child(2) > span'
        );

        this.generatepdf = page.locator('#generate-pdf-order');
    }

    async checkout(firstName, lastName, postalCode) {

        // ==========================================
        // CLICK CHECKOUT BUTTON
        // ==========================================
        await test.step('Click checkout button', async () => {
            await this.checkoutButton.click();
        });

        await attachStepScreenshot(
            this.page,
            '01 - Click Checkout Button'
        );


        // ==========================================
        // ENTER FIRST NAME
        // ==========================================
        await test.step('Enter first name', async () => {
            await this.firstname.fill(firstName);

            console.log(
                'After firstName.fill():',
                await this.firstname.inputValue()
            );
        });

        await attachStepScreenshot(
            this.page,
            '02 - Enter Firstname'
        );


        // ==========================================
        // ENTER LAST NAME
        // ==========================================
        await test.step('Enter last name', async () => {
            await this.lastname.fill(lastName);

            console.log(
                'After lastName.fill():',
                await this.lastname.inputValue()
            );
        });

        await attachStepScreenshot(
            this.page,
            '03 - Enter Lastname'
        );


        // ==========================================
        // ENTER ZIP CODE
        // ==========================================
        await test.step('Enter zip code', async () => {
            await this.zip.fill(postalCode);

            console.log(
                'After postalCode.fill():',
                await this.zip.inputValue()
            );
        });

        await attachStepScreenshot(
            this.page,
            '04 - Enter Zip Code'
        );


        // ==========================================
        // VERIFY FORM VALUES
        // ==========================================
        console.log('Before verification:', {
            firstName: await this.firstname.inputValue(),
            lastName: await this.lastname.inputValue(),
            zip: await this.zip.inputValue()
        });

        await expect(this.firstname).toHaveValue(firstName);
        await expect(this.lastname).toHaveValue(lastName);
        await expect(this.zip).toHaveValue(postalCode);


        // ==========================================
        // CLICK CONTINUE BUTTON
        // ==========================================
        await test.step('Click Continue button', async () => {

            await expect(this.continueButton).toBeVisible();
            await expect(this.continueButton).toBeEnabled();

            await this.continueButton.click();
        });


        // ==========================================
        // CHECK PAGE AFTER CONTINUE
        // ==========================================
        console.log('======================================');
        console.log('AFTER CONTINUE CLICK');
        console.log('Current URL:', this.page.url());

        console.log(
            'Page heading:',
            await this.overviewpage.textContent()
        );


        // ==========================================
        // CHECK FOR SAUCEDEMO ERROR
        // ==========================================
        const errorMessage = this.page.locator(
            '[data-test="error"]'
        );

        const errorVisible = await errorMessage.isVisible();

        console.log(
            'Error visible:',
            errorVisible
        );

        if (errorVisible) {
            console.log(
                'CHECKOUT ERROR:',
                await errorMessage.textContent()
            );
        }

        console.log('======================================');


        // ==========================================
        // SCREENSHOT AFTER CONTINUE
        // ==========================================
        await attachStepScreenshot(
            this.page,
            '05 - Click Continue Button'
        );


        // ==========================================
        // VERIFY CHECKOUT OVERVIEW PAGE
        // ==========================================
        await test.step('Verify checkout overview page', async () => {

            await expect(this.overviewpage)
                .toHaveText('Checkout: Overview');
        });


        // ==========================================
        // CLICK FINISH BUTTON
        // ==========================================
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