import { configureStore } from '@reduxjs/toolkit';
import postPreviewReducer from '../features/postPreviews/postPreviewSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';

export const store = configureStore({
  reducer: {
    postPreview: postPreviewReducer,
    userProfile: userProfileReducer,
  },
});
