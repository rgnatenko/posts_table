import React from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Link } from 'react-router-dom';

type Props = {
  post: Post,
  user: User
}

export const ReadMore: React.FC<Props> = ({ post, user }) => {
  return (
    <Link
      to={`/${post.id}?user=${user.id}`}
      className="post__bottom"
    >
      <h4 className="post__link">Read more</h4>
      <div className="icon icon--more post__icon" />
    </Link>
  );
};
