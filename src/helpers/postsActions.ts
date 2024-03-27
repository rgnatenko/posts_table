import { Post } from '../types/Post';

const updateItemInArray = (postsArray: Post[], postToUpdate: Omit<Post, 'userId'>) => {
  return postsArray.map(post => (
    post.id === postToUpdate.id
      ? { ...postToUpdate, userId: post.userId }
      : post
  ));
};

const deleteItemInArray = (postsArray: Post[], postToDelete: Post) => {
  return postsArray.filter(post => post.id !== postToDelete.id);
};

export const postsActions = {
  updateItemInArray,
  deleteItemInArray,
};
