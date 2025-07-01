import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Syringe,
  Pill,
  Menu,
  LogOut,
  MenuIcon,
  Lock,
} from "lucide-react";
import UserDisplay from "./UserDisplay";
import SignOutButton from "./SignOutButton";
import { Link } from "react-router-dom";

const Sidebar = ({
  currentPage,
  setCurrentPage,
  isMobileSidebarOpen,
  toggleMobileSidebar,
}) => {
  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-800 text-white shadow-lg"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-blue-800 text-white flex flex-col p-4 shadow-lg rounded-r-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="text-2xl font-bold mb-8 text-center py-2 rounded-md bg-blue-900">
          DentalCare
        </div>
        <nav className="flex-1 font-bold">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                onClick={() => {
                  setCurrentPage("dashboard");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "dashboard"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/patients"
                onClick={() => {
                  setCurrentPage("patients");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "patients"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Patients
              </Link>
            </li>
            <li>
              <Link
                to="/ehr"
                onClick={() => {
                  setCurrentPage("ehr");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "ehr"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Patient EHR
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                onClick={() => {
                  setCurrentPage("appointments");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "appointments"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/clinical"
                onClick={() => {
                  setCurrentPage("clinical");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "clinical"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Syringe className="mr-3 h-5 w-5" />
                Clinical Tools
              </Link>
            </li>
            <li>
              <Link
                to="/billing"
                onClick={() => {
                  setCurrentPage("billing");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "billing"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Pill className="mr-3 h-5 w-5" />
                Billing
              </Link>
            </li>
            <li>
              <Link
                to="/staff"
                onClick={() => {
                  setCurrentPage("staff");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "staff"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                Staff Management
              </Link>
            </li>
            <li>
              <Link
                to="/equipments"
                onClick={() => {
                  setCurrentPage("equipments");
                  if (window.innerWidth < 1024) toggleMobileSidebar();
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "equipments"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                Room & Equipment Management
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-blue-700">
          <div className="text-xs text-blue-300 mb-2">User ID:</div>
          <div className="flex items-center p-2 rounded-md bg-blue-900">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center mr-2">
              <span className="text-sm">AD</span>
            </div>
            <div>
              <div className="font-medium">Admin User</div>
              <div className="text-xs text-blue-300">admin@dentalcare.com</div>
            </div>
          </div>
          <button className="w-full mt-2 flex items-center p-2 rounded-md text-blue-200 hover:bg-blue-700">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
