import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { Layout } from 'antd';
import Navbar from '../Navbar/Navbar';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import ViewProfile from '../../pages/MyProfile/ViewProfile/ViewProfile';
import UpdateProfile from '../../pages/MyProfile/UpdateProfile/UpdateProfile';
import { BrowserRouter } from 'react-router-dom';
import ChangePass from '../../pages/MyProfile/ChangePassword/ChangePassword';
import UserDetails from '../../pages/UserMangager/UserDetails/UserDetails';
import UpdateUser from '../../pages/UserMangager/UpdateUser/UpdateUser';
import UserManager from '../../pages/UserMangager/UserList/UserManager';
import CreateUser from '../../pages/UserMangager/CreateUser/CreateUser';
import axiosInstance from '../../shared/services/http-client';
import WelcomePage from '../../pages/Welcome/Welcome';
import DeviceManager from '../../pages/Devices/DevicesList/DeviceManager';
import ErrorPage from '../../pages/Error/Error';
import AddDevice from '../../pages/Devices/AddDevice/AddDevice';
import DeviceDetail from '../../pages/Devices/DeviceDetail/DeviceDetail';
import EditDevice from '../../pages/Devices/EditDevice/EditDevice';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserProfile,
  fetchUserProfileAction,
} from '../../stores/Slice/UserSlice';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import UserDashboard from '../UserDashboard/UserDashboard';

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
                userProfile.isAdmin ? (
                  <Navigate to="admin" replace />
                ) : (
                  <Navigate to="user" replace />
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

          {/* User List */}
          {/* <Route path="users_list" index element={<UserManager />} />
          <Route path="users_list/create" element={<CreateUser />} />
          <Route path="users_list/detail/:id" element={<UserDetails />} />
          <Route path="users_list/edit/:id" element={<UpdateUser />} /> */}

          {/* Device List */}
          {/* <Route path="device_list" element={<DeviceManager />} />
          <Route path="device_list/create" element={<AddDevice />} />
          <Route path="device_list/detail/:id" element={<DeviceDetail />} />
          <Route path="device_list/edit/:id" element={<EditDevice />} /> */}

          <Route path="admin/*" index element={<AdminDashboard />} />
          <Route path="user/*" index element={<UserDashboard />} />

          {/* Error Page */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </div>
  );
}
export default Dashboard;
