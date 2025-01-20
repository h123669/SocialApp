import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { postReducer } from './PostsSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    postReducer
  },
});
