import React, { useState } from 'react';
import { 
  BarChart as BarIcon, PieChart as PieIcon, TrendingUp, Users, Calendar, Package, Download, Filter 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

// --- MOCK DATA ---
const financialData = [
  { month: 'Jan', revenue: 450000, expenses: 280000 },
  { month: 'Feb', revenue: 520000, expenses: 310000 },
  { month: 'Mar', revenue: 480000, expenses: 290000 },
  { month: 'Apr', revenue: 610000, expenses: 320000 },
  { month: 'May', revenue: 590000, expenses: 305000 },
  { month: 'Jun', revenue: 650000, expenses: 340000 },
];

const patientDemographics = [
  { name: '0-18 Years', value: 15 },
  { name: '19-35 Years', value: 35 },
  { name: '36-50 Years', value: 25 },
  { name: '51+ Years', value: 25 },
];

const appointmentTrends = [
  { name: 'Mon', completed: 45, noShow: 5, cancelled: 2 },
  { name: 'Tue', completed: 52, noShow: 3, cancelled: 4 },
  { name: 'Wed', completed: 38, noShow: 8, cancelled: 1 },
  { name: 'Thu', completed: 65, noShow: 2, cancelled: 5 },
  { name: 'Fri', completed: 48, noShow: 4, cancelled: 2 },
  { name: 'Sat', completed: 70, noShow: 1, cancelled: 0 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Reports = () => {
  const [activeTab, setActiveTab] = useState('financial');

  const tabs = [
    { id: 'financial', label: 'Financial', icon: <TrendingUp size={18} /> },
    { id: 'patients', label: 'Patients', icon: <Users size={18} /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar size={18} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={18} /> },
  ];

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Reports & Analytics</h1>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-md font-medium hover:bg-slate-50 transition-colors flex items-center text-sm">
            <Filter size={16} className="mr-2" /> Last 6 Months
          </button>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition-colors flex items-center text-sm shadow-sm">
            <Download size={16} className="mr-2" /> Export PDF
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-slate-200 mb-8 custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 font-medium text-sm border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'border-slate-800 text-slate-800 bg-slate-50/50' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label} Analytics
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="space-y-6">
        
        {/* FINANCIAL TAB */}
        {activeTab === 'financial' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                <p className="text-sm text-slate-500 font-medium">Total Revenue (6m)</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">₹ 33,00,000</p>
                <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center">
                  <TrendingUp size={14} className="mr-1" /> +12% from previous
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm border-l-4 border-l-red-500">
                <p className="text-sm text-slate-500 font-medium">Total Expenses (6m)</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">₹ 18,45,000</p>
                <p className="text-xs text-red-600 mt-2 font-medium flex items-center">
                  <TrendingUp size={14} className="mr-1" /> +5% from previous
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                <p className="text-sm text-slate-500 font-medium">Net Profit Margin</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">44.1%</p>
                <p className="text-xs text-slate-400 mt-2">Average over 6 months</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Revenue vs Expenses Trend</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `₹${value/1000}k`} />
                    <RechartsTooltip 
                      formatter={(value) => `₹ ${value.toLocaleString()}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpenses)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* PATIENTS TAB */}
        {activeTab === 'patients' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Patient Age Demographics</h3>
              <div className="h-[350px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientDemographics}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {patientDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 flex items-center justify-center">
              <div className="text-center">
                <Users size={48} className="text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">More Insights Coming Soon</h3>
                <p className="text-sm text-slate-500">Gender distribution and geographical data modules are currently being aggregated.</p>
              </div>
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Weekly Appointment Completion Status</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentTrends} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px' }} cursor={{fill: '#f8f9fa'}} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="completed" name="Completed" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="noShow" name="No-Show" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="cancelled" name="Cancelled" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-12 flex flex-col items-center justify-center min-h-[400px]">
             <Package size={64} className="text-slate-200 mb-4" />
             <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">Inventory Consumption Analytics</h3>
             <p className="text-slate-500 max-w-md text-center mb-6">Connect your pharmacy POS system to unlock detailed insights on drug dispense rates, fast-moving items, and reorder forecasting.</p>
             <button className="px-6 py-2 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-50 transition-colors">
               Configure Integration
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Reports;
