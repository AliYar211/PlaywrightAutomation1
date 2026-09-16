// import { test, expect } from "@playwright/test";
// import path from "path";
// import os from "os";
// test('end to end encryption', async({page})=>{
// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', 'standard_user');
// await page.fill('#password' ,'secret_sauce');
// await page.click('#login-button');
//  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText("Products");
// await page.click ('#add-to-cart-sauce-labs-backpack');
// await page.click('//*[@id="shopping_cart_container"]/a/span');
// await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText("Your Cart");
// await page.click('//*[@id="checkout"]');
// await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Your Information');
// await page.fill('//*[@id="first-name"]','Filza Anwar');
// await page.fill('//*[@id="last-name"]',' Anwar')
// await page.fill('//*[@id="postal-code"]','754600')
// await page.click('//*[@id="continue"]');
// await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Overview');
// await page.click('//*[@id="finish"]');
// await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Complete!');
// await page.click('//*[@id="generate-pdf-order"]'); 
// const downloadPromise = page.waitForEvent('download');

// await page.click('//*[@id="generate-pdf-order"]');

// const download = await downloadPromise;

// expect(download.suggestedFilename()).toContain('.pdf');


// const path = require('path');
// const os = require('os');

// await download.saveAs(
//   path.join(os.homedir(), 'Downloads', download.suggestedFilename())
// );


// });