import React from "react";
import { LayoutDashboard, Users, Calendar, Syringe, Pill, Menu } from "lucide-react";
import UserDisplay from "./UserDisplay";
import SignOutButton from "./SignOutButton";

const Sidebar = ({ currentPage, setCurrentPage, isMobileSidebarOpen, toggleMobileSidebar }) => {
  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-800 text-white shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg rounded-r-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="text-2xl font-bold mb-8 text-center py-2 rounded-md bg-blue-900">
          MediCare
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setCurrentPage("dashboard");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  currentPage === "dashboard"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage("patients");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  currentPage === "patients"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Patients
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage("appointments");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  currentPage === "appointments"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage("medical-records");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  currentPage === "medical-records"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Syringe className="mr-3 h-5 w-5" />
                Medical Records
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage("billing");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center w-full p-3 rounded-md transition-colors ${
                  currentPage === "billing"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Pill className="mr-3 h-5 w-5" />
                Billing
              </button>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-blue-700">
          <div className="text-xs text-blue-300 mb-2">User ID:</div>
          <UserDisplay />
          <SignOutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;