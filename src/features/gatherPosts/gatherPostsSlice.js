import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const loadAllPosts = createAsyncThunk(
    'postPreviews/loadAllPosts',
    async (searchbar) => {
        console.log(searchbar)
        let data;
        if (!searchbar){
             data = await fetch(`https://www.reddit.com/.json`);
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
        history: [],
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
                if (!state.history.includes(data.children?.[0]?.data?.subreddit)) {
                    state.history.push(data.children?.[0]?.data?.subreddit);
                }
                
                console.log(state.history)
            } else {
                state.posts = [];
            }
            
        },
        [loadAllPosts.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
            alert('Oh no! you have reached the API limit. Please try again in a few minutes')
        }
    }
});

    
export const selectAllPosts = (state) => state.gatherPosts.posts;
export const selectAllHistory = (state) => state.gatherPosts.history;    
export default gatherPostsSlice.reducer;