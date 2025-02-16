import { test, expect } from '@playwright/test';
import { YourfeedPage } from './src/pages/yourfeedPage';
import { MainPage } from './src/pages/mainPage';
import { RegisterPage } from './src/pages/registerPage';
import { faker } from '@faker-js/faker';
import { settingsPage } from './src/pages/settingsPage';

const URL_UI = 'https://realworld.qa.guru/';
const user = {
    username:  faker.person.firstName(),
    email:  faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
};

test.describe('Шаблон', () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const yourfeedPage = new YourfeedPage(page, user);
       
        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(user.username);
      });    
    
    test('Логаут пользователя', async ({ page }) => {
        const yourfeedPage = new YourfeedPage(page, user);
        const mainPage = new MainPage(page)

    //    await yourfeedPage.open();
        await yourfeedPage.gotoLogout();

        await expect(settingsPage.passwordField).toBeVisible();
        await expect(mainPage.banner).toBeVisible();
        await expect(mainPage.banner).toContainText('A place to share your knowledge.')
    });    
});
