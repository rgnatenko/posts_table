import React from 'react';
import { useUsers } from '../../redux/selectors';
import classNames from 'classnames';

type Props = {
  dropdownOpen: boolean,
  onClick: () => void
}

export const Dropdown: React.FC<Props> = ({ dropdownOpen, onClick }) => {
  const { selectedUser } = useUsers();

  return (
    <button
      className="header__dropdown dropdown"
      onClick={onClick}
    >
      {selectedUser ? selectedUser.username : 'Select User'}

      <div className={classNames('icon', {
        'icon--down': !dropdownOpen,
        'icon--up': dropdownOpen
      })}
      />
    </button>
  );
};
