import React, { useState } from 'react';

import '../../globals.css';

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";


export default function AdminLayout({ children }) {

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      <Sidebar isExpanded={isSidebarExpanded} />
      <section className={isSidebarExpanded ? 'dashboard-content expand' : 'dashboard-content'}>
        <Header onToggleSidebar={toggleSidebar} />
        {children}
        <Footer />
      </section>
    </div>
  );
}
