import React from 'react';
import KpiCard from '../../components/admin/KpiCard';
import AppointmentTable from '../../components/admin/AppointmentTable';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// Mock Data for Charts
const patientVolumeData = [
  { name: 'Mon', patients: 45 },
  { name: 'Tue', patients: 52 },
  { name: 'Wed', patients: 38 },
  { name: 'Thu', patients: 65 },
  { name: 'Fri', patients: 48 },
  { name: 'Sat', patients: 70 },
  { name: 'Sun', patients: 20 },
];

const revenueData = [
  { name: 'Consultations', value: 45000 },
  { name: 'Lab Tests', value: 28000 },
  { name: 'Procedures', value: 35000 },
  { name: 'Medicines', value: 12000 },
];

const COLORS = ['#1e293b', '#3b82f6', '#10b981', '#f59e0b']; // Slate, Blue, Emerald, Amber

const DashboardContent = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight">
        Overview – Today's Summary
      </h1>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <KpiCard title="Total Patients" value="1,248" />
        <KpiCard title="Today's Appts" value="34" />
        <KpiCard 
          title="Today's Revenue" 
          value="18,500" 
          prefixIcon={<span className="inline-block w-4 h-4 bg-slate-800 rounded-sm"></span>} 
        />
        <KpiCard title="Active Staff" value="6" />
        <KpiCard title="Pending F/U" value="12" />
        <KpiCard title="Drug Alerts" value="3" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-slate-200 h-[350px] flex flex-col rounded-lg hover:shadow-md transition-shadow duration-300 relative shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Patient Volume – Last 7 Days</h3>
          <div className="flex-1 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={patientVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="patients" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 h-[350px] flex flex-col rounded-lg hover:shadow-md transition-shadow duration-300 relative shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Revenue Breakdown (This Month)</h3>
          <div className="flex-1 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  formatter={(value) => `₹ ${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#475569' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <AppointmentTable />
      
    </div>
  );
};

export default DashboardContent;
