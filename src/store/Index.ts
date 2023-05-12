import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


export default store;