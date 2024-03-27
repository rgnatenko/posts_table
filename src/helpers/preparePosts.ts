import { Post } from '../types/Post';
import { PostWithUser } from '../types/PostWithUser';
import { User } from '../types/User';
import { generateUser } from './generateUser';

interface Args {
  posts: Post[],
  users: User[]
}

type PreparePosts = (arg: Args) => PostWithUser[]

export const preparePosts: PreparePosts = ({ posts, users }) => {
  const notRegisteredUser = generateUser(users);

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) || notRegisteredUser
  }));
};
