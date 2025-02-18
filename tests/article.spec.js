import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { EditorArticlePage } from '../src/pages/editorArticlePage.js';
import { MainPage } from '../src/pages/mainPage.js';
import { RegisterPage } from '../src/pages/registerPage.js';
import { ArticlePage } from '../src/pages/articlePage.js';
import { YourfeedPage } from '../src/pages/yourfeedPage.js';

const URL_UI = 'https://realworld.qa.guru/';
const user = {
    username: faker.person.firstName(),
    email: faker.internet.email(),
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


    test('Пользователь может опубликовать статью', async ({page}) => {
        const editorArticlePage = new EditorArticlePage(page);
        const yourfeedPage = new YourfeedPage(page);

        const article = {
            title: faker.book.title() + '_ivandurian',
            description: faker.lorem.paragraph(1),
            body: faker.lorem.paragraph(5),
            tags: 'реклама'
        };

        await yourfeedPage.gotoNewArticle();
        await editorArticlePage.fillForm(article);
        await editorArticlePage.publish();

        await expect(editorArticlePage.header).toBeVisible();
        await expect(editorArticlePage.header).toContainText(article.title);
    });

    test('Пользователь может оставить комментарий к первой статье в Global Feed', async ({page}) => {
        const articlePage = new ArticlePage(page);
        const yourfeedPage = new YourfeedPage(page);

        const comment = faker.lorem.sentence();

        await yourfeedPage.openGlobalArticle();
        await articlePage.addComment(comment);

        await expect(articlePage.commentText).toBeVisible();
        await expect(articlePage.commentText).toContainText(comment);
        await expect(articlePage.commentAuthor).toBeVisible();
        await expect(articlePage.commentAuthor).toContainText(user.username);
    });

    test('Пользователь может оставить комментарий к своей статье', async ({page}) => {

        // создание статьи
        const editorArticlePage = new EditorArticlePage(page);
        const yourfeedPage = new YourfeedPage(page);

        const article = {
            title: faker.book.title() + '_ivandurian',
            description: faker.lorem.paragraph(1),
            body: faker.lorem.paragraph(5),
            tags: 'реклама'
        };

        await yourfeedPage.gotoNewArticle();
        await editorArticlePage.fillForm(article);
        await editorArticlePage.publish();

        await expect(editorArticlePage.header).toBeVisible();
        await expect(editorArticlePage.header).toContainText(article.title);

        // добавление комментария
        const articlePage = new ArticlePage(page);

        const comment = faker.lorem.sentence();

        await articlePage.addComment(comment);

        await expect(articlePage.commentText).toBeVisible();
        await expect(articlePage.commentText).toContainText(comment);
        await expect(articlePage.commentAuthor).toBeVisible();
        await expect(articlePage.commentAuthor).toContainText(user.username);
    });
});