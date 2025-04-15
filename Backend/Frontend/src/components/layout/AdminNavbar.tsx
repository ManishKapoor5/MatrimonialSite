
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { cn } from '@/lib/utils';
// // import { Shield, LogOut, Bell } from 'lucide-react';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuLabel,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { Button } from '@/components/ui/button';
// // import { useNavigate } from 'react-router-dom';

// // const AdminNavbar = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [alertCount] = React.useState(3); // Mock alerts

// //   const handleLogout = async () => {
// //     try {
// //       await logout();
// //       navigate('/login');
// //     } catch (error) {
// //       console.error('Logout failed:', error);
// //     }
// //   };

// //   const userInitials = user?.name
// //     ? user.name.split(' ')
// //         .map(n => n[0])
// //         .join('')
// //         .toUpperCase()
// //         .substring(0, 2)
// //     : 'A';

// //   return (
// //     <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-primary text-primary-foreground">
// //       <div className="container mx-auto px-4 h-full flex items-center justify-between">
// //         <Link to="/admin/dashboard" className="flex items-center space-x-2">
// //           <Shield className="h-6 w-6" />
// //           <span className="text-lg font-medium">Admin Panel</span>
// //         </Link>

// //         <div className="flex items-center space-x-4">
// //           <Button variant="ghost" size="icon" className="relative">
// //             <Bell className="h-5 w-5" />
// //             {alertCount > 0 && (
// //               <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
// //                 {alertCount}
// //               </span>
// //             )}
// //           </Button>

// //           <DropdownMenu>
// //             <DropdownMenuTrigger asChild>
// //               <Button variant="ghost" className="relative rounded-full" size="icon">
// //                 <Avatar className="h-8 w-8">
// //                   <AvatarFallback className="bg-primary-foreground/10">
// //                     {userInitials}
// //                   </AvatarFallback>
// //                 </Avatar>
// //               </Button>
// //             </DropdownMenuTrigger>
// //             <DropdownMenuContent align="end">
// //               <DropdownMenuLabel>My Account</DropdownMenuLabel>
// //               <DropdownMenuSeparator />
// //               <DropdownMenuItem asChild>
// //                 <Link to="/settings">Settings</Link>
// //               </DropdownMenuItem>
// //               <DropdownMenuItem onClick={handleLogout} className="text-destructive">
// //                 <LogOut className="mr-2 h-4 w-4" />
// //                 <span>Log out</span>
// //               </DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // };

// // export default AdminNavbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { Shield, LogOut, Bell } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// const AdminNavbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [alertCount] = React.useState(3); // Mock alerts

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const userInitials = user?.name
//     ? user.name.split(' ')
//         .map(n => n[0])
//         .join('') 
//         .toUpperCase()
//         .substring(0, 2)
//     : 'A';

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black text-white">
//       <div className="container mx-auto px-4 h-full flex items-center justify-between">
//         <Link to="/admin/dashboard" className="flex items-center space-x-2">
//           <Shield className="h-6 w-6 text-white" />
//           <span className="text-lg font-medium text-white">Admin Panel</span>
//         </Link>

//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="icon" className="relative">
//             <Bell className="h-5 w-5 text-white" />
//             {alertCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {alertCount}
//               </span>
//             )}
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative rounded-full" size="icon">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback className="bg-primary-foreground/10 text-black">
//                     {userInitials}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem asChild>
//                 <Link to="/settings" className="text-black hover:text-gray-600">Settings</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={handleLogout} className="text-destructive">
//                 <LogOut className="mr-2 h-4 w-4 text-black" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminNavbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, LogOut, Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [alertCount] = React.useState(3); // Mock alerts

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userInitials = user?.name
    ? user.name.split(' ')
        .map(n => n[0])
        .join('') 
        .toUpperCase()
        .substring(0, 2)
    : 'A';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/10 text-primary">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-medium text-primary">Admin Panel</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-white" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {alertCount}
              </span>
            )}
          </Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative rounded-full" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white text-black">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background text-primary">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="text-primary hover:bg-gray-700 rounded px-3 py-2">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:bg-gray-700 rounded px-3 py-2">
                <LogOut className="mr-2 h-4 w-4 text-primary" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;