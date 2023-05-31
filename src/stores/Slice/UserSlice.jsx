import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../shared/services/http-client";
import UserService from "./UserService";

export const fetchUserProfileAction = createAsyncThunk('user/fetchUserProfile', async (payload, thunkApi) => {
    const res = await UserService.getUserProfile(payload)
    return res
})

export const updateUserProfileAction = createAsyncThunk('user/updateUserProfile', async (payload, thunkApi) => {
    const res = await UserService.updateUserProfile(payload)
    // .catch((error) => {
    //     // console.log(33, error);
    //     throw new Error(error.response.data.error.message)
    // })

    thunkApi.dispatch(fetchUserProfileAction({ populate: 'role,avatar' }));
    return res
})

export const updateAvatarUserProfileAction = createAsyncThunk('user/updateAvatarUserProfile', async (payload, thunkApi) => {
    const res = await UserService.updateAvatarUserProfile(payload)
    // .catch((error) => {
    //     // console.log(33, error);
    //     throw new Error(error.response.data.error.message)
    // })
    // thunkApi.dispatch(fetchUserProfileAction({ populate: 'role,avatar' }));
    return res
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user_profile: [],
        isAdmin: false,
        error: [],
    },
    reducers: {
        deleteError: (state, action) => {
            state.error = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfileAction.pending, (state, action) => {
            state.loading = true
            // state.error = null

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
        builder.addCase(updateUserProfileAction.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
            state.user_profile = action.payload
            state.loading = false
        })
        builder.addCase(updateUserProfileAction.rejected, (state, action) => {
            // state.error.push(action.error.message)
            state.loading = false

        });

        builder.addCase(updateAvatarUserProfileAction.pending, (state, action) => {
            state.loading = true
            // state.error = null
        });
        builder.addCase(updateAvatarUserProfileAction.fulfilled, (state, action) => {
            state.user_profile.avatar = action.payload
            state.loading = false
        })
        builder.addCase(updateAvatarUserProfileAction.rejected, (state, action) => {
            // console.log(11, action);
            // state.error.push(action.error.message)
            state.loading = false
        });

    }
})
export const { deleteError } = userSlice.actions
export const UserProfile = (state) => state.user
export default userSlice.reducer