import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { EditorArticlePage } from '../src/pages/editorArticlePage.js';
import { MainPage } from '../src/pages/mainPage.js';
import { RegisterPage } from '../src/pages/registerPage.js';
import { ArticlePage } from '../src/pages/articlePage.js';

const  URL_UI = 'https://realworld.qa.guru/';
const user = {
    username:  faker.person.firstName(),
    email:  faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
};

test.describe('Тесты Статьи', () => {

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();
        await registerPage.register(user.username, user.email, user.password);
    });

    test('simple', async ({page}) => {
        await page.getByRole('link', { name: 'New Article'}).click();
        
    });

    test('Пользователь может опубликовать статью', async ({ 
        page 
    }) => {
        const editorArticlePage = new EditorArticlePage(page);

        const article = {
            title:  faker.book.title() + '_ivandurian',
            description:  faker.lorem.paragraph(1),
            body: faker.lorem.paragraph(5),
            tags: 'реклама'
        };

        await editorArticlePage.open();
        await editorArticlePage.fillForm(article);
        await editorArticlePage.publish();

        await expect(editorArticlePage.header).toBeVisible();
        await expect(editorArticlePage.header).toContainText(article.title);
    })

    test('Пользователь может оставить комментарий к первой статье в Global Feed', async ({ 
        page 
    }) => {
        const articlePage = new ArticlePage(page);

        const comment = faker.lorem.sentence()

        await articlePage.open();
        await articlePage.addComment(comment);

        await expect(articlePage.card.locator('p.card-text')).toBeVisible();
        await expect(articlePage.card.locator('p.card-text')).toContainText(comment);
        await expect(articlePage.card.locator('a.comment-author').last()).toBeVisible();
        await expect(articlePage.card.locator('a.comment-author').last()).toContainText(user.username);
    })
});