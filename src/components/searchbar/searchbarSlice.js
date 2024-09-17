import { createSlice } from "@reduxjs/toolkit";

const searchbarSlice = createSlice({
    name: 'searchbar',
    initialState: {
        searchbar: ''
    },
    reducers: {
        setSearch: (state, action) => {
            state.searchbar = action.payload
            console.log(state.searchbar)
        },
        clearSearch: (state, action) => {
            state.searchbar = action.payload
        }
    }

});

export const {setSearch, clearSearch} = searchbarSlice.actions;
export const searchInput = (state) => state.searchbar.searchbar;
export default searchbarSlice.reducer