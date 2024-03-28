import React from 'react';

type Props = {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="input-area__input"
      placeholder="Search posts"
      value={value}
      onChange={onChange}
    />
  );
};
