// import React from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import ProfileSidebar from '../components/profile/ProfileSidebar';
// import ActivitySummary from '../components/profile/ActivitySummary';
// import UpgradeBanner from '../components/profile/UpgradeBanner';
// import ProfessionalDetails from '@/components/profile/ProfessionalDetails';
// import RecentVisitors from '@/components/profile/RecentVisitors';

// const MyProfile = () => {
//   // Mock data for the profile
//   const profileData = {
//     name: 'Manish Kapoor',
//     id: 'SH14824662',
//     membershipType: 'Free Membership',
//     verificationStatus: {
//       verified: true,
//       validUntil: '1-Apr-26'
//     }
//   };
  
//   // Mock data for activity stats
//   const activityStats = [
//     {
//       count: 0,
//       label: 'No Pending Invitations',
//       locked: false
//     },
//     {
//       count: 0,
//       label: 'No Accepted Invitations',
//       locked: false
//     },
//     {
//       count: 8,
//       label: 'Recent Visitors',
//       isNew: true,
//       newCount: 8,
//       locked: false
//     },
//     {
//       count: 0,
//       label: 'Contacts viewed',
//       locked: true
//     },
//     {
//       count: 0,
//       label: 'Chats initiated',
//       locked: true
//     }
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <main className="flex-1 pt-20 pb-10">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* Left Sidebar - Profile */}
//             <div className="lg:col-span-3">
//               <ProfileSidebar 
//                 name={profileData.name}
//                 id={profileData.id}
//                 membershipType={profileData.membershipType}
//                 verificationStatus={profileData.verificationStatus}
//               />
//             </div>
            
//             {/* Main Content - Activity and Profile Completion */}
//             <div className="lg:col-span-6">
//               <ActivitySummary 
//                 stats={activityStats}
//                 isPremium={false}
//               />
              
//               <ProfessionalDetails />
//             </div>
            
//             {/* Right Sidebar - Premium Banner */}
//             <div className="lg:col-span-3">
//               <UpgradeBanner />
//             </div>
//           </div>
//         </div>
//         <RecentVisitors />
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default MyProfile;

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ActivitySummary from '@/components/profile/ActivitySummary';
import UpgradeBanner from '@/components/profile/UpgradeBanner';
import ProfessionalDetails from '@/components/profile/ProfessionalDetails';
import RecentVisitors from '@/components/profile/RecentVisitors';
import { IdCardIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
 // Assuming '_id' exists on the User type
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ProfileData {
  _id: string;
  name: string;
  id: string;
  image?: string;
}

interface ActivityStat {
  count: number;
  label: string;
  locked: boolean;
  isNew?: boolean;
  newCount?: number;
}

const hardcodedUserId = 'SH14824662';

const MyProfile = () => {
  // Mock data for the profile
  

  const { user } = useAuth(); // assuming you have useAuth() hook
  console.log("user from AuthContext:", user);

  // Mock data for activity stats
  const activityStats = [
    {
      count: 0,
      label: 'No Pending Invitations',
      locked: false
    },
    {
      count: 0,
      label: 'No Accepted Invitations',
      locked: false
    },
    // {
    //   count: 8,
    //   label: 'Recent Visitors',
    //   isNew: true,
    //   newCount: 8,
    //   locked: false
    // },
    // {
    //   count: 0,
    //   label: 'Contacts viewed',
    //   locked: true
    // },
    // {
    //   count: 0,
    //   label: 'Chats initiated',
    //   locked: true
    // }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Profile */}
            <div className="lg:col-span-3">
              <ProfileSidebar 
                image={''}
                name={user.name}
                id={user._id}
                // membershipType={profileData.membershipType}
                // verificationStatus={profileData.verificationStatus}
              />
            </div>
            
            {/* Main Content - Activity and Profile Completion */}
            <div className="lg:col-span-6">
              <ActivitySummary 
                stats={activityStats}
                isPremium={false}
              />
              
              <ProfessionalDetails />
              
              {/* Move RecentVisitors inside the grid layout */}
              {/* <div className="mt-6">
                <RecentVisitors />
              </div> */}
            </div>
            
            {/* Right Sidebar - Premium Banner */}
            <div className="lg:col-span-3">
              <UpgradeBanner />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyProfile;