import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UsersState } from '../../../types/UsersState';
import { setLoadingAndError } from '../../../helpers/setLoadingAndError';
import { usersApi } from '../../../api/users';
import { User } from '../../../types/User';

const initialState: UsersState = {
  users: [],
  userPosts: [],
  user: null,
  loading: false,
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
    builder.addCase(initUsers.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      state.users = action.payload;
    });

    builder.addCase(initUsers.rejected, state => {
      const error = 'Cannot load user';

      setLoadingAndError(state, false, error);
    });

    builder.addCase(getUserPosts.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      state.userPosts = action.payload;
    });

    builder.addCase(getUserPosts.rejected, state => {
      const error = 'Cannot load user posts';

      setLoadingAndError(state, false, error);
    });

    builder.addCase(getUser.pending, state => {
      setLoadingAndError(state, true, '');
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');
      const user = action.payload;

      state.user = user;
    });

    builder.addCase(getUser.rejected, state => {
      const error = 'Cannot find user';

      setLoadingAndError(state, false, error);
    });
  }
});

export const { setSelectedUser } = userSlice.actions;

export const usersReducer = userSlice.reducer;
