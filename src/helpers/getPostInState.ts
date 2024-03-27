import { Post } from '../types/Post';

export const getPostInState = (id: number, posts: Post[]) => {
  return posts.find(post => post.id === id) as Post;
};
