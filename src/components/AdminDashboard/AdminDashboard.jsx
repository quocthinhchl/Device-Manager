import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import ViewProfile from '../../pages/MyProfile/ViewProfile/ViewProfile';
import UpdateProfile from '../../pages/MyProfile/UpdateProfile/UpdateProfile';
import ChangePass from '../../pages/MyProfile/ChangePassword/ChangePassword';
import UserManager from '../../pages/UserMangager/UserList/UserManager';
import CreateUser from '../../pages/UserMangager/CreateUser/CreateUser';
import UserDetails from '../../pages/UserMangager/UserDetails/UserDetails';
import UpdateUser from '../../pages/UserMangager/UpdateUser/UpdateUser';
import DeviceManager from '../../pages/Devices/DevicesList/DeviceManager';
import AddDevice from '../../pages/Devices/AddDevice/AddDevice';
import DeviceDetail from '../../pages/Devices/DeviceDetail/DeviceDetail';
import EditDevice from '../../pages/Devices/EditDevice/EditDevice';
import ErrorPage from '../../pages/Error/Error';
import CategoryManager from '../../pages/Category/CategoryList/CategoryManager';
import CategoryDetail from '../../pages/Category/CategoryDetail/CategoryDetail';
import EditCategory from '../../pages/Category/EditCategory/EditCategory';
import AddCategory from '../../pages/Category/AddCategory/AddCategory';

export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users_list" replace />} />

      {/* My Profile */}
      <Route path="myprofile" element={<ViewProfile />} />
      <Route path="myprofile/update" element={<UpdateProfile />} />
      <Route path="myprofile/change" element={<ChangePass />} />

      {/* User List */}
      <Route path="users_list" index element={<UserManager />} />
      <Route path="users_list/create" element={<CreateUser />} />
      <Route path="users_list/detail/:id" element={<UserDetails />} />
      <Route path="users_list/edit/:id" element={<UpdateUser />} />

      {/* Device List */}
      <Route path="device_list" element={<DeviceManager />} />
      <Route path="device_list/create" element={<AddDevice />} />
      <Route path="device_list/detail/:id" element={<DeviceDetail />} />
      <Route path="device_list/edit/:id" element={<EditDevice />} />

      {/* Category List */}
      <Route path="category_list" element={<CategoryManager />} />
      <Route path="category_list/create" element={<AddCategory />} />
      <Route path="category_list/detail/:id" element={<CategoryDetail />} />
      <Route path="category_list/edit/:id" element={<EditCategory />} />

      {/* Error Page */}
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
