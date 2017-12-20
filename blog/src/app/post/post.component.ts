import { Component, OnInit, Input } from '@angular/core';

import { PostService } from './post.service';
import { Post } from './post.model';

import { User} from '../user/user.model';
import { UserService } from '../user/user.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService, UserService]
})
export class PostComponent implements OnInit {

  @Input() posts: Post[];

  constructor(private postService: PostService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    if (!this.userService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }

    this.posts = this.postService.getLocalPosts();
    
  }
}
