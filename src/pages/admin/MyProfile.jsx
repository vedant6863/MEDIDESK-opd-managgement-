import React from 'react';

const MyProfile = () => {
  return (
    <div className="w-full">
       <div className="bg-[#e4e4e4] px-4 py-3 border border-gray-300 font-bold text-sm text-gray-800 mb-8 flex justify-between items-center">
         <span>System Administrator Profile & Settings</span>
         <button className="bg-black text-white px-4 py-1 text-xs font-bold border border-black hover:bg-gray-800">Edit Profile</button>
       </div>

       <div className="grid grid-cols-3 gap-8">
         {/* Profile Card */}
         <div className="col-span-1 border border-gray-300 bg-white p-6 text-center shadow-sm h-fit">
           <div className="w-24 h-24 bg-gray-200 border-2 border-gray-400 rounded-full mx-auto mb-4 overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=Admin&background=111&color=fff&size=100" alt="Admin Profile" className="w-full h-full object-cover" />
           </div>
           <h2 className="text-xl font-bold text-gray-800">Super Admin</h2>
           <p className="text-sm text-gray-500 font-bold mb-2">System Administrator</p>
           <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-2 py-1 inline-block mb-4">
             ID: ADM-0001
           </div>
           <hr className="border-gray-200 mb-4" />
           <div className="text-left text-xs text-gray-600 space-y-2">
             <p><span className="font-bold text-gray-800">Status:</span> Active</p>
             <p><span className="font-bold text-gray-800">System Role:</span> Master Administrator</p>
             <p><span className="font-bold text-gray-800">Last Login:</span> Today, 08:30 AM</p>
           </div>
         </div>

         {/* Details */}
         <div className="col-span-2 space-y-6">
           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Account Information</div>
             <div className="p-4 grid grid-cols-2 gap-4 text-xs">
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Full Name</label>
                 <div className="font-bold text-gray-800">System Administrator</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Assigned Clinic</label>
                 <div className="font-bold text-gray-800">Headquarters (All Branches)</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Admin Email</label>
                 <div className="font-bold text-gray-800">admin@clinic.com</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Emergency Contact</label>
                 <div className="font-bold text-gray-800">+91 99999 00000</div>
               </div>
             </div>
           </div>

           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">System Access Permissions</div>
             <div className="p-4 grid grid-cols-2 gap-4 text-xs">
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">User Management</label>
                 <div className="font-bold text-green-700">Full Access (Read/Write/Delete)</div>
               </div>
               <div>
                 <label className="block text-gray-500 uppercase text-[10px] font-bold mb-1">Financial & Billing</label>
                 <div className="font-bold text-green-700">Full Access (Read/Write/Delete)</div>
               </div>
             </div>
           </div>

           <div className="border border-gray-300 bg-white p-0">
             <div className="bg-gray-100 p-3 border-b border-gray-300 text-xs font-bold text-gray-700">Account Security</div>
             <div className="p-4 flex items-center justify-between">
               <div>
                 <div className="text-xs font-bold text-gray-800">Password</div>
                 <div className="text-[10px] text-gray-500">Last changed 90 days ago</div>
               </div>
               <button className="border border-gray-400 bg-white text-gray-800 px-4 py-1 text-xs hover:bg-gray-50">Change Password</button>
             </div>
             <div className="p-4 flex items-center justify-between border-t border-gray-200">
               <div>
                 <div className="text-xs font-bold text-gray-800">Two-Factor Authentication (2FA)</div>
                 <div className="text-[10px] text-gray-500">Protect the admin account with an authenticator app</div>
               </div>
               <button className="border border-green-600 bg-green-50 text-green-800 px-4 py-1 text-xs hover:bg-green-100 font-bold">Enable 2FA</button>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default MyProfile;
