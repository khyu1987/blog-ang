import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { User} from '../user/user.model';
import { UserService } from '../user/user.service';

import { Post } from '../post/post.model';
import { PostService } from '../post/post.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PostService, UserService]
})
export class AdminComponent implements OnInit {

  currentUser: User;
  localPosts: Post[];
  @Input() user_posts: Post[] = [];
  postForm: FormGroup;
  editForm: FormGroup;
  editing_post:boolean = false;
  editing_post_old_title:string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private postService: PostService
    ) {}

  ngOnInit() {

    this.currentUser = this.userService.getCurrentUser() || null;
    this.localPosts = this.postService.getLocalPosts() || [];

    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }

    if (this.localPosts){

      this.user_posts = this.localPosts.filter(
        post => post.user.email === this.currentUser.email);
    }

    console.log('user posts  - - -'+this.user_posts);

    this.buildPostForm();
    this.buildEditForm();

  }


  showEditingForm(title){
    this.editing_post = true;
    this.editing_post_old_title = title;

    let postForEdit = this.user_posts.filter(
      post => post.title === title);

    this.editForm.setValue({
      title: postForEdit[0].title  || '',
      body:  postForEdit[0].body   || ''
    });

  }


  addPost(){
    let new_post: Post = new Post
    new_post.body = this.postForm.get('body').value;
    new_post.title = this.postForm.get('title').value;
    new_post.user = this.currentUser;

    this.postService.addPostToStorage(new_post);

    this.user_posts = this.postService.getLocalPosts().filter(
      post => post.user.email === this.currentUser.email);
  }

  editPost(){

    let edit_post = new Post;

    edit_post.title = this.editForm.get('title').value;
    edit_post.body = this.editForm.get('body').value;
    edit_post.user = this.currentUser;


    this.postService.editPostOnStorage(this.editing_post_old_title, edit_post);

    this.editing_post = false;

    this.user_posts = this.postService.getLocalPosts().filter(
      post => post.user.email === this.currentUser.email);

  }

  deletePost(title){
    this.postService.deletePostFromStorage(title);

    this.user_posts = this.postService.getLocalPosts().filter(
      post => post.user.email === this.currentUser.email);
  }


  buildPostForm(){
    this.postForm = this.fb.group({
      'title':['', [
      Validators.required,
      Validators.maxLength(20)
      ]],
      'body': ['', [
      Validators.required,
      Validators.maxLength(100)
      ]]
    })
  }

  buildEditForm(){
    this.editForm = this.fb.group({
      'title':['', [
      Validators.required,
      Validators.maxLength(20)
      ]],
      'body': ['', [
      Validators.required,
      Validators.maxLength(100)
      ]]
    })
  }
}
