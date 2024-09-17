import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const loadAllPosts = createAsyncThunk(
    'postPreviews/loadAllPosts',
    async (searchbar) => {
        let data;
        if (searchbar === ''){
             data = await fetch(`https://www.reddit.com/r/popular/.json`);
        } else {
            data = await fetch(`https://www.reddit.com/r/${searchbar}/.json`);
        }
        const response = await data.json();
        return response;
    }
);
    
const gatherPostsSlice = createSlice({
    name: 'gatherPosts',
    initialState: {
        posts: [],
        isPending: false,
        hasError: false
    },
    extraReducers: {
        [loadAllPosts.pending]: (state) => {
            state.isPending = true;
            state.hasError = false;
        },
        [loadAllPosts.fulfilled]: (state, action) => {
            state.isPending = false;
            state.hasError = false;
            const data = action.payload?.data;
            if (data && Array.isArray(data.children)) {
                state.posts = data.children;
            } else {
                state.posts = [];
            }
            
        },
        [loadAllPosts.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
        }
    }
});

    
export const selectAllPosts = (state) => state.gatherPosts.posts;    
export default gatherPostsSlice.reducer;