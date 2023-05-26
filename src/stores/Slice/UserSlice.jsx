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
        setRole: (state, action) => {
            state.isAdmin = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfileAction.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchUserProfileAction.fulfilled, (state, action) => {
            state.user_profile = action.payload
            state.loading = false
        })
        builder.addCase(fetchUserProfileAction.rejected, (state, action) => {
            state.loading = false
        });
    }
})
export const { setRole } = userSlice.actions
export const UserProfile = (state) => state.user
export default userSlice.reducer