import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CHECKLIST_DATA, TRANSLATIONS, INSPECTION_TYPE_TRANSLATIONS } from '../constants';
import { Answer, ComplianceStatus, LocationData, InspectionReport, InspectionType } from '../types';
import CameraCapture from './CameraCapture';
import VoiceInput from './VoiceInput';
import { MapPin, Save, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, Bot, Loader2, Mic } from 'lucide-react';
import { analyzeInspectionReport } from '../services/geminiService';

const InspectionForm: React.FC = () => {
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();
  const { language, facilities, currentUser, addInspection } = useAppContext();
  const t = TRANSLATIONS[language];

  const facility = facilities.find(f => f.id === facilityId);

  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [location, setLocation] = useState<LocationData | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // New Fields
  const [inspectionType, setInspectionType] = useState<InspectionType>(InspectionType.PERIODIC);
  const [recommendation, setRecommendation] = useState('');

  // Auto-scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0,0);
  }, [activeCategoryIdx]);

  if (!facility) return <div>Facility not found</div>;

  const currentCategory = CHECKLIST_DATA[activeCategoryIdx];
  const isLastCategory = activeCategoryIdx === CHECKLIST_DATA.length - 1;

  const handleAnswer = (questionId: string, status: ComplianceStatus) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], questionId, status }
    }));
  };

  const handleNote = (questionId: string, note: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], questionId, status: prev[questionId]?.status || ComplianceStatus.COMPLIANT, note }
    }));
  };

  const handlePhoto = (questionId: string, photoUrl: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], questionId, status: prev[questionId]?.status || ComplianceStatus.COMPLIANT, photoUrl }
    }));
  };

  const captureLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            timestamp: Date.now()
          });
        },
        (err) => alert("Could not fetch location")
      );
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const mockReport: InspectionReport = {
      id: "temp",
      facilityId: facility.id,
      inspectorId: currentUser.id,
      inspectionType: inspectionType,
      date: new Date().toISOString(),
      answers: Object.values(answers),
      overallStatus: 'Pending',
      recommendation: recommendation
    };
    
    const summary = await analyzeInspectionReport(mockReport, facility, language);
    setAiSummary(summary);
    setIsAnalyzing(false);
  };

  const handleSubmit = () => {
    const report: InspectionReport = {
      id: Date.now().toString(),
      facilityId: facility.id,
      inspectorId: currentUser.id,
      inspectionType: inspectionType,
      date: new Date().toISOString(),
      answers: Object.values(answers),
      overallStatus: 'Pending',
      inspectorLocation: location,
      aiSummary: aiSummary,
      recommendation: recommendation
    };

    addInspection(report);
    navigate('/');
  };

  const getStatusColor = (status?: ComplianceStatus) => {
    switch (status) {
      case ComplianceStatus.COMPLIANT: return 'bg-green-100 text-green-700 border-green-300';
      case ComplianceStatus.PARTIALLY_COMPLIANT: return 'bg-amber-100 text-amber-700 border-amber-300';
      case ComplianceStatus.NON_COMPLIANT: return 'bg-red-100 text-red-700 border-red-300';
      case ComplianceStatus.NOT_APPLICABLE: return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50';
    }
  };

  const handleVoiceInput = (text: string) => {
    setRecommendation(prev => prev + (prev ? ' ' : '') + text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header & Inspection Config */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{language === 'ar' ? facility.nameAr : facility.nameEn}</h2>
            <p className="text-sm text-slate-500">{facility.type} • {facility.licenseNumber || t.unlicensed}</p>
          </div>
          <div className="text-right">
             {!location ? (
               <button onClick={captureLocation} className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-blue-100">
                 <MapPin size={14} /> {t.captureLocation}
               </button>
             ) : (
               <span className="text-sm bg-green-50 text-green-600 px-3 py-1 rounded-full flex items-center gap-1">
                 <CheckCircle size={14} /> {t.geoTagged}
               </span>
             )}
          </div>
        </div>

        {/* Inspection Type Selector */}
        <div className="pt-2 border-t border-slate-50">
          <label className="block text-sm font-medium text-slate-700 mb-1">{t.inspectionType}</label>
          <select 
            value={inspectionType}
            onChange={(e) => setInspectionType(e.target.value as InspectionType)}
            className="w-full md:w-1/2 p-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-medical-500 outline-none"
          >
            {Object.values(InspectionType).map(type => (
              <option key={type} value={type}>
                {language === 'ar' ? INSPECTION_TYPE_TRANSLATIONS[type].ar : INSPECTION_TYPE_TRANSLATIONS[type].en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {CHECKLIST_DATA.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryIdx(idx)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategoryIdx === idx 
              ? 'bg-medical-600 text-white' 
              : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {language === 'ar' ? cat.titleAr : cat.titleEn}
          </button>
        ))}
        <button 
           onClick={() => setActiveCategoryIdx(CHECKLIST_DATA.length)}
           className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategoryIdx === CHECKLIST_DATA.length 
            ? 'bg-purple-600 text-white' 
            : 'bg-white text-purple-600 border border-purple-200'
          }`}
        >
          {t.aiAnalysis}
        </button>
      </div>

      {/* Questions or AI Summary */}
      {activeCategoryIdx < CHECKLIST_DATA.length ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-slate-800">
              {language === 'ar' ? currentCategory.titleAr : currentCategory.titleEn}
            </h3>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded">
              {currentCategory.questions.length} Qs
            </span>
          </div>

          {currentCategory.questions.map((q) => {
            const answer = answers[q.id];
            const status = answer?.status;

            return (
              <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <p className="font-medium text-slate-800 mb-4 text-lg">
                  {language === 'ar' ? q.textAr : q.textEn}
                </p>

                {/* Tap Answers - Grid for Mobile */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {[ComplianceStatus.COMPLIANT, ComplianceStatus.PARTIALLY_COMPLIANT, ComplianceStatus.NON_COMPLIANT, ComplianceStatus.NOT_APPLICABLE].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleAnswer(q.id, s)}
                      className={`py-3 px-2 rounded-lg text-sm font-medium border transition-all active:scale-95 ${
                        status === s ? getStatusColor(s) + ' ring-2 ring-offset-1 ring-slate-300' : 'bg-slate-50 border-transparent text-slate-600'
                      }`}
                    >
                      {/* Shorten labels for mobile buttons if needed, relying on color mostly */}
                      {s === ComplianceStatus.COMPLIANT ? t.compliant : 
                       s === ComplianceStatus.NON_COMPLIANT ? t.nonCompliant :
                       s === ComplianceStatus.PARTIALLY_COMPLIANT ? t.partial : t.na}
                    </button>
                  ))}
                </div>

                {/* Conditional Inputs */}
                {status && status !== ComplianceStatus.COMPLIANT && status !== ComplianceStatus.NOT_APPLICABLE && (
                   <div className="space-y-3 animate-fade-in">
                     <textarea 
                        placeholder={language === 'ar' ? "أضف ملاحظات..." : "Add notes..."}
                        className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-medical-500 outline-none"
                        rows={2}
                        value={answer?.note || ''}
                        onChange={(e) => handleNote(q.id, e.target.value)}
                     />
                     {(q.requiresPhotoIfNonCompliant || status === ComplianceStatus.NON_COMPLIANT) && (
                       <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                         <p className="text-xs text-red-600 font-medium mb-1 flex items-center gap-1">
                           <AlertTriangle size={12} /> {t.photoRequired}
                         </p>
                         <CameraCapture onCapture={(url) => handlePhoto(q.id, url)} />
                       </div>
                     )}
                   </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-between pt-4">
             <button 
               onClick={() => setActiveCategoryIdx(p => Math.max(0, p - 1))}
               disabled={activeCategoryIdx === 0}
               className="px-6 py-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50"
             >
               {language === 'ar' ? <ArrowRight /> : <ArrowLeft />}
             </button>
             <button 
               onClick={() => setActiveCategoryIdx(p => p + 1)}
               className="px-6 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700 flex items-center gap-2"
             >
               {t.save} & {language === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
             </button>
          </div>
        </div>
      ) : (
        /* AI Analysis, Recommendation & Submit Screen */
        <div className="space-y-6">
           {/* Recommendation Section */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-3">{t.recommendations}</h3>
              <div className="relative">
                <textarea 
                  className="w-full p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-medical-500 outline-none min-h-[120px] pb-12"
                  placeholder={language === 'ar' ? "اكتب توصيات اللجنة أو انقر على الميكروفون للتحدث..." : "Write recommendations or click mic to speak..."}
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                />
                <div className="absolute bottom-3 left-3 rtl:right-3 rtl:left-auto">
                   <VoiceInput onText={handleVoiceInput} />
                </div>
              </div>
           </div>

           {/* AI Section */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Bot size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t.aiAnalysis}</h3>
              </div>
              
              {!aiSummary ? (
                <div className="text-center py-8">
                  <p className="text-slate-500 mb-4">
                    Generate an instant summary of violations based on Law 51/1981 using Gemini AI.
                  </p>
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-70 flex items-center gap-2 mx-auto"
                  >
                    {isAnalyzing ? <Loader2 className="animate-spin" /> : <Bot />}
                    {isAnalyzing ? t.analyzing : t.generateAnalysis}
                  </button>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <pre className="whitespace-pre-wrap font-sans text-slate-700">{aiSummary}</pre>
                </div>
              )}
           </div>

           <div className="flex gap-4">
             <button 
               onClick={() => setActiveCategoryIdx(CHECKLIST_DATA.length - 1)}
               className="flex-1 py-3 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50"
             >
               {t.cancel}
             </button>
             <button 
               onClick={handleSubmit}
               className="flex-1 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-md flex justify-center items-center gap-2"
             >
               <CheckCircle />
               {t.submit}
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default InspectionForm;