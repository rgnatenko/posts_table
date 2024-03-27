import { Post } from '../types/Post';
import { postsActions } from './postsActions';
import { setDataToStorage } from './setDataToStorage';
import { usePostsFromStorage } from './usePostsFromStorage';

const deletePost = (post: Post) => {
  const postsFromStorage = usePostsFromStorage();
  const postsToSet = postsActions.deleteItemInArray(postsFromStorage, post);

  setDataToStorage('posts', postsToSet);
};

const updatePost = (post: Post) => {
  const postsFromStorage = usePostsFromStorage();
  const postsToSet = postsActions.updateItemInArray(postsFromStorage, post);

  setDataToStorage('posts', postsToSet);
};

export const postsInStorage = {
  deletePost,
  updatePost,
};
