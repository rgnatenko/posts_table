import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UsersState } from '../../../types/UsersState';
import { usersApi } from '../../../api/users';
import { User } from '../../../types/User';

const initialState: UsersState = {
  users: [],
  userPosts: [],
  user: null,
  usersLoading: false,
  error: '',
  selectedUser: null
};

export const initUsers = createAsyncThunk('users/init', () => {
  return usersApi.getUsers();
});

export const getUserPosts = createAsyncThunk('users/getPosts', (userId: number) => {
  return usersApi.getUserPosts(userId);
});

export const getUser = createAsyncThunk('users/getUser', (userId: number) => {
  return usersApi.getUser(userId);
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    }
  },

  extraReducers: (builder) => {
    const setLoadingAndError = (
      state: UsersState,
      stateLoading: boolean,
      stateError: string
    ) => {
      state.usersLoading = stateLoading;
      state.error = stateError;
    };

    const onPending = (state: UsersState) => setLoadingAndError(state, true, '');
    const onFulfilled = (state: UsersState) => setLoadingAndError(state, false, '');
    const onRejected = (state: UsersState, error: string) => setLoadingAndError(state, false, error);

    builder.addCase(initUsers.pending, (state) => {
      onPending(state);
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      onFulfilled(state);

      state.users = action.payload;
    });

    builder.addCase(initUsers.rejected, (state) => {
      const error = 'Cannot load user';

      onRejected(state, error);
    });

    builder.addCase(getUserPosts.pending, (state) => {
      onPending(state);
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      onFulfilled(state);

      state.userPosts = action.payload;
    });

    builder.addCase(getUserPosts.rejected, (state) => {
      const error = 'Cannot load user posts';

      onRejected(state, error);
    });

    builder.addCase(getUser.pending, (state) => {
      onPending(state);
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      onFulfilled(state);

      const user = action.payload;

      state.user = user;
    });

    builder.addCase(getUser.rejected, (state) => {
      const error = 'Cannot find user';

      onRejected(state, error);
    });
  }
});

export const { setSelectedUser } = userSlice.actions;

export const usersReducer = userSlice.reducer;
