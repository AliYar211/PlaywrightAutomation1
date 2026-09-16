class UserPage {

  async login(request, credentials, BASE_URL) {

    console.log("======================================");
    console.log("LOGIN");
    console.log("USERNAME:", credentials.username);
    console.log("EMAIL:", credentials.email);
    console.log("PASSWORD:", credentials.password);
    console.log("======================================");

    const loginResponse = await request.post(
      `${BASE_URL}/users/login`,
      {
        data: {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        },
      }
    );

    const responseBody = await loginResponse.json();

    console.log("LOGIN STATUS:", loginResponse.status());
    console.log(
      "LOGIN RESPONSE:",
      JSON.stringify(responseBody, null, 2)
    );

    // Support the possible token locations
    const token =
      responseBody?.data?.accessToken ??
      responseBody?.accessToken ??
      responseBody?.token ??
      responseBody?.data?.token ??
      null;

    console.log(
      "ACCESS TOKEN FOUND:",
      token ? "YES" : "NO"
    );

    return {
      response: loginResponse,
      body: responseBody,
      token: token,
    };
  }


  async getCurrentUser(request, token, BASE_URL) {

    const getResponse = await request.get(
      `${BASE_URL}/users/current-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const responseBody = await getResponse.json();

    console.log("GET RESPONSE:", responseBody);
    console.log("GET STATUS:", getResponse.status());

    return {
      response: getResponse,
      body: responseBody,
    };
  }


  async registerUser(
    request,
    token,
    BASE_URL,
    registerData
  ) {

    const uniqueId = Date.now();

    const registerUserData = {
      fullname: registerData.fullname,
      email: `ali_${uniqueId}@test.com`,
      username: `ali_${uniqueId}`,
      password: registerData.password,
    };

    console.log("======================================");
    console.log("REGISTER");
    console.log("REGISTER DATA:", registerUserData);
    console.log("======================================");

    const registerResponse = await request.post(
      `${BASE_URL}/users/register`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: registerUserData,
      }
    );

    const responseBody = await registerResponse.json();

    console.log(
      "REGISTER RESPONSE:",
      responseBody
    );

    console.log(
      "REGISTER STATUS:",
      registerResponse.status()
    );

    return {
      response: registerResponse,
      body: responseBody,
    };
  }


  async replaceAccount(
    request,
    token,
    BASE_URL,
    putData
  ) {

    const uniqueId = Date.now();

    const newUsername =
      `ali_updated_${uniqueId}`;

    const newEmail =
      `ali_updated_${uniqueId}@test.com`;

    console.log("======================================");
    console.log("PUT ACCOUNT");
    console.log("NEW USERNAME:", newUsername);
    console.log("NEW EMAIL:", newEmail);
    console.log("======================================");

    const putResponse = await request.put(
      `${BASE_URL}/users/replace-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          fullname: putData.fullname,
          email: newEmail,
          username: newUsername,
        },
      }
    );

    const responseBody = await putResponse.json();

    console.log("PUT RESPONSE:", responseBody);
    console.log("PUT STATUS:", putResponse.status());

    return {
      response: putResponse,
      body: responseBody,
      newUsername: newUsername,
      newEmail: newEmail,
    };
  }


  async updateAccount(
    request,
    token,
    BASE_URL,
    patchData
  ) {

    const patchEmail =
      `ali_patch_${Date.now()}@test.com`;

    console.log("======================================");
    console.log("PATCH ACCOUNT");
    console.log("NEW EMAIL:", patchEmail);
    console.log("======================================");

    const patchResponse = await request.patch(
      `${BASE_URL}/users/update-account`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          fullname: patchData.fullname,
          email: patchEmail,
        },
      }
    );

    const responseBody =
      await patchResponse.json();

    console.log(
      "PATCH RESPONSE:",
      responseBody
    );

    console.log(
      "PATCH STATUS:",
      patchResponse.status()
    );

    return {
      response: patchResponse,
      body: responseBody,
      patchEmail: patchEmail,
    };
  }


  async changePassword(
    request,
    token,
    BASE_URL,
    currentPassword
  ) {

    const oldPassword = currentPassword;

    const newPassword =
      `ALI${Date.now()}NEW`;

    console.log("======================================");
    console.log("CHANGE PASSWORD");
    console.log("OLD PASSWORD:", oldPassword);
    console.log("NEW PASSWORD:", newPassword);
    console.log("======================================");

    const changePasswordResponse =
      await request.post(
        `${BASE_URL}/users/change-password`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
        }
      );

    const responseBody =
      await changePasswordResponse.json();

    console.log(
      "CHANGE PASSWORD RESPONSE:",
      responseBody
    );

    console.log(
      "CHANGE PASSWORD STATUS:",
      changePasswordResponse.status()
    );

    return {
      response: changePasswordResponse,
      body: responseBody,
      newPassword: newPassword,
    };
  }


  async logout(request, token, BASE_URL) {

    console.log("======================================");
    console.log("LOGOUT");
    console.log("======================================");

    const logoutResponse =
      await request.post(
        `${BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const responseBody =
      await logoutResponse.json();

    console.log(
      "LOGOUT RESPONSE:",
      responseBody
    );

    console.log(
      "LOGOUT STATUS:",
      logoutResponse.status()
    );

    return {
      response: logoutResponse,
      body: responseBody,
    };
  }


  async deleteAccount(
    request,
    token,
    BASE_URL,
    credentials
  ) {

    console.log("======================================");
    console.log("DELETE ACCOUNT");

    console.log(
      "USERNAME:",
      credentials.username
    );

    console.log(
      "EMAIL:",
      credentials.email
    );

    console.log("======================================");

    const deleteResponse =
      await request.delete(
        `${BASE_URL}/users/delete-account`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const responseBody =
      await deleteResponse.json();

    console.log(
      "DELETE RESPONSE:",
      responseBody
    );

    console.log(
      "DELETE STATUS:",
      deleteResponse.status()
    );

    return {
      response: deleteResponse,
      body: responseBody,
    };
  }
}

export default UserPage;