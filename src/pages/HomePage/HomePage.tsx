import React, { useEffect } from 'react';
import { initPosts } from '../../redux/features/posts';
import { initUsers } from '../../redux/features/users';
import { PostList } from '../../components/PostList';
import { usePosts, usePostsOnThePage, useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';
import { Loader } from '../../components/Loader/Loader';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, postsLoading, query } = usePosts();
  const { users, selectedUser } = useUsers();

  useEffect(() => {
    dispatch(initPosts());
    dispatch(initUsers());
  }, []);

  const dataIsLoaded = !postsLoading && posts.length > 0 && users.length > 0;

  if (postsLoading) {
    return <Loader />;
  }

  return (
    <>
      {dataIsLoaded && (
        <PostList posts={usePostsOnThePage({
          posts,
          users,
          selectedUser,
          query
        })}
        />
      )}
    </>
  );
};
