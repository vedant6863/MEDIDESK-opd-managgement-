import React from 'react';

const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed':
      return 'text-emerald-600 font-medium';
    case 'In Progress':
      return 'text-blue-600 font-medium';
    case 'Waiting':
      return 'text-amber-500 font-medium';
    default:
      return 'text-slate-600';
  }
};

const AppointmentTable = () => {
  const appointments = [
    { id: 'C001-001', patient: 'Rameshbhai Patel', time: '09:00', doctor: 'Dr. Valaki', status: 'Completed', payment: 'Paid' },
    { id: 'C002-001', patient: 'Sneha Shah', time: '09:10', doctor: 'Dr. Valaki', status: 'In Progress', payment: 'Pending' },
    { id: 'C003-001', patient: 'Mahesh Kumar', time: '09:20', doctor: 'Dr. Valaki', status: 'Waiting', payment: '—' },
  ];

  return (
    <div className="mt-10">
      <div className="bg-[#e2e4e8] border border-slate-300 px-4 py-2.5 mb-0 rounded-t-md">
        <h2 className="font-bold text-slate-800 text-sm tracking-wide">Recent Appointments</h2>
      </div>
      
      <div className="w-full overflow-x-auto border-x border-b border-slate-300 rounded-b-md shadow-sm">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
          <thead className="bg-[#e2e4e8] text-slate-800 text-xs font-bold uppercase">
            <tr>
              <th className="px-5 py-3 border-r border-y border-slate-300 w-32">Case No.</th>
              <th className="px-5 py-3 border-r border-y border-slate-300">Patient</th>
              <th className="px-5 py-3 border-r border-y border-slate-300 w-24 text-center">Time</th>
              <th className="px-5 py-3 border-r border-y border-slate-300">Doctor</th>
              <th className="px-5 py-3 border-r border-y border-slate-300 w-32 text-center">Status</th>
              <th className="px-5 py-3 border-y border-slate-300 w-28 text-center">Payment</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {appointments.map((appt, index) => (
              <tr 
                key={appt.id} 
                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors duration-150 ${index === appointments.length - 1 ? 'border-none' : ''}`}
              >
                <td className="px-5 py-3.5 border-r border-slate-200 text-slate-700">{appt.id}</td>
                <td className="px-5 py-3.5 border-r border-slate-200 font-medium text-slate-800">{appt.patient}</td>
                <td className="px-5 py-3.5 border-r border-slate-200 text-center">{appt.time}</td>
                <td className="px-5 py-3.5 border-r border-slate-200">{appt.doctor}</td>
                <td className={`px-5 py-3.5 border-r border-slate-200 text-center ${getStatusStyle(appt.status)}`}>{appt.status}</td>
                <td className="px-5 py-3.5 text-center">{appt.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
