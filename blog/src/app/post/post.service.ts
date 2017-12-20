import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { User} from '../user/user.model';
import { Post} from './post.model';

@Injectable()
export class PostService {

    // ====================================================
    // This service emulates post adding, editing, deleting
    // ====================================================




    constructor(private http: HttpClient) {}




    // getPosts():Promise<any> {
    //     return this.http.get('https://jsonplaceholder.typicode.com/posts')
    //     .toPromise()
    //     .then((res) => {
    //         return res;
    //     });
    // };





    addPostToStorage(post:Post){
        let posts = JSON.parse(localStorage.getItem("posts")) || [];

        posts.push(post);
        
        localStorage.setItem('posts', JSON.stringify(posts));

        console.log('success post adding, posts ---' + posts);

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
        console.log('success post editing');
    };


    deletePostFromStorage(title){

        let posts = JSON.parse(localStorage.getItem("posts"));
        let postForDeleting = this.getLocalPosts().findIndex(
            post =>  post.title === title);

        posts.splice(postForDeleting, 1);

        localStorage.setItem('posts', JSON.stringify(posts));
        console.log('success post deleting');
    };

}
