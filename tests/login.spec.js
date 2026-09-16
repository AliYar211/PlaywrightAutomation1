import { test, expect } from '../fixtures/testSetup.js';
import logintestdata from '../testdata/logintestdata.json'
import LoginPage from '../pages/LoginPage.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';

test.describe("Login", () => {
  test("Valid login case for user ", async ({ page }) => {
    const login = new LoginPage(page);
    const loginData = logintestdata.validUsers[0];


    // LOGIN
    await test.step("Login with valid credentials", async () => {
      await login.login(loginData.username, loginData.password);
    });

    // VERIFY
    await test.step("Verify login success message", async () => {
      await expect(login.validmessageLocator).toHaveText(loginData.message);
      await attachStepScreenshot(page, '05 - Products');
    });
  });
});

// // valid user name and password

// test('login test case' , async({page})=>{
//     const username = logintestdata.validUsers[0].username
//     const password = logintestdata.validUsers[0].password
//     const message =logintestdata.validUsers[0].message

// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', username);
// await page.fill('#password' ,password);
// await page.click('#login-button');

//  await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText(message);
// });

// // invalid user name and valid password

// test('invalid username login test case' , async({page})=>{
// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', 'standarduser');
// await page.fill('#password' ,'secret_sauce');
// await page.click('#login-button');

//  await expect(page.locator('#login_button_container > div > form > div.error-message-container.error > h3')).toHaveText("Epic sadface: Username and password do not match any user in this service");

// });

// //  valid username and invalid password
// test('invalid password login test case' , async({page})=>{
// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', 'standard_user');
// await page.fill('#password' ,'secretsauce');
// await page.click('#login-button');

//  await expect(page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText("Epic sadface: Username and password do not match any user in this service");

// });

// //  invalid username and invalid password
// test('invalid username and  password login test case' , async({page})=>{
// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', 'standarduser');
// await page.fill('#password' ,'secretsauce');
// await page.click('#login-button');

//  await expect(page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText("Epic sadface: Username and password do not match any user in this service");

// });

// //  empty username and  password
// test('empty password and username login test case' , async({page})=>{
// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', '');
// await page.fill('#password' ,'');
// await page.click('#login-button');

//  await expect(page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText("Epic sadface: Username is required");

// });

// // foreach loop valiud data

// logintestdata.validUsers.forEach((data) => {

// test(`login test case ${data.username}` , async({page})=>{

// await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', data.username);
// await page.fill('#password' ,data.password);
// await page.click('#login-button');

//  await expect(page.locator('#header_container > div.header_secondary_container > span')).toHaveText(data.message);
// });

// });

// // foreach invalid data
// logintestdata.invalidUsers.forEach((data)=>{

// test(`failed login case for ${data.username}`, async({page})=>{
//     await page.goto('https://www.saucedemo.com/');
// await page.fill('#user-name', data.username);
// await page.fill('#password' ,data.password);
// await page.click('#login-button');

//  await expect(page.locator('#login_button_container > div > form > div.error-message-container.error > h3')).toHaveText(data.message, { timeout: 10_000 });
// });

// });

// page object model for login page
// foreach loop valiud data

// logintestdata.validUsers.forEach((data) => {

// test(`login test case ${data.username}` , async({page})=>{
//    const login= new LoginPage(page)

// await login.gotoURL();
// await login.login(data.username, data.password)
//  await expect(login.validmessageLocator).toHaveText(data.message);
// });

// });

// // foreach invalid data
// logintestdata.invalidUsers.forEach((data)=>{

// test(`failed login case for ${data.username}`, async({page})=>{
//     const login= new LoginPage(page)
// await login.gotoURL();
// await login.login(data.username, data.password)
//  await expect(login.invalidmessageLocator).toHaveText(data.message);
// });

// });
