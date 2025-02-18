import { test, expect } from '@playwright/test';
import { ArticlePage, EditorArticlePage, MainPage, RegisterPage, YourfeedPage } from '../src/pages/index';
import { ArticleBuilder, UserBuilder, CommentBuilder } from '../src/helpers/builder/index';

const  URL_UI = 'https://realworld.qa.guru/';

const userBuilder = new UserBuilder()
    .addEmail()
    .addUsername()
    .addPassword()
    .generate();

test.describe('Тесты Статьи', () => {

    test.beforeEach(async ({ page }) => {
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.open(URL_UI);
        await mainPage.gotoRegister();

        await registerPage.register(userBuilder.username, userBuilder.email, userBuilder.password);
    });

    test('Пользователь может опубликовать статью', async ({page}) => {
        const editorArticlePage = new EditorArticlePage(page);
        const yourfeedPage = new YourfeedPage(page);

        const articleBuilder = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addBody()
            .addTags()
            .generate();

        await yourfeedPage.gotoNewArticle();
        await editorArticlePage.fillForm(articleBuilder);
        await editorArticlePage.publish();

        await expect(editorArticlePage.header).toBeVisible();
        await expect(editorArticlePage.header).toContainText(articleBuilder.title);
    })

    test('Пользователь может оставить комментарий к первой статье в Global Feed', async ({page}) => {
        const articlePage = new ArticlePage(page);
        const yourfeedPage = new YourfeedPage(page);

        const commentBuilder = new CommentBuilder()
            .addText()
            .generate();

        await yourfeedPage.openGlobalArticle();
        await articlePage.addComment(commentBuilder);

        await expect(articlePage.commentText).toBeVisible();
        await expect(articlePage.commentText).toContainText(commentBuilder);
        await expect(articlePage.commentAuthor).toBeVisible();
        await expect(articlePage.commentAuthor).toContainText(userBuilder.username);
    })

    test('Пользователь может оставить комментарий к своей статье', async ({page}) => {

        // создание статьи
        const editorArticlePage = new EditorArticlePage(page);
        const yourfeedPage = new YourfeedPage(page);

        const articleBuilder = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addBody()
            .addTags()
            .generate();

        await yourfeedPage.gotoNewArticle();
        await editorArticlePage.fillForm(articleBuilder);
        await editorArticlePage.publish();

        await expect(editorArticlePage.header).toBeVisible();
        await expect(editorArticlePage.header).toContainText(articleBuilder.title);

        // добавление комментария
        const articlePage = new ArticlePage(page);

        const commentBuilder = new CommentBuilder()
            .addText()
            .generate();

        await articlePage.addComment(commentBuilder);

        await expect(articlePage.commentText).toBeVisible();
        await expect(articlePage.commentText).toContainText(commentBuilder);
        await expect(articlePage.commentAuthor).toBeVisible();
        await expect(articlePage.commentAuthor).toContainText(userBuilder.username); 
    })
});