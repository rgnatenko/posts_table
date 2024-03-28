import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { usePosts, useUsers } from '../../redux/selectors';
import useQueryParam from '../../helpers/getQueryParam';
import { getPost } from '../../redux/features/posts';
import { getUser, getUserPosts, initUsers } from '../../redux/features/users';
import { Loader } from '../../components/Loader/Loader';
import { BackLink } from '../../ui/BackLink';
import { UserPost } from '../../components/UserPost';
import { UserPostsList } from '../../components/UserPostsList/UserPostsList';

export const PostPage: React.FC = () => {
  const { id } = useParams();
  const idToSet = Number(id);
  const userId = Number(useQueryParam('user'));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPost(idToSet));

    dispatch(getUser(userId));
    dispatch(getUserPosts(userId));
    dispatch(initUsers());
  }, [idToSet, userId]);

  const { postsLoading } = usePosts();
  const { usersLoading } = useUsers();


  if (usersLoading || postsLoading) {
    return <Loader />;
  }

  return (
    <div className="postpage">
      <BackLink />

      <UserPost />

      <UserPostsList />
    </div>
  );
};
