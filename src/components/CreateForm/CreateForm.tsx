import React, { useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../redux/hooks';
import { createPost } from '../../redux/features/posts';
import { useNavigate } from 'react-router-dom';

export const CreateForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title) {
      setError('Title is not entered');

      return;
    }

    if (!body) {
      setError('Body is not entered');

      return;
    }

    dispatch(createPost({ title, body }));

    navigate('/');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError('');
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    setError('');
  };

  return (
    <div className="create-page__create-form create-form">
      <input
        type="text"
        className={cn('create-form__field create-form__field--title', {
          'create-form__field--error': error
        })}
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />

      <textarea
        className={cn('create-form__field create-form__field--body', {
          'create-form__field--error': error
        })}
        placeholder="Body"
        value={body}
        onChange={handleBodyChange}
      />

      {error &&
        <p className="create-form__error">
          {error}
        </p>
      }

      <button
        className="create-form__create-btn"
        onClick={handleSubmit}
      >
        Post
      </button>
    </div>
  );
};
