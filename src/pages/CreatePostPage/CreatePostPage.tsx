import React from 'react';
import { CreateForm } from '../../components/CreateForm';
import { BackLink } from '../../ui/BackLink';

export const CreatePostPage: React.FC = () => {
  return (
    <div className="create-page">
      <BackLink />

      <CreateForm />
    </div>
  );
};
