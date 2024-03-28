import React from 'react';
import { User } from '../../types/User';
import { useAppDispatch } from '../../redux/hooks';
import { setSelectedUser } from '../../redux/features/users';

type Props = {
  user: User
}

export const UserButton: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      key={user.name}
      className="users__user user"
      onClick={() => dispatch(setSelectedUser(user))}
    >
      {user.username}
    </button>
  );
};
