import { client } from '../../fetchClient';
import { Post } from '../../types/Post';

const getPosts = () => client.get<Post[]>('posts');

const getPost = (id: number) => client.get<Post>(`posts/${id}`);

const createPost = ({ title, body }: Omit<Post, 'userId' | 'id'>) => {
  client.post<Post>('posts', { title, body });
};

const updatePost = ({ title, body }: Omit<Post, 'userId' | 'id'>) => {
  client.put<Post>('posts', { title, body });
};

const deletePost = (id: number) => client.delete<Post>(`posts/${id}`);

export const postsApi = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost
};
