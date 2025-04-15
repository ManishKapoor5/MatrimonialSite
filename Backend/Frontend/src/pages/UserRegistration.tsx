import React, { useState } from 'react';
import { User, MapPin, GraduationCap, Briefcase, Heart, Users, Calendar } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface RegistrationData {
  id: string;
  name: string;
  email: string;
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
  mangalDosh?: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationData>({
    id: '',
    name: '',
    email: '',
    age: 0,
    gender: 'Male',
    height: '',
    location: {
      city: '',
      country: '',
    },
    profession: '',
    education: {
      level: '',
      details: '',
    },
    income: '',
    profilePhoto: '',
    familyValues: '',
    parentsOccupation: {
      father: '',
      mother: '',
    },
    siblings: {
      brothers: 0,
      sisters: 0,
      details: '',
    },
    religiousCulturalBackground: {
      religion: '',
      caste: '',
      subCaste: '',
      motherTongue: '',
    },
    partnerPreferences: {
      ageRange: {
        min: 0,
        max: 0,
      },
      educationLevel: [],
      professionalBackground: [],
      locationPreferences: [],
      culturalExpectations: '',
    },
    maritalStatus: 'Never Married',
    mangalDosh: 'No',
    createdAt: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    nestedField?: keyof RegistrationData,
    subField?: string
  ) => {
    const { name, value } = e.target;

    if (nestedField && subField) {
      setFormData(prev => {
        const nestedObject = prev[nestedField];
        if (typeof nestedObject !== 'object' || nestedObject === null) return prev;

        if (nestedField === 'partnerPreferences' && (subField === 'min' || subField === 'max')) {
          const numValue = Math.max(0, Number(value));
          return {
            ...prev,
            partnerPreferences: {
              ...prev.partnerPreferences,
              ageRange: {
                ...prev.partnerPreferences.ageRange,
                [subField]: numValue,
              },
            },
          };
        }

        const isNumericField =
          nestedField === 'siblings' && (subField === 'brothers' || subField === 'sisters');
        return {
          ...prev,
          [nestedField]: {
            ...nestedObject,
            [subField]: isNumericField ? Math.max(0, Number(value)) : value,
          },
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'age' ? Math.max(0, Number(value)) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const requiredFields = {
    name: formData.name,
    email: formData.email,
    age: formData.age,
    gender: formData.gender,
    height: formData.height,
    'location.city': formData.location.city,
    'location.country': formData.location.country,
    profession: formData.profession,
    'education.level': formData.education.level,
    income: formData.income,
    familyValues: formData.familyValues,
    maritalStatus: formData.maritalStatus,
    'partnerPreferences.ageRange.min': formData.partnerPreferences.ageRange.min,
    'partnerPreferences.ageRange.max': formData.partnerPreferences.ageRange.max,
    'partnerPreferences.culturalExpectations': formData.partnerPreferences.culturalExpectations,
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value || (typeof value === 'number' && value <= 0)) {
      toast.error(`Please fill in the ${field.replace(/([A-Z]|\.)/g, ' $1').toLowerCase()} field.`);
      setIsSubmitting(false);
      return;
    }
  }

  try {
    // ✅ Get userId from localStorage
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    // ✅ Add userId to formData
    const formDataWithId = {
      ...formData,
      userId: userId,
    };

    const response = await fetch(`${API_URL}/registerdetails/registerdetails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataWithId),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 400) {
        throw new Error(errorData?.message || 'Invalid data submitted');
      }
      throw new Error(errorData?.message || `Server error: ${response.status}`);
    }

    toast.success('Registration submitted successfully!');
    navigate('/myprofile');

    // Reset form
    setFormData({
      id: '',
      name: '',
      email: '',
      age: 0,
      gender: 'Male',
      height: '',
      location: { city: '', country: '' },
      profession: '',
      education: { level: '', details: '' },
      income: '',
      profilePhoto: '',
      familyValues: '',
      parentsOccupation: { father: '', mother: '' },
      siblings: { brothers: 0, sisters: 0, details: '' },
      religiousCulturalBackground: { religion: '', caste: '', subCaste: '', motherTongue: '' },
      partnerPreferences: {
        ageRange: { min: 0, max: 0 },
        educationLevel: [],
        professionalBackground: [],
        locationPreferences: [],
        culturalExpectations: '',
      },
      maritalStatus: 'Never Married',
      mangalDosh: 'No',
      createdAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error submitting registration:', error);
    const message = error instanceof Error
      ? error.message.includes('Failed to fetch')
        ? 'Network error: Please check your connection.'
        : error.message
      : 'Failed to submit registration. Please try again.';
    toast.error(message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-[hsl(10_80%_97%)] py-12 px-4 sm:px-6 lg:px-8 text-[hsl(330_50%_20%)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="mx-auto h-12 w-12 text-[hsl(350_80%_50%)]" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[hsl(330_50%_20%)]">
            PBST <span className="text-[hsl(350_80%_50%)]">Rishte-Nate</span>
          </h2>
          <h3 className="mt-2 text-2xl font-bold text-[hsl(330_50%_20%)]">Create an account</h3>
          <p className="mt-2 text-[hsl(350_80%_50%)]">Enter your details to register</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-[hsl(10_60%_95%)] p-8 rounded-lg shadow border border-[hsl(30_50%_75%)]">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(330_50%_20%)] flex items-center gap-2">
              <User className="h-5 w-5 text-[hsl(350_80%_50%)]" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)] placeholder-[hsl(330_50%_35%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Email</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)] placeholder-[hsl(330_50%_35%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block 
   
text-sm font-medium text-[hsl(330_50%_35%)]">Age</label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Height</label>
                <input
                  id="height"
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g., 5'10''"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)] placeholder-[hsl(330_50%_35%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="location.city" className="block text-sm font-medium text-[hsl(330_50%_35%)]">City</label>
                <input
                  id="location.city"
                  type="text"
                  name="city"
                  value={formData.location.city}
                  onChange={(e) => handleChange(e, 'location', 'city')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="location.country" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Country</label>
                <input
                  id="location.country"
                  type="text"
                  name="country"
                  value={formData.location.country}
                  onChange={(e) => handleChange(e, 'location', 'country')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="maritalStatus" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Marital Status</label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                >
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>

              <div>
                <label htmlFor="mangalDosh" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Mangal Dosh</label>
                <select
                  id="mangalDosh"
                  name="mangalDosh"
                  value={formData.mangalDosh}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Education & Career */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(330_50%_20%)] flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[hsl(350_80%_50%)]" /> Education & Career
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="education.level" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Education Level</label>
                <input
                  id="education.level"
                  type="text"
                  name="level"
                  value={formData.education.level}
                  onChange={(e) => handleChange(e, 'education', 'level')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="education.details" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Education Details</label>
                <input
                  id="education.details"
                  type="text"
                  name="details"
                  value={formData.education.details || ''}
                  onChange={(e) => handleChange(e, 'education', 'details')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Profession</label>
                <input
                  id="profession"
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="income" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Annual Income</label>
                <input
                  id="income"
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  placeholder="e.g., 15 LPA"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)] placeholder-[hsl(330_50%_35%)]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(330_50%_20%)] flex items-center gap-2">
              <Users className="h-5 w-5 text-[hsl(350_80%_50%)]" /> Family Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="familyValues" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Family Values</label>
                <input
                  id="familyValues"
                  type="text"
                  name="familyValues"
                  value={formData.familyValues}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="parentsOccupation.father" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Father's Occupation</label>
                <input
                  id="parentsOccupation.father"
                  type="text"
                  name="father"
                  value={formData.parentsOccupation.father || ''}
                  onChange={(e) => handleChange(e, 'parentsOccupation', 'father')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="parentsOccupation.mother" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Mother's Occupation</label>
                <input
                  id="parentsOccupation.mother"
                  type="text"
                  name="mother"
                  value={formData.parentsOccupation.mother || ''}
                  onChange={(e) => handleChange(e, 'parentsOccupation', 'mother')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="siblings.brothers" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Number of Brothers</label>
                <input
                  id="siblings.brothers"
                  type="number"
                  name="brothers"
                  value={formData.siblings.brothers || 0}
                  onChange={(e) => handleChange(e, 'siblings', 'brothers')}
                  min="0"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="siblings.sisters" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Number of Sisters</label>
                <input
                  id="siblings.sisters"
                  type="number"
                  name="sisters"
                  value={formData.siblings.sisters || 0}
                  onChange={(e) => handleChange(e, 'siblings', 'sisters')}
                  min="0"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="siblings.details" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Siblings Details</label>
                <input
                  id="siblings.details"
                  type="text"
                  name="details"
                  value={formData.siblings.details || ''}
                  onChange={(e) => handleChange(e, 'siblings', 'details')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>
            </div>
          </div>

          {/* Religious & Cultural Background */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(330_50%_20%)] flex items-center gap-2">
              <Users className="h-5 w-5 text-[hsl(350_80%_50%)]" /> Religious & Cultural Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="religiousCulturalBackground.religion" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Religion</label>
                <input
                  id="religiousCulturalBackground.religion"
                  type="text"
                  name="religion"
                  value={formData.religiousCulturalBackground.religion || ''}
                  onChange={(e) => handleChange(e, 'religiousCulturalBackground', 'religion')}
                  className="mt-1 block w-full rounded-md border
                  border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="religiousCulturalBackground.caste" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Caste</label>
                <input
                  id="religiousCulturalBackground.caste"
                  type="text"
                  name="caste"
                  value={formData.religiousCulturalBackground.caste || ''}
                  onChange={(e) => handleChange(e, 'religiousCulturalBackground', 'caste')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="religiousCulturalBackground.subCaste" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Sub-Caste</label>
                <input
                  id="religiousCulturalBackground.subCaste"
                  type="text"
                  name="subCaste"
                  value={formData.religiousCulturalBackground.subCaste || ''}
                  onChange={(e) => handleChange(e, 'religiousCulturalBackground', 'subCaste')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>

              <div>
                <label htmlFor="religiousCulturalBackground.motherTongue" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Mother Tongue</label>
                <input
                  id="religiousCulturalBackground.motherTongue"
                  type="text"
                  name="motherTongue"
                  value={formData.religiousCulturalBackground.motherTongue || ''}
                  onChange={(e) => handleChange(e, 'religiousCulturalBackground', 'motherTongue')}
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                />
              </div>
            </div>
          </div>

          {/* Partner Preferences */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-[hsl(330_50%_20%)] flex items-center gap-2">
              <Heart className="h-5 w-5 text-[hsl(350_80%_50%)]" /> Partner Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="partnerPreferences.ageRange.min" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Min Age</label>
                <input
                  id="partnerPreferences.ageRange.min"
                  type="number"
                  name="min"
                  value={formData.partnerPreferences.ageRange.min || ''}
                  onChange={(e) => handleChange(e, 'partnerPreferences', 'min')}
                  min="0"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div>
                <label htmlFor="partnerPreferences.ageRange.max" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Max Age</label>
                <input
                  id="partnerPreferences.ageRange.max"
                  type="number"
                  name="max"
                  value={formData.partnerPreferences.ageRange.max || ''}
                  onChange={(e) => handleChange(e, 'partnerPreferences', 'max')}
                  min="0"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="partnerPreferences.culturalExpectations" className="block text-sm font-medium text-[hsl(330_50%_35%)]">Cultural Expectations</label>
                <textarea
                  id="partnerPreferences.culturalExpectations"
                  name="culturalExpectations"
                  value={formData.partnerPreferences.culturalExpectations}
                  onChange={(e) => handleChange(e, 'partnerPreferences', 'culturalExpectations')}
                  rows={4}
                  placeholder="Describe your cultural expectations from a partner"
                  className="mt-1 block w-full rounded-md border border-[hsl(30_50%_75%)] bg-[hsl(30_50%_80%)] px-3 py-2 text-[hsl(330_50%_25%)] focus:border-[hsl(350_70%_65%)] focus:outline-none focus:ring-1 focus:ring-[hsl(350_70%_65%)] placeholder-[hsl(330_50%_35%)]"
                  required
                />
              </div>
              {/* Note: partnerPreferences.educationLevel, professionalBackground, and locationPreferences are not implemented yet */}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[hsl(350_80%_50%)] text-[hsl(10_80%_98%)] px-6 py-3 rounded-md hover:bg-[hsl(350_80%_60%)] focus:outline-none focus:ring-2 focus:ring-[hsl(350_70%_65%)] focus:ring-offset-2 focus:ring-offset-[hsl(10_60%_95%)] disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Registration'
              )}
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default UserRegistration;