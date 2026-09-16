class LogoutPage {
    constructor(page) {
        this.page = page;

        this.hamburger = page.locator(
            '//*[@id="react-burger-menu-btn"]'
        );

        this.logoutButton = page.locator(
            '[data-test="logout-sidebar-link"]'
        );

        this.messagelocator = page.locator(
            '//*[@id="root"]/div/div[1]'
        );
    }

    async logout() {
        // 01 - Click Hamburger
        await this.hamburger.click();

        // Wait for sidebar animation
        await this.page.waitForTimeout(1000);

        // 02 - Click Logout
        await this.logoutButton.evaluate((element) => {
            element.click();
        });
    }
}

export default LogoutPage;