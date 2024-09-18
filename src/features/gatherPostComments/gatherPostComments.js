import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";





export const getPostComments = createAsyncThunk (
    'gatherPostComments/getPostComments',
    async (post) => {
        const data = await fetch(`https://www.reddit.com${post}.json`);
        const response = await data.json();
        return response;
    }
)