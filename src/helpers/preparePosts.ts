import { Post } from '../types/Post';
import { PostWithUser } from '../types/PostWithUser';
import { User } from '../types/User';

interface Args {
  posts: Post[],
  users: User[]
}

type PreparePosts = (arg: Args) => PostWithUser[]

export const preparePosts: PreparePosts = ({ posts, users }) => {
  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) as User
  }));
};
