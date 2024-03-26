import React from 'react';
import { PostItem } from '../PostItem/PostItem';
import { PostWithUser } from '../../types/PostWithUser';

type Props = {
  posts: PostWithUser[]
};

export const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="posts">
      {posts.map(post =>
        <PostItem
          key={post.title}
          post={post}
          user={post.user}
        />
      )}
    </div>
  );
};
