import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/ui/Layout";
import Dashboard from "./components/pages/Dashboard";
import EHRDashboard from "./components/pages/EHRDashboard";
import AppointmentScheduler from "./components/pages/AppointmentScheduler";
import StaffManagement from "./components/pages/StaffManagement";
import BillingTools from "./components/pages/BillingTools";
import ClinicalTools from "./components/pages/ClinicalTools";
import PatientManagement from "./components/pages/PatientManagement";
import RoomEquipmentScheduling from "./components/pages/RoomEquipmentScheduling";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientManagement />} />
          <Route path="/ehr" element={<EHRDashboard />} />
          <Route path="/appointments" element={<AppointmentScheduler />} />
          <Route path="/clinical" element={<ClinicalTools />} />
          <Route path="/billing" element={<BillingTools />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/equipments" element={<RoomEquipmentScheduling />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
