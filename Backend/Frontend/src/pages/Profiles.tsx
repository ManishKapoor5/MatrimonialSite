
// import React, { useEffect, useState } from 'react';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
// import ProfileCard, { ProfileData } from '@/components/profile/ProfileCard';
// import { cn } from '@/lib/utils';
// import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// const Profiles = () => {
//   // Mock profile data
//  const [profiles, setProfiles] = useState<ProfileData[]>([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//   const fetchProfiles = async () => {
//     try {
//       const res = await fetch(`${API_URL}/registerdetails/registerdetails`); // Replace with your backend URL if different
//       if (!res.ok) throw new Error('Failed to fetch profiles');
//       const data: ProfileData[] = await res.json();
//       setProfiles(data);
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProfiles();
// }, []);


//   // Filters state
//   const [filters, setFilters] = useState({
//     gender: '',
//     maritalStatus: '',
//     ageRange: [20, 45],
//     caste: '',
//     searchQuery: '',
//   });

//   const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
//   const [expandedFilters, setExpandedFilters] = useState(false);

//   // Handler functions
//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Searching with filters:', filters);
//     // In a real app, you would fetch filtered profiles here
//   };

//   const resetFilters = () => {
//     setFilters({
//       gender: '',
//       maritalStatus: '',
//       ageRange: [20, 45],
//       caste: '',
//       searchQuery: '',
//     });
//   };

//   // Filtering logic (simplified for demo)
//   const filteredProfiles = profiles.filter(profile => {
//     if (filters.gender && profile.gender !== filters.gender) return false;
//     if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus) return false;
//     if (filters.caste && !profile.caste.toLowerCase().includes(filters.caste.toLowerCase())) return false;
    
//     if (filters.searchQuery) {
//       const query = filters.searchQuery.toLowerCase();
//       return (
//         profile.name.toLowerCase().includes(query) ||
//         profile.profession.toLowerCase().includes(query) ||
//         profile.place.toLowerCase().includes(query) ||
//         profile.caste.toLowerCase().includes(query)
//       );
//     }
    
//     return true;
//   });

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       <main className="flex-1 pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col gap-6">
//             {/* Page header */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <h1 className="text-3xl font-medium">Profiles</h1>
//                 <p className="text-muted-foreground">Browse and manage matrimonial profiles</p>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setSelectedView('grid')}
//                   className={cn(
//                     "p-2 rounded-md transition-colors",
//                     selectedView === 'grid' 
//                       ? "bg-primary text-primary-foreground" 
//                       : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                   )}
//                   aria-label="Grid view"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => setSelectedView('list')}
//                   className={cn(
//                     "p-2 rounded-md transition-colors",
//                     selectedView === 'list' 
//                       ? "bg-primary text-primary-foreground" 
//                       : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
//                   )}
//                   aria-label="List view"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
//                   </svg>
//                 </button>
                
//                 <button
//                   onClick={() => setExpandedFilters(!expandedFilters)}
//                   className="ml-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
//                 >
//                   <div className="flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
//                     </svg>
//                     <span className="text-sm">Filters</span>
//                   </div>
//                 </button>
//               </div>
//             </div>
            
//             {/* Filters section */}
//             {expandedFilters && (
//               <div className="bg-card border border-border/60 rounded-lg p-4 animate-scale-in">
//                 <form onSubmit={handleSearch} className="space-y-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Gender</label>
//                       <select
//                         name="gender"
//                         value={filters.gender}
//                         onChange={handleFilterChange}
//                         className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
//                       >
//                         <option value="">All Genders</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </select>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Marital Status</label>
//                       <select
//                         name="maritalStatus"
//                         value={filters.maritalStatus}
//                         onChange={handleFilterChange}
//                         className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
//                       >
//                         <option value="">All Statuses</option>
//                         <option value="Never Married">Never Married</option>
//                         <option value="Divorced">Divorced</option>
//                         <option value="Widowed">Widowed</option>
//                         <option value="Separated">Separated</option>
//                       </select>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Caste</label>
//                       <input
//                         type="text"
//                         name="caste"
//                         value={filters.caste}
//                         onChange={handleFilterChange}
//                         placeholder="Enter caste"
//                         className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
//                       />
//                     </div>
                    
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium">Search</label>
//                       <input
//                         type="text"
//                         name="searchQuery"
//                         value={filters.searchQuery}
//                         onChange={handleFilterChange}
//                         placeholder="Name, profession, location..."
//                         className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-end space-x-2">
//                     <button
//                       type="button"
//                       onClick={resetFilters}
//                       className="px-3 py-1.5 text-sm font-medium rounded-md border border-input bg-background text-foreground hover:bg-secondary/50 transition-colors"
//                     >
//                       Reset
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
//                     >
//                       Apply Filters
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}
            
//             {/* Profiles section */}
//             <div className="mt-4">
//               <div className="flex items-center justify-between mb-4">
//                 <p className="text-sm text-muted-foreground">
//                   Showing <span className="font-medium">{filteredProfiles.length}</span> profiles
//                 </p>
                
//                 <div className="flex items-center gap-2">
//                   <button
//                     className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
//                     onClick={() => console.log('Add New Profile')}
//                   >
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//                       </svg>
//                       <span>Add New</span>
//                     </div>
//                   </button>
//                 </div>
//               </div>
              
//               {filteredProfiles.length > 0 ? (
//                 <div className={cn(
//                   selectedView === 'grid' 
//                     ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
//                     : "flex flex-col space-y-4"
//                 )}>
//                   {filteredProfiles.map((profile) => (
//                     <ProfileCard
//                       key={profile.id}
//                       profile={profile}
//                       isCompact={selectedView === 'list'}
//                       //onClick={() => console.log(`Viewing profile: ${profile.id}`)}
//                       //onClick={() => window.location.href = `/profile/${profile.id}`}
//                       onClick={() => navigate(`/profile/${profile.id}`)}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-lg">
//                   <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium">No profiles found</h3>
//                   <p className="text-muted-foreground mt-1">Try adjusting your filters or search query</p>
//                   <button
//                     onClick={resetFilters}
//                     className="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default Profiles;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard, { ProfileData } from '@/components/profile/ProfileCard';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Profiles = () => {
  const navigate = useNavigate();
  
  // Profile data state
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [profilesImg, setProfilesImg] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${API_URL}/registerdetails/registerdetails`);
        if (!res.ok) throw new Error('Failed to fetch profiles');
        const data: ProfileData[] = await res.json();
        setProfiles(data);
        setProfilesImg(data);
        console.log('API Response:', data);
        data.forEach(profile => {
  console.log("Profile picture actual value:", profile.profileImage);

});

        
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Filters state
  const [filters, setFilters] = useState({
    gender: '',
    maritalStatus: '',
    ageRange: [20, 45],
    caste: '',
    searchQuery: '',
  });

  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [expandedFilters, setExpandedFilters] = useState(false);

  // Handler functions
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with filters:', filters);
    // In a real app, you would fetch filtered profiles here
  };

  const resetFilters = () => {
    setFilters({
      gender: '',
      maritalStatus: '',
      ageRange: [20, 45],
      caste: '',
      searchQuery: '',
    });
  };

  // Filtering logic
  const filteredProfiles = profiles.filter(profile => {
    if (filters.gender && profile.gender !== filters.gender) return false;
    if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus) return false;
    if (filters.caste && !profile.religiousCulturalBackground.caste.toLowerCase().includes(filters.caste.toLowerCase())) return false;
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        profile.name.toLowerCase().includes(query) ||
        profile.profession.toLowerCase().includes(query) ||
        profile.location.city.toLowerCase().includes(query) ||
        profile.religiousCulturalBackground.caste.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Loading and error states
  if (loading) return <div className="min-h-screen">Loading...</div>;
  if (error) return <div className="min-h-screen">Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Page header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-medium">Profiles</h1>
                <p className="text-muted-foreground">Browse and manage matrimonial profiles</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedView('grid')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    selectedView === 'grid' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                  aria-label="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedView('list')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    selectedView === 'list' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                  aria-label="List view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setExpandedFilters(!expandedFilters)}
                  className="ml-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>
                    <span className="text-sm">Filters</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Filters section */}
            {expandedFilters && (
              <div className="bg-card border border-border/60 rounded-lg p-4 animate-scale-in">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Gender</label>
                      <select
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
                      >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marital Status</label>
                      <select
                        name="maritalStatus"
                        value={filters.maritalStatus}
                        onChange={handleFilterChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
                      >
                        <option value="">All Statuses</option>
                        <option value="Never Married">Never Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Caste</label>
                      <input
                        type="text"
                        name="caste"
                        value={filters.caste}
                        onChange={handleFilterChange}
                        placeholder="Enter caste"
                        className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Search</label>
                      <input
                        type="text"
                        name="searchQuery"
                        value={filters.searchQuery}
                        onChange={handleFilterChange}
                        placeholder="Name, profession, location..."
                        className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="px-3 py-1.5 text-sm font-medium rounded-md border border-input bg-background text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Profiles section */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredProfiles.length}</span> profiles
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    onClick={() => console.log('Add New Profile')}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      <span>Add New</span>
                    </div>
                  </button>
                </div>
              </div>
              
              {filteredProfiles.length > 0 ? (
                <div className={cn(
                  selectedView === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col space-y-4"
                )}>
                  {filteredProfiles.map((profile) => (
                    <ProfileCard
                      key={profile._id}
                      profile={profile}
                      isCompact={selectedView === 'list'}
                      onClick={() =>{
                        navigate(`/profile/${profile._id}`)}}
                      //onClick={() => console.log(`Viewing profile: /profile/${profile.id}`)}
                      //onClick={() => window.location.href = `/profile/${profile.id}`}
                      //onClick={() => navigate(`/profile/${profile.id}`)}
                    />
                    
                  
                  ))}
                  
              
                </div>
                
              ) : (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-border rounded-lg">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium">No profiles found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your filters or search query</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profiles;