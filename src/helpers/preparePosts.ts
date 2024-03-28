import { Post } from '../types/Post';
import { PostWithUser } from '../types/PostWithUser';
import { User } from '../types/User';
import { generateUser } from './generateUser';
import { normalizeString } from './normalizeString';

interface Args {
  posts: Post[],
  users: User[],
  selectedUser: User | null,
  query: string
}

type PreparePosts = (arg: Args) => PostWithUser[]

export const preparePosts: PreparePosts = ({
  posts,
  users,
  selectedUser,
  query
}) => {
  const notRegisteredUser = generateUser(users);

  const preparedPosts = posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId) || notRegisteredUser
  }));

  return preparedPosts.filter(post => {
    if (query) {
      const normalizedTitle = normalizeString(post.title);
      const normalizedBody = normalizeString(post.body);
      const normalizedQuery = normalizeString(query);

      return normalizedTitle.includes(normalizedQuery)
        || normalizedBody.includes(normalizedQuery);
    }

    if (selectedUser) {
      return post.userId === selectedUser.id;
    }

    return post;
  });
};
