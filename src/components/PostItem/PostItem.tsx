import React from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { normalizeTextLength } from '../../helpers/normalizeTextLength';
import { Link } from 'react-router-dom';

type Props = {
  post: Post,
  user: User
};

export const PostItem: React.FC<Props> = ({ post, user }) => {
  return (
    <div className="posts__post post">
      <div className="post__userInfo">
        <div className="icon icon--user" />
        <p className="text-body post__userName">
          {user.username}
        </p>
      </div>

      <h3 className="post__title">
        {normalizeTextLength(post.title)}
      </h3>

      <Link
        to={`/${post.id}?user=${user.id}`}
        className="post__bottom"
      >
        <h4 className="post__link">Read more</h4>

        <div className="icon icon--more post__icon" />
      </Link>
    </div>
  );
};
