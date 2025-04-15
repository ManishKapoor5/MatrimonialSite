import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// export type ProfileData = {
//   _id: string;
//   gender: string;
//    profilePictureUrl?: string; 
//   maritalStatus: string;
//   mangalDosh: string;
//   name: string;
//   dob: string;
//   age: number;
//   tob: string;
//   place: string;
//   height: string;
//   weight: string;
//   qualification: string;
//   profession: string;
//   income: string;
//   caste: string;
//   diet: string;
//   drink: string;
//   smoking: string;
//   fatherName: string;
//   fatherProfession: string;
//   motherName: string;
//   motherStatus: string;
//   siblings: string;
//   currentAddress: string;
//   requirements: string;
//   preferredCity: string;
//   contactPerson: string;
//   whatsappNumber: string;
//   createdAt: Date;
//   source: string;
// };

export interface ProfileData {
  _id: string;
  name: string;
  age: number;
  gender: string;
  height: string;
  location: {
    city: string;
    country: string;
  };
  profession: string;
  education: {
    level: string;
    details: string;
  };
  income: string;
  profileImage: string;
  familyValues: string;
  parentsOccupation: {
    father: string;
    mother: string;
  };
  siblings: {
    brothers: number;
    sisters: number;
    details: string;
  };
  religiousCulturalBackground: {
    religion: string;
    caste: string;
    subCaste: string;
    motherTongue: string;
  };
  partnerPreferences: {
    ageRange: {
      min: number;
      max: number;
    };
    educationLevel: string[];
    professionalBackground: string[];
    locationPreferences: string[];
    culturalExpectations: string;
  };
  maritalStatus: string;
  mangalDosh: string;
  createdAt: Date;
}


interface ProfileCardProps {
  profile: ProfileData;
  className?: string;
  onClick?: () => void;
  isCompact?: boolean;
  onPictureChange?: (file: File) => void;
}



const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  
  className,
  onClick,
  isCompact = false,
}) => {
  const { user, setUser } = useAuth();

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  const cardClasses = cn(
    'rounded-lg border border-border/60 bg-card overflow-hidden transition-all',
    'hover:border-primary/20 hover:shadow-sm card-hover',
    onClick && 'cursor-pointer',
    className
  );

  if (isCompact) {
    return (
      <div className={cardClasses} onClick={onClick}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary">
                {profile.gender}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary">
                {profile.religiousCulturalBackground.caste}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(profile.createdAt.toString())}
            </span>
          </div>
          
          <h3 className="font-medium text-lg text-card-foreground">{profile.name}</h3>
          
          <div className="mt-2 text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <div>Age: {profile.age}</div>
              <div>Profession: {profile.profession || 'N/A'}</div>
              <div>Location: {profile.location.country || 'N/A'}</div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderProfileImage = () => (
    
  <div className="w-20 h-20 rounded-full overflow-hidden border border-border bg-muted flex-shrink-0">
    
    {profile.profileImage ? (
      <img
        src={profile.profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
        No Image
      </div>
    )}
  </div>
);


  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          {renderProfileImage()}
          <div className="flex flex-wrap gap-2">
              
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary">
              {profile.gender}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary">
              {profile.maritalStatus}
            </span>
            {profile.mangalDosh && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-primary">
                Mangal: {profile.mangalDosh}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(profile.createdAt.toString())}
          </span>
        </div>
        
        <h3 className="font-medium text-xl text-card-foreground">{profile.name}</h3>
        
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">DOB:</span>{" "}
                <span>{profile.age || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Education:</span>{" "}
                <span>{profile.education.level || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Profession:</span>{" "}
                <span>{profile.profession || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Income:</span>{" "}
                <span>{profile.income || 'N/A'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Height:</span>{" "}
                <span>{profile.height || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Caste:</span>{" "}
                <span>{profile.religiousCulturalBackground.religion || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Diet:</span>{" "}
                <span>{profile.familyValues || 'N/A'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>{" "}
                <span>{profile.location.city || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border/60">
            <div>
              <span className="text-muted-foreground">Family:</span>{" "}
              <span>
                {/* {profile. && `Father: ${profile.fatherName}`}
                {profile.motherName && `, Mother: ${profile.motherName}`} */}
                {profile.siblings.brothers && `, Siblings: ${profile.siblings.brothers}`}
              </span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border/60">
            <div>
              <span className="text-muted-foreground">Contact:</span>{" "}
              {/* <span>{profile. || 'N/A'} ({profile.whatsappNumber || 'N/A'})</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility function to calculate age from DOB
const calculateAge = (dob: string) => {
  try {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    return 'N/A';
  }
};

export default ProfileCard;
