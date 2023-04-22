import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router";
import ViewProfile from "../../pages/MyProfile/ViewProfile/ViewProfile";
import UpdateProfile from "../../pages/MyProfile/UpdateProfile/UpdateProfile";
import { BrowserRouter } from "react-router-dom";
import ChangePass from "../../pages/MyProfile/ChangePassword/ChangePassword";
import UserDetails from "../../pages/UserMangager/UserDetails/UserDetails";
import UpdateUser from "../../pages/UserMangager/UpdateUser/UpdateUser";
import UserManager from "../../pages/UserMangager/UserList/UserManager";
import CreateUser from "../../pages/UserMangager/CreateUser/CreateUser";
import axiosInstance from "../../shared/services/http-client";
import WelcomePage from "../../pages/Welcome/Welcome";
import DeviceManager from "../../pages/Devices/DevicesList/DeviceManager";
import ErrorPage from "../../pages/Error/Error";
import AddDevice from "../../pages/Devices/AddDevice/AddDevice";

function Dashboard({ setToken }) {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [collapsed, setIsSidebarOpen] = useState(false);
    const Location = useLocation();

    useEffect(() => {
        axiosInstance.get("users/me?populate=role,avatar").then((res) => {
            setUser(res);
        }).catch((error) => {
            navigate('/dashboard/error')

        })
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!collapsed);
    };

    // console.log(Location);
    return (
        <div className="App">
            <Sidebar collapsed={collapsed} />
            <Layout>
                {user && (
                    <Navbar toggle={toggleSidebar} setToken={setToken} userData={user} />
                )}

                <Routes>
                    {user && <Route path="/" element={<WelcomePage userData={user} />} />}

                    {/* My Profile */}
                    {user && <Route path="myprofile" element={<ViewProfile userData={user} />} />}
                    {user && (
                        <Route path="myprofile/update" element={<UpdateProfile userData={user} />} />
                    )}
                    {user && (
                        <Route path="myprofile/change" element={<ChangePass setToken={setToken} />} />
                    )}

                    {/* User List */}
                    <Route path="users_list" element={<UserManager />} />
                    <Route path="users_list/create" element={<CreateUser />} />
                    <Route
                        path="users_list/detail/:id"
                        element={<UserDetails userId={Location} />}
                    />
                    <Route
                        path="users_list/edit/:id"
                        element={<UpdateUser userId={Location} />}
                    />


                    {/* Device List */}
                    <Route path="device_list" element={<DeviceManager />} />
                    <Route path="device_list/create" element={<AddDevice />} />


                    {/* Error Page */}
                    <Route path="/error" element={<ErrorPage setToken={setToken} />} />

                </Routes>
            </Layout>
        </div>
    );
}
export default Dashboard;
