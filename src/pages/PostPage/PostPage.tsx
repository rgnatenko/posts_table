import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { usePosts, usePostsOnThePage, useUsers } from '../../redux/selectors';
import useQueryParam from '../../helpers/getQueryParam';
import { getPost } from '../../redux/features/posts';
import { getUser, getUserPosts, initUsers } from '../../redux/features/users';
import { Loader } from '../../components/Loader/Loader';
import { PostItem } from '../../components/PostItem';

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

  const { selectedPost } = usePosts();
  const postsLoading = usePosts().loading;
  const { user, users, userPosts, loading } = useUsers();

  const postsOnThePage = usePostsOnThePage({
    users,
    posts: userPosts
  });

  if (loading || postsLoading) {
    return <Loader />;
  }

  return (
    <div className="postpage">
      <Link
        to="/"
        className="postpage__back-link"
      >
        <div className="icon icon--back postpage__back-icon" />
        Back to home page
      </Link>
      <div className="postpage__userPost userPost">
        <div className="userPost__top">
          <div className="icon icon--user" />
          <p className="text-body userPost__name">{user?.username}</p>
        </div>

        <h3>{selectedPost?.title}</h3>

        <p className="text-body userPost__body">
          {selectedPost?.body}
        </p>
      </div>

      <div className="postpage__userPosts">
        <h4>{`See other ${user?.username}'s posts`}</h4>

        {users.length > 0 && userPosts.length > 0 && (
          postsOnThePage.map(post =>
            <PostItem
              key={post.id}
              post={post}
              user={post.user}
            />
          ))}
      </div>
    </div>
  );
};
