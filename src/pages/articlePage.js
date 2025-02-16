export class ArticlePage {
    constructor(page){
        this.page = page;
        this.form = page.getByPlaceholder('Write a comment..');
        this.buttonPost = page.getByRole('button', { name: 'Post Comment' });
        this.card = page.locator('div.card').last();
        this.commentText = this.card.locator('p.card-text');
        this.commentAuthor = this.card.locator('a.comment-author').last();
        this.buttonDelete = page.getByRole('button', { name: 'Delete Article' });
        this.buttonEdit = page.getByRole('button', { name: 'Edit Article' });
    }   

    async addComment(body){
        await this.form.click();
        await this.form.fill(body);
        await this.buttonPost.click();
    }
    
    async deleteArticle(){
        await this.buttonDelete.click();
    }
}