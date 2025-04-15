
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} PBST Rishte-Nate Free Seva. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4 items-center">
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/profiles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Profiles
            </Link>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Search
            </Link>
            <Link to="/settings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Settings
            </Link>
            {/* <Link to="/admin" className="text-sm flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
              <Shield className="h-3 w-3" />
              <span>Admin</span>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
