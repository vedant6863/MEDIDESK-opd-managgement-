import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react'; // Using lucide-react for notification icon if available, otherwise fallback

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeVisit, setActiveVisit] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock OPD Queue
  const [queue, setQueue] = useState([
    {
      visitId: 'V-1001',
      uhid: 'P03-260001',
      patientName: 'Rameshbhai Patel',
      age: 45,
      gender: 'Male',
      time: '09:00 AM',
      type: 'Follow-Up',
      status: 'Waiting',
    },
    {
      visitId: 'V-1002',
      uhid: 'P03-260002',
      patientName: 'Suresh Kumar',
      age: 50,
      gender: 'Male',
      time: '09:30 AM',
      type: 'New Consult',
      status: 'In Consultation',
    }
  ]);

  // Mock Notifications
  const notifications = [
    { id: 1, message: 'Lab Report (CBC) uploaded for Rameshbhai Patel.', time: '10 mins ago', type: 'Lab' },
    { id: 2, message: 'Emergency Patient (V-1003) added to queue.', time: '30 mins ago', type: 'Emergency' },
    { id: 3, message: 'FOC Discount applied for Suresh Kumar.', time: '1 hour ago', type: 'Billing' }
  ];

  const TABS = [
    'Dashboard',
    'OPD Queue',
    'Consultation',
    'Appointment Mgmt',
    'F/U Call List',
    'Billing View',
    'Pharmacy View',
    'Reports',
    'My Profile'
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard':
      case 'OPD Queue':
        return <DashboardView queue={queue} setActiveVisit={setActiveVisit} setActiveTab={setActiveTab} />;
      case 'Consultation':
        return <ConsultationView activeVisit={activeVisit} />;
      case 'Billing View':
        return <BillingViewPanel activeVisit={activeVisit} />;
      case 'F/U Call List':
        return <FollowUpView />;
      case 'Pharmacy View':
        return <PharmacyView />;
      case 'Reports':
        return <ReportsView />;
      case 'My Profile':
        return <ProfileView />;
      default:
        return (
          <div className="p-8 text-center text-slate-500">
            <h2 className="text-xl font-bold mb-2">{activeTab} Module</h2>
            <p>This module is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-sm text-gray-800">
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
        <div className="text-xs text-gray-500">
          Doctor / {activeTab === 'Dashboard' ? 'Dashboard' : 
                    activeTab === 'OPD Queue' ? 'OPD Queue' : 
                    activeVisit ? `Patient ${activeTab} – ${activeVisit.patientName}` : activeTab}
        </div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="w-4 h-4 bg-black"></div>
          <span className="cursor-pointer font-bold">[ Profile ▼ ]</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#f0f0f0] border-r border-gray-300 flex flex-col pt-4 overflow-y-auto">
          <div className="px-6 mb-8 text-xs font-bold text-center">
            <div className="border border-gray-400 py-4 mb-2 bg-[#e4e4e4] text-gray-500">[ CLINIC LOGO ]</div>
            DOCTOR
          </div>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-left px-6 py-3 text-xs transition-colors ${
                activeTab === tab 
                  ? 'bg-[#e0e0e0] font-bold flex items-center before:content-["■"] before:mr-2' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto bg-white p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VIEWS
// ==========================================

const DashboardView = ({ queue, setActiveVisit, setActiveTab }) => {
  return (
    <div className="w-full">
       <div className="grid grid-cols-4 gap-4 mb-8">
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-3xl font-bold text-gray-800">24</div><div className="text-[10px] font-bold text-gray-500 mt-2">Total Patients</div>
         </div>
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-3xl font-bold text-gray-800">8</div><div className="text-[10px] font-bold text-gray-500 mt-2">Active Patients</div>
         </div>
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-3xl font-bold text-gray-800">14</div><div className="text-[10px] font-bold text-gray-500 mt-2">Completed</div>
         </div>
         <div className="border border-gray-300 text-center py-6 bg-white relative">
           <div className="text-3xl font-bold text-gray-800">2</div><div className="text-[10px] font-bold text-gray-500 mt-2">Canceled</div>
         </div>
       </div>

       <div className="bg-[#e4e4e4] border border-gray-300 p-2 text-xs font-bold text-gray-700 flex justify-between items-center mb-0">
         <span>Today's Schedule & OPD Queue</span>
       </div>
       
       <table className="w-full border-collapse border border-gray-300 text-xs bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Time</th>
            <th className="border border-gray-300 p-2 text-left">Token</th>
            <th className="border border-gray-300 p-2 text-left">Patient Details</th>
            <th className="border border-gray-300 p-2 text-left">Visit Type</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((visit, i) => (
            <tr key={visit.visitId} className="hover:bg-yellow-50 cursor-pointer" onClick={() => { setActiveVisit(visit); setActiveTab('Consultation'); }}>
              <td className="border border-gray-300 p-2">{visit.time}</td>
              <td className="border border-gray-300 p-2 font-bold text-center">{i + 1}</td>
              <td className="border border-gray-300 p-2 font-bold text-gray-800">
                {visit.patientName} <br/>
                <span className="text-[10px] text-gray-500 font-normal">{visit.age}Y / {visit.gender} | {visit.uhid}</span>
              </td>
              <td className="border border-gray-300 p-2 text-gray-700">{visit.type}</td>
              <td className="border border-gray-300 p-2">
                <span className={`px-2 py-1 text-[10px] font-bold ${visit.status === 'Waiting' ? 'text-yellow-700' : 'text-blue-700'}`}>
                  {visit.status}
                </span>
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button className="bg-[#2c2c2c] text-white px-4 py-1.5 text-[10px] font-bold hover:bg-black w-full uppercase tracking-wider">Start Consult</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ConsultationView = ({ activeVisit }) => {
  const [subTab, setSubTab] = useState('Prescription');

  if (!activeVisit) {
    return (
      <div className="p-8 text-center mt-10">
        <h2 className="text-xl font-bold text-red-600 mb-2">No Active Visit</h2>
        <p className="text-gray-500 mb-4">Please select a patient from the OPD Queue to start a consultation.</p>
      </div>
    );
  }

  return (
    <div className="w-full" id="printable-consult">
       <div className="bg-[#e4e4e4] px-4 py-3 border border-gray-300 font-bold text-sm text-gray-800 flex justify-between items-center mb-6">
         <span>Consultation — {activeVisit.patientName.toUpperCase()} | MRD: {activeVisit.uhid.replace('-','')}</span>
       </div>

       {/* Patient Header Summary */}
       <div className="grid grid-cols-6 gap-0 mb-8 border border-gray-300 print:hidden">
         <div className="border-r border-gray-300 p-3 text-center">
           <div className="text-[10px] font-bold text-gray-500 mb-1">Age/Gender</div>
           <div className="font-bold text-xs">{activeVisit.age}Y / {activeVisit.gender[0]}</div>
         </div>
         <div className="border-r border-gray-300 p-3 text-center">
           <div className="text-[10px] font-bold text-gray-500 mb-1">Blood Group</div>
           <div className="font-bold text-xs">B+</div>
         </div>
         <div className="border-r border-gray-300 p-3 text-center">
           <div className="text-[10px] font-bold text-gray-500 mb-1">BP</div>
           <div className="font-bold text-xs">120/80</div>
         </div>
         <div className="border-r border-gray-300 p-3 text-center">
           <div className="text-[10px] font-bold text-gray-500 mb-1">Pulse</div>
           <div className="font-bold text-xs">74 bpm</div>
         </div>
         <div className="border-r border-gray-300 p-3 text-center">
           <div className="text-[10px] font-bold text-gray-500 mb-1">Temp</div>
           <div className="font-bold text-xs">98.6 F</div>
         </div>
         <div className="p-3 text-center">
           <div className="text-[10px] font-bold text-gray-500 mb-1">Weight</div>
           <div className="font-bold text-xs">70 kg</div>
         </div>
       </div>

       {/* Consult Sub-Tabs - Hidden on print */}
       <div className="flex mb-8 print:hidden">
         {['Clinical Details', 'Investigations', 'Prescription', 'Procedures', 'Billing Summary'].map(tab => (
           <button 
             key={tab}
             onClick={() => setSubTab(tab)}
             className={`px-8 py-3 text-xs font-bold transition-colors border border-gray-300 border-r-0 last:border-r ${subTab === tab ? 'bg-black text-white border-black' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
           >
             {tab}
           </button>
         ))}
       </div>

       {/* Sub-Tab Content Routing */}
       <div className="print:block">
         {subTab === 'Prescription' && <PrescriptionTab />}
         {subTab === 'Investigations' && <InvestigationsTab />}
         {subTab === 'Patient History' && <PatientHistoryTab activeVisit={activeVisit} />}
         {subTab !== 'Prescription' && subTab !== 'Investigations' && subTab !== 'Patient History' && (
           <div className="p-8 text-center text-gray-500 bg-gray-50 border border-gray-200">
             {subTab} Content Module
           </div>
         )}
       </div>

    </div>
  );
};

const PrescriptionTab = () => {
  const handlePrint = () => {
    window.print(); // Simple print trigger for the browser
  };

  return (
    <div className="grid grid-cols-2 gap-6 print:grid-cols-1 print:block">
      {/* Auto-suggest Drug DB */}
      <datalist id="drug-db">
        <option value="Tab. Paracetamol 500mg" />
        <option value="Tab. Azithromycin 250mg" />
        <option value="Syr. Amoxicillin 125mg/5ml" />
        <option value="Cap. Omeprazole 20mg" />
        <option value="Inj. Diclofenac 75mg" />
      </datalist>

      {/* Left Column: Notes & Findings */}
      <div className="pr-6">
        <h3 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Diagnosis & Notes</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-gray-600 mb-1">Chief Complaints</h4>
            <textarea className="w-full border border-gray-300 p-2 text-xs h-20 print:border-none print:h-auto print:resize-none bg-gray-50" placeholder="Patient symptoms..."></textarea>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-600 mb-1">Clinical Findings</h4>
            <textarea className="w-full border border-gray-300 p-2 text-xs h-20 print:border-none print:h-auto print:resize-none bg-gray-50" placeholder="Doctor's observations..."></textarea>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-600 mb-1">Diagnosis</h4>
            <input type="text" className="w-full border border-gray-300 p-2 text-xs font-bold bg-gray-50 print:bg-transparent print:border-none" placeholder="Primary Diagnosis" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-600 mb-1">Doctor Notes / Diet / Advice</h4>
            <textarea className="w-full border border-gray-300 p-2 text-xs h-20 print:border-none print:h-auto print:resize-none bg-gray-50" placeholder="Rest advice..."></textarea>
          </div>
        </div>
      </div>

      {/* Right Column: Rx Details */}
      <div className="border-l border-gray-300 pl-6">
        {/* Rx Input Form - Hidden on Print */}
        <div className="print:hidden">
          <h3 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Rx / Medication Details</h3>
          <div className="bg-gray-50 p-4 border border-gray-200 mb-6">
            <div className="grid grid-cols-10 gap-2 items-end mb-2">
              <div className="col-span-3">
                <label className="block text-[10px] text-gray-500 mb-1">Medicine Name</label>
                <input list="drug-db" className="w-full border border-gray-300 p-1.5 text-xs bg-white" placeholder="Search..." />
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Type</label>
                <select className="w-full border border-gray-300 p-1.5 text-xs bg-white"><option>Tab</option><option>Syr</option><option>Inj</option></select>
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Route</label>
                <select className="w-full border border-gray-300 p-1.5 text-xs bg-white"><option>Oral</option><option>IV</option></select>
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Dose</label>
                <input type="text" className="w-full border border-gray-300 p-1.5 text-xs bg-white" placeholder="1 Tab" />
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Freq</label>
                <select className="w-full border border-gray-300 p-1.5 text-xs bg-white"><option>1-1-1</option><option>1-0-1</option></select>
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Duration</label>
                <input type="text" className="w-full border border-gray-300 p-1.5 text-xs bg-white" placeholder="Days" />
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Instruction</label>
                <select className="w-full border border-gray-300 p-1.5 text-xs bg-white"><option>AFM</option><option>BFM</option></select>
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] text-gray-500 mb-1">Action</label>
                <button className="bg-black text-white p-1.5 text-xs w-full font-bold">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Prescribed List - Shown on Print */}
        <h3 className="text-sm font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">Prescribed Medicines List</h3>
        <table className="w-full border-collapse border border-gray-300 text-[10px] bg-white mb-8">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="border border-gray-300 p-2 text-left font-normal">Medicine Name</th>
              <th className="border border-gray-300 p-2 text-left font-normal">Type</th>
              <th className="border border-gray-300 p-2 text-left font-normal">Route</th>
              <th className="border border-gray-300 p-2 text-left font-normal">Dose</th>
              <th className="border border-gray-300 p-2 text-left font-normal">Freq</th>
              <th className="border border-gray-300 p-2 text-left font-normal">Dur.</th>
              <th className="border border-gray-300 p-2 text-left font-normal">Inst.</th>
              <th className="border border-gray-300 p-2 text-center font-normal print:hidden">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2 font-bold text-gray-800">Paracetamol 500mg</td>
              <td className="border border-gray-300 p-2">Tab</td>
              <td className="border border-gray-300 p-2">Oral</td>
              <td className="border border-gray-300 p-2">1 Tab</td>
              <td className="border border-gray-300 p-2">1-1-1</td>
              <td className="border border-gray-300 p-2">3 Days</td>
              <td className="border border-gray-300 p-2">AFM</td>
              <td className="border border-gray-300 p-2 text-center text-red-600 font-bold cursor-pointer print:hidden">🗑</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2 font-bold text-gray-800">Omeprazole 20mg</td>
              <td className="border border-gray-300 p-2">Cap</td>
              <td className="border border-gray-300 p-2">Oral</td>
              <td className="border border-gray-300 p-2">1 Cap</td>
              <td className="border border-gray-300 p-2">1-0-0</td>
              <td className="border border-gray-300 p-2">5 Days</td>
              <td className="border border-gray-300 p-2">BFM</td>
              <td className="border border-gray-300 p-2 text-center text-red-600 font-bold cursor-pointer print:hidden">🗑</td>
            </tr>
          </tbody>
        </table>

        <button onClick={handlePrint} className="w-full bg-[#111] text-white font-bold py-3 uppercase tracking-wider hover:bg-black print:hidden mt-auto">
          Print & Complete Consultation
        </button>
      </div>
    </div>
  );
};

const InvestigationsTab = () => {
  return (
    <div>
      <div className="bg-[#fff9e6] border border-yellow-200 p-4 mb-8">
        <h3 className="font-bold text-sm text-gray-800 mb-4">Doctor's Lab Test Recommendations</h3>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center text-xs"><input type="checkbox" className="mr-2" defaultChecked/> CBC</label>
          <label className="flex items-center text-xs"><input type="checkbox" className="mr-2" /> LFT</label>
          <label className="flex items-center text-xs"><input type="checkbox" className="mr-2" /> KFT</label>
          <label className="flex items-center text-xs"><input type="checkbox" className="mr-2" /> Thyroid</label>
          <label className="flex items-center text-xs"><input type="checkbox" className="mr-2" /> X-Ray</label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left: Scanned Reports Grid */}
        <div className="border-r border-gray-300 pr-8">
          <h3 className="text-sm font-bold text-gray-800 mb-4 bg-gray-100 p-2 border border-gray-300">Upload Scanned Reports (Reception Side)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-dashed border-gray-400 p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[120px] cursor-pointer hover:bg-gray-100">
              <span className="text-2xl mb-2">📄</span>
              <span className="text-xs font-bold text-blue-600">CBC Report.pdf</span>
            </div>
            <div className="border border-dashed border-gray-400 p-4 text-center bg-gray-50 flex flex-col items-center justify-center min-h-[120px] cursor-pointer hover:bg-gray-100">
              <span className="text-2xl mb-2">🖼️</span>
              <span className="text-xs font-bold text-blue-600">Chest X-Ray.png</span>
            </div>
          </div>
        </div>

        {/* Right: Manual Entry Table */}
        <div className="pl-0">
          <h3 className="text-sm font-bold text-gray-800 mb-4 bg-gray-100 p-2 border border-gray-300">Enter Key Parameters (Manual Entry)</h3>
          <table className="w-full border-collapse border border-gray-300 text-xs bg-white">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="border border-gray-300 p-2 text-left font-normal">Parameter</th>
                <th className="border border-gray-300 p-2 text-left font-normal">Value</th>
                <th className="border border-gray-300 p-2 text-left font-normal">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-bold">Haemoglobin</td><td className="border border-gray-300 p-2 text-red-600 font-bold">10.5</td><td className="border border-gray-300 p-2">g/dL</td></tr>
              <tr><td className="border border-gray-300 p-2 font-bold">WBC</td><td className="border border-gray-300 p-2">8500</td><td className="border border-gray-300 p-2">cumm</td></tr>
              <tr><td className="border border-gray-300 p-2 font-bold">Platelet</td><td className="border border-gray-300 p-2">2.1</td><td className="border border-gray-300 p-2">Lacs</td></tr>
              <tr><td className="border border-gray-300 p-2 font-bold">SGPT</td><td className="border border-gray-300 p-2">45</td><td className="border border-gray-300 p-2">U/L</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// NEW: Patient History Tab
const PatientHistoryTab = ({ activeVisit }) => {
  return (
    <div className="p-4 bg-white border border-gray-300">
      <h3 className="font-bold text-sm mb-4 text-blue-800">Historical Clinical Data — {activeVisit.patientName}</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold bg-gray-100 p-2 border-l-4 border-blue-600 mb-2">Past Diagnoses</h4>
          <ul className="text-xs space-y-2 list-disc pl-4 text-gray-700">
            <li><span className="font-bold">Viral Fever</span> (15/03/2026)</li>
            <li><span className="font-bold">Migraine</span> (10/01/2025)</li>
            <li><span className="font-bold">Hypertension</span> (Chronic - Diagnosed 2022)</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold bg-gray-100 p-2 border-l-4 border-green-600 mb-2">Allergies & Alerts</h4>
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-2 font-bold">
            Allergic to Penicillin (Severe Anaphylaxis)
          </div>
        </div>
      </div>

      <h4 className="text-xs font-bold bg-gray-100 p-2 border-l-4 border-purple-600 mt-6 mb-2">Previous Prescriptions & Visits</h4>
      <table className="w-full border-collapse border border-gray-300 text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Date</th>
            <th className="border border-gray-300 p-2 text-left">Doctor</th>
            <th className="border border-gray-300 p-2 text-left">Diagnosis</th>
            <th className="border border-gray-300 p-2 text-left">Medicines</th>
            <th className="border border-gray-300 p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">15/03/2026</td>
            <td className="border border-gray-300 p-2">Dr. John Doe</td>
            <td className="border border-gray-300 p-2">Viral Fever</td>
            <td className="border border-gray-300 p-2 text-[10px] text-gray-500">Paracetamol 500mg, Azithromycin</td>
            <td className="border border-gray-300 p-2"><button className="text-blue-600 underline text-[10px]">View/Print</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const BillingViewPanel = ({ activeVisit }) => {
  return (
    <div className="w-full">
       <div className="bg-[#e4e4e4] px-4 py-3 border border-gray-300 font-bold text-sm text-gray-800 mb-8">
         Billing Summary — RAMESHBHAI M. PATEL | MRD: P03-260001
       </div>

       <div className="grid grid-cols-4 gap-4 mb-8">
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-xl font-bold text-gray-800 mb-1">■ 2,300</div><div className="text-[10px] text-gray-500">Today's Bill</div>
         </div>
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-xl font-bold text-gray-800 mb-1">■ 8,700</div><div className="text-[10px] text-gray-500">Monthly Bill</div>
         </div>
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-xl font-bold text-gray-800 mb-1">■ 34,200</div><div className="text-[10px] text-gray-500">Yearly Bill</div>
         </div>
         <div className="border border-gray-300 text-center py-6 bg-white">
           <div className="text-xl font-bold text-gray-800 mb-1">■ 52,400</div><div className="text-[10px] text-gray-500">Total Bill</div>
         </div>
       </div>

       <div className="bg-[#e4e4e4] border border-gray-300 p-2 text-xs font-bold text-gray-700 mb-0 relative">
         Service-wise Billing Breakdown
         <div className="absolute right-[-1px] top-6 bg-[#fff9e6] text-[9px] p-2 border border-yellow-300 text-yellow-800 w-48 shadow-sm font-normal">
           Consultation billing and Procedure billing shown separately.
         </div>
       </div>
       
       <table className="w-full border-collapse border border-gray-300 text-xs bg-white mb-10">
         <thead className="bg-gray-100 text-gray-600">
           <tr>
             <th className="border border-gray-300 p-2 text-left font-normal">Date</th>
             <th className="border border-gray-300 p-2 text-left font-normal">Service</th>
             <th className="border border-gray-300 p-2 text-left font-normal">Gross</th>
             <th className="border border-gray-300 p-2 text-left font-normal">Disc</th>
             <th className="border border-gray-300 p-2 text-left font-normal relative">
               {/* Empty header intentionally as per wireframe */}
               <div className="absolute left-0 top-8 bg-[#fff9e6] text-[9px] p-2 border border-yellow-300 text-yellow-800 w-48 shadow-sm font-normal normal-case">
                 Discount/FOC only applied by Doctor or Admin.
               </div>
             </th>
             <th className="border border-gray-300 p-2 text-left font-normal">Status</th>
           </tr>
         </thead>
         <tbody>
           <tr><td className="border border-gray-300 p-2 text-gray-600">13/04/2026</td><td className="border border-gray-300 p-2">Consultation - Dr. Valaki</td><td className="border border-gray-300 p-2">■ 500</td><td className="border border-gray-300 p-2">-</td><td className="border border-gray-300 p-2">■ 500</td><td className="border border-gray-300 p-2">UPI | Paid</td></tr>
           <tr><td className="border border-gray-300 p-2 text-gray-600">13/04/2026</td><td className="border border-gray-300 p-2">Hair Removal - Session 2</td><td className="border border-gray-300 p-2">■ 2,000</td><td className="border border-gray-300 p-2">10%</td><td className="border border-gray-300 p-2">■ 1,800</td><td className="border border-gray-300 p-2">UPI | Paid</td></tr>
           <tr><td className="border border-gray-300 p-2 text-gray-600">15/03/2026</td><td className="border border-gray-300 p-2">Consultation - Dr. Valaki</td><td className="border border-gray-300 p-2">■ 500</td><td className="border border-gray-300 p-2">100%</td><td className="border border-gray-300 p-2">■ 0</td><td className="border border-gray-300 p-2">FOC | ✓</td></tr>
         </tbody>
       </table>

       <div className="bg-[#e4e4e4] border border-gray-300 p-2 text-xs font-bold text-gray-700 mb-0">
         FOC / Discount Actions (Doctor Only)
       </div>
       <div className="border border-t-0 border-gray-300 p-6 mb-2">
         <div className="grid grid-cols-3 gap-6 mb-6">
           <div><label className="block text-xs text-gray-500 mb-1">Apply Discount (%)</label><input type="text" className="w-full border border-gray-300 p-2 text-xs bg-white" /></div>
           <div><label className="block text-xs text-gray-500 mb-1">Mark as FOC</label><input type="text" className="w-full border border-gray-300 p-2 text-xs bg-white" placeholder="Yes / No" /></div>
           <div><label className="block text-xs text-gray-500 mb-1">Reason</label><input type="text" className="w-full border border-gray-300 p-2 text-xs bg-white" /></div>
         </div>
         <button className="bg-[#2c2c2c] text-white font-bold text-xs px-10 py-3 hover:bg-black uppercase tracking-wider">APPLY & NOTIFY RECEPTION</button>
       </div>
       <p className="text-[10px] text-gray-500 mt-4">* A pop-up notification will automatically appear at Reception billing counter when FOC or discount is applied.</p>
    </div>
  );
};

// NEW: Follow Up Call List View
const FollowUpView = () => {
  return (
    <div className="p-4 max-w-5xl">
       <h2 className="text-sm font-bold text-black mb-4 bg-[#e4e4e4] p-2 border border-gray-300 flex justify-between items-center">
         <span>Scheduled Follow-Ups for Today ({new Date().toLocaleDateString()})</span>
       </h2>
       <table className="w-full border-collapse border border-gray-300 text-xs bg-white mb-6">
         <thead className="bg-gray-100">
           <tr>
             <th className="border border-gray-300 p-2 text-left">UHID</th>
             <th className="border border-gray-300 p-2 text-left">Patient Name</th>
             <th className="border border-gray-300 p-2 text-left">Mobile</th>
             <th className="border border-gray-300 p-2 text-left">Previous Diagnosis</th>
             <th className="border border-gray-300 p-2 text-left">Notes</th>
             <th className="border border-gray-300 p-2 text-left">Action</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td className="border border-gray-300 p-2 font-bold text-blue-700">P03-260005</td>
             <td className="border border-gray-300 p-2">Kavita Sharma</td>
             <td className="border border-gray-300 p-2">9876543210</td>
             <td className="border border-gray-300 p-2">Typhoid Recovery</td>
             <td className="border border-gray-300 p-2 text-gray-500">Check repeat Widal test.</td>
             <td className="border border-gray-300 p-2">
               <button className="bg-green-600 text-white px-2 py-1 text-[10px] rounded mr-1">Called</button>
               <button className="bg-blue-600 text-white px-2 py-1 text-[10px] rounded">Add to Queue</button>
             </td>
           </tr>
         </tbody>
       </table>
    </div>
  );
};

// NEW: Pharmacy View (Master Database reference)
const PharmacyView = () => {
  return (
    <div className="p-4 max-w-5xl">
       <h2 className="text-sm font-bold text-black mb-4 bg-[#e4e4e4] p-2 border border-gray-300 flex justify-between items-center">
         <span>Drug Master Database (Used for Auto-Suggestion)</span>
         <button className="bg-[#333] text-white px-3 py-1 text-[10px] hover:bg-black">+ Add New Drug</button>
       </h2>
       <div className="flex mb-4">
         <input type="text" placeholder="Search drug..." className="border border-gray-300 p-2 text-xs flex-1" />
         <button className="bg-blue-600 text-white px-6 font-bold text-xs">Search</button>
       </div>
       <table className="w-full border-collapse border border-gray-300 text-xs bg-white">
         <thead className="bg-gray-100">
           <tr>
             <th className="border border-gray-300 p-2 text-left">Drug Name</th>
             <th className="border border-gray-300 p-2 text-left">Generic Name</th>
             <th className="border border-gray-300 p-2 text-left">Type</th>
             <th className="border border-gray-300 p-2 text-left">Stock Alert</th>
           </tr>
         </thead>
         <tbody>
           <tr><td className="border border-gray-300 p-2 font-bold">Tab. Paracetamol 500mg</td><td className="border border-gray-300 p-2 text-gray-500">Acetaminophen</td><td className="border border-gray-300 p-2">Tablet</td><td className="border border-gray-300 p-2 text-green-600">In Stock</td></tr>
           <tr><td className="border border-gray-300 p-2 font-bold">Syr. Amoxicillin 125mg</td><td className="border border-gray-300 p-2 text-gray-500">Amoxicillin</td><td className="border border-gray-300 p-2">Syrup</td><td className="border border-gray-300 p-2 text-red-600 font-bold">Low Stock</td></tr>
           <tr><td className="border border-gray-300 p-2 font-bold">Cap. Omeprazole 20mg</td><td className="border border-gray-300 p-2 text-gray-500">Omeprazole</td><td className="border border-gray-300 p-2">Capsule</td><td className="border border-gray-300 p-2 text-green-600">In Stock</td></tr>
         </tbody>
       </table>
    </div>
  );
};

// NEW: Reports View (Analytics Dashboard)
const ReportsView = () => {
  return (
    <div className="w-full">
       <div className="bg-[#e4e4e4] px-4 py-3 border border-gray-300 font-bold text-sm text-gray-800 flex justify-between items-center mb-8">
         <span>Doctor Clinical Analytics & Reports</span>
         <div className="space-x-2">
           <select className="border border-gray-400 p-1 text-xs bg-white text-black"><option>This Month (May 2026)</option><option>Last Month (April 2026)</option><option>This Year (2026)</option></select>
           <button className="bg-black text-white px-4 py-1 text-xs font-bold border border-black hover:bg-gray-800">Export PDF</button>
         </div>
       </div>

       {/* Top KPIs */}
       <div className="grid grid-cols-4 gap-4 mb-8">
         <div className="border border-gray-300 bg-white p-4">
           <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Total Consultations</div>
           <div className="text-3xl font-bold text-gray-800">342</div>
           <div className="text-xs text-green-600 mt-2 font-bold">▲ 12% from last month</div>
         </div>
         <div className="border border-gray-300 bg-white p-4">
           <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">New vs Follow-Up</div>
           <div className="text-3xl font-bold text-gray-800">60 / 40<span className="text-sm text-gray-400 font-normal">%</span></div>
           <div className="text-xs text-gray-500 mt-2">Healthy ratio</div>
         </div>
         <div className="border border-gray-300 bg-white p-4">
           <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Consultation Revenue</div>
           <div className="text-3xl font-bold text-gray-800">₹ 85K</div>
           <div className="text-xs text-green-600 mt-2 font-bold">▲ 5% from last month</div>
         </div>
         <div className="border border-gray-300 bg-white p-4">
           <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">FOC / Discounts Given</div>
           <div className="text-3xl font-bold text-red-600">12</div>
           <div className="text-xs text-gray-500 mt-2">Total ₹ 6,000 waived</div>
         </div>
       </div>

       <div className="grid grid-cols-2 gap-8 mb-8">
         {/* Top Diagnoses Table */}
         <div>
           <div className="bg-[#e4e4e4] border border-gray-300 p-2 text-xs font-bold text-gray-700 mb-0">
             Top 5 Clinical Diagnoses (This Month)
           </div>
           <table className="w-full border-collapse border border-gray-300 text-xs bg-white">
             <thead className="bg-gray-100 text-gray-600">
               <tr>
                 <th className="border border-gray-300 p-2 text-left font-normal">Diagnosis Code / Name</th>
                 <th className="border border-gray-300 p-2 text-left font-normal">Patient Count</th>
                 <th className="border border-gray-300 p-2 text-left font-normal">Trend</th>
               </tr>
             </thead>
             <tbody>
               <tr><td className="border border-gray-300 p-2 font-bold">Viral Upper Respiratory Infection</td><td className="border border-gray-300 p-2">124</td><td className="border border-gray-300 p-2 text-red-500">▲ High</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold">Essential Hypertension</td><td className="border border-gray-300 p-2">86</td><td className="border border-gray-300 p-2 text-gray-500">▶ Stable</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold">Type 2 Diabetes Mellitus</td><td className="border border-gray-300 p-2">65</td><td className="border border-gray-300 p-2 text-gray-500">▶ Stable</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold">Acute Gastroenteritis</td><td className="border border-gray-300 p-2">42</td><td className="border border-gray-300 p-2 text-red-500">▲ High</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold">Migraine without Aura</td><td className="border border-gray-300 p-2">25</td><td className="border border-gray-300 p-2 text-green-500">▼ Low</td></tr>
             </tbody>
           </table>
         </div>

         {/* Most Prescribed Medicines */}
         <div>
           <div className="bg-[#e4e4e4] border border-gray-300 p-2 text-xs font-bold text-gray-700 mb-0">
             Most Prescribed Medicines
           </div>
           <table className="w-full border-collapse border border-gray-300 text-xs bg-white">
             <thead className="bg-gray-100 text-gray-600">
               <tr>
                 <th className="border border-gray-300 p-2 text-left font-normal">Medicine Name</th>
                 <th className="border border-gray-300 p-2 text-left font-normal">Type</th>
                 <th className="border border-gray-300 p-2 text-left font-normal">Times Prescribed</th>
               </tr>
             </thead>
             <tbody>
               <tr><td className="border border-gray-300 p-2 font-bold text-blue-700">Tab. Paracetamol 500mg</td><td className="border border-gray-300 p-2">Tablet</td><td className="border border-gray-300 p-2 font-bold">180</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold text-blue-700">Tab. Azithromycin 250mg</td><td className="border border-gray-300 p-2">Tablet</td><td className="border border-gray-300 p-2 font-bold">95</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold text-blue-700">Cap. Omeprazole 20mg</td><td className="border border-gray-300 p-2">Capsule</td><td className="border border-gray-300 p-2 font-bold">85</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold text-blue-700">Syr. Amoxicillin 125mg/5ml</td><td className="border border-gray-300 p-2">Syrup</td><td className="border border-gray-300 p-2 font-bold">60</td></tr>
               <tr><td className="border border-gray-300 p-2 font-bold text-blue-700">Tab. Cetirizine 10mg</td><td className="border border-gray-300 p-2">Tablet</td><td className="border border-gray-300 p-2 font-bold">45</td></tr>
             </tbody>
           </table>
         </div>
       </div>

    </div>
  );
};

// NEW: My Profile View
const ProfileView = () => {
  return (
    <div className="max-w-4xl w-full">
       <div className="bg-[#e4e4e4] px-4 py-3 border border-gray-300 font-bold text-sm text-gray-800 mb-8 flex justify-between items-center">
         <span>Doctor Profile & Settings</span>
         <button className="bg-black text-white px-4 py-1 text-xs font-bold border border-black hover:bg-gray-800">Edit Profile</button>
       </div>

       <div className="grid grid-cols-3 gap-8">
         {/* Profile Card */}
         <div className="col-span-1 border border-gray-300 bg-white p-6 text-center shadow-sm">
           <div className="w-24 h-24 bg-gray-200 border-2 border-gray-400 rounded-full mx-auto mb-4 overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=John+Doe&background=2c3e50&color=fff&size=100" alt="Doctor Profile" className="w-full h-full object-cover" />
           </div>
           <h2 className="text-xl font-bold text-gray-800">Dr. John Doe</h2>
           <p className="text-sm text-gray-500 font-bold mb-2">General Physician</p>
           <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-2 py-1 inline-block mb-4">
             ID: DOC-1029
           </div>
           <hr className="border-gray-200 mb-4" />
           <div className="text-left text-xs text-gray-600 space-y-2">
             <p><span className="font-bold text-gray-800">Status:</span> Active</p>
             <p><span className="font-bold text-gray-800">Joined:</span> 12 Jan 2024</p>
             <p><span className="font-bold text-gray-800">Access Level:</span> Clinical</p>
           </div>
         </div>

         {/* Details Details */}
         <div className="col-span-2 space-y-6">
           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Personal Information</div>
             <div className="p-4 grid grid-cols-2 gap-4 text-xs">
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Full Name</label>
                 <div className="font-bold text-gray-800">Dr. John Doe</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Date of Birth</label>
                 <div className="font-bold text-gray-800">14 Aug 1985</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Email Address</label>
                 <div className="font-bold text-gray-800">dr.john.doe@clinic.com</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Phone Number</label>
                 <div className="font-bold text-gray-800">+91 98765 43210</div>
               </div>
             </div>
           </div>

           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Professional Credentials</div>
             <div className="p-4 grid grid-cols-2 gap-4 text-xs">
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Medical Registration No.</label>
                 <div className="font-bold text-gray-800">MCI-748923</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Qualifications</label>
                 <div className="font-bold text-gray-800">MBBS, MD (Internal Medicine)</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Consultation Fee</label>
                 <div className="font-bold text-gray-800">₹ 500</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Department</label>
                 <div className="font-bold text-gray-800">General Medicine</div>
               </div>
             </div>
           </div>

           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Account Security</div>
             <div className="p-4 flex items-center justify-between">
               <div>
                 <div className="text-xs font-bold text-gray-800">Password</div>
                 <div className="text-[10px] text-gray-500">Last changed 45 days ago</div>
               </div>
               <button className="border border-gray-400 bg-white text-gray-800 px-4 py-1 text-xs hover:bg-gray-50">Change Password</button>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default DoctorDashboard;
