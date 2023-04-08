import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import PageContent from "../PageContent/PageContent";
import { Route, Routes } from "react-router";
import ViewProfile from "../../pages/MyProfile/ViewProfile/ViewProfile";
import UpdateProfile from "../../pages/MyProfile/UpdateProfile/UpdateProfile/UpdateProfile";
import { BrowserRouter } from "react-router-dom";
import ChangePass from "../../pages/MyProfile/ChangePassword/ChangePassWord/ChangePassword";
import UserDetails from "../../pages/UserMangager/UserDetails/UserDetails";
import UpdateUser from "../../pages/UserMangager/UpdateUser/UpdateUser";
import UserManager from "../../pages/UserMangager/UserList/UserManager";

function Dashboard() {
    const [collapsed, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!collapsed);
    }
    return (
        <div className="App">
            <Sidebar collapsed={collapsed} />
            <Layout>
                <Navbar toggle={toggleSidebar} />

                <Routes>
                    <Route path="users" element={<UserManager />} />
                    {/* <Route path="users" element={<UserManager />} /> */}


                    <Route path="users/update" element={<UpdateUser />} />
                    <Route path="users/Change" element={<ChangePass />} />

                </Routes>
                {/* <PageContent /> */}
            </Layout>
        </div>
    );
}
export default Dashboard;
