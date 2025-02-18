import { test, expect } from '@playwright/test';
import { MainPage, RegisterPage, YourfeedPage } from '../src/pages/index';
import { UserBuilder } from '../src/helpers/builder/index';

const  URL_UI = 'https://realworld.qa.guru/';

test('Регистрация пользователя, логин и пароль валидны', async ({ 
    page 
}) => {
    const userBuilder = new UserBuilder()
        .addEmail()
        .addUsername()
        .addPassword()
        .generate();

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
    const yourfeedPage = new YourfeedPage(page);

    await mainPage.open(URL_UI);
    await mainPage.gotoRegister();
    await registerPage.register(userBuilder.username, userBuilder.email, userBuilder.password);

    await expect(yourfeedPage.profileNameField).toBeVisible();
    await expect(yourfeedPage.profileNameField).toContainText(userBuilder.username);
});
