import { Injectable } from '@angular/core';

import { User} from '../user/user.model';
import { Post} from './post.model';

@Injectable()
export class PostService {

    constructor() {}


    addPostToStorage(post:Post){
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        posts.push(post);
        
        localStorage.setItem('posts', JSON.stringify(posts));
    };


    getLocalPosts(): any{
        return JSON.parse(localStorage.getItem("posts")) || [];
    }

    editPostOnStorage(title, post){
        let posts = JSON.parse(localStorage.getItem("posts"));

        let postForEditing = this.getLocalPosts().findIndex(
            post =>  post.title === title);

        posts[postForEditing] = post;

        localStorage.setItem('posts', JSON.stringify(posts));
    };


    deletePostFromStorage(title){

        let posts = JSON.parse(localStorage.getItem("posts"));
        let postForDeleting = this.getLocalPosts().findIndex(
            post =>  post.title === title);

        posts.splice(postForDeleting, 1);

        localStorage.setItem('posts', JSON.stringify(posts));
    };

}
