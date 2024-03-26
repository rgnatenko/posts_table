import { PostState } from '../types/PostsState';
import { UsersState } from '../types/UsersState';

export const setLoadingAndError = (
  state: PostState | UsersState,
  stateLoading: boolean,
  stateError: string
) => {
  state.loading = stateLoading;
  state.error = stateError;
};
