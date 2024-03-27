import { User } from '../types/User';

export const generateId = (users: User[]) => {
  const ids = users.map(user => user.id);

  return Math.max(...ids) + 1;
};
