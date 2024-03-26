import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts';
import { usersReducer } from '../features/users';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
