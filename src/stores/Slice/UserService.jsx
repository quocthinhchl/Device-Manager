import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../shared/services/http-client"


const UserService = {
    getUserProfile: async (params) => {
        // console.log(params);
        const res = await axiosInstance.get('users/me', { params: params })
        // console.log(res);
        return res
    },
    // updateUserProfile: async (params) => {
    //     // console.log(params);
    //     const res = await axiosInstance.put(`/users/${userProfile.user_profile.id}`, data)
    //     // .then((response) => {
    //     //     if (response != null) {

    //     //         navigate("/dashboard/myprofile")

    //     //         notification.success({
    //     //             message: 'Tạo thành công',
    //     //             description: `Tạo thành công`,
    //     //         });
    //     //     }
    //     // })
    //     // .catch((error) => {
    //     //     console.log(error);

    //     //     notification.warning({
    //     //         message: 'Có gì đó không ổn',
    //     //         description: `Có gì đó không ổn`,
    //     //     });
    //     // });
    //     return res
    // },

    updateUserProfile: async (params) => {
        // console.log(params);
        const res = await axiosInstance.put(`/users/${params.id}`, params.data)
        return res
    },
    updateAvatarUserProfile: async (params) => {
        // console.log(22, params);
        const res = await axiosInstance.post('/upload', params.image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res
    },
    // addTodoList: async (params) => {
    //     // console.log(params);
    //     const res = await axios.post('http://localhost:3000/todos', { title: params })
    //     // console.log(res);
    //     return res
    // },
    // editTodoList: async (params, id) => {
    //     // console.log(params);
    //     const res = await axios.put(`http://localhost:3000/todos/${params.id}`, { title: params.title })
    //     // console.log(res);
    //     // return res
    // },
    // deleteTodoList: async (params) => {
    //     // console.log(params);
    //     const res = await axios.delete(`http://localhost:3000/todos/${params.id}`)
    //     // console.log(res);
    //     // return res
    // }
}
export default UserService