import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReceptionDashboard from './pages/reception/ReceptionDashboard';

import DoctorDashboard from './pages/doctor/DoctorDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {/* Route all /admin paths to AdminDashboard so sidebar links don't break */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        {/* Route to the real Reception system */}
        <Route path="/reception/*" element={<ReceptionDashboard />} />
        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
