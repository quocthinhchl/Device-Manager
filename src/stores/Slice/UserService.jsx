import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../shared/services/http-client"
import { notification } from "antd";


const UserService = {
    getUserProfile: async (params) => {
        // console.log(params);
        const res = await axiosInstance.get('users/me', { params: params })
            .catch((error) => {
                notification.error({
                    message: error.response.data.error.message,
                    description: 'Có lỗi xảy ra, vui lòng thử lại',
                });
                throw new Error(error.response.data.error.message)
            })
        return res
    },

    updateUserProfile: async (params) => {
        // console.log(params);
        const res = await axiosInstance.put(`/users/${params.id}`, params.data)
            .catch((error) => {
                throw new Error(error.response.data.error.message)
            })
        return res
    },
    updateAvatarUserProfile: async (params) => {
        // console.log(22, params);
        const res = await axiosInstance.post('/upload', params.image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .catch((error) => {
                throw new Error(error.response.data.error.message)
            })
        return res
    },
}
export default UserService