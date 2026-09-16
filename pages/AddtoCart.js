import { attachStepScreenshot } from '../utilities/screenshot.js';

class AddToCart {
    constructor(page) {
        this.page = page;

        this.cartButton = page.locator(
            '[data-test="shopping-cart-link"]'
        );

        this.cartItems = page.locator('.cart_item');
    }

    async addtoCart(productTestId) {
        await this.page
            .locator(`[data-test="${productTestId}"]`)
            .click();

        await attachStepScreenshot(
            this.page,
            '01 - Click Add to Cart for Product'
        );
    }

    async openCart() {
        await this.cartButton.click();

        await attachStepScreenshot(
            this.page,
            '02 - Click Cart Button'
        );
    }

    getCartItemByName(productName) {
        return this.cartItems.filter({
            hasText: productName
        });
    }
}

export default AddToCart;