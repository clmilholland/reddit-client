import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getPopularSubreddits = createAsyncThunk (
    'popularSubreddits/getPopularSubreddits',
    async () => {
        const data = await fetch('https://www.reddit.com/best/communities/1/');
        const response = await data.json();
        console.log(response)
        return response;
    }
)

