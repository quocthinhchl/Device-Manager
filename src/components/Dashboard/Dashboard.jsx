import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import { Route, Routes, useLocation, useParams } from "react-router";
import ViewProfile from "../../pages/MyProfile/ViewProfile/ViewProfile";
import UpdateProfile from "../../pages/MyProfile/UpdateProfile/UpdateProfile";
import { BrowserRouter } from "react-router-dom";
import ChangePass from "../../pages/MyProfile/ChangePassword/ChangePassword";
import UserDetails from "../../pages/UserMangager/UserDetails/UserDetails";
import UpdateUser from "../../pages/UserMangager/UpdateUser/UpdateUser";
import UserManager from "../../pages/UserMangager/UserList/UserManager";
import CreateUser from "../../pages/UserMangager/CreateUser/CreateUser";
import axiosInstance from "../../shared/services/http-client";
function Dashboard({ setToken }) {
    const [user, setUser] = useState();
    useEffect(() => {
        axiosInstance.get("users/me?populate=role,avatar").then((res) => {
            setUser(res);
        });
    }, []);
    const [collapsed, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!collapsed);
    };

    const Location = useLocation();
    console.log(Location);
    return (
        <div className="App">
            <Sidebar collapsed={collapsed} />
            <Layout>
                {user && (
                    <Navbar toggle={toggleSidebar} setToken={setToken} userData={user} />
                )}

                <Routes>
                    {user && <Route path="/" element={<ViewProfile userData={user} />} />}
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

                    {user && <Route path="myprofile" element={<ViewProfile userData={user} />} />}
                    {user && (
                        <Route path="myprofile/update" element={<UpdateProfile userData={user} />} />
                    )}
                    {user && (
                        <Route path="myprofile/change" element={<ChangePass setToken={setToken} />} />
                    )}
                </Routes>
                {/* <PageContent /> */}
            </Layout>
        </div>
    );
}
export default Dashboard;
