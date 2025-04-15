export type ProfileData = {
  _id: string;
  name: string;
  age: number;
  gender: string;
  maritalStatus: string;
  mangalDosh: string;
  dob: string;
  profilePictureUrl?: string;
  location?: {
    place?: string;
  };
  education?: {
    qualification?: string;
    institution?: string;
  };
  parentsOccupation?: {
    father?: string;
    mother?: string;
  };
  religiousCulturalBackground?: {
    caste?: string;
    diet?: string;
  };
  siblings?: string;
  income?: string;
  whatsappNumber?: string;
  contactPerson?: string;
  createdAt: Date;
  // ...any other nested fields
};
