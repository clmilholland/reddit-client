import { configureStore } from '@reduxjs/toolkit';
import gatherPostsReducer from '../features/gatherPosts/gatherPostsSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';

const store = configureStore({
  reducer: {
    gatherPosts: gatherPostsReducer,
    userProfile: userProfileReducer,
  },
});

export default store;