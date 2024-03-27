import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { normalizeTextLength } from '../../helpers/normalizeTextLength';
import { Link } from 'react-router-dom';
import { useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { deletePost, updatePost } from '../../redux/features/posts';
import { postsInStorage } from '../../helpers/postsInStorage';

type Props = {
  post: Post,
  user: User
};

export const PostItem: React.FC<Props> = ({ post, user }) => {
  const { users } = useUsers();
  const dispatch = useAppDispatch();

  const userOnServer = users.find(userOnServer => userOnServer.id === user.id);

  const normalizedTitle = normalizeTextLength(post.title, 5, '...');
  const normalizedBody = normalizeTextLength(post.body, 10, ' ');
  const initialBodyIsChanged = normalizedBody !== post.body;

  const [editingPosts, setEditingPosts] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);
  const [openedBody, setOpenedBody] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const removePostFromEditing = () => editingPosts.filter(id => id !== post.id);
  const postIsBeingEdited = editingPosts.includes(post.id);

  const handleDelete = () => {
    dispatch(deletePost(post));

    postsInStorage.deletePost(post);
  };

  const handleUpdate = () => {
    const postToUpdate = {
      ...post,
      title: newTitle,
      body: newBody
    };

    dispatch(updatePost(postToUpdate));

    postsInStorage.updatePost(postToUpdate);

    setEditingPosts(removePostFromEditing());
  };

  const cancel = () => {
    setEditingPosts(removePostFromEditing());
    setNewBody(post.body);
    setNewTitle(post.title);
  };

  const openBody = () => {
    if (initialBodyIsChanged) {
      setOpenedBody(!openedBody);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingPosts]);

  return (
    <div className={cn('posts__post post', {
      'post--opened': openedBody
    })}
    >
      <div className="post__top">
        <div className="post__userInfo">
          <div className="icon icon--user" />
          <p className="text-body post__userName">
            {user.username}
          </p>
        </div>

        {!userOnServer && (
          <div className="post__icons">
            <button
              className="icon icon--edit"
              onClick={() => setEditingPosts([...editingPosts, post.id])}
            />

            <button
              className="icon icon--delete"
              onClick={handleDelete}
            />
          </div>
        )}
      </div>

      {!editingPosts.length && (
        <h3 className="post__title">
          {normalizedTitle}
        </h3>
      )}

      {postIsBeingEdited && (
        <>
          <input
            type="text"
            ref={inputRef}
            className="post__input-title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />

          <textarea
            className="post__input-body"
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
          />

          <div className="post__buttons">
            <button
              className="post__btn post__btn--save"
              onClick={handleUpdate}
            >
              Save
            </button>

            <button
              className="post__btn post__btn--cancel"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {!userOnServer && !postIsBeingEdited &&
        <p
          className={cn('text-body post__body', {
            'post__body--opened': openedBody,
            'post__body--length-limited': initialBodyIsChanged
          })}
          onClick={openBody}
        >
          {!openedBody ? normalizedBody : post.body}
        </p>
      }

      {userOnServer && (
        <Link
          to={`/${post.id}?user=${user.id}`}
          className="post__bottom"
        >
          <h4 className="post__link">Read more</h4>
          <div className="icon icon--more post__icon" />
        </Link>
      )}
    </div>
  );
};
