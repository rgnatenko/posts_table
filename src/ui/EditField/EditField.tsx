import React from 'react';

type Props = {
  inputRef?: React.MutableRefObject<HTMLInputElement | null>,
  fieldType: 'body' | 'title',
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const EditField: React.FC<Props> = ({ inputRef, fieldType, value, onChange }) => {
  if (fieldType === 'body') {
    return (
      <textarea
        className={`post__input-${fieldType}`}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <input
      type="text"
      ref={inputRef}
      className={`post__input-${fieldType}`}
      value={value}
      onChange={onChange}
    />
  );
};
