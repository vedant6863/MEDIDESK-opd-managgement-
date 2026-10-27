import React from 'react';
import { LifeBuoy, Send } from 'lucide-react';

const Support = () => (
  <div className="max-w-[800px] mx-auto pb-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
        <LifeBuoy className="mr-2 text-blue-500" /> Help & Support
      </h1>
    </div>
    
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8 text-center mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Need Assistance?</h3>
      <p className="text-slate-500 mb-6">Our technical team is available 24/7 to help you with the Clinic Management System.</p>
      <div className="flex justify-center gap-4">
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200 min-w-[200px]">
          <p className="text-sm text-slate-500">Call Support</p>
          <p className="font-bold text-slate-800">1800-123-4567</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200 min-w-[200px]">
          <p className="text-sm text-slate-500">Email Support</p>
          <p className="font-bold text-slate-800">support@clinicSaaS.com</p>
        </div>
      </div>
    </div>

    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Submit a Ticket</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Issue Type</label>
          <select className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-slate-800 focus:border-slate-800">
            <option>Bug Report</option>
            <option>Feature Request</option>
            <option>Billing Issue</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-slate-800 focus:border-slate-800" rows="4" placeholder="Describe your issue..." />
        </div>
        <button className="bg-slate-800 text-white px-6 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center justify-center w-full">
          <Send size={18} className="mr-2" /> Submit Ticket
        </button>
      </div>
    </div>
  </div>
);
export default Support;
