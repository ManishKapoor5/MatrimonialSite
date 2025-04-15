
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  // Special layout handling for authentication pages
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  
  // Check if current path is admin route
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className={`flex min-h-screen flex-col ${isAdminPage ? 'bg-slate-50' : 'bg-background'}`}>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <main className={`flex-1 ${isAuthPage ? '' : 'pb-12'} ${isAdminPage ? '' : 'pt-20'}`}>
        {children}
      </main>
      {!isAuthPage && !isAdminPage && <Footer />}
      <Toaster />
    </div>
  );
};
