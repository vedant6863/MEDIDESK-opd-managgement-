import React from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';

const Settings = () => (
  <div className="max-w-[800px] mx-auto pb-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
        <SettingsIcon className="mr-2" /> Clinic Settings
      </h1>
      <button className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center">
        <Save size={18} className="mr-2" /> Save Changes
      </button>
    </div>
    
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Clinic Name</label>
            <input type="text" className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-slate-800 focus:border-slate-800" defaultValue="City Central Clinic" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
            <input type="email" className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-slate-800 focus:border-slate-800" defaultValue="contact@clinic.com" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Clinic Address</label>
            <textarea className="w-full border border-slate-300 rounded p-2 focus:ring-1 focus:ring-slate-800 focus:border-slate-800" rows="3" defaultValue="123 Health Ave, Medical District" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Settings;
