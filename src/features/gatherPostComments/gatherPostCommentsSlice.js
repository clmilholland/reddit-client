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
        post: [],
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
            const data = action.payload;
            if (data && Array.isArray(data)) {
                state.comments = data[1].data.children;
            } else {
                state.comments = [];
            }
            if (data && Array.isArray(data)) {
                state.post = data[0].data.children[0].data
            } else {
                state.post = [];
            }
            console.log(state.comments)
            console.log(state.post)
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
export const selectPost = (state) => state.postComments.post;
export default postCommentsSlice.reducer;