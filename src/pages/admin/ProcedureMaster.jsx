import React, { useState } from 'react';
import { Plus, MoreVertical, X } from 'lucide-react';

const mockProcedures = [
  { code: 'PRC-01', name: 'General Consultation', duration: '15 Mins', cost: '₹ 500' },
  { code: 'PRC-02', name: 'ECG', duration: '30 Mins', cost: '₹ 1,200' },
];

const ProcedureMaster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="max-w-[1200px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Procedure Master</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Add Procedure
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden min-h-[400px]">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-[#f8f9fa]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Procedure Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Est. Duration</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Cost</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {mockProcedures.map(p => (
              <tr key={p.code} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-500">{p.code}</td>
                <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                <td className="px-6 py-4 text-slate-600">{p.duration}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{p.cost}</td>
                <td className="px-6 py-4 text-right text-slate-400 relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === p.code ? null : p.code)}
                    className="hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {activeDropdown === p.code && (
                    <div className="absolute right-6 top-10 w-32 bg-white rounded-md shadow-lg border border-slate-200 z-10 py-1 text-left">
                      <button className="block w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">Edit Procedure</button>
                      <button className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Procedure Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-lg font-bold text-slate-800">Add New Procedure</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Procedure Code</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="e.g. PRC-01" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Procedure Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="e.g. ECG" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Cost (₹)</label>
                  <input type="number" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="0" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Duration</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="e.g. 30 Mins" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-[#f8f9fa] flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium">
                Save Procedure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcedureMaster;
