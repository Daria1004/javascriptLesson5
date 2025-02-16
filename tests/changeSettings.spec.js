import { test, expect } from '@playwright/test';
import { LoginPage, MainPage, RegisterPage, SettingsPage, YourfeedPage } from '../src/pages/index';
import { UserBuilder } from '../src/helpers/builder/index';

const URL_UI = 'https://realworld.qa.guru/';
const userBuilder = new UserBuilder()
    .addEmail()
    .addUsername()
    .addPassword()
    .generate();

test.describe('Профиль пользователя', () => {
    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(userBuilder.username, userBuilder.email, userBuilder.password);
    });    
    
    test('Пользователь может изменить пароль', async ({ page }) => {
        const yourfeedPage = new YourfeedPage(page);
        const settingsPage = new SettingsPage(page);
        const newPassword = new UserBuilder().addNewPassword().getNewPassword();
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username);
  
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
        await loginPage.signin(userBuilder.email, newPassword);
        await expect(yourfeedPage.profileNameField).toBeVisible();
        await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username);
    });   
});
