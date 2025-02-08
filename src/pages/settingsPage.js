export class SettingsPage {

    constructor(page){
        this.page = page;
        this.passwordField = page.getByPlaceholder('Password');
        this.updateButton = page.locator('button:has-text("Update Settings")'); //заменить
        this.banner = page.locator('div.settings-page').locator('h1').first();

    }   

    async gotoUpdate(){
        await this.updateButton.click();
    }

    async changePassword(newPassword){
        await this.passwordField.click();
        await this.passwordField.fill(newPassword);
        await this.updateButton.click();
    }
}
