import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const loadAllPosts = createAsyncThunk(
    'postPreviews/loadAllPosts',
    async () => {
        const data = await fetch('/mockData/posts.json', 
        {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        );
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
            const {data} = action.payload
            state.posts = data.children
        },
        [loadAllPosts.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
        }
    }
});

    
export const selectAllPosts = (state) => state.gatherPosts.posts;    
export default gatherPostsSlice.reducer;