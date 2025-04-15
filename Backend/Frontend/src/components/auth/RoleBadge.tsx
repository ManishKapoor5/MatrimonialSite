
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Shield, User, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: 'user' | 'admin' | 'moderator';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ 
  role, 
  showIcon = true,
  size = 'md',
  className
}) => {
  // Define size classes
  const sizeClasses = {
    sm: 'text-xs py-0 px-2',
    md: 'text-sm py-1 px-2',
    lg: 'text-md py-1 px-3'
  };

  // Define role-specific configurations
  const roleConfig = {
    user: {
      variant: 'secondary',
      icon: <User className="h-3 w-3 mr-1" />,
      label: 'User',
      className: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    moderator: {
      variant: 'outline',
      icon: <Lock className="h-3 w-3 mr-1" />,
      label: 'Moderator',
      className: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    admin: {
      variant: 'default',
      icon: <Shield className="h-3 w-3 mr-1" />,
      label: 'Admin',
      className: 'bg-amber-100 text-amber-800 border-amber-200'
    }
  };

  const config = roleConfig[role] || roleConfig.user;

  return (
    <Badge 
      variant={config.variant as any} 
      className={cn(
        sizeClasses[size],
        config.className,
        className
      )}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
};

export default RoleBadge;
