import React, { useState } from "react";
import { FirebaseProvider } from "../src/components/firebase/FirebaseProvider";
import Sidebar from "../src/components/ui/Sidebar";
import Dashboard from "../src/components/pages/Dashboard";
import PatientManagement from "../src/components/pages/PatientManagement";
import AppointmentScheduling from "../src/components/pages/AppointmentScheduling";
import MedicalRecords from "../src/components/pages/MedicalRecords";
import Billing from "../src/components/pages/Billing";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    
    <FirebaseProvider>
      <div className="min-h-screen bg-gray-100 flex font-inter">
        {/* Tailwind CSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        {/* Google Fonts CDN */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Inline styles for font-family */}
        <style>
          {`
          body { font-family: 'Inter', sans-serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
          `}
        </style>

        {/* Sidebar */}
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {currentPage === "dashboard" && <Dashboard />}
            {currentPage === "patients" && <PatientManagement />}
            {currentPage === "appointments" && <AppointmentScheduling />}
            {currentPage === "medical-records" && <MedicalRecords />}
            {currentPage === "billing" && <Billing />}
          </div>
        </main>
      </div>
    </FirebaseProvider>
  );
}