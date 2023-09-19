import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import ErrorPage from '../../pages/Error/Error';
import UserDeviceList from '../../pages/User/Devices/UserDeviceList/UserDeviceList';
import UserDeviceDetail from '../../pages/User/Devices/UserDeviceDetail/UserDeviceDetail';
import MyDeviceList from '../../pages/User/MyDevice/MyDeviceList/MyDeviceList';
import UserBorrowHistoryList from '../../pages/User/UserBorrowHistory/UserBorrowHistoryList/UserBorrowHistoryList';
import MyDeviceDetail from '../../pages/User/MyDevice/MyDeviceDetail/MyDeviceDetail';

export default function UserDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="my_device" replace />} />

      <Route path="my_device" element={<MyDeviceList />} />
      <Route path="my_device/detail/:id" element={<MyDeviceDetail />} />

      {/* Device List */}
      <Route path="device_list" element={<UserDeviceList />} />
      <Route path="device_list/detail/:id" element={<UserDeviceDetail />} />

      <Route path="borrow_history" element={<UserBorrowHistoryList />} />

      {/* Error Page */}
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
