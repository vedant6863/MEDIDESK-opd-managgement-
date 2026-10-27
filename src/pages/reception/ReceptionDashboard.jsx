import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceptionDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // ==========================================
  // GLOBAL STATE (Mock Database)
  // ==========================================
  const [patients, setPatients] = useState([
    { uhid: 'P03-260001', firstName: 'Rameshbhai', lastName: 'Patel', age: 45, gender: 'Male', mobile: '9876543210', address: 'Ahmedabad' },
    { uhid: 'P03-260002', firstName: 'Suresh', lastName: 'Kumar', age: 50, gender: 'Male', mobile: '9988776655', address: 'Surat' }
  ]);
  
  // A Visit represents the "OPD Consultation Event"
  const [visits, setVisits] = useState([
    { 
      visitId: 'V-1001', 
      uhid: 'P03-260001', 
      patientName: 'Rameshbhai Patel', 
      doctor: 'Dr. John Doe', 
      date: new Date().toLocaleDateString('en-GB'), 
      time: '09:15',
      status: 'In Consultation', 
      payment: 'Unpaid',
      consultData: {
        diagnosis: 'Viral Fever',
        prescription: [{ name: 'Paracetamol', dose: '500mg', freq: '1-0-1', dur: '3 Days' }],
        tests: ['CBC'],
        followUp: '05/05/2026'
      }
    },
    { 
      visitId: 'V-1002', 
      uhid: 'P03-260002', 
      patientName: 'Suresh Kumar', 
      doctor: 'Dr. Sarah Smith', 
      date: new Date().toLocaleDateString('en-GB'), 
      time: '09:00',
      status: 'Completed', 
      payment: 'Paid',
      consultData: null
    }
  ]);

  const [activePatient, setActivePatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const TABS = [
    'Dashboard',
    'Search Patient',
    'Register Patient',
    'Create OPD Visit',
    'Queue / Check-In',
    'Consult (VIEW ONLY)',
    'Lab Upload',
    'Billing',
    'My Profile'
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard':
        return <DashboardView setActiveTab={setActiveTab} visits={visits} patients={patients} />;
      case 'Search Patient':
        return <SearchPatientView patients={patients} visits={visits} searchQuery={searchQuery} setSearchQuery={setSearchQuery} activePatient={activePatient} setActivePatient={setActivePatient} setActiveTab={setActiveTab} />;
      case 'Register Patient':
        return <NewPatientView setPatients={setPatients} patients={patients} setActivePatient={setActivePatient} setActiveTab={setActiveTab} />;
      case 'Create OPD Visit':
        return <CreateVisitView activePatient={activePatient} visits={visits} setVisits={setVisits} setActiveTab={setActiveTab} />;
      case 'Queue / Check-In':
        return <QueueView visits={visits} setVisits={setVisits} setActiveTab={setActiveTab} />;
      case 'Consult (VIEW ONLY)':
        return <ConsultViewOnly activePatient={activePatient} visits={visits} setActiveTab={setActiveTab} />;
      case 'Lab Upload':
        return <LabUploadView activePatient={activePatient} visits={visits} setActiveTab={setActiveTab} />;
      case 'Billing':
        return <BillingView activePatient={activePatient} visits={visits} setVisits={setVisits} />;
      case 'My Profile':
        return <ProfileView />;
      default:
        return <div className="p-8 text-center text-slate-500">Module under construction.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f4f4f4] text-sm">
      <header className="bg-[#222222] text-white flex justify-between items-center px-6 py-3 border-b-4 border-blue-600">
        <div className="text-sm font-bold tracking-wide uppercase flex items-center">
          <span className="mr-2 text-blue-400">Reception Role</span> &gt; {activeTab}
        </div>
        <div className="flex items-center space-x-4">
          <span>Reception Desk (Kavita)</span>
          <button onClick={() => { localStorage.removeItem('userRole'); navigate('/'); }} className="text-xs font-bold text-gray-300 hover:text-white uppercase border border-gray-500 px-2 py-1">Logout</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-56 bg-[#ebebeb] border-r border-gray-300 flex flex-col pt-4 overflow-y-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-6 py-3 text-xs uppercase font-bold transition-colors ${
                activeTab === tab ? 'bg-white text-black border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-200 border-l-4 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VIEWS
// ==========================================

const DashboardView = ({ setActiveTab, visits, patients }) => {
  const unpaidCount = visits.filter(v => v.payment === 'Unpaid').length;
  
  return (
    <div className="p-6 max-w-5xl">
      <h2 className="text-lg font-bold text-black mb-4">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <button onClick={() => setActiveTab('Register Patient')} className="bg-[#333] text-white font-bold py-3 text-sm hover:bg-black">+ Register Patient</button>
        <button onClick={() => setActiveTab('Create OPD Visit')} className="bg-[#333] text-white font-bold py-3 text-sm hover:bg-black">Create OPD Visit</button>
        <button onClick={() => setActiveTab('Search Patient')} className="bg-[#333] text-white font-bold py-3 text-sm hover:bg-black">Search Patient</button>
        <button onClick={() => setActiveTab('Queue / Check-In')} className="bg-[#333] text-white font-bold py-3 text-sm hover:bg-black">Live Queue</button>
      </div>

      <div className="bg-[#f8f8f8] border border-gray-300 p-4 mb-8 flex space-x-4">
        <div className="flex-1 bg-white border border-gray-300 text-center p-4">
          <div className="text-2xl font-bold">{patients.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Patients</div>
        </div>
        <div className="flex-1 bg-white border border-gray-300 text-center p-4">
          <div className="text-2xl font-bold">{visits.length}</div>
          <div className="text-xs text-gray-500 mt-1">Today's Visits</div>
        </div>
        <div className="flex-1 bg-white border border-gray-300 text-center p-4 relative">
          <div className={`text-2xl font-bold ${unpaidCount > 0 ? 'text-red-600' : 'text-green-600'}`}>{unpaidCount}</div>
          <div className="text-xs text-gray-500 mt-1">Pending Bills</div>
        </div>
      </div>
    </div>
  );
};

const NewPatientView = ({ setPatients, patients, setActivePatient, setActiveTab }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', mobile: '', gender: 'Male', age: '', address: '' });
  const generatedId = `P03-${260000 + patients.length + 1}`;

  const handleRegister = () => {
    if (!form.firstName || !form.lastName || !form.mobile) return alert("Fill mandatory fields");
    const newPatient = { uhid: generatedId, ...form };
    setPatients([...patients, newPatient]);
    setActivePatient(newPatient);
    alert(`Patient Registered! Proceeding to create OPD Visit.`);
    setActiveTab('Create OPD Visit');
  };

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-lg font-bold text-black mb-6">Patient Registration (Generate UHID)</h2>
      <div className="bg-[#f8f8f8] border border-gray-300 mb-6">
        <div className="bg-[#e4e4e4] px-4 py-2 border-b border-gray-300 font-bold text-sm">Demographics</div>
        <div className="p-4 grid grid-cols-3 gap-6">
          <div><label className="block text-xs font-bold mb-1">First Name *</label><input type="text" className="w-full border border-gray-300 p-1.5" onChange={e=>setForm({...form, firstName: e.target.value})} /></div>
          <div><label className="block text-xs font-bold mb-1">Last Name *</label><input type="text" className="w-full border border-gray-300 p-1.5" onChange={e=>setForm({...form, lastName: e.target.value})} /></div>
          <div><label className="block text-xs font-bold mb-1">Mobile **</label><input type="text" className="w-full border border-gray-300 p-1.5 bg-yellow-50" onChange={e=>setForm({...form, mobile: e.target.value})} /></div>
          <div><label className="block text-xs font-bold mb-1">Gender *</label><select className="w-full border border-gray-300 p-1.5" onChange={e=>setForm({...form, gender: e.target.value})}><option>Male</option><option>Female</option></select></div>
          <div><label className="block text-xs font-bold mb-1">Age *</label><input type="text" className="w-full border border-gray-300 p-1.5 bg-yellow-50" onChange={e=>setForm({...form, age: e.target.value})} /></div>
          <div><label className="block text-xs font-bold mb-1">Address</label><input type="text" className="w-full border border-gray-300 p-1.5" onChange={e=>setForm({...form, address: e.target.value})} /></div>
        </div>
        <div className="bg-[#e4e4e4] px-4 py-2 border-t border-gray-300 font-bold text-sm flex items-center">
          <span className="mr-4">Generated UHID</span>
          <input type="text" className="border border-gray-300 p-1 text-xs bg-gray-100" value={generatedId} readOnly />
        </div>
      </div>
      <button className="px-8 py-2 bg-[#2c2c2c] text-white font-bold hover:bg-black" onClick={handleRegister}>Save & Create Visit</button>
    </div>
  );
};

const SearchPatientView = ({ patients, visits, searchQuery, setSearchQuery, activePatient, setActivePatient, setActiveTab }) => {
  const filteredPatients = patients.filter(p => p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || p.uhid.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6 max-w-5xl">
       <h2 className="text-lg font-bold text-black mb-6">Global Patient Search</h2>
       <div className="flex mb-6">
         <input type="text" placeholder="Search by Name or UHID" className="flex-1 border border-gray-300 p-2 text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
         <button className="bg-[#333] text-white px-8 py-2 font-bold">Search</button>
       </div>

       <div className="bg-[#f8f8f8] border border-gray-300 mb-6">
         <div className="bg-[#e4e4e4] px-4 py-2 border-b border-gray-300 font-bold text-sm">Search Results</div>
         <table className="w-full border-collapse text-xs bg-white">
           <thead className="bg-gray-100">
             <tr>
               <th className="border border-gray-300 p-2 text-left">UHID</th>
               <th className="border border-gray-300 p-2 text-left">Name</th>
               <th className="border border-gray-300 p-2 text-left">Age/Gender</th>
               <th className="border border-gray-300 p-2 text-left">Action</th>
             </tr>
           </thead>
           <tbody>
             {filteredPatients.map(p => (
              <tr key={p.uhid} className={`cursor-pointer ${activePatient?.uhid === p.uhid ? 'bg-blue-100' : 'hover:bg-gray-50'}`} onClick={() => setActivePatient(p)}>
                <td className="border border-gray-300 p-2 font-bold text-blue-600">{p.uhid}</td>
                <td className="border border-gray-300 p-2 font-bold">{p.firstName} {p.lastName}</td>
                <td className="border border-gray-300 p-2">{p.age} / {p.gender}</td>
                <td className="border border-gray-300 p-2"><button className="text-blue-600 underline text-[10px]">Select Profile</button></td>
              </tr>
             ))}
           </tbody>
         </table>
       </div>

       {activePatient && (
         <div className="bg-white border border-blue-400 p-4 shadow-sm">
           <h3 className="font-bold text-lg mb-2">{activePatient.firstName} {activePatient.lastName} <span className="text-xs text-gray-500">({activePatient.uhid})</span></h3>
           <div className="flex space-x-2 mt-4">
             <button onClick={() => setActiveTab('Create OPD Visit')} className="bg-blue-600 text-white px-4 py-1.5 text-xs font-bold">Create OPD Visit</button>
             <button onClick={() => setActiveTab('Lab Upload')} className="border border-gray-400 px-4 py-1.5 text-xs font-bold hover:bg-gray-100">Upload Lab Reports</button>
             <button onClick={() => setActiveTab('Consult (VIEW ONLY)')} className="border border-gray-400 px-4 py-1.5 text-xs font-bold hover:bg-gray-100">View Past Consults</button>
             <button onClick={() => setActiveTab('Billing')} className="border border-gray-400 px-4 py-1.5 text-xs font-bold hover:bg-gray-100">Billing</button>
           </div>
         </div>
       )}
    </div>
  );
};

const CreateVisitView = ({ activePatient, visits, setVisits, setActiveTab }) => {
  const [doctor, setDoctor] = useState('Dr. John Doe');
  
  if (!activePatient) return <div className="p-8 text-center"><p>Please select a patient in "Search Patient" first.</p><button onClick={()=>setActiveTab('Search Patient')} className="mt-4 bg-black text-white px-4 py-2">Go to Search</button></div>;

  const handleCreate = () => {
    const newVisit = {
      visitId: `V-${1000 + visits.length + 1}`,
      uhid: activePatient.uhid,
      patientName: `${activePatient.firstName} ${activePatient.lastName}`,
      doctor,
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}),
      status: 'Waiting',
      payment: 'Unpaid',
      consultData: null
    };
    setVisits([...visits, newVisit]);
    alert('Visit ID Generated! Patient added to Queue.');
    setActiveTab('Queue / Check-In');
  };

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-lg font-bold text-black mb-6">Create OPD Visit</h2>
      <div className="bg-blue-50 border border-blue-200 p-4 mb-6 text-sm">
        Creating Visit for: <strong>{activePatient.firstName} {activePatient.lastName} ({activePatient.uhid})</strong>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-bold mb-1">Assign Doctor *</label>
          <select className="w-full border border-gray-300 p-2" value={doctor} onChange={e=>setDoctor(e.target.value)}>
            <option>Dr. John Doe (General)</option>
            <option>Dr. Sarah Smith (Cardiology)</option>
          </select>
        </div>
      </div>
      <button className="px-8 py-2 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700" onClick={handleCreate}>Generate Visit & Print Token</button>
    </div>
  );
};

