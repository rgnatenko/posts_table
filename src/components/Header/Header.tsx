import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts, useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { initUsers } from '../../redux/features/users';
import { UsersList } from '../UsersList';
import { setQuery } from '../../redux/features/posts';
import { SearchInput } from '../../ui/SearchInput';
import { Dropdown } from '../../ui/Dropdown/Dropdown';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { query } = usePosts();

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
        <div className="header__input-area input-area">
          <div className="icon icon--search input-area__icon" />

          <SearchInput
            value={query}
            onChange={e => dispatch(setQuery(e.target.value))}
          />
        </div>

        <Dropdown dropdownOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

        {isOpen && <UsersList users={users} />}
      </div>
    </div>
  );
};
