import React, { useEffect } from 'react';
import { initPosts } from '../../redux/features/posts';
import { initUsers } from '../../redux/features/users';
import { PostList } from '../../components/PostList';
import { usePosts, usePostsOnThePage, useUsers } from '../../redux/selectors';
import { useAppDispatch } from '../../redux/hooks';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = usePosts();
  const { users } = useUsers();

  useEffect(() => {
    dispatch(initPosts());
    dispatch(initUsers());
  }, []);

  const dataIsLoaded = !loading && posts.length && users.length;

  return (
    <>
      {dataIsLoaded && (
        <PostList posts={usePostsOnThePage({
          posts,
          users
        })}
        />
      )}
    </>
  );
};