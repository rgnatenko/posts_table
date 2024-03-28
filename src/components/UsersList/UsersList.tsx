import React from 'react';
import { User } from '../../types/User';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedUser } from '../../redux/features/users';
import { UserButton } from '../../ui/UserButton';

type Props = {
  users: User[]
};

export const UsersList: React.FC<Props> = ({ users }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="header__users users">
      <button
        className="users_user user"
        onClick={() => dispatch(setSelectedUser(null))}
      >
        None
      </button>

      {users.map(user => (
        <UserButton key={user.id} user={user} />
      ))}
    </div>
  );
};
