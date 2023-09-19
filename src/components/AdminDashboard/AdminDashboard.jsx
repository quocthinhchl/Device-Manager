import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import UserManager from '../../pages/Admin/UserMangager/UserList/UserManager';
import CreateUser from '../../pages/Admin/UserMangager/CreateUser/CreateUser';
import UserDetails from '../../pages/Admin/UserMangager/UserDetails/UserDetails';
import UpdateUser from '../../pages/Admin/UserMangager/UpdateUser/UpdateUser';
import DeviceManager from '../../pages/Admin/Devices/DevicesList/DeviceManager';
import AddDevice from '../../pages/Admin/Devices/AddDevice/AddDevice';
import DeviceDetail from '../../pages/Admin/Devices/DeviceDetail/DeviceDetail';
import EditDevice from '../../pages/Admin/Devices/EditDevice/EditDevice';
import CategoryManager from '../../pages/Admin/Category/CategoryList/CategoryManager';
import AddCategory from '../../pages/Admin/Category/AddCategory/AddCategory';
import CategoryDetail from '../../pages/Admin/Category/CategoryDetail/CategoryDetail';
import EditCategory from '../../pages/Admin/Category/EditCategory/EditCategory';
import ErrorPage from '../../pages/Error/Error';
import BorrowRequestList from '../../pages/Admin/BorrowRequest/BorrowRequestList/BorrowRequestList';
import AdminRepairRequestList from '../../pages/Admin/RepairRequest/RepairRequestList/AdminRepairRequestList';

export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users_list" replace />} />

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

      {/* Borrow Request List */}
      <Route path="borrow_request_list" element={<BorrowRequestList />} />

      {/* Repair Request List */}
      <Route path="repair_request_list" element={<AdminRepairRequestList />} />

      {/* Error Page */}
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
