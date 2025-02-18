export class MainPage {
    constructor(page){
        this.page = page;
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.banner = page.locator('div.banner').locator('p');
        this.loginButton = page.getByRole('link', { name: 'Login' });
    }   

    async gotoRegister(){
        await this.signupButton.click();
    }

    async gotoLogin(){
        await this.loginButton.click();
    }

    async open(url){
        await this.page.goto(url);
    }
}

