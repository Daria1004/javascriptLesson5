export class YourfeedPage {

    constructor(page){
        this.page = page;
        this.profileNameField = page.getByRole('navigation');
        this.newArticleButton = page.getByRole('link', { name: 'New Article'});
        this.buttonNavigation = page.locator('img.user-pic');
        this.buttonSettings = page.locator('a:has-text("Settings")');
        this.buttonProfile = page.locator('a:has-text("Profile")');
        this.buttonLogout = page.locator('a:has-text("Logout")');
        this.buttonGlobalFeed = page.getByRole('button', { name: 'Global Feed' });
        this.linkFirstArticle = page.locator('a.preview-link').first();
        this.firstArticle = page.locator('.article-preview').first();

    }   

    async gotoNewArticle(){
        await this.newArticleButton.click();
    }

    async openGlobalArticle(){
        await this.buttonGlobalFeed.click();
        await this.linkFirstArticle.click();
    }

    async gotoSettings(){
        await this.buttonNavigation.click();
        await this.buttonSettings.click();
    }

    async gotoMyArticle(){
        await this.buttonNavigation.click();
        await this.buttonProfile.click();
        await this.firstArticle.click();
    }

    async gotoLogout(){
        await this.buttonNavigation.click();
        await this.buttonLogout.click();
    }
}