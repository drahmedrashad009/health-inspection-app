import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS, FACILITY_TYPE_TRANSLATIONS } from '../constants';
import { Search, MapPin, Plus, FileText, CheckCircle, AlertOctagon, XCircle } from 'lucide-react';
import { Facility } from '../types';

const FacilityList: React.FC = () => {
  const { language, facilities } = useAppContext();
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = facilities.filter(f => 
    f.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.nameAr.includes(searchTerm) ||
    f.licenseNumber.includes(searchTerm)
  );

  const startInspection = (facilityId: string) => {
    navigate(`/inspect/${facilityId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">{t.facilities}</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:left-auto rtl:right-3" size={20} />
            <input 
              type="text" 
              placeholder={t.search}
              className="w-full pl-10 pr-4 py-2 rtl:pl-4 rtl:pr-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => navigate('/add-facility')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={18} />
            <span className="whitespace-nowrap">{t.addFacility}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((facility: Facility) => (
          <div key={facility.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow relative overflow-hidden">
            {/* License Status Banner */}
            {!facility.isLicensed && (
               <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            )}

            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-2 py-1 bg-medical-50 text-medical-700 text-xs font-semibold rounded-md truncate max-w-[70%]">
                {language === 'ar' ? FACILITY_TYPE_TRANSLATIONS[facility.type].ar : FACILITY_TYPE_TRANSLATIONS[facility.type].en}
              </span>
              {facility.isLicensed ? (
                <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                   <CheckCircle size={14} />
                   {t.licensed}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">
                   <XCircle size={14} />
                   {t.unlicensed}
                </div>
              )}
            </div>
            
            <h3 className="font-bold text-lg text-slate-800 mb-1 truncate">
              {language === 'ar' ? facility.nameAr : facility.nameEn}
            </h3>
            <p className="text-sm text-slate-500 flex items-center gap-1 mb-4 truncate">
              <MapPin size={14} />
              {facility.address || 'Giza'}, {facility.governorate}
            </p>

            <div className="text-sm space-y-1 mb-4 border-t border-slate-50 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">{t.director}:</span>
                <span className="font-medium text-slate-700 truncate max-w-[50%]">{facility.director}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{t.license}:</span>
                <span className="font-medium text-slate-700">{facility.licenseNumber || '-'}</span>
              </div>
            </div>

            <button 
              onClick={() => startInspection(facility.id)}
              className="w-full py-2 bg-medical-500 hover:bg-medical-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <FileText size={18} />
              {t.newInspection}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityList;