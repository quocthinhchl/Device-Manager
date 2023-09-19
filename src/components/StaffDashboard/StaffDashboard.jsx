import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import ErrorPage from '../../pages/Error/Error';
import RepairRequestList from '../../pages/Staff/RepairRequest/RepairRequestList/RepairRequestList';

export default function StaffDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="repair_request_list" replace />} />

      <Route path="/repair_request_list" element={<RepairRequestList />} />

      {/* Error Page */}
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
