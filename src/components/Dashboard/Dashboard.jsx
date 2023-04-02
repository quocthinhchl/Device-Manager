import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Layout } from "antd";
import Navbar from "../Navbar/Navbar";
import PageContent from "../PageContent/PageContent";
import { Route, Routes } from "react-router";
import ViewProfile from "../../pages/MyProfile/ViewProfile/ViewProfile";
import { BrowserRouter } from "react-router-dom";

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
                        <Route path="users" element={<ViewProfile />} />
                        {/* <Route path="/device" element={<ViewProfile />}></Route> */}
                        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                    </Routes>

                {/* <PageContent /> */}

            </Layout>
        </div>
    );
}
export default Dashboard;
