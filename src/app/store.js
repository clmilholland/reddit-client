import { configureStore } from '@reduxjs/toolkit';
import gatherPostsReducer from '../features/gatherPosts/gatherPostsSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import searchbarReducer from '../components/searchbar/searchbarSlice';

const store = configureStore({
  reducer: {
    gatherPosts: gatherPostsReducer,
    userProfile: userProfileReducer,
    searchbar: searchbarReducer,
  },
});

export default store;