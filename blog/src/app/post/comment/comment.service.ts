import { Injectable } from '@angular/core';

import { User} from '../../user/user.model';
import { Comment} from './comment.model';

@Injectable()
export class CommentService {

    
    constructor() {}

    addCommentToStorage(comment:Comment){
        let comments = JSON.parse(localStorage.getItem("comments")) || [];

        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    };


    getLocalComments(): any{
        return JSON.parse(localStorage.getItem("comments")) || [];
    }
}
