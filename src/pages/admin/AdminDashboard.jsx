import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Navbar from '../../components/layout/Navbar';
import DashboardContent from './DashboardContent';
import PatientManagement from './PatientManagement';
import AppointmentManagement from './AppointmentManagement';
import DoctorManagement from './DoctorManagement';
import StaffManagement from './StaffManagement';
import Billing from './Billing';
import DrugMaster from './DrugMaster';
import LabMaster from './LabMaster';
import ProcedureMaster from './ProcedureMaster';
import Discounts from './Discounts';
import Notifications from './Notifications';
import Reports from './Reports';
import Settings from './Settings';
import Support from './Support';
import MyProfile from './MyProfile';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafa] overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col lg:ml-64 relative min-w-0">
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <Routes>
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="patients" element={<PatientManagement />} />
            <Route path="appointments" element={<AppointmentManagement />} />
            <Route path="doctors" element={<DoctorManagement />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="billing" element={<Billing />} />
            <Route path="drugs" element={<DrugMaster />} />
            <Route path="labs" element={<LabMaster />} />
            <Route path="procedures" element={<ProcedureMaster />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
