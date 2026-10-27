import React from 'react';

const KpiCard = ({ title, value, prefixIcon }) => {
  return (
    <div className="bg-white border border-slate-200 p-8 flex flex-col items-center justify-center rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center mb-3">
        {prefixIcon && <span className="mr-2">{prefixIcon}</span>}
        <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{value}</h3>
      </div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
    </div>
  );
};

export default KpiCard;
