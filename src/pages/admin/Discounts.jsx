import React, { useState } from 'react';
import { Plus, MoreVertical, X } from 'lucide-react';

const mockDiscounts = [
  { id: 'DSC-01', name: 'Senior Citizen Discount', percent: '15%', status: 'Active' },
  { id: 'DSC-02', name: 'Festive Offer', percent: '10%', status: 'Expired' },
];

const Discounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="max-w-[1200px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Discounts & Offers</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Create Discount
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden min-h-[400px]">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-[#f8f9fa]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Discount Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Percentage</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {mockDiscounts.map(d => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-bold text-slate-900">{d.name}</td>
                <td className="px-6 py-4 text-slate-600">{d.percent}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${d.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{d.status}</span>
                </td>
                <td className="px-6 py-4 text-right text-slate-400 relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === d.id ? null : d.id)}
                    className="hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {activeDropdown === d.id && (
                    <div className="absolute right-6 top-10 w-32 bg-white rounded-md shadow-lg border border-slate-200 z-10 py-1 text-left">
                      <button className="block w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">Edit Discount</button>
                      <button className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">{d.status === 'Active' ? 'Deactivate' : 'Delete'}</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Discount Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-lg font-bold text-slate-800">Create New Discount</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Discount Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="e.g. Senior Citizen Discount" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Discount Percentage (%)</label>
                  <input type="number" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="0" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-[#f8f9fa] flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium">
                Save Discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discounts;
