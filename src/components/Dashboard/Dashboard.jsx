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
function Dashboard({ setToken, setLocation }) {
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

    const Location = useLocation()
    setLocation(Location)
    return (
        <div className="App">
            <Sidebar collapsed={collapsed} />
            <Layout>
                {user && <Navbar toggle={toggleSidebar} setToken={setToken} userData={user} />}

                <Routes>
                    {user && <Route path="/" element={<ViewProfile userData={user} />} />}
                    <Route path="users" element={<UserManager />} />
                    <Route path="create" element={<CreateUser />} />
                    <Route path="users/detail/:id" element={<UserDetails userId={Location} />} />
                    <Route path="users/edit/:id" element={<UpdateUser userId={Location} />} />


                    {/* <Route path="users" element={<UserManager />} /> */}

                    <Route path="update" element={<UpdateProfile />} />
                    <Route path="Change" element={<ChangePass />} />
                </Routes>
                {/* <PageContent /> */}
            </Layout>
        </div>
    );
}
export default Dashboard;
