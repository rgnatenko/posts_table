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

const createPost = (post: Post) => {
  const postsFromStorage = usePostsFromStorage();

  postsFromStorage.unshift(post);

  setDataToStorage('posts', postsFromStorage);
};

export const postsInStorage = {
  deletePost,
  updatePost,
  createPost
};
