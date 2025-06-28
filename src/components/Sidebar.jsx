import { LayoutDashboard, Users, Calendar, Syringe, Pill, LogOut } from "lucide-react";
import { useState } from "react";
import SignOutButton from "./SignOutButton";
import UserDisplay from "./UserDisplay";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-800 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:relative inset-y-0 left-0 w-64 bg-blue-800 text-white 
        flex flex-col p-4 shadow-lg rounded-r-lg transition-transform duration-300 
        ease-in-out z-40`}
      >
        <div className="text-2xl font-bold mb-8 text-center py-2 rounded-md bg-blue-900">
          MediCare
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                onClick={() => {
                  setCurrentPage("dashboard");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "dashboard"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  setCurrentPage("patients");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "patients"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Patients
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  setCurrentPage("appointments");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  currentPage === "appointments"
                    ? "bg-blue-700 text-white shadow"
                    : "hover:bg-blue-700"
                }`}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </a>
            </li>
            {/* Additional menu items */}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-blue-700">
          <UserDisplay />
          <SignOutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;