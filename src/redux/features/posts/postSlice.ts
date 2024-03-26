import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostState } from '../../../types/PostsState';
import { setLoadingAndError } from '../../../helpers/setLoadingAndError';
import { postsApi } from '../../../api/posts';


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

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(initPosts.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      state.posts = action.payload;
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
  }
});

export const postsReducer = postsSlice.reducer;
