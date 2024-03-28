import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PostState } from '../../../types/PostsState';
import { postsApi } from '../../../api/posts';
import { Post } from '../../../types/Post';
import { setDataToStorage } from '../../../helpers/setDataToStorage';
import { postsActions } from '../../../helpers/postsActions';
import { usePostsFromStorage } from '../../../helpers/usePostsFromStorage';

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  postsLoading: false,
  error: '',
  query: ''
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
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    const setLoadingAndError = (
      state: PostState,
      stateLoading: boolean,
      stateError: string
    ) => {
      state.postsLoading = stateLoading;
      state.error = stateError;
    };

    const onPending = (state: PostState, ) => setLoadingAndError(state, true, '');
    const onFulfilled = (state: PostState, ) => setLoadingAndError(state, false, '');
    const onRejected = (state: PostState, error: string) => setLoadingAndError(state, false, error);

    builder.addCase(initPosts.pending, (state) => {
      onPending(state);
    });

    builder.addCase(initPosts.fulfilled, (state, action) => {
      onFulfilled(state);

      state.posts = action.payload;
      state.posts.unshift(...usePostsFromStorage());
    });

    builder.addCase(initPosts.rejected, (state) => {
      const error = 'Cannot load posts, please try again';

      onRejected(state, error);
    });

    builder.addCase(getPost.pending, (state) => {
      onPending(state);
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      onFulfilled(state);

      state.selectedPost = action.payload;
    });

    builder.addCase(getPost.rejected, (state) => {
      const error = 'Cannot load post, please try again';

      onRejected(state, error);
    });

    builder.addCase(createPost.pending, (state) => {
      onPending(state);
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      onFulfilled(state);

      const createdPost: Post = { ...action.payload, id: Math.random() };

      state.posts.unshift(createdPost);

      const postsFromStorage = usePostsFromStorage();
      postsFromStorage.unshift(createdPost);
      setDataToStorage('posts', postsFromStorage);
    });

    builder.addCase(createPost.rejected, (state) => {
      const error = 'Cannot load post, please try again';

      onRejected(state, error);
    });
  }
});

export const { updatePost, deletePost, setQuery } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
