import React from 'react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS, LOGO_URL } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { ComplianceStatus, FacilityType } from '../types';

const Dashboard: React.FC = () => {
  const { language, facilities, inspections } = useAppContext();
  const t = TRANSLATIONS[language];

  // Prepare Chart Data
  const typeData = Object.values(FacilityType).map(type => ({
    name: type,
    count: facilities.filter(f => f.type === type).length
  }));

  const complianceCounts = {
    [ComplianceStatus.COMPLIANT]: 0,
    [ComplianceStatus.NON_COMPLIANT]: 0,
    [ComplianceStatus.PARTIALLY_COMPLIANT]: 0
  };

  inspections.forEach(insp => {
     const hasNonCompliant = insp.answers.some(a => a.status === ComplianceStatus.NON_COMPLIANT);
     const hasPartial = insp.answers.some(a => a.status === ComplianceStatus.PARTIALLY_COMPLIANT);
     
     if (hasNonCompliant) complianceCounts[ComplianceStatus.NON_COMPLIANT]++;
     else if (hasPartial) complianceCounts[ComplianceStatus.PARTIALLY_COMPLIANT]++;
     else complianceCounts[ComplianceStatus.COMPLIANT]++;
  });

  const pieData = [
    { name: t.compliant, value: complianceCounts[ComplianceStatus.COMPLIANT], color: '#10b981' }, 
    { name: t.partial, value: complianceCounts[ComplianceStatus.PARTIALLY_COMPLIANT], color: '#f59e0b' }, 
    { name: t.nonCompliant, value: complianceCounts[ComplianceStatus.NON_COMPLIANT], color: '#ef4444' }, 
  ];

  const StatCard = ({ title, value, icon, colorClass }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-1 text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-10 text-opacity-100`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Branding Header */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 flex-shrink-0">
          <img src={LOGO_URL} alt="Organization Logo" className="w-full h-full object-contain" />
        </div>
        <div className="text-center md:text-start md:rtl:text-right">
          <h1 className="text-3xl font-bold text-slate-900">{t.appTitle}</h1>
          <p className="text-slate-500 mt-2 text-lg">{t.welcome}</p>
          <div className="mt-3 inline-block px-3 py-1 bg-medical-50 text-medical-700 text-sm font-medium rounded-full">
            {t.lawReference}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title={t.facilities} 
          value={facilities.length} 
          icon={<Building2Icon />} 
          colorClass="bg-blue-500 text-blue-500" 
        />
        <StatCard 
          title={t.inspections} 
          value={inspections.length} 
          icon={<ClipboardIcon />} 
          colorClass="bg-purple-500 text-purple-500" 
        />
        <StatCard 
          title={t.nonCompliant} 
          value={complianceCounts[ComplianceStatus.NON_COMPLIANT]} 
          icon={<AlertIcon />} 
          colorClass="bg-red-500 text-red-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">{t.type}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Compliance Overview</h3>
          <div className="h-64 flex items-center justify-center">
             {inspections.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             ) : (
               <p className="text-slate-400">No inspections yet</p>
             )}
          </div>
          <div className="flex justify-center gap-4 text-xs mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon wrappers
const Building2Icon = () => <Clock size={24} />;
const ClipboardIcon = () => <CheckCircle size={24} />;
const AlertIcon = () => <AlertTriangle size={24} />;

export default Dashboard;