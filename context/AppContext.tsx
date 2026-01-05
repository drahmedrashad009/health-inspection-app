import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Facility, InspectionReport, Language, UserRole } from '../types';
import { MOCK_FACILITIES, USERS } from '../constants';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  currentUser: { id: string, name: string, role: UserRole };
  switchUser: (userId: string) => void;
  facilities: Facility[];
  inspections: InspectionReport[];
  addInspection: (report: InspectionReport) => void;
  addFacility: (facility: Facility) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [currentUser, setCurrentUser] = useState(USERS[0]);
  const [facilities, setFacilities] = useState<Facility[]>(MOCK_FACILITIES);
  const [inspections, setInspections] = useState<InspectionReport[]>([]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.EN ? Language.AR : Language.EN);
  };

  const switchUser = (userId: string) => {
    const user = USERS.find(u => u.id === userId);
    if (user) setCurrentUser(user);
  };

  const addInspection = (report: InspectionReport) => {
    setInspections(prev => [report, ...prev]);
  };
  
  const addFacility = (facility: Facility) => {
    setFacilities(prev => [facility, ...prev]);
  }

  // Handle RTL direction on body
  useEffect(() => {
    document.documentElement.dir = language === Language.AR ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <AppContext.Provider value={{
      language,
      toggleLanguage,
      currentUser,
      switchUser,
      facilities,
      inspections,
      addInspection,
      addFacility
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};