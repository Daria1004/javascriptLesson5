import { faker } from '@faker-js/faker';

export class CommentBuilder{

    addText(){
        this.text = faker.lorem.sentence();
        return this;
    }

    generate(){
        return this.text;
    }
};    