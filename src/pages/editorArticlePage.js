export class EditorArticlePage {
    constructor(page){
        this.page = page;
        this.newArticleButton = page.getByRole('link', { name: 'New Article'});

        this.titleField = page.getByPlaceholder('Article Title');
        this.descriptionField = page.getByPlaceholder('What\'s this article about?');
        this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
        this.tagsField = page.getByPlaceholder('Enter tags');
    
        this.submitButton = page.getByRole('button', { name: 'Publish Article' });
        this.header = page.getByRole("heading", {level: 1});
    }   

    async fillForm(article){
        await this.titleField.click();
        await this.titleField.fill(article.title);
        //await page.getByPlaceholder('Article Title').fill(title);
        await this.descriptionField.click();
        await this.descriptionField.fill(article.description);
        await this.bodyField.click();
        await this.bodyField.fill(article.body);
        await this.tagsField.click();
        await this.tagsField.fill(article.tags);
    }

    async publish(){
        await this.submitButton.click();
    }
    
}
