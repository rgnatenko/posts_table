import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostState } from '../../../types/PostsState';
import { setLoadingAndError } from '../../../helpers/setLoadingAndError';
import { postsApi } from '../../../api/posts';
import { Post } from '../../../types/Post';
import { setDataToStorage } from '../../../helpers/setDataToStorage';
import { postsActions } from '../../../helpers/postsActions';
import { usePostsFromStorage } from '../../../helpers/usePostsFromStorage';

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: ''
};

export const initPosts = createAsyncThunk('posts/init', () => {
  return postsApi.getPosts();
});

export const getPost = createAsyncThunk('users/findById', (id: number) => {
  return postsApi.getPost(id);
});

export const createPost = createAsyncThunk('posts/create', ({ title, body }: Omit<Post, 'id' | 'userId'>) => {
  return postsApi.createPost({ title, body });
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost: (state, action: PayloadAction<Omit<Post, 'userId'>>) => {
      const postToUpdate = action.payload;

      state.posts = postsActions.updateItemInArray(state.posts, postToUpdate);
    },

    deletePost: (state, action: PayloadAction<Post>) => {
      const postToDelete = action.payload;

      state.posts = postsActions.deleteItemInArray(state.posts, postToDelete);
    }
  },

  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      const postsFromStorage: Post[] = (JSON.parse(localStorage.getItem('posts') as string));

      state.posts = action.payload;
      state.posts.unshift(...postsFromStorage);
    });

    builder.addCase(initPosts.rejected, state => {
      const error = 'Cannot load posts, please try again';

      setLoadingAndError(state, false, error);
    });

    builder.addCase(getPost.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      state.selectedPost = action.payload;
    });

    builder.addCase(getPost.rejected, state => {
      const error = 'Cannot load post, please try again';

      setLoadingAndError(state, false, error);
    });

    builder.addCase(createPost.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      const createdPost: Post = { ...action.payload, id: Math.random() };

      state.posts.unshift(createdPost);

      const postsFromStorage = usePostsFromStorage();
      postsFromStorage.unshift(createdPost);
      setDataToStorage('posts', postsFromStorage);
    });

    builder.addCase(createPost.rejected, state => {
      const error = 'Cannot load post, please try again';

      setLoadingAndError(state, false, error);
    });
  }
});

export const { updatePost, deletePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
