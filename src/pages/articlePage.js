export class ArticlePage {
    constructor(page){
        this.page = page;
        this.form = page.getByPlaceholder('Write a comment..');
        this.buttonPost = page.getByRole('button', { name: 'Post Comment' });
        this.card = page.locator('div.card').last();
        this.author = page.getByRole('link', { name: 'Ivan Durian' });
        this.buttonDelete = page.getByRole('button', { name: 'Delete Article' });
        this.buttonGlobalFeed = page.getByRole('button', { name: 'Global Feed' });
        this.linkFirstArticle = page.locator('a.preview-link').first();
    }   

    async addComment(body){
        await this.form.click();
        await this.form.fill(body);
        await this.buttonPost.click();
    }
    async open(){
        await this.buttonGlobalFeed.click();
        await this.linkFirstArticle.click();
    }
    
    async deleteArticle(){
        await this.buttonDelete.click();
    }

}