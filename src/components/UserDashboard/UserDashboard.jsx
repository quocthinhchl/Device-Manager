import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import DeviceManager from '../../pages/Devices/DevicesList/DeviceManager';
import AddDevice from '../../pages/Devices/AddDevice/AddDevice';
import DeviceDetail from '../../pages/Devices/DeviceDetail/DeviceDetail';
import EditDevice from '../../pages/Devices/EditDevice/EditDevice';
import ErrorPage from '../../pages/Error/Error';

export default function UserDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="users_list" replace />} />

      {/* Device List */}
      <Route path="device_list" element={<DeviceManager />} />
      <Route path="device_list/create" element={<AddDevice />} />
      <Route path="device_list/detail/:id" element={<DeviceDetail />} />
      <Route path="device_list/edit/:id" element={<EditDevice />} />

      {/* Error Page */}
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
