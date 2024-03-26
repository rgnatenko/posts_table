import { client } from '../../fetchClient';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

const getUsers = () => client.get<User[]>('users');

const getUser = (userId: number) => client.get<User>(`users/${userId}`);

const getUserPosts = (userId: number) => client.get<Post[]>(`users/${userId}/posts`);

export const usersApi = {
  getUser,
  getUsers,
  getUserPosts
};
