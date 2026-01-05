import { ChecklistCategory, Facility, FacilityType, Language, UserRole, InspectionType } from "./types";

// High-fidelity SVG Replica of Giza Health Directorate Logo
export const LOGO_URL = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500' style='background:white; border-radius:50%25;'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23fbbf24'/%3E%3Cstop offset='1' stop-color='%23d97706'/%3E%3C/linearGradient%3E%3C/defs%3E%3C!-- Sun --%3E%3Ccircle cx='300' cy='220' r='90' fill='url(%23g)' opacity='0.5'/%3E%3C!-- Pyramids --%3E%3Cpath d='M240 260 L300 140 L360 260 Z' fill='%23b45309' stroke='white' stroke-width='2'/%3E%3Cpath d='M190 260 L250 170 L310 260 Z' fill='%23d97706' stroke='white' stroke-width='2'/%3E%3C!-- Mosque Dome --%3E%3Cpath d='M370 260 L370 230 A 20 20 0 0 1 410 230 L 410 260 Z' fill='%23fcd34d' stroke='white' stroke-width='1'/%3E%3Crect x='420' y='190' width='12' height='70' fill='%23fcd34d' stroke='white' stroke-width='1'/%3E%3Ccircle cx='426' cy='190' r='6' fill='%23fcd34d'/%3E%3C!-- Waves --%3E%3Cpath d='M150 270 Q 300 310 450 270 v 20 Q 300 350 150 310 Z' fill='%2338bdf8'/%3E%3Cpath d='M150 300 Q 300 340 450 300 v 20 Q 300 380 150 340 Z' fill='%230284c7'/%3E%3C!-- Red Crescent --%3E%3Cpath d='M 250 20 A 230 230 0 1 0 250 480 A 180 180 0 1 1 250 100' fill='%23dc2626'/%3E%3C!-- Text --%3E%3Ctext x='280' y='420' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='36' fill='%231e3a8a' dir='rtl'%3Eمديرية الصحة بالجيزة%3C/text%3E%3C/svg%3E";

export const FACILITY_TYPE_TRANSLATIONS = {
  [FacilityType.PRIVATE_CLINIC]: { en: "Private Clinic", ar: "عيادة خاصة" },
  [FacilityType.SPECIALIZED_CLINIC]: { en: "Specialized Clinic", ar: "عيادات تخصصية" },
  [FacilityType.SPECIALIZED_CENTER]: { en: "Specialized Medical Center (ICU/Surgery)", ar: "مركز طبى تخصصى (عمليات-رعاية)" },
  [FacilityType.PRIVATE_HOSPITAL]: { en: "Private Hospital", ar: "مستشفى خاص" },
  [FacilityType.LAB]: { en: "Laboratory", ar: "معمل تحاليل" },
  [FacilityType.RADIOLOGY_CENTER]: { en: "Radiology Center", ar: "مركز أشعة" },
  [FacilityType.DIALYSIS_CENTER]: { en: "Dialysis Center", ar: "مركز غسيل كلوى" },
  [FacilityType.BLOOD_BANK]: { en: "Blood Bank", ar: "بنك دم" },
  [FacilityType.PSYCHIATRY_CENTER]: { en: "Psychiatry & Addiction Center", ar: "مصحة نفسى وعلاج ادمان" },
  [FacilityType.PHYSICAL_THERAPY]: { en: "Physical Therapy Center", ar: "مركز علاج طبيعى" },
  [FacilityType.OPTICAL_SHOP]: { en: "Optical Shop", ar: "محل نظارات" },
  [FacilityType.OTHER]: { en: "Other", ar: "أخرى" },
};

export const INSPECTION_TYPE_TRANSLATIONS = {
  [InspectionType.PERIODIC]: { en: "Periodic Inspection", ar: "مرور دورى" },
  [InspectionType.COMPLAINT]: { en: "Complaint", ar: "شكوى" },
  [InspectionType.CLOSURE]: { en: "Closure Execution", ar: "تنفيذ غلق" },
  [InspectionType.COMMITTEE]: { en: "Committee Visit", ar: "لجنة مرور" },
  [InspectionType.SURVEY]: { en: "Initial Survey", ar: "معاينة" },
};

export const TRANSLATIONS = {
  [Language.EN]: {
    appTitle: "Giza Free Treatment Admin",
    dashboard: "Dashboard",
    facilities: "Facilities",
    inspections: "Inspections",
    newInspection: "New Inspection",
    addFacility: "Add New Facility",
    settings: "Settings",
    role: "Role",
    welcome: "Welcome to Giza Free Treatment Administration",
    startInspection: "Start Inspection",
    search: "Search facilities...",
    filter: "Filter",
    location: "Location",
    captureLocation: "Capture GPS",
    submit: "Submit Report",
    cancel: "Cancel",
    camera: "Camera",
    takePhoto: "Take Photo",
    photoRequired: "Photo Required for Non-Compliance",
    compliant: "Compliant",
    partial: "Partial",
    nonCompliant: "Non-Compliant",
    na: "N/A",
    aiAnalysis: "AI Analysis",
    generateAnalysis: "Analyze Compliance (AI)",
    analyzing: "Analyzing...",
    save: "Save",
    owner: "Owner",
    director: "Director",
    license: "License",
    type: "Type",
    category: "Category",
    language: "اللغة العربية",
    inspectionSummary: "Inspection Summary",
    lawReference: "Ref: Law 51/1981 amended by 153/2004",
    geoTagged: "Geo-tagged",
    viewMap: "View Map",
    licensed: "Licensed",
    unlicensed: "Unlicensed",
    recommendations: "Recommendations & Comments",
    startSpeaking: "Speak",
    stopSpeaking: "Stop",
    inspectionType: "Inspection Type",
    selectType: "Select Type",
    saveFacility: "Save Facility",
    facilityNameEn: "Facility Name (English)",
    facilityNameAr: "Facility Name (Arabic)",
    licenseNo: "License Number",
    specialties: "Specialties (comma separated)",
  },
  [Language.AR]: {
    appTitle: "ادارة العلاج الحر بالجيزة",
    dashboard: "لوحة التحكم",
    facilities: "المنشآت الطبية",
    inspections: "التفتيشات",
    newInspection: "تفتيش جديد",
    addFacility: "إضافة منشأة جديدة",
    settings: "الإعدادات",
    role: "الدور",
    welcome: "مرحباً بك في ادارة العلاج الحر",
    startInspection: "بدء التفتيش",
    search: "بحث عن منشأة...",
    filter: "تصفية",
    location: "الموقع",
    captureLocation: "تسجيل الموقع GPS",
    submit: "إرسال التقرير",
    cancel: "إلغاء",
    camera: "كاميرا",
    takePhoto: "التقاط صورة",
    photoRequired: "صورة مطلوبة للمخالفات",
    compliant: "مطابق",
    partial: "مطابق جزئياً",
    nonCompliant: "غير مطابق",
    na: "لا ينطبق",
    aiAnalysis: "تحليل الذكاء الاصطناعي",
    generateAnalysis: "تحليل الامتثال (AI)",
    analyzing: "جاري التحليل...",
    save: "حفظ",
    owner: "المالك",
    director: "المدير الطبي",
    license: "الترخيص",
    type: "النوع",
    category: "الفئة",
    language: "English",
    inspectionSummary: "ملخص التفتيش",
    lawReference: "مرجع: قانون 51 لسنة 1981 معدل بقانون 153 لسنة 2004",
    geoTagged: "موقع مسجل",
    viewMap: "عرض الخريطة",
    licensed: "مرخصة",
    unlicensed: "غير مرخصة",
    recommendations: "التوصيات والملاحظات",
    startSpeaking: "تحدث",
    stopSpeaking: "توقف",
    inspectionType: "نوع التفتيش",
    selectType: "اختر النوع",
    saveFacility: "حفظ المنشأة",
    facilityNameEn: "اسم المنشأة (إنجليزي)",
    facilityNameAr: "اسم المنشأة (عربي)",
    licenseNo: "رقم الترخيص",
    specialties: "التخصصات (مفصولة بفاصلة)",
  }
};

