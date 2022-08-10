import { Repository, } from './repository.js';
import { RepositoryInMemoryImpl } from './repository.js';
import { IdType } from "./shared-types.js";
export interface User {
    tags: any;
    id:number;
    username:string;
    password:string;
   firstName:string;
   lastName:string;
   gender:string;
   role:string;
   imageUrl: string;
   description:string;
   status:string;
 }

export class UserData{
    constructor(
        public id: number,
       public username:string,
       public password:string,
       public firstName:string,
       public lastName:string,
       public gender:string,
       public role:string,
       public imageUrl: string,
       public description:string,
       public status:string,
    )
     {
        // super(username, password, firstName, imageUrl, lastName , status, gender, description, role, );
    }
}


export interface UserRepository extends Repository<IdType, User> {
    findByTags(searachTags: string[]): User[];
    findByTitlePart(titlePart: string): User[];
    findByAuthorId(authorId: IdType): User[];
}

export class UserRepositoryImpl extends RepositoryInMemoryImpl<IdType, User> implements UserRepository {
    findByTags(searachTags: string[]): User[] {
        return this.findAll().filter(user => user.tags.some(tag => searachTags.includes(tag)));
    }
    findByTitlePart(titlePart: string): User[] {
        return this.findAll().filter(user => user.username.includes(titlePart));
    }
    findByAuthorId(authorId: number): User[] {
        return this.findAll().filter(user => user.id === authorId);
    }
}


