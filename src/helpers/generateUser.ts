import { User } from '../types/User';
import { generateId } from './generateId';

export const generateUser = (users: User[]): User => {
  return {
    username: `user${generateId(users)}`,
    name: 'Anonymus',
    id: generateId(users),
    email: '',
    phone: String(Math.random())
  };
};
