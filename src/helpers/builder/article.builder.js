import { faker } from '@faker-js/faker';

export class ArticleBuilder{

    addTitle(){
        this.title = faker.book.title() + '_ivandurian';
        return this;
    }
    
    addDescription(){
        this.description = faker.lorem.paragraph(1);
        return this;
    }

    addBody(){
        this.body = faker.lorem.paragraph(5);
        return this;
    }

    addTags(){
        this.tags ='реклама';
        return this;
    }

    generate(){
        return{
            title:  faker.book.title() + '_ivandurian',
            description:  faker.lorem.paragraph(1),
            body: faker.lorem.paragraph(5),
            tags: 'реклама'
        };
    }
};