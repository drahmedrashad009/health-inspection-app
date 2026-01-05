import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS, USERS, LOGO_URL } from '../constants';
import { 
  LayoutDashboard, 
  Building2, 
  ClipboardCheck, 
  Settings, 
  Menu, 
  X, 
  Globe, 
  UserCircle 
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, toggleLanguage, currentUser, switchUser } = useAppContext();
  const t = TRANSLATIONS[language];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: t.dashboard, icon: <LayoutDashboard size={20} /> },
    { path: '/facilities', label: t.facilities, icon: <Building2 size={20} /> },
    { path: '/inspections', label: t.inspections, icon: <ClipboardCheck size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-medical-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Logo" className="w-8 h-8 object-contain bg-white rounded-full p-0.5" />
            <span className="font-bold text-lg">{t.appTitle}</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 start-0 z-40 w-64 bg-white border-e border-slate-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}
      `}>
        <div className="h-full flex flex-col">
          {/* Desktop Logo Area */}
          <div className="p-6 border-b border-slate-100 hidden md:flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-3 bg-white rounded-full flex items-center justify-center">
                <img src={LOGO_URL} alt="App Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-medical-900 leading-tight">{t.appTitle}</h1>
            <p className="text-xs text-slate-500 mt-2 font-medium bg-slate-100 px-2 py-1 rounded">{t.lawReference}</p>
          </div>

          <div className="p-4 bg-medical-50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-medical-200 flex items-center justify-center text-medical-700 font-bold border border-medical-300">
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-medical-900">{currentUser.name}</p>
                <p className="text-xs text-medical-600 truncate">{currentUser.role}</p>
              </div>
            </div>
            
            {/* Quick Role Switcher for Demo */}
            <select 
              className="mt-3 w-full text-xs p-1.5 border border-medical-200 rounded bg-white text-slate-700 focus:ring-2 focus:ring-medical-500 outline-none"
              value={currentUser.id}
              onChange={(e) => switchUser(e.target.value)}
            >
              {USERS.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
              ))}
            </select>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-medical-600 text-white shadow-md translate-x-1' 
                    : 'text-slate-600 hover:bg-slate-100 hover:translate-x-1'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
            >
              <Globe size={18} />
              <span>{t.language}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-[calc(100vh-64px)] md:h-screen overflow-y-auto p-4 md:p-8">
        {children}
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;