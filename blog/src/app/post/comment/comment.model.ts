import { User } from '../../user/user.model';
import { Post } from '../../post/post.model';


export class Comment{
    body: string;
    user: User;
    post: Post;
}
