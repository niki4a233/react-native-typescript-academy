import { Post } from "./posts.js";
import { ValidationConfig, Validators } from "./validate.js";

export interface AppState {
    editedPost: Post | undefined;
    allPosts: Post[],
    postFormValidationConfig: ValidationConfig<Post>,
    postFormErrors: string[]
}

export const AppStateStore: AppState = {
    editedPost: undefined,
    allPosts: [],   
    postFormValidationConfig: {
       
       
        title: [Validators.required(),Validators.len(3, 10)],
        authorId: [Validators.required(),Validators.pattern( new RegExp("[0-9]+"))] ,
        content: [Validators.required(),Validators.len(5, 50)],
        imageUrl: Validators.required(),
        tags: Validators.required()


        
    },
    postFormErrors: []
}