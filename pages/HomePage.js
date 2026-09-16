import { test } from "@playwright/test";
class HomePage{
    constructor(page){
        this.page=page
        // this.cartButton=page.locator('//*[@id="add-to-cart-sauce-labs-fleece-jacket"]')
        //  this.viewProduct=page.locator('//*[@id="item_5_title_link"]/div')
         this.sortButton = page.locator(
            '[data-test="product-sort-container"]'
        );

        this.sortbyZtoA = page.locator(
            '[data-test="product-sort-container"]'
        );

        this.expectSortZtoA = page.locator(
            '[data-test="inventory-container"]'
        );
    }
     async attachScreenshot(name) {
        await test.info().attach(name, {
          body: await this.page.screenshot(),
          contentType: "image/png",
        });
      }
    async gotoURL(){
        await this.page.goto('https://www.saucedemo.com/inventory.html')
          await this.attachScreenshot("01 - Open URL")
    }
    async home(){
        // await this.addtocartButton.click()
        // await this.viewProduct.click()
        await this.sortButton.selectOption('za')
          await this.attachScreenshot("02 - Click Sort Button Z-A")
        



    }
}
export default HomePage