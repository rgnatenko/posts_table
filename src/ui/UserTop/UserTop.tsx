import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null
}

export const UserTop: React.FC<Props> = ({ user }) => {
  return (
    <div className="userPost__top">
      <div className="icon icon--user" />
      <p className="text-body userPost__name">{user?.username}</p>
    </div>
  );
};
