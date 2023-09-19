import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Layout } from 'antd';
import Navbar from '../Navbar/Navbar';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import ViewProfile from '../../pages/MyProfile/ViewProfile/ViewProfile';
import UpdateProfile from '../../pages/MyProfile/UpdateProfile/UpdateProfile';
import ChangePass from '../../pages/MyProfile/ChangePassword/ChangePassword';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserProfile,
  fetchUserProfileAction,
} from '../../stores/Slice/UserSlice';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import UserDashboard from '../UserDashboard/UserDashboard';
import StaffDashboard from '../StaffDashboard/StaffDashboard';

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const userProfile = useSelector(UserProfile);
  // useEffect(() => {
  //   dispatch(fetchUserProfileAction({ populate: 'role,avatar' }));
  // }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!collapsed);
  };

  return (
    <div className="App">
      <Sidebar collapsed={collapsed} />
      <Layout>
        {userProfile && <Navbar toggle={toggleSidebar} />}

        <Routes>
          {userProfile && (
            <Route
              path="/"
              element={
                userProfile.role === 'admin' ? (
                  <Navigate to="admin" replace />
                ) : userProfile.role === 'user' ? (
                  <Navigate to="user" replace />
                ) : (
                  <Navigate to="staff" replace />
                )
              }
            />
          )}

          {/* My Profile */}
          {userProfile && <Route path="myprofile" element={<ViewProfile />} />}
          {userProfile && (
            <Route path="myprofile/update" element={<UpdateProfile />} />
          )}
          {userProfile && (
            <Route path="myprofile/change" element={<ChangePass />} />
          )}

          <Route path="admin/*" index element={<AdminDashboard />} />
          <Route path="user/*" index element={<UserDashboard />} />
          <Route path="staff/*" index element={<StaffDashboard />} />
        </Routes>
      </Layout>
    </div>
  );
}
export default Dashboard;
