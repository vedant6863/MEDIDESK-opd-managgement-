import React, { useState } from 'react';
import { Search, Edit, Power, PowerOff, Trash2, ShieldAlert } from 'lucide-react';

const mockPatients = [
  { id: 1, mrd: 'P03-260001', name: 'Rameshbhai M. Patel', mobile: '98765****0', age: 35, gender: 'Male', date: '01/03/2026', status: 'Active' },
  { id: 2, mrd: 'P03-260002', name: 'Sneha R. Shah', mobile: '91234****1', age: 28, gender: 'Female', date: '02/03/2026', status: 'Active' },
  { id: 3, mrd: 'P03-260003', name: 'Mahesh K. Kumar', mobile: '99887****2', age: 45, gender: 'Male', date: '03/03/2026', status: 'Active' },
  { id: 4, mrd: 'P02-260044', name: 'Priya N. Desai', mobile: '88776****3', age: 22, gender: 'Female', date: '14/02/2026', status: 'Active' },
  { id: 5, mrd: 'P01-260010', name: 'Kishore P. Joshi', mobile: '77665****4', age: 60, gender: 'Male', date: '10/01/2026', status: 'Deactivated' },
];

const PatientManagement = () => {
  const [activeTab, setActiveTab] = useState('All Patients');
  const tabs = ['All Patients', 'New (This Month)', 'Active', 'Deactivated'];

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 tracking-tight">
        Patient Management
      </h1>

      {/* Search Bar */}
      <div className="flex mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-l-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 sm:text-sm transition-colors"
            placeholder="Search by Name / Mobile / MRD No."
          />
        </div>
        <button className="bg-slate-800 text-white px-8 py-3 rounded-r-md font-medium hover:bg-slate-700 transition-colors">
          Search
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-white border-slate-800 text-slate-800 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  MRD No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  Reg. Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {patient.mrd}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{patient.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5" title="Mobile numbers masked in all list views">
                      {patient.mobile}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {patient.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      patient.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {patient.status === 'Active' ? (
                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center transition-colors" title="OTP verification required for basic field edits">
                          <Edit size={16} className="mr-1" /> Edit
                        </button>
                        <button className="text-amber-600 hover:text-amber-900 flex items-center transition-colors">
                          <PowerOff size={16} className="mr-1" /> Deactivate
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button className="text-green-600 hover:text-green-900 flex items-center transition-colors">
                          <Power size={16} className="mr-1" /> Restore
                        </button>
                        <button className="text-red-600 hover:text-red-900 flex items-center transition-colors">
                          <Trash2 size={16} className="mr-1" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-slate-600 mb-10">
        <div>Showing 1–5 of 1,248 records</div>
        <div className="flex items-center space-x-4">
          <button className="text-slate-500 hover:text-slate-800 transition-colors font-medium">&lt; Prev</button>
          <span>Page 1 of 250</span>
          <button className="text-slate-500 hover:text-slate-800 transition-colors font-medium">Next &gt;</button>
        </div>
      </div>

      {/* Profile Upgrade Section */}
      <div className="bg-[#f0f2f5] border border-slate-300 rounded-lg p-6 relative overflow-hidden" title="Profile upgrade fields unlocked only by Doctor or Admin">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldAlert size={120} />
        </div>
        <div className="relative z-10">
          <div className="bg-[#e2e4e8] border border-slate-300 py-2 px-4 rounded-t-md font-bold text-slate-700 tracking-wide mb-6 inline-block">
            Profile Upgrade (Doctor / Admin Only)
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">DOB (E/D)</label>
              <input type="text" disabled className="w-full border border-slate-300 bg-white/60 rounded p-2 text-sm text-slate-500 cursor-not-allowed" placeholder="DD/MM/YYYY" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Blood Group (E/D)</label>
              <select disabled className="w-full border border-slate-300 bg-white/60 rounded p-2 text-sm text-slate-500 cursor-not-allowed">
                <option value="">Select...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Email (E/D)</label>
              <input type="email" disabled className="w-full border border-slate-300 bg-white/60 rounded p-2 text-sm text-slate-500 cursor-not-allowed" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Allergies</label>
              <input type="text" disabled className="w-full border border-slate-300 bg-white/60 rounded p-2 text-sm text-slate-500 cursor-not-allowed" placeholder="None" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Past History</label>
              <input type="text" disabled className="w-full border border-slate-300 bg-white/60 rounded p-2 text-sm text-slate-500 cursor-not-allowed" placeholder="Nil" />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 font-medium italic">
            * These fields are restricted. Upgrading patient profile requires higher-level authorization.
          </p>
        </div>
      </div>

    </div>
  );
};

export default PatientManagement;
