import { Post } from './Post';

export interface PostState {
  posts: Post[],
  selectedPost: Post | null,
  loading: boolean,
  error: string
}
