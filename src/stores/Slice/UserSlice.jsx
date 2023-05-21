import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../shared/services/http-client";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_list: [],
        initialUserList: [],
        searchKeyWord: []
    },
    reducers: {
        getUserList: (state, action) => {
            state.user_list = action.payload
            console.log(action.payload);
        },
        setUserList: (state, action) => {
            state.user_list = action.payload;
        },
    }

})
export const { getUserList, setUserList } = userSlice.actions

export default userSlice.reducer