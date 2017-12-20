import { User } from '../user/user.model';
import { Comment } from './comment/comment.model';


export class Post{
    title: string;
    body: string;
    user: User;
    comments: Comment;
}
