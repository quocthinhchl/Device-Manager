import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../shared/services/http-client";
import UserService from "./UserService";

export const fetchUserProfileAction = createAsyncThunk('user/fetchUserProfile', async (payload, thunkApi) => {
    const res = await UserService.getUserProfile(payload)
    return res
})

export const updateUserProfileAction = createAsyncThunk('user/updateUserProfile', async (payload, thunkApi) => {
    const res = await UserService.updateUserProfile(payload)
    // thunkApi(dispatch(fetchUserProfileAction))
    return res
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_profile: [],
        isAdmin: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfileAction.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchUserProfileAction.fulfilled, (state, action) => {
            state.user_profile = action.payload
            state.loading = false
            const checkRole = state.user_profile?.role?.id === 3; // Kiểm tra giá trị role
            state.isAdmin = checkRole;
        })
        builder.addCase(fetchUserProfileAction.rejected, (state, action) => {
            state.loading = false
        });
    }
})
export const UserProfile = (state) => state.user
export default userSlice.reducer