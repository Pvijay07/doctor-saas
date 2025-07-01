import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 overflow-x-hidden">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
