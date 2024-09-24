import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const gatherHeader = createAsyncThunk(
    'gatherSubredditHeader/gatherHeader',
    async (searchParam) => {
        console.log(searchParam)
        if (searchParam) {
            const data = await fetch(`https://www.reddit.com/subreddits/search.json?q=${searchParam}`);
            const response = await data.json();
            return response;
        } else {
            return searchParam;
        }
        
    }
);

const gatherHeaderSlice = createSlice({
    name: 'gatherHeader',
    initialState: {
        subreddit: {},
        isPending: false,
        hasError: false
    },
    extraReducers: {
        [gatherHeader.pending]: (state) => {
            state.isPending = true;
            state.hasError = false;
        },
        [gatherHeader.fulfilled]: (state, action) => {
            state.isPending = false;
            state.hasError = false;
            const data = action.payload?.data?.children?.[0];
            console.log(data)
            if (data) {
                state.subreddit = data;
            } else {
                state.subreddit = {};
            }
        },
        [gatherHeader.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
        }
    }
})


export const selectSubreddit = (state) => state.gatherHeader.subreddit || {};
console.log(selectSubreddit)
export default gatherHeaderSlice.reducer;