import React from 'react';
import { Menu, User, LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-md focus:outline-none transition-colors"
        >
          <Menu size={24} />
        </button>
        {/* Title removed for desktop to match screenshot which has it in the content area */}
      </div>

      <div className="flex items-center space-x-5">
        <button className="text-slate-400 hover:text-blue-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border-2 border-white"></span>
          </span>
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <button className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          <User size={18} className="mr-2" />
          <span className="hidden sm:inline-block">Profile</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          <span className="hidden sm:inline-block">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
