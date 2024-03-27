import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { initUsers } from '../../redux/features/users';
import { UsersList } from '../UsersList';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  const { users } = useUsers();

  return (
    <div className="header">
      <Link to="/create" className="primary-button header__create-btn">
        Create post
      </Link>

      <div className="header__filters">
        <div className="icon icon--search desktop-hidden" />

        <div className="header__input-area input-area mobile-hidden">
          <div className="icon icon--search input-area__icon" />

          <input
            type="text"
            className="input-area__input"
            placeholder="Search posts"
          />
        </div>

        <button
          className="header__dropdown dropdown"
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setIsOpen(false)}
        >
          Select user
          <div className="icon icon--down" />
        </button>

        {isOpen && <UsersList users={users}/>}
      </div>
    </div>
  );
};
