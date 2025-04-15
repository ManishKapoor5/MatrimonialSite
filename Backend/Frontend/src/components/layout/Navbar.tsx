
import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string => {
    return `
      px-3 py-2 rounded-md text-sm font-medium transition-colors
      ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}
    `;
  };

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }): string => {
    return `
      block px-3 py-2 rounded-md text-sm font-medium transition-colors
      ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary/50'}
    `;
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-bold text-primary">Matrimony</span>
          <span className="text-xl md:text-2xl font-bold">Match</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/profiles" className={navLinkClasses}>
            Profiles
          </NavLink>
          <NavLink to="/detailed-profiles" className={navLinkClasses}>
            Detailed Profiles
          </NavLink>
          <NavLink to="/search" className={navLinkClasses}>
            Search
          </NavLink>
          {isAuthenticated && user && user.role === 'user' && (
            <NavLink to="/myprofile" className={navLinkClasses}>
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && user && user.role === 'admin' && (
            <NavLink to="/admin/dashboard" className={navLinkClasses}>
              Admin
            </NavLink>
          )}
        </nav>

        {/* Authentication buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" size="sm">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-background border-b animate-in slide-in-from-top">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setShowMobileMenu(false)}>
              Home
            </NavLink>
            <NavLink to="/profiles" className={mobileNavLinkClasses} onClick={() => setShowMobileMenu(false)}>
              Profiles
            </NavLink>
            <NavLink to="/detailed-profiles" className={mobileNavLinkClasses} onClick={() => setShowMobileMenu(false)}>
              Detailed Profiles
            </NavLink>
            <NavLink to="/search" className={mobileNavLinkClasses} onClick={() => setShowMobileMenu(false)}>
              Search
            </NavLink>
            {isAuthenticated && user && user.role === 'user' && (
              <NavLink to="/dashboard" className={mobileNavLinkClasses} onClick={() => setShowMobileMenu(false)}>
                Dashboard
              </NavLink>
            )}
            {isAuthenticated && user && user.role === 'admin' && (
              <NavLink to="/admin/dashboard" className={mobileNavLinkClasses} onClick={() => setShowMobileMenu(false)}>
                Admin
              </NavLink>
            )}
            
            {/* Mobile auth buttons */}
            <div className="pt-2 border-t border-border">
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className={mobileNavLinkClasses({isActive: location.pathname === '/login'})} 
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={mobileNavLinkClasses({isActive: location.pathname === '/register'})} 
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
