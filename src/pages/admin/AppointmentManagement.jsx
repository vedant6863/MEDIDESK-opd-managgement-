import React, { useState } from 'react';
import { Search, Plus, Calendar, Clock, MoreVertical, Filter, X } from 'lucide-react';

const mockAppointments = [
  { id: 1, patient: 'Rameshbhai M. Patel', mrd: 'P03-260001', doctor: 'Dr. Sarah Smith', date: 'Today', time: '10:00 AM', status: 'In Progress', type: 'Follow-up' },
  { id: 2, patient: 'Sneha R. Shah', mrd: 'P03-260002', doctor: 'Dr. John Doe', date: 'Today', time: '11:30 AM', status: 'Waiting', type: 'Consultation' },
  { id: 3, patient: 'Mahesh K. Kumar', mrd: 'P03-260003', doctor: 'Dr. Sarah Smith', date: 'Today', time: '12:15 PM', status: 'Completed', type: 'Consultation' },
];

const AppointmentManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Appointment Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Book Appointment
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 sm:text-sm transition-colors"
            placeholder="Search Patient Name / Mobile / MRD"
          />
        </div>
        <div className="flex space-x-2">
          <input type="date" className="border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-slate-800" />
          <select className="border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-600 focus:outline-none focus:border-slate-800">
            <option>All Doctors</option>
            <option>Dr. Sarah Smith</option>
            <option>Dr. John Doe</option>
          </select>
        </div>
      </div>

      {/* List View */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">MRD No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-bold text-slate-900">
                      <Clock size={16} className="text-slate-400 mr-2" /> {appt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{appt.mrd}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{appt.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appt.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appt.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      appt.status === 'Waiting' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-lg font-bold text-slate-800">Book New Appointment</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Search & Select Patient</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" placeholder="Search by Name or Mobile No..." />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Doctor</label>
                  <select className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800">
                    <option>Dr. Sarah Smith (Cardiology)</option>
                    <option>Dr. John Doe (General)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Appointment Type</label>
                  <select className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800">
                    <option>New Consultation</option>
                    <option>Follow-up</option>
                    <option>Report Show</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                  <input type="date" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Available Slots</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="border border-slate-300 rounded py-1.5 text-sm text-slate-600 hover:border-slate-800 hover:bg-slate-50 transition-colors">10:00 AM</button>
                    <button className="border border-slate-800 bg-slate-800 text-white rounded py-1.5 text-sm transition-colors">10:30 AM</button>
                    <button className="border border-slate-300 rounded py-1.5 text-sm text-slate-600 hover:border-slate-800 hover:bg-slate-50 transition-colors">11:00 AM</button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes / Reason for Visit</label>
                  <textarea className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800" rows="3" placeholder="Briefly describe the symptoms or reason..."></textarea>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-[#f8f9fa] flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
