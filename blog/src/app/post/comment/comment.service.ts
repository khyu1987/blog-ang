import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';

import { User} from '../../user/user.model';
import { Comment} from './comment.model';

@Injectable()
export class CommentService {

    // ====================================================
    // This service emulates comment adding, getting
    // ====================================================


    



    constructor() {}




    // getPosts():Promise<any> {
    //     return this.http.get('https://jsonplaceholder.typicode.com/posts')
    //     .toPromise()
    //     .then((res) => {
    //         return res;
    //     });
    // };

    



    addCommentToStorage(comment:Comment){
        let comments = JSON.parse(localStorage.getItem("comments")) || [];

        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        console.log('success comment adding, comments ---' + comments);

    };


    getLocalComments(): any{
        return JSON.parse(localStorage.getItem("comments")) || [];
    }

    // editPostOnStorage(id: number){
    //     console.log('success post editing');
    // };


    // deletePostFromStorage(id: number){
    //     console.log('success post deleting');

    // };





}
