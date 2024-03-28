import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { initUsers } from '../../redux/features/users';
import { UsersList } from '../UsersList';
import { setQuery } from '../../redux/features/posts';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  const { users } = useUsers();
  const { selectedUser } = useUsers();

  return (
    <div className="header">
      <Link to="/create" className="primary-button header__create-btn">
        Create post
      </Link>

      <div className="header__filters">
        <div className="header__input-area input-area">
          <div className="icon icon--search input-area__icon" />

          <input
            type="text"
            className="input-area__input"
            placeholder="Search posts"
            onChange={e => dispatch(setQuery(e.target.value))}
          />
        </div>

        <button
          className="header__dropdown dropdown"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedUser ? selectedUser.username : 'Select User'}

          <div className={classNames('icon', {
            'icon--down': !isOpen,
            'icon--up': isOpen
          })}
          />
        </button>

        {isOpen && <UsersList users={users} />}
      </div>
    </div>
  );
};
