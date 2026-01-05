export enum Language {
  EN = 'en',
  AR = 'ar'
}

export enum UserRole {
  INSPECTOR = 'Inspector',
  SENIOR_INSPECTOR = 'Senior Inspector',
  SUPERVISOR = 'Supervisor',
  ADMIN = 'Admin'
}

export enum FacilityType {
  PRIVATE_CLINIC = 'Private Clinic',
  SPECIALIZED_CLINIC = 'Specialized Clinic',
  SPECIALIZED_CENTER = 'Specialized Medical Center', // (Surgery, Incubators, ICU)
  PRIVATE_HOSPITAL = 'Private Hospital', // (40-100+ beds)
  LAB = 'Laboratory',
  RADIOLOGY_CENTER = 'Radiology Center',
  DIALYSIS_CENTER = 'Dialysis Center',
  BLOOD_BANK = 'Blood Bank',
  PSYCHIATRY_CENTER = 'Psychiatry & Addiction Center',
  PHYSICAL_THERAPY = 'Physical Therapy Center',
  OPTICAL_SHOP = 'Optical Shop',
  OTHER = 'Other'
}

export enum InspectionType {
  PERIODIC = 'Periodic Inspection',
  COMPLAINT = 'Complaint',
  CLOSURE = 'Closure Execution',
  COMMITTEE = 'Committee Visit',
  SURVEY = 'Initial Survey/Visit'
}

export enum ComplianceStatus {
  COMPLIANT = 'Compliant',
  PARTIALLY_COMPLIANT = 'Partially Compliant',
  NON_COMPLIANT = 'Non-Compliant',
  NOT_APPLICABLE = 'Not Applicable'
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Facility {
  id: string;
  nameEn: string;
  nameAr: string;
  type: FacilityType;
  specialty: string[];
  director: string;
  owner: string;
  licenseNumber: string; // If empty/null -> Unlicensed
  isLicensed: boolean;
  address: string;
  governorate: string;
  location?: LocationData;
}

export interface Question {
  id: string;
  textEn: string;
  textAr: string;
  category: string;
  requiresPhotoIfNonCompliant?: boolean;
}

export interface Answer {
  questionId: string;
  status: ComplianceStatus;
  note?: string;
  photoUrl?: string; // Base64 or URL
}

export interface InspectionReport {
  id: string;
  facilityId: string;
  inspectorId: string;
  inspectionType: InspectionType;
  date: string;
  answers: Answer[];
  overallStatus: 'Pending' | 'Approved' | 'Rejected';
  inspectorLocation?: LocationData;
  aiSummary?: string;
  recommendation?: string;
}

export interface ChecklistCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  questions: Question[];
}