import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto lg:ml-64 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;