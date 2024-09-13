import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




 export const loadUserProfile = createAsyncThunk(
     'userProfile/loadUserProfile',
    async(username) => {
         const data = await fetch(`https://www.reddit.com/user/${username}/about.json`);
         const response = await data.json();
        return response;
     }
 );

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: {
        users: [],
        isPending: false,
        hasError: false
    },
    extraReducers: {
        [loadUserProfile.pending]: (state) => {
            state.isPending = true;
            state.hasError = false;
        },
        [loadUserProfile.fulfilled]: (state, action) => {
            state.isPending = false;
            state.hasError = false;
            const {data} = action.payload;
            state.users.push(data)
        },
        [loadUserProfile.rejected]: (state) => {
            state.isPending = false;
            state.hasError = true;
        },
    }
});


export const selectAllUsers = (state) => state.userProfile.users;
export default userProfileSlice.reducer;