// Checklist based on Central Administration for Non-Governmental Curative Establishments Standards
export const CHECKLIST_DATA: ChecklistCategory[] = [
  {
    id: "admin",
    titleEn: "Administrative & Licensing",
    titleAr: "التراخيص والإداريات",
    questions: [
      { id: "a1", textEn: "Is the facility license valid and displayed prominently?", textAr: "هل رخصة المنشأة سارية ومعلقة في مكان ظاهر؟", category: "admin", requiresPhotoIfNonCompliant: true },
      { id: "a2", textEn: "Is the Medical Director present during inspection?", textAr: "هل المدير الفني متواجد أثناء المرور؟", category: "admin" },
      { id: "a3", textEn: "Are all staff licenses (Syndicate/MoH) valid?", textAr: "هل تراخيص مزاولة المهنة (نقابة/وزارة) سارية لجميع العاملين؟", category: "admin" },
      { id: "a4", textEn: "Is the official price list displayed clearly?", textAr: "هل لائحة الأسعار معلنة ومعتمدة؟", category: "admin" },
      { id: "a5", textEn: "Are patient medical records/files maintained?", textAr: "هل يوجد سجلات/ملفات طبية للمرضى؟", category: "admin" }
    ]
  },
  {
    id: "infection",
    titleEn: "Infection Control & Waste",
    titleAr: "مكافحة العدوى والنفايات الخطرة",
    questions: [
      { id: "ic1", textEn: "Is there a valid contract for hazardous waste disposal?", textAr: "هل يوجد عقد ساري للتخلص من النفايات الخطرة؟", category: "infection" },
      { id: "ic2", textEn: "Are waste bins color-coded (Red/Black) and separated?", textAr: "هل يوجد فصل للنفايات (أكياس حمراء وسوداء)؟", category: "infection", requiresPhotoIfNonCompliant: true },
      { id: "ic3", textEn: "Are Safety Boxes available for sharps?", textAr: "هل تتوفر صناديق الأمان (Safety Boxes) للسنون؟", category: "infection" },
      { id: "ic4", textEn: "Is there a designated Sterilization Room with a flow?", textAr: "هل توجد غرفة تعقيم منفصلة بخط سير (ملوث-نظيف-معقم)؟", category: "infection", requiresPhotoIfNonCompliant: true },
      { id: "ic5", textEn: "Is the Autoclave log updated with biological indicators?", textAr: "هل سجل التعقيم محدث ويحتوي على المؤشرات البيولوجية؟", category: "infection" },
      { id: "ic6", textEn: "Are workers wearing appropriate PPE?", textAr: "هل يلتزم العاملون بارتداء الواقيات الشخصية؟", category: "infection" }
    ]
  },
  {
    id: "environment",
    titleEn: "Building & Environment",
    titleAr: "المبنى والسلامة البيئية",
    questions: [
      { id: "env1", textEn: "Is the facility area matching the license blueprint?", textAr: "هل مساحة المنشأة مطابقة للرسم الهندسي بالترخيص؟", category: "environment" },
      { id: "env2", textEn: "Adequate ventilation and lighting?", textAr: "هل التهوية والإضاءة جيدة ومناسبة؟", category: "environment" },
      { id: "env3", textEn: "General cleanliness and hygiene of the facility?", textAr: "المستوى العام للنظافة بالمنشأة؟", category: "environment", requiresPhotoIfNonCompliant: true },
      { id: "env4", textEn: "Are fire extinguishers available and valid?", textAr: "هل طفايات الحريق متوفرة وسارية الصلاحية؟", category: "environment" }
    ]
  },
  {
    id: "emergency",
    titleEn: "Emergency Readiness",
    titleAr: "تجهيزات الطوارئ",
    questions: [
      { id: "em1", textEn: "Is the Crash Cart fully equipped (Ambu, Laryngoscope)?", textAr: "هل ترولي الطوارئ مجهز (أمبوباج، منظار حنجري، أدوية)؟", category: "emergency", requiresPhotoIfNonCompliant: true },
      { id: "em2", textEn: "Is there a functional Oxygen source?", textAr: "هل يوجد مصدر أكسجين يعمل (أسطوانة/شبكة)؟", category: "emergency" },
      { id: "em3", textEn: "Is the suction machine and DC shock functional?", textAr: "هل جهاز التشفيط والصدمات (DC) يعمل بكفاءة؟", category: "emergency" }
    ]
  },
  {
    id: "operating",
    titleEn: "Operating Theater (If Applicable)",
    titleAr: "غرف العمليات (إن وجدت)",
    questions: [
      { id: "op1", textEn: "Is the flooring anti-static/conductive?", textAr: "هل الأرضيات عازلة للكهرباء الاستاتيكية (Conductive)؟", category: "operating" },
      { id: "op2", textEn: "Is there a proper scrub sink area?", textAr: "هل يوجد حوض تعقيم للأيدي (Scrub) بالمواصفات؟", category: "operating" },
      { id: "op3", textEn: "Does the OR air conditioning meet standards (Filter)?", textAr: "هل تكييف العمليات مطابق للمواصفات (فلاتر)؟", category: "operating" }
    ]
  }
];

export const MOCK_FACILITIES: Facility[] = [
  {
    id: "f1",
    nameEn: "Al-Amal Polyclinic",
    nameAr: "مجمع عيادات الأمل",
    type: FacilityType.SPECIALIZED_CLINIC,
    specialty: ["Dental", "Pediatrics", "Internal Medicine"],
    director: "Dr. Ahmed Hassan",
    owner: "Medical Group Co.",
    licenseNumber: "LIC-2023-001",
    isLicensed: true,
    address: "12 El Tahrir St, Dokki",
    governorate: "Giza",
    location: { latitude: 30.0444, longitude: 31.2357, timestamp: Date.now() }
  },
  {
    id: "f2",
    nameEn: "Cairo Life Hospital",
    nameAr: "مستشفى حياة القاهرة",
    type: FacilityType.PRIVATE_HOSPITAL,
    specialty: ["General Surgery", "Orthopedics", "ER"],
    director: "Dr. Sarah Nabil",
    owner: "Dr. Sarah Nabil",
    licenseNumber: "LIC-2022-894",
    isLicensed: false,
    address: "45 Ramses St, Downtown",
    governorate: "Cairo"
  },
  {
    id: "f3",
    nameEn: "El Salam Pharmacy",
    nameAr: "صيدلية السلام",
    type: FacilityType.PRIVATE_CLINIC, // Placeholder
    specialty: ["Retail"],
    director: "Dr. Mohamed Ali",
    owner: "Dr. Mohamed Ali",
    licenseNumber: "PH-9921",
    isLicensed: true,
    address: "9 Maadi Road",
    governorate: "Cairo"
  },
  {
    id: "f4",
    nameEn: "Giza Memorial Center",
    nameAr: "مركز الجيزة التذكاري",
    type: FacilityType.SPECIALIZED_CENTER,
    specialty: ["Radiology", "Labs"],
    director: "Dr. Hoda Ezzat",
    owner: "Giza Health",
    licenseNumber: "LIC-2024-112",
    isLicensed: true,
    address: "10 Pyramids St",
    governorate: "Giza"
  }
];

export const USERS = [
  { id: 'u1', name: 'Inspector Khaled', role: UserRole.INSPECTOR },
  { id: 'u2', name: 'Senior Mona', role: UserRole.SENIOR_INSPECTOR },
  { id: 'u3', name: 'Supervisor Omar', role: UserRole.SUPERVISOR },
  { id: 'u4', name: 'Admin Hany', role: UserRole.ADMIN },
];