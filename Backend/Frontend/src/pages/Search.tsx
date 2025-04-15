
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard, { ProfileData } from '@/components/profile/ProfileCard';
import ProfileForm from '@/components/profile/ProfileForm';
import { cn } from '@/lib/utils';

const Search = () => {
  // Mock profile data
  const [profiles] = useState<ProfileData[]>([
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
      id: '5',
      gender: 'Male',
      maritalStatus: 'Never Married',
      mangalDosh: 'Yes',
      name: 'Aditya Verma',
      dob: '1990-08-12',
      tob: '11:05',
      place: 'Lucknow',
      height: '5\'9"',
      weight: '72 kg',
      qualification: 'MBBS, MD',
      profession: 'Doctor',
      income: '24 LPA',
      caste: 'Kayastha',
      diet: 'Non-Vegetarian',
      drink: 'No',
      smoking: 'No',
      fatherName: 'Suresh Verma',
      fatherProfession: 'Doctor',
      motherName: 'Anita Verma',
      motherStatus: 'Doctor',
      siblings: 'None',
      currentAddress: 'Gomti Nagar, Lucknow',
      requirements: 'Doctor or Professional',
      preferredCity: 'Lucknow, Delhi',
      contactPerson: 'Suresh Verma',
      whatsappNumber: '9289689612',
      createdAt: new Date('2023-05-17'),
      source: 'WhatsApp Group 7',
    },
  ]);

  // State for search criteria
  const [searchResults, setSearchResults] = useState<ProfileData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search submission
  const handleSearch = (searchCriteria: any) => {
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      // Filter profiles based on searchCriteria
      // This is a simplified filtering logic for demo purposes
      const filteredResults = profiles.filter(profile => {
        if (searchCriteria.gender && profile.gender !== searchCriteria.gender) return false;
        if (searchCriteria.maritalStatus && profile.maritalStatus !== searchCriteria.maritalStatus) return false;
        if (searchCriteria.caste && !profile.caste.toLowerCase().includes(searchCriteria.caste.toLowerCase())) return false;
        
        // Additional criteria can be added here
        
        return true;
      });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Page header */}
            <div>
              <h1 className="text-3xl font-medium">Match Search</h1>
              <p className="text-muted-foreground">Find compatible matches based on specific criteria</p>
            </div>
            
            {/* Search form */}
            <div className="bg-card border border-border/60 rounded-lg p-6">
              <h2 className="text-xl font-medium mb-6">Search Criteria</h2>
              
              <div className="max-w-4xl mx-auto">
                <ProfileForm 
                  onSubmit={handleSearch}
                  initialData={{
                    gender: 'Female',
                    maritalStatus: 'Never Married',
                  }}
                />
              </div>
            </div>
            
            {/* Search results */}
            {hasSearched && (
              <div className="mt-8 animate-fade-in">
                <h2 className="text-xl font-medium mb-4">Search Results</h2>
                
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-lg">
                    <div className="loading-spinner mb-4"></div>
                    <p className="text-muted-foreground">Searching for matches...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((profile) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        onClick={() => console.log(`Viewing match: ${profile.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-lg">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-muted-foreground">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">No matches found</h3>
                    <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
