import { test, expect } from "@playwright/test";
import userData from "../testdata/userdata.json";

import UserPage from "../pages/UserPage.js";


test.describe("User API", () => {

  test.describe.configure({
    mode: "serial",
  });


  // ============================================
  // TEST USER DATA
  // ============================================

  const BASE_URL = userData.BASE_URL;

  let credentials = {
    username: userData.TEST_USER.username,
    email: userData.TEST_USER.email,
    password: userData.TEST_USER.password,
  };


  // ============================================
  // GET CURRENT USER
  // ============================================

  test("GET current user", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const getResult =
      await user.getCurrentUser(
        request,
        token,
        BASE_URL
      );

    expect(
      getResult.response.status()
    ).toBe(200);

  });


  // ============================================
  // REGISTER USER
  // ============================================

  test("POST register user", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const registerResult =
      await user.registerUser(
        request,
        token,
        BASE_URL,
        userData.REGISTER_USER
      );


    expect(
      registerResult.response.status(),
      `Registration failed: ${JSON.stringify(registerResult.body)}`
    ).toBe(201);

  });


  // ============================================
  // PUT REPLACE ACCOUNT
  // ============================================

  test("PUT replace account", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const putResult =
      await user.replaceAccount(
        request,
        token,
        BASE_URL,
        userData.PUT_USER
      );


    expect(
      putResult.response.status(),
      `PUT failed: ${JSON.stringify(putResult.body)}`
    ).toBe(200);


    // SAVE UPDATED USERNAME AND EMAIL
    credentials.username =
      putResult.newUsername;

    credentials.email =
      putResult.newEmail;


    console.log(
      "UPDATED USERNAME:",
      credentials.username
    );

    console.log(
      "UPDATED EMAIL:",
      credentials.email
    );

    console.log(
      "PASSWORD REMAINS:",
      credentials.password
    );

  });


  // ============================================
  // PATCH UPDATE ACCOUNT
  // ============================================

  test("PATCH update account", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const patchResult =
      await user.updateAccount(
        request,
        token,
        BASE_URL,
        userData.PATCH_USER
      );


    expect(
      patchResult.response.status(),
      `PATCH failed: ${JSON.stringify(patchResult.body)}`
    ).toBe(200);


    // SAVE UPDATED EMAIL
    credentials.email =
      patchResult.patchEmail;


    console.log(
      "PATCH EMAIL SAVED:",
      credentials.email
    );

  });


  // ============================================
  // CHANGE PASSWORD
  // ============================================

  test("POST change password", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const changePasswordResult =
      await user.changePassword(
        request,
        token,
        BASE_URL,
        credentials.password
      );


    expect(
      changePasswordResult.response.status(),
      `Change password failed: ${JSON.stringify(changePasswordResult.body)}`
    ).toBe(200);


    // SAVE NEW PASSWORD
    credentials.password =
      changePasswordResult.newPassword;


    console.log(
      "NEW PASSWORD SAVED:",
      credentials.password
    );

  });


  // ============================================
  // LOGOUT
  // ============================================

  test("POST logout", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const logoutResult =
      await user.logout(
        request,
        token,
        BASE_URL
      );


    expect(
      logoutResult.response.status(),
      `Logout failed: ${JSON.stringify(logoutResult.body)}`
    ).toBe(200);

  });


  // ============================================
  // DELETE ACCOUNT
  // ============================================

  test("DELETE account", async ({ request }) => {

    const user = new UserPage();

    const loginResult =
      await user.login(
        request,
        credentials,
        BASE_URL
      );

    expect(
      loginResult.response.status(),
      `Login failed: ${JSON.stringify(loginResult.body)}`
    ).toBe(200);

    const token = loginResult.token;


    const deleteResult =
      await user.deleteAccount(
        request,
        token,
        BASE_URL,
        credentials
      );


    expect(
      deleteResult.response.status(),
      `Delete failed: ${JSON.stringify(deleteResult.body)}`
    ).toBe(200);


    console.log(
      "ACCOUNT DELETED SUCCESSFULLY"
    );

  });

});