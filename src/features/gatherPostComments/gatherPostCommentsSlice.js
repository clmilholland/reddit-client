import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





export const getPostComments = createAsyncThunk (
    'gatherPostComments/getPostComments',
    async (post) => {
        const data = await fetch(`https://www.reddit.com${post}.json`);
        const response = await data.json();
        console.log(response)
        return response;
    }
)

const postCommentsSlice = createSlice ({
    name: 'postComments',
    initialState: {
        comments: [],
        isPending: false,
        hasError: false
    },
    extraReducers: {
        [getPostComments.pending]: (state) => {
            state.isPending = true;
            state.hasError = false;
            //return <div>Loading Comments</div>
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.isPending = false;
            state.hasError = false;
            const data = action.payload[1];
            if (data && data.data && Array.isArray(data.data.children)) {
                state.comments = data.data.children;
            } else {
                state.comments = [];
            }
        },
        [getPostComments.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
            //return <div>Could not load comments</div>
        }
    }

})

console.log()
export const selectAllComments = (state) => state.postComments.comments;
export default postCommentsSlice.reducer;