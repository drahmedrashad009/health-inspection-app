import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS, FACILITY_TYPE_TRANSLATIONS } from '../constants';
import { Facility, FacilityType } from '../types';
import { Building2, Save, X, FileText, User } from 'lucide-react';

const AddFacilityForm: React.FC = () => {
  const { language, addFacility } = useAppContext();
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<Facility>>({
    nameEn: '',
    nameAr: '',
    type: FacilityType.PRIVATE_CLINIC,
    licenseNumber: '',
    isLicensed: true,
    director: '',
    owner: '',
    address: '',
    governorate: 'Giza',
    specialty: []
  });

  const [specialtyInput, setSpecialtyInput] = useState('');

  const handleChange = (field: keyof Facility, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameEn || !formData.type) return;

    const newFacility: Facility = {
      id: Date.now().toString(),
      nameEn: formData.nameEn!,
      nameAr: formData.nameAr || formData.nameEn!,
      type: formData.type!,
      licenseNumber: formData.isLicensed ? (formData.licenseNumber || 'PENDING') : '',
      isLicensed: formData.isLicensed!,
      director: formData.director || 'N/A',
      owner: formData.owner || 'N/A',
      address: formData.address || '',
      governorate: formData.governorate || 'Giza',
      specialty: specialtyInput.split(',').map(s => s.trim()).filter(s => s),
    };

    addFacility(newFacility);
    navigate('/facilities');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-medical-900 text-white p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Building2 /> {t.addFacility}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.facilityNameAr}</label>
              <input 
                required
                type="text" 
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                value={formData.nameAr}
                onChange={e => handleChange('nameAr', e.target.value)}
                dir="rtl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.facilityNameEn}</label>
              <input 
                required
                type="text" 
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                value={formData.nameEn}
                onChange={e => handleChange('nameEn', e.target.value)}
                dir="ltr"
              />
            </div>
          </div>

          {/* Type & License Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.type}</label>
              <select 
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none bg-white"
                value={formData.type}
                onChange={e => handleChange('type', e.target.value)}
              >
                {Object.values(FacilityType).map(type => (
                   <option key={type} value={type}>
                     {language === 'ar' ? FACILITY_TYPE_TRANSLATIONS[type].ar : FACILITY_TYPE_TRANSLATIONS[type].en}
                   </option>
                ))}
              </select>
            </div>
            
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">{t.license}</label>
               <div className="flex gap-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                    type="radio" 
                    checked={formData.isLicensed} 
                    onChange={() => handleChange('isLicensed', true)}
                    className="w-4 h-4 text-medical-600 focus:ring-medical-500"
                   />
                   <span className="text-green-700 font-medium">{t.licensed}</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input 
                    type="radio" 
                    checked={!formData.isLicensed} 
                    onChange={() => handleChange('isLicensed', false)}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                   />
                   <span className="text-red-700 font-medium">{t.unlicensed}</span>
                 </label>
               </div>
            </div>
          </div>

          {/* License Number (Conditional) */}
          {formData.isLicensed && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.licenseNo}</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2 rtl:pl-4 rtl:pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                  value={formData.licenseNumber}
                  onChange={e => handleChange('licenseNumber', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* People */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t.director}</label>
               <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rtl:right-3 rtl:left-auto" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-2 rtl:pl-4 rtl:pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                  value={formData.director}
                  onChange={e => handleChange('director', e.target.value)}
                />
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">{t.owner}</label>
               <input 
                  type="text" 
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
                  value={formData.owner}
                  onChange={e => handleChange('owner', e.target.value)}
                />
             </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t.specialties}</label>
            <input 
              type="text" 
              placeholder="e.g. Dental, Derma"
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-medical-500 outline-none"
              value={specialtyInput}
              onChange={e => setSpecialtyInput(e.target.value)}
            />
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/facilities')}
              className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50"
            >
              {t.cancel}
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 bg-medical-600 text-white rounded-lg font-bold hover:bg-medical-700 shadow-md flex justify-center items-center gap-2"
            >
              <Save size={18} />
              {t.saveFacility}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFacilityForm;