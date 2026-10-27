import React, { useState } from 'react';
import { Search, Plus, Filter, FileText, CheckCircle2, Clock, X, Trash2 } from 'lucide-react';

const mockInvoices = [
  { id: 'INV-2026-001', patient: 'Rameshbhai M. Patel', date: '02/03/2026', amount: '₹ 1,500', status: 'Paid', method: 'UPI' },
  { id: 'INV-2026-002', patient: 'Sneha R. Shah', date: '02/03/2026', amount: '₹ 800', status: 'Unpaid', method: '-' },
  { id: 'INV-2026-003', patient: 'Kishore P. Joshi', date: '01/03/2026', amount: '₹ 4,200', status: 'Paid', method: 'Card' },
];

const Billing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto pb-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Billing & Invoices</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center shadow-sm"
        >
          <Plus size={18} className="mr-2" /> Create Invoice
        </button>
      </div>

      {/* KPI Summary for Billing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <FileText className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Revenue (Today)</p>
            <p className="text-2xl font-bold text-slate-800">₹ 18,500</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
            <Clock className="text-amber-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Pending Payments</p>
            <p className="text-2xl font-bold text-slate-800">₹ 3,200</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <CheckCircle2 className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Completed Invoices</p>
            <p className="text-2xl font-bold text-slate-800">14</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
            placeholder="Search Invoice No / Patient Name"
          />
        </div>
        <button className="border border-slate-300 bg-white text-slate-600 px-4 py-2.5 rounded-md font-medium hover:bg-slate-50 transition-colors flex items-center">
          <Filter size={18} className="mr-2" /> Filter
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden min-h-[300px]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Invoice No.</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{inv.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{inv.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{inv.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-slate-500 hover:text-slate-800">Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-lg font-bold text-slate-800">Generate Invoice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Patient</label>
                  <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800" placeholder="Search Patient..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Date</label>
                  <input type="date" className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-slate-800" />
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase">Item / Description</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase w-24">Qty</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase w-32">Price (₹)</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-slate-500 uppercase w-32">Total</th>
                      <th className="px-4 py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-2"><input type="text" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" placeholder="e.g. General Consultation" /></td>
                      <td className="px-4 py-2"><input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" defaultValue="1" /></td>
                      <td className="px-4 py-2"><input type="number" className="w-full border border-slate-300 rounded px-2 py-1 text-sm" placeholder="0.00" /></td>
                      <td className="px-4 py-2 text-right text-sm font-medium">₹ 0.00</td>
                      <td className="px-4 py-2 text-center"><button className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button></td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-3 bg-slate-50 border-t border-slate-200">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                    <Plus size={16} className="mr-1" /> Add Row
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="w-64 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-medium text-slate-800">₹ 0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Discount:</span>
                    <input type="text" className="w-20 border border-slate-300 rounded px-2 py-1 text-sm text-right" placeholder="%" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Tax (GST):</span>
                    <input type="text" className="w-20 border border-slate-300 rounded px-2 py-1 text-sm text-right" placeholder="%" />
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-800">
                    <span>Grand Total:</span>
                    <span>₹ 0.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-[#f8f9fa] flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors text-sm font-medium">
                Save & Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
