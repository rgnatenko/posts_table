//#region IMPORTS
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { normalizeTextLength } from '../../helpers/normalizeTextLength';
import { useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { deletePost, updatePost } from '../../redux/features/posts';
import { postsInStorage } from '../../helpers/postsInStorage';
import { ButtonWithIcon } from '../../ui/ButtonWithIcon';
import { UserTop } from '../../ui/UserTop';
import { EditField } from '../../ui/EditField';
import { ReadMore } from '../../ui/ReadMore';
//#endregion

type Props = {
  post: Post,
  user: User
};

export const PostItem: React.FC<Props> = ({ post, user }) => {
  const dispatch = useAppDispatch();
  const { users } = useUsers();

  const userOnServer = users.find(userOnServer => userOnServer.id === user.id);

  const normalizedTitle = normalizeTextLength(post.title, 5, '...');
  const normalizedBody = normalizeTextLength(post.body, 10, ' ');

  const [editingPosts, setEditingPosts] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);
  const [openedBody, setOpenedBody] = useState(false);

  const titleHasChanged = post.title !== newTitle;
  const bodyHasChanged = post.body !== newBody;
  const initialBodyIsChanged = normalizedBody !== post.body;

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
        <UserTop user={user} />

        {!userOnServer && (
          <div className="post__icons">
            <ButtonWithIcon
              modifier="edit"
              onClick={() => setEditingPosts([...editingPosts, post.id])}
            />

            <ButtonWithIcon
              modifier="delete"
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
          <EditField
            inputRef={inputRef}
            fieldType="title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />

          <EditField
            fieldType="body"
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
          />

          <div className="post__buttons">
            <button
              className={cn('post__btn', {
                'post__btn--disabled': !bodyHasChanged && !titleHasChanged
              })}
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

      {userOnServer && <ReadMore post={post} user={user}/> }
    </div>
  );
};
