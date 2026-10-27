import React, { useState } from 'react';
import { Search, Plus, Filter, Package, AlertTriangle, MoreVertical, X } from 'lucide-react';

const mockDrugs = [
  { id: 'DRG-001', brand: 'Paracetamol 500mg', generic: 'Acetaminophen', stock: 1250, unit: 'Tablets', expiry: '12/2027', status: 'In Stock' },
  { id: 'DRG-002', brand: 'Amoxil 250mg', generic: 'Amoxicillin', stock: 45, unit: 'Capsules', expiry: '06/2026', status: 'Low Stock' },
  { id: 'DRG-003', brand: 'CoughSyrup DX', generic: 'Dextromethorphan', stock: 0, unit: 'Bottles', expiry: '01/2025', status: 'Out of Stock' },
];

const DrugMaster = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="max-w-[1200px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Drug Master (Inventory)</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Add Drug
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center border-l-4 border-l-blue-500">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
            <Package className="text-blue-500" size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Unique Drugs</p>
            <p className="text-xl font-bold text-slate-800">412</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center border-l-4 border-l-red-500">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center mr-4">
            <AlertTriangle className="text-red-500" size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Low Stock Alerts</p>
            <p className="text-xl font-bold text-slate-800">18</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800"
            placeholder="Search Brand Name / Generic Name"
          />
        </div>
        <button className="border border-slate-300 bg-white text-slate-600 px-4 py-2.5 rounded-md font-medium hover:bg-slate-50 transition-colors flex items-center">
          <Filter size={18} className="mr-2" /> Filters
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Drug ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Brand / Generic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Stock Available</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Expiry</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockDrugs.map((drug) => (
                <tr key={drug.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">{drug.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-800">{drug.brand}</div>
                    <div className="text-xs text-slate-500">{drug.generic}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-medium">
                    {drug.stock} <span className="text-slate-500 font-normal text-xs">{drug.unit}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{drug.expiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      drug.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                      drug.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {drug.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === drug.id ? null : drug.id)}
                      className="hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {activeDropdown === drug.id && (
                      <div className="absolute right-6 top-10 w-32 bg-white rounded-md shadow-lg border border-slate-200 z-10 py-1 text-left">
                        <button className="block w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">Edit Details</button>
                        <button className="block w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 text-left">Update Stock</button>
                        <button className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Drug Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-lg font-bold text-slate-800">Add New Drug</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="e.g. Paracetamol 500mg" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Generic Name</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="e.g. Acetaminophen" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
                    <input type="number" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Unit Type</label>
                    <select className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800">
                      <option>Tablets</option>
                      <option>Capsules</option>
                      <option>Bottles</option>
                      <option>Injections</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                  <input type="month" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800 focus:border-slate-800" />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-[#f8f9fa] flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium">
                Save Drug
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugMaster;
