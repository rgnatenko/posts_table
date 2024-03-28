import React from 'react';

type Props = {
  modifier: string,
  onClick: () => void
}

export const ButtonWithIcon: React.FC<Props> = ({ modifier, onClick }) => {
  return (
    <button
      className={`icon icon--${modifier}`}
      onClick={onClick}
    />
  );
};
