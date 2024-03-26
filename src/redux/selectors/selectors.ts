import { preparePosts } from '../../helpers/preparePosts';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { useAppSelector } from '../hooks';

export const usePosts = () => useAppSelector(state => state.posts);
export const useUsers = () => useAppSelector(state => state.users);

type PostArgs = {
  posts: Post[],
  users: User[]
}

export const usePostsOnThePage = ({ posts, users }: PostArgs) => {
  return preparePosts({
    posts,
    users
  });
};
