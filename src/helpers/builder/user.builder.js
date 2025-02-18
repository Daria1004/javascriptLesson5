import { faker } from '@faker-js/faker';

export class UserBuilder{

    addUsername(){
        this.userName = faker.person.firstName();
        return this;
    }
    
    addEmail(){
        this.userEmail = faker.internet.email({ firstName: this.userName})
        return this;
    }

    addPassword(){
        this.userPassword = faker.internet.password({ length: 10 });
        return this;
    }

    addNewPassword(){
        this.userNewPassword = faker.internet.password({ length: 5 });
        return this;
    }

    getNewPassword(){
        return this.userNewPassword;
    }

    generate(){
        return{
            username: this.userName,
            email: this.userEmail,
            password: this.userPassword
        };
    }
};