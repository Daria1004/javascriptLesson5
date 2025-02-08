export class YourfeedPage {

    constructor(page, user){
        this.page = page;
        this.profileNameField = page.getByRole('navigation');
        this.newArticleButton = page.getByRole('link', { name: 'New Article'});
        this.buttonNavigation = page.locator('img.user-pic');
        this.buttonSettings = page.locator('a:has-text("Settings")');
        this.buttonLogout = page.locator('a:has-text("Logout")');

    }   

    async gotoArticle(){
        await this.newArticleButton.click();
    }

    async gotoSettings(){
        await this.buttonNavigation.click();
        await this.buttonSettings.click();
    }

    async gotoLogout(){
        await this.buttonNavigation.click();
        await this.buttonLogout.click();
    }
}