
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import ProfileCard, { ProfileData } from '@/components/profile/ProfileCard';

const Dashboard = () => {
  // Mock data for dashboard statistics and recent profiles
  const [stats] = useState({
    totalProfiles: 15782,
    recentAdditions: 48,
    pendingReviews: 12,
    matchesCreated: 126,
  });

  const [recentProfiles] = useState<ProfileData[]>([
    {
      id: '1',
      gender: 'Male',
      maritalStatus: 'Never Married',
      mangalDosh: 'No',
      name: 'Rahul Sharma',
      dob: '1992-06-15',
      tob: '14:30',
      place: 'Delhi',
      height: '5\'10"',
      weight: '75 kg',
      qualification: 'B.Tech',
      profession: 'Software Engineer',
      income: '15 LPA',
      caste: 'Brahmin',
      diet: 'Vegetarian',
      drink: 'No',
      smoking: 'No',
      fatherName: 'Ramesh Sharma',
      fatherProfession: 'Retired Govt. Officer',
      motherName: 'Sunita Sharma',
      motherStatus: 'Housewife',
      siblings: '1 Sister (Married)',
      currentAddress: 'Sector 45, Gurgaon',
      requirements: 'Working professional',
      preferredCity: 'Delhi NCR',
      contactPerson: 'Ramesh Sharma',
      whatsappNumber: '9289689608',
      createdAt: new Date('2023-05-12'),
      source: 'WhatsApp Group 3',
    },
    {
      id: '2',
      gender: 'Female',
      maritalStatus: 'Never Married',
      mangalDosh: 'Yes',
      name: 'Priya Gupta',
      dob: '1994-09-23',
      tob: '10:15',
      place: 'Mumbai',
      height: '5\'4"',
      weight: '58 kg',
      qualification: 'MBA',
      profession: 'Bank Manager',
      income: '12 LPA',
      caste: 'Agarwal',
      diet: 'Vegetarian',
      drink: 'No',
      smoking: 'No',
      fatherName: 'Ajay Gupta',
      fatherProfession: 'Business',
      motherName: 'Rekha Gupta',
      motherStatus: 'Housewife',
      siblings: '1 Brother (Unmarried)',
      currentAddress: 'Andheri West, Mumbai',
      requirements: 'Well settled business family',
      preferredCity: 'Mumbai',
      contactPerson: 'Ajay Gupta',
      whatsappNumber: '9289689609',
      createdAt: new Date('2023-05-14'),
      source: 'WhatsApp Group 2',
    },
    {
      id: '3',
      gender: 'Male',
      maritalStatus: 'Divorced',
      mangalDosh: 'No',
      name: 'Vikram Singh',
      dob: '1989-03-07',
      tob: '08:45',
      place: 'Jaipur',
      height: '5\'11"',
      weight: '82 kg',
      qualification: 'M.Com',
      profession: 'Chartered Accountant',
      income: '18 LPA',
      caste: 'Rajput',
      diet: 'Non-Vegetarian',
      drink: 'Occasionally',
      smoking: 'No',
      fatherName: 'Raj Singh',
      fatherProfession: 'Ex-Army Officer',
      motherName: 'Meena Singh',
      motherStatus: 'Housewife',
      siblings: '2 Brothers (Married)',
      currentAddress: 'C-Scheme, Jaipur',
      requirements: 'Understanding partner',
      preferredCity: 'Jaipur, Delhi NCR',
      contactPerson: 'Vikram Singh',
      whatsappNumber: '9289689610',
      createdAt: new Date('2023-05-15'),
      source: 'WhatsApp Group 5',
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-medium">Dashboard</h1>
                <p className="text-muted-foreground">Your matrimonial profile management overview</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/profiles"
                  className="inline-flex items-center px-4 py-2 bg-secondary text-sm font-medium rounded-md hover:bg-secondary/80 transition-colors"
                >
                  All Profiles
                </Link>
                <Link
                  to="/search"
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Search Matches
                </Link>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Profiles</p>
                    <h3 className="text-2xl font-semibold mt-1">{stats.totalProfiles.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 rounded-md bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+{stats.recentAdditions}</span> new this week
                </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                    <h3 className="text-2xl font-semibold mt-1">{stats.pendingReviews}</h3>
                  </div>
                  <div className="p-2 rounded-md bg-yellow-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Profiles waiting for approval
                </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Groups</p>
                    <h3 className="text-2xl font-semibold mt-1">17</h3>
                  </div>
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  WhatsApp groups connected
                </div>
              </div>
              
              <div className="bg-card border border-border/60 rounded-lg p-5 hover:border-primary/20 transition-colors card-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Matches Created</p>
                    <h3 className="text-2xl font-semibold mt-1">{stats.matchesCreated}</h3>
                  </div>
                  <div className="p-2 rounded-md bg-green-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+14</span> in the last month
                </div>
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div className="mt-6">
              <h2 className="text-xl font-medium mb-4">Recent Profiles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProfiles.map((profile) => (
                  <ProfileCard
                    key={profile.id}
                    profile={profile}
                    isCompact={true}
                    onClick={() => console.log(`Viewing profile: ${profile.id}`)}
                  />
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link
                  to="/profiles"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary hover:underline"
                >
                  View All Profiles
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Quick Actions Section */}
            <div className="mt-8 bg-card border border-border/60 rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  className="flex flex-col items-center justify-center p-4 border border-border/60 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => console.log('Add profile clicked')}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Add Profile</span>
                </button>
                
                <button 
                  className="flex flex-col items-center justify-center p-4 border border-border/60 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => console.log('Import profiles clicked')}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Import Profiles</span>
                </button>
                
                <button 
                  className="flex flex-col items-center justify-center p-4 border border-border/60 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => console.log('Match finder clicked')}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Match Finder</span>
                </button>
                
                <button 
                  className="flex flex-col items-center justify-center p-4 border border-border/60 rounded-lg hover:bg-secondary/50 transition-colors"
                  onClick={() => console.log('Bureau tracking clicked')}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Bureau Tracking</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
