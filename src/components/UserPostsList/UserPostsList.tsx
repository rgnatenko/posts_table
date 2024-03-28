import React from 'react';
import { usePosts, usePostsOnThePage, useUsers } from '../../redux/selectors';
import { PostItem } from '../PostItem';


export const UserPostsList: React.FC = () => {
  const { users, userPosts, user, selectedUser } = useUsers();
  const { query } = usePosts();

  const postsOnThePage = usePostsOnThePage({
    users,
    posts: userPosts,
    selectedUser,
    query
  });

  return (
    <>
      {users.length > 0 && userPosts.length > 0 && (
        <div className="postpage__userPosts">
          <h4>{`See other ${user?.username}'s posts`}</h4>

          {
            postsOnThePage.map(post =>
              <PostItem
                key={post.id}
                post={post}
                user={post.user}
              />
            )}
        </div>
      )}
    </>
  );
};
