import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getSubreddits = createAsyncThunk(
    'subreddits/getSubreddits',
    async () => {
        const data = await fetch(`https://www.reddit.com/subreddits.json`)
        const response = await data.json();
        console.log(response)
        return response;
    }
)

const gatherSubredditsSlice = createSlice({
    name: 'gatherSubreddits',
    initialState: {
        subreddits: [],
        isPending: false,
        hasError: false
    },
    extraReducers: {
        [getSubreddits.pending]: (state) => {
            state.isPending = true;
            state.hasError = false;
        },
        [getSubreddits.fulfilled]: (state, action) => {
            state.isPending = false;
            state.hasError = false;
            const data = action.payload?.data;
            if (data && Array.isArray(data.children)) {
                state.subreddits = data.children;
            } else {
                state.subreddits = [];
            }
            
        },
        [getSubreddits.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
        }
    }
});

//export const selectSubreddits = (state) => state.gatherSubreddits.subreddits;
export default gatherSubredditsSlice.reducer;