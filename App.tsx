import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FacilityList from './components/FacilityList';
import InspectionForm from './components/InspectionForm';
import AddFacilityForm from './components/AddFacilityForm';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/facilities" element={<FacilityList />} />
            <Route path="/add-facility" element={<AddFacilityForm />} />
            <Route path="/inspect/:facilityId" element={<InspectionForm />} />
            <Route path="/inspections" element={<div className="p-4 text-center text-slate-500">Inspection History List (Placeholder)</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;