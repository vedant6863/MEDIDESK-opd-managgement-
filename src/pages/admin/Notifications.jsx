import React from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';

const Notifications = () => (
  <div className="max-w-[1200px] mx-auto pb-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notifications & Alerts</h1>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><MessageSquare className="mr-2 text-blue-500" /> SMS Logs</h3>
        <p className="text-slate-500 text-sm mb-4">Recent SMS reminders sent to patients.</p>
        <ul className="space-y-3">
          <li className="text-sm bg-slate-50 p-3 rounded border border-slate-100">Appointment reminder sent to +91 98765****0 (Sent: 10:00 AM)</li>
          <li className="text-sm bg-slate-50 p-3 rounded border border-slate-100">OTP verification sent to +91 91234****1 (Sent: Yesterday)</li>
        </ul>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Mail className="mr-2 text-red-500" /> Email Logs</h3>
        <p className="text-slate-500 text-sm mb-4">Recent Emails sent to staff & patients.</p>
        <ul className="space-y-3">
          <li className="text-sm bg-slate-50 p-3 rounded border border-slate-100">Invoice INV-2026-001 sent to ramesh@example.com</li>
          <li className="text-sm bg-slate-50 p-3 rounded border border-slate-100">Weekly Staff Schedule dispatched.</li>
        </ul>
      </div>
    </div>
  </div>
);
export default Notifications;
