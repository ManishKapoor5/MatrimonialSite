
import api from './api';

export interface ProfileFormData {
  // Personal Information
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
    details?: string;
  };
  income: string;
  profilePhoto?: string;

  // Family Background
  familyValues: string;
  parentsOccupation: {
    father?: string;
    mother?: string;
  };
  siblings: {
    brothers?: number;
    sisters?: number;
    details?: string;
  };
  religiousCulturalBackground: {
    religion?: string;
    caste?: string;
    subCaste?: string;
    motherTongue?: string;
  };

  // Partner Preferences
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

  // Additional fields from original model
  maritalStatus: string;
  mangalDosh?: string;
  dob: Date;
  timeOfBirth?: string;
  placeOfBirth?: string;
  weight?: string;
  qualification?: string;
  dietPreference?: string;
  drinking?: string;
  smoking?: string;
  fatherName?: string;
  fatherProfession?: string;
  motherName?: string;
  motherStatus?: string;
  currentAddress?: string;
  otherRequirements?: string;
  preferredCity?: string;
  contactPerson?: string;
  whatsappNumber: string;
}

export interface ProfileSearchParams {
  gender?: string;
  ageMin?: number;
  ageMax?: number;
  maritalStatus?: string;
  caste?: string;
  city?: string;
  profession?: string;
  educationLevel?: string;
  income?: string;
}

// Get all profiles
export const getAllProfiles = async () => {
  const response = await api.get('/profiles');
  return response.data;
};

// Get profile by ID
export const getProfileById = async (id: string) => {
  const response = await api.get(`/profiles/${id}`);
  return response.data;
};

// Create profile
export const createProfile = async (profileData: ProfileFormData) => {
  const response = await api.post('/profiles', profileData);
  return response.data;
};

// Update profile
export const updateProfile = async (id: string, profileData: Partial<ProfileFormData>) => {
  const response = await api.put(`/profiles/${id}`, profileData);
  return response.data;
};

// Delete profile
export const deleteProfile = async (id: string) => {
  const response = await api.delete(`/profiles/${id}`);
  return response.data;
};

// Search profiles
export const searchProfiles = async (searchParams: ProfileSearchParams) => {
  const response = await api.post('/profiles/search', searchParams);
  return response.data;
};

// Approve profile (admin only)
export const approveProfile = async (id: string) => {
  const response = await api.put(`/profiles/${id}/approve`);
  return response.data;
};
