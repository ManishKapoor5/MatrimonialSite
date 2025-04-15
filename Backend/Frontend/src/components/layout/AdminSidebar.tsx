
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ChartBar, 
  Users, 
  Settings, 
  Activity, 
  Home, 
  FileText 
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      icon: <ChartBar className="h-5 w-5" />,
      href: '/admin/dashboard',
    },
    {
      title: 'User Management',
      icon: <Users className="h-5 w-5" />,
      href: '/admin/users',
    },
    // {
    //   title: 'System Logs',
    //   icon: <Activity className="h-5 w-5" />,
    //   href: '/admin/logs',
    // },
    // {
    //   title: 'Reports',
    //   icon: <FileText className="h-5 w-5" />,
    //   href: '/admin/reports',
    // },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      href: '/settings',
    },
    {
      title: 'View Site',
      icon: <Home className="h-5 w-5" />,
      href: '/',
    },
  ];

  return (
    <div className="w-56 bg-background/80 border-r border-border h-screen fixed left-0 top-0 pt-16">
      <div className="flex flex-col p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-secondary/50"
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
