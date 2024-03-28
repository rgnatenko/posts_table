import React from 'react';
import { usePosts, useUsers } from '../../redux/selectors';
import { UserTop } from '../../ui/UserTop';

export const UserPost: React.FC = () => {
  const { selectedPost } = usePosts();
  const { user } = useUsers();

  return (
    <div className="postpage__userPost userPost">
      <UserTop user={user} />

      <h3>{selectedPost?.title}</h3>

      <p className="text-body userPost__body">
        {selectedPost?.body}
      </p>
    </div>
  );
};
