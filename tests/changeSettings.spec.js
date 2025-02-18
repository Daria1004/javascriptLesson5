import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SettingsPage } from '../src/pages/settingsPage';
import { MainPage } from '../src/pages/mainPage';
import { RegisterPage } from '../src/pages/registerPage';
import { YourfeedPage } from '../src/pages/yourfeedPage';
import { LoginPage } from '../src/pages/loginPage';

const URL_UI = 'https://realworld.qa.guru/';
const user = {
    username:  faker.person.firstName(),
    email:  faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
};

test.describe('Профиль ползователя', () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        const yourfeedPage = new YourfeedPage(page, user);
       
        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
       });    
    
    test('Пользователь может изменить пароль', async ({ page }) => {
        const yourfeedPage = new YourfeedPage(page, user);
        const settingsPage = new SettingsPage(page);
        const newPassword = faker.internet.password({ length: 5})
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(user.username);
  
        //  открыть страницу settings;
        await yourfeedPage.gotoSettings();
        await expect(settingsPage.banner).toBeVisible();
        await expect(settingsPage.banner).toContainText('Your Settings')

        await settingsPage.changePassword(newPassword);
        await expect(settingsPage.banner).toBeVisible();
        await expect(settingsPage.banner).toContainText('Your Settings')

        // разлогиниться
        await yourfeedPage.gotoLogout();

        // залогиниться
        await mainPage.gotoLogin();
        await loginPage.signin(user.email, newPassword);
        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(user.username);
    });   
});