const QueueView = ({ visits, setVisits, setActiveTab }) => {
  const updateStatus = (id, newStatus) => {
    setVisits(visits.map(v => v.visitId === id ? {...v, status: newStatus} : v));
  };

  return (
    <div className="p-6 max-w-5xl">
       <h2 className="text-lg font-bold text-black mb-4">OPD Check-In & Queue Control</h2>
       <p className="text-xs text-gray-500 mb-6">Manage patient flow before the doctor sees them.</p>

       <table className="w-full border-collapse border border-gray-300 text-xs bg-white">
        <thead className="bg-[#e4e4e4]">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Visit ID</th>
            <th className="border border-gray-300 p-2 text-left">Patient</th>
            <th className="border border-gray-300 p-2 text-left">Doctor</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Queue Action</th>
          </tr>
        </thead>
        <tbody>
          {visits.map(v => (
            <tr key={v.visitId}>
              <td className="border border-gray-300 p-2 font-bold text-blue-600">{v.visitId}</td>
              <td className="border border-gray-300 p-2 font-bold">{v.patientName} <span className="text-[10px] text-gray-500">({v.uhid})</span></td>
              <td className="border border-gray-300 p-2">{v.doctor}</td>
              <td className="border border-gray-300 p-2">
                <span className={`px-2 py-0.5 border text-[10px] uppercase font-bold ${
                  v.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                  v.status === 'In Consultation' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {v.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                {v.status === 'Waiting' && (
                  <button onClick={() => updateStatus(v.visitId, 'In Consultation')} className="bg-green-600 text-white px-2 py-1 text-[10px] font-bold">Send to Doctor</button>
                )}
                {v.status === 'In Consultation' && (
                  <button onClick={() => updateStatus(v.visitId, 'Completed')} className="bg-gray-600 text-white px-2 py-1 text-[10px] font-bold">Mark Completed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ConsultViewOnly = ({ activePatient, visits }) => {
  if (!activePatient) return <div className="p-8 text-center"><p>Select a patient in "Search Patient".</p></div>;
  const patientVisits = visits.filter(v => v.uhid === activePatient.uhid && v.status === 'Completed' && v.consultData);

  return (
    <div className="p-6 max-w-5xl">
       <h2 className="text-lg font-bold text-black mb-2">Consult Forms (VIEW ONLY)</h2>
       <p className="text-xs text-red-600 mb-6 border border-red-200 bg-red-50 p-2 inline-block">
         ⚠️ Reception Role: You can view and print prescriptions, but cannot edit clinical data.
       </p>
       
       {patientVisits.length === 0 ? (
         <p className="text-sm text-gray-500">No completed consultations found for this patient.</p>
       ) : (
         patientVisits.map(v => (
           <div key={v.visitId} className="border border-gray-300 mb-4 bg-white p-4">
             <div className="flex justify-between border-b border-gray-200 pb-2 mb-4">
               <strong>Visit: {v.visitId} | Doctor: {v.doctor}</strong>
               <span className="text-gray-500 text-xs">{v.date}</span>
             </div>
             <div className="grid grid-cols-2 gap-4 text-xs">
               <div>
                 <strong className="text-gray-500 uppercase block mb-1">Diagnosis</strong>
                 <p className="font-bold">{v.consultData.diagnosis}</p>
               </div>
               <div>
                 <strong className="text-gray-500 uppercase block mb-1">Follow-up</strong>
                 <p>{v.consultData.followUp}</p>
               </div>
               <div className="col-span-2 mt-2">
                 <strong className="text-gray-500 uppercase block mb-1">Prescription</strong>
                 <table className="w-full border border-gray-200">
                   <thead className="bg-gray-50"><tr><th className="p-1">Medicine</th><th className="p-1">Dose</th><th className="p-1">Freq</th><th className="p-1">Dur</th></tr></thead>
                   <tbody>
                     {v.consultData.prescription.map((m, i) => <tr key={i}><td className="p-1 border-t">{m.name}</td><td className="p-1 border-t">{m.dose}</td><td className="p-1 border-t">{m.freq}</td><td className="p-1 border-t">{m.dur}</td></tr>)}
                   </tbody>
                 </table>
               </div>
               <div className="col-span-2 mt-2">
                 <strong className="text-gray-500 uppercase block mb-1">Recommended Labs</strong>
                 <p>{v.consultData.tests.join(', ')}</p>
               </div>
             </div>
             <div className="mt-4 text-right">
               <button className="bg-[#333] text-white px-4 py-1 text-xs">Print Rx</button>
             </div>
           </div>
         ))
       )}
    </div>
  );
};

const LabUploadView = ({ activePatient, visits }) => {
  const [selectedVisit, setSelectedVisit] = useState('');
  if (!activePatient) return <div className="p-8 text-center"><p>Select a patient in "Search Patient".</p></div>;
  
  const patientVisits = visits.filter(v => v.uhid === activePatient.uhid);

  return (
    <div className="p-6 max-w-5xl">
       <h2 className="text-lg font-bold text-black mb-6">Lab Report Upload (Reception)</h2>

       <div className="bg-yellow-50 border border-yellow-300 p-4 mb-6">
         <h3 className="font-bold text-sm text-yellow-800 mb-2">1. Link to Visit (MANDATORY)</h3>
         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-xs font-bold mb-1">Select Visit ID</label>
             <select className="w-full border border-gray-300 p-2 bg-white" value={selectedVisit} onChange={e=>setSelectedVisit(e.target.value)}>
               <option value="">-- Choose Visit --</option>
               {patientVisits.map(v => <option key={v.visitId} value={v.visitId}>{v.visitId} ({v.date}) - {v.doctor}</option>)}
             </select>
           </div>
         </div>
       </div>

       <div className="bg-[#f8f8f8] border border-gray-300 p-4 mb-6">
         <h3 className="font-bold text-sm mb-4">2. Test Details & File Upload</h3>
         <div className="grid grid-cols-3 gap-4 mb-4">
           <div><label className="block text-xs font-bold mb-1">Test Name</label><select className="w-full border border-gray-300 p-1.5 text-xs"><option>CBC</option><option>X-Ray</option></select></div>
           <div><label className="block text-xs font-bold mb-1">Test Date</label><input type="date" className="w-full border border-gray-300 p-1.5 text-xs" /></div>
           <div><label className="block text-xs font-bold mb-1">Lab Name</label><input type="text" className="w-full border border-gray-300 p-1.5 text-xs" /></div>
         </div>
         <div className="border border-gray-300 bg-white p-8 text-center text-gray-500 mb-4">
           [ Drag & Drop PDF Report Here ]
         </div>
         <button className={`px-6 py-2 font-bold text-white text-xs ${selectedVisit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={() => { if(selectedVisit) alert('Report Uploaded to Visit '+selectedVisit)}}>
           Upload & Link to Visit
         </button>
       </div>
    </div>
  );
};

const BillingView = ({ activePatient, visits, setVisits }) => {
  if (!activePatient) return <div className="p-8 text-center"><p>Select a patient in "Search Patient".</p></div>;
  const unpaid = visits.find(v => v.uhid === activePatient.uhid && v.payment === 'Unpaid');

  const processPayment = () => {
    setVisits(visits.map(v => v.visitId === unpaid.visitId ? {...v, payment: 'Paid'} : v));
    alert('Payment Processed for Visit ' + unpaid.visitId);
  };

  return (
    <div className="p-6 max-w-5xl">
       <h2 className="text-lg font-bold text-black mb-6">Billing</h2>
       {unpaid ? (
         <div className="bg-red-50 border border-red-300 p-4 flex justify-between items-center">
           <div>
             <strong className="text-red-800">Pending Bill for Visit: {unpaid.visitId}</strong>
             <p className="text-xs text-red-600 mt-1">Doctor: {unpaid.doctor}</p>
           </div>
           <div className="text-right">
             <div className="text-xl font-bold text-red-800 mb-2">₹ 500</div>
             <button onClick={processPayment} className="bg-red-600 text-white px-4 py-2 text-xs font-bold">Collect Payment</button>
           </div>
         </div>
       ) : (
         <div className="bg-green-50 border border-green-300 p-4 text-green-800 font-bold">No pending bills for this patient.</div>
       )}
    </div>
  );
};

// NEW: My Profile View for Reception
const ProfileView = () => {
  return (
    <div className="p-6 max-w-4xl w-full">
       <div className="bg-[#e4e4e4] px-4 py-3 border border-gray-300 font-bold text-sm text-gray-800 mb-8 flex justify-between items-center">
         <span>Reception Staff Profile & Settings</span>
         <button className="bg-black text-white px-4 py-1 text-xs font-bold border border-black hover:bg-gray-800">Edit Profile</button>
       </div>

       <div className="grid grid-cols-3 gap-8">
         {/* Profile Card */}
         <div className="col-span-1 border border-gray-300 bg-white p-6 text-center shadow-sm h-fit">
           <div className="w-24 h-24 bg-gray-200 border-2 border-gray-400 rounded-full mx-auto mb-4 overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=Kavita+Sharma&background=3b82f6&color=fff&size=100" alt="Staff Profile" className="w-full h-full object-cover" />
           </div>
           <h2 className="text-xl font-bold text-gray-800">Kavita Sharma</h2>
           <p className="text-sm text-gray-500 font-bold mb-2">Senior Receptionist</p>
           <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs px-2 py-1 inline-block mb-4">
             ID: REC-2045
           </div>
           <hr className="border-gray-200 mb-4" />
           <div className="text-left text-xs text-gray-600 space-y-2">
             <p><span className="font-bold text-gray-800">Status:</span> Active</p>
             <p><span className="font-bold text-gray-800">Joined:</span> 04 May 2023</p>
             <p><span className="font-bold text-gray-800">Access Level:</span> Front Desk</p>
           </div>
         </div>

         {/* Details */}
         <div className="col-span-2 space-y-6">
           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Personal Information</div>
             <div className="p-4 grid grid-cols-2 gap-4 text-xs">
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Full Name</label>
                 <div className="font-bold text-gray-800">Kavita Sharma</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Date of Birth</label>
                 <div className="font-bold text-gray-800">22 Nov 1992</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Email Address</label>
                 <div className="font-bold text-gray-800">kavita.s@clinic.com</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Phone Number</label>
                 <div className="font-bold text-gray-800">+91 88997 76655</div>
               </div>
             </div>
           </div>

           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Work Details</div>
             <div className="p-4 grid grid-cols-2 gap-4 text-xs">
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Shift</label>
                 <div className="font-bold text-gray-800">Morning (08:00 AM - 04:00 PM)</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Department</label>
                 <div className="font-bold text-gray-800">Front Office & Registration</div>
               </div>
             </div>
           </div>

           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Account Security</div>
             <div className="p-4 flex items-center justify-between">
               <div>
                 <div className="text-xs font-bold text-gray-800">Password</div>
                 <div className="text-[10px] text-gray-500">Last changed 12 days ago</div>
               </div>
               <button className="border border-gray-400 bg-white text-gray-800 px-4 py-1 text-xs hover:bg-gray-50">Change Password</button>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default ReceptionDashboard;
