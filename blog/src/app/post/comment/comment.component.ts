import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

import { Comment } from './comment.model';
import { CommentService } from './comment.service';

import { Post } from '../../post/post.model';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [ UserService, CommentService ],

})
export class CommentComponent implements OnInit {


    currentUser: User;
    @Input() currentPost: Post;
    commentForm: FormGroup;
    addingComment: boolean = false;
    @Input() comments: Comment[];
    new_comment: Comment;




    constructor(private fb: FormBuilder,
                private userService: UserService,
                private commentService: CommentService) { }

    ngOnInit() {
        this.currentUser = this.userService.getCurrentUser();

        this.comments = this.commentService.getLocalComments().filter(
          comment => comment.post.title === this.currentPost.title) || [];

        this.buildCommentForm();
    }

    buildCommentForm(){
        this.commentForm = this.fb.group({
            'comment':['', [
            Validators.required,
            Validators.maxLength(100)
            ]]
        })
    } 

    addComment(){
        this.new_comment = new Comment;
        this.new_comment.user = this.currentUser;
        this.new_comment.body = this.commentForm.get('comment').value;
        this.new_comment.post = this.currentPost;

        this.commentService.addCommentToStorage(this.new_comment);
 
        this.comments = this.commentService.getLocalComments().filter(
          comment => comment.post.title === this.currentPost.title);
    }

    showCommentInput(){
    this.addingComment = true;
  }

}
