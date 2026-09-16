import { test } from "@playwright/test";
import userData from "../testdata/userdata.json";

test("Create Ali test user", async ({ request }) => {

    const response = await request.post(
        `${userData.BASE_URL}/users/register`,
        {
            data: {
                fullname: userData.TEST_USER.fullname,
                username: userData.TEST_USER.username,
                email: userData.TEST_USER.email,
                password: userData.TEST_USER.password
            }
        }
    );

    const body = await response.json();

    console.log("====================================");
    console.log("REGISTER STATUS:", response.status());
    console.log(
        "REGISTER RESPONSE:",
        JSON.stringify(body, null, 2)
    );
    console.log("====================================");

});