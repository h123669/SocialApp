import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { postReducer } from './PostsSlice';

export const store = configureStore({
  reducer: {
    authReducer,
    postReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['payload.headers'],  // تجاهل الـ headers في الـ payload
      },
    }),
});