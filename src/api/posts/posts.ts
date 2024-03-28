import { client } from '../../fetchClient';
import { Post } from '../../types/Post';

const getPosts = () => client.get<Post[]>('posts');

const getPost = (id: number) => client.get<Post>(`posts/${id}`);

const createPost = ({ title, body }: Omit<Post, 'userId' | 'id'>) => {
  return client.post<Post>('posts', { title, body });
};

export const postsApi = {
  getPost,
  getPosts,
  createPost,
};
