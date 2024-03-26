import React from 'react';
import { User } from '../../types/User';

type Props = {
  users: User[]
};

export const UsersList: React.FC<Props> = ({ users }) => {
  return (
    <div className="header__users users">
      {users.map(user => (
        <div key={user.name} className="users__user user">
          {user.username}
        </div>
      ))}
    </div>
  );
};
