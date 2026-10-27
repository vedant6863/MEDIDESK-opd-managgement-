import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, UserCheck, Shield, 
  FileText, Pill, FlaskConical, Stethoscope, Tag, 
  Bell, BarChart, Settings, HeadphonesIcon, User 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Patient Mgmt', path: '/admin/patients', icon: Users },
  { name: 'Appointment Mgmt', path: '/admin/appointments', icon: Calendar },
  { name: 'Doctor Mgmt', path: '/admin/doctors', icon: UserCheck },
  { name: 'Staff Mgmt', path: '/admin/staff', icon: Shield },
  { name: 'Billing', path: '/admin/billing', icon: FileText },
  { name: 'Drug Master', path: '/admin/drugs', icon: Pill },
  { name: 'Lab Master', path: '/admin/labs', icon: FlaskConical },
  { name: 'Procedure Master', path: '/admin/procedures', icon: Stethoscope },
  { name: 'Discounts', path: '/admin/discounts', icon: Tag },
  { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  { name: 'Reports', path: '/admin/reports', icon: BarChart },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
  { name: 'Support', path: '/admin/support', icon: HeadphonesIcon },
  { name: 'My Profile', path: '/admin/profile', icon: User },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-[#f4f5f7] border-r border-slate-200 z-30 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col shadow-lg lg:shadow-none`}>
        
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-200 flex flex-col items-center justify-center">
          <div className="w-full h-16 bg-[#e2e4e8] border border-slate-300 flex items-center justify-center rounded mb-3 text-slate-500 font-medium text-sm tracking-wider">
            [ CLINIC LOGO ]
          </div>
          <p className="font-bold text-slate-800 tracking-widest text-xs uppercase mt-1">ADMIN</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-6 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive || item.name === 'Dashboard' 
                      ? 'bg-[#e2e4e8] text-slate-900 border-l-[6px] border-slate-800 shadow-inner' 
                      : 'text-slate-500 border-l-[6px] border-transparent hover:bg-white hover:text-slate-800'
                    }`
                  }
                >
                  <span className={`mr-3 ${item.name === 'Dashboard' ? 'text-slate-800' : 'text-slate-400'}`}>
                    {item.name === 'Dashboard' ? (
                       <span className="inline-block w-3 h-3 bg-slate-800 mr-1" /> // Square for Dashboard to match ref
                    ) : (
                      <item.icon size={16} />
                    )}
                  </span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
