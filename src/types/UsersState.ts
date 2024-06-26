import { Post } from './Post';
import { User } from './User';

export interface UsersState {
  users: User[],
  userPosts: Post[],
  user: User | null,
  usersLoading: boolean,
  error: string,
  selectedUser: User | null,
}
