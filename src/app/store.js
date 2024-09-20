import { configureStore } from '@reduxjs/toolkit';
import gatherPostsReducer from '../features/gatherPosts/gatherPostsSlice';
import userProfileReducer from '../features/userProfile/userProfileSlice';
import searchbarReducer from '../components/searchbar/searchbarSlice';
import postCommentsReducer from '../features/gatherPostComments/gatherPostCommentsSlice';
import gatherHeaderReducer from '../features/gatherSubredditHeader/gatherSubredditHeaderSlice';

const store = configureStore({
  reducer: {
    gatherPosts: gatherPostsReducer,
    userProfile: userProfileReducer,
    searchbar: searchbarReducer,
    postComments: postCommentsReducer,
    gatherHeader: gatherHeaderReducer
  },
});

export default store;