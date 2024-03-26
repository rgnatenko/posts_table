import { Post } from './Post';
import { User } from './User';

export interface PostWithUser extends Post {
  user: User
}
