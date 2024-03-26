import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User
};

export const UserItem: React.FC<Props> = ({ user }) => {
  return (
    <button key={user.name} className="users__user user">
      {user.username}
    </button>
  );
};
