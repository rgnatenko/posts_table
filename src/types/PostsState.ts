import { Post } from './Post';

export interface PostState {
  posts: Post[],
  selectedPost: Post | null,
  postsLoading: boolean,
  error: string,
  query: string
}
