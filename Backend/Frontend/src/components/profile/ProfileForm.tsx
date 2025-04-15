
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProfileFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  className?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  initialData = {},
  className,
}) => {
  const [formData, setFormData] = useState({
    gender: initialData.gender || '',
    maritalStatus: initialData.maritalStatus || '',
    mangalDosh: initialData.mangalDosh || '',
    // name: initialData.name || '',
    dob: initialData.dob || '',
    tob: initialData.tob || '',
    place: initialData.place || '',
    height: initialData.height || '',
    weight: initialData.weight || '',
    qualification: initialData.qualification || '',
    profession: initialData.profession || '',
    income: initialData.income || '',
    caste: initialData.caste || '',
    diet: initialData.diet || '',
    drink: initialData.drink || '',
    smoking: initialData.smoking || '',
    fatherName: initialData.fatherName || '',
    fatherProfession: initialData.fatherProfession || '',
    motherName: initialData.motherName || '',
    motherStatus: initialData.motherStatus || '',
    siblings: initialData.siblings || '',
    currentAddress: initialData.currentAddress || '',
    requirements: initialData.requirements || '',
    preferredCity: initialData.preferredCity || '',
    contactPerson: initialData.contactPerson || '',
    whatsappNumber: initialData.whatsappNumber || '',
    source: initialData.source || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <fieldset className="space-y-4 p-4 rounded-lg border border-border">
          <legend className="px-2 text-sm font-medium">Basic Information</legend>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="maritalStatus" className="block text-sm font-medium">
                Marital Status
              </label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="">Select Status</option>
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
                <option value="Separated">Separated</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="mangalDosh" className="block text-sm font-medium">
                Mangal Dosh
              </label>
              <select
                id="mangalDosh"
                name="mangalDosh"
                value={formData.mangalDosh}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Don't Know">Don't Know</option>
              </select>
            </div>
            
            {/* <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                // value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div> */}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="dob" className="block text-sm font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tob" className="block text-sm font-medium">
                Time of Birth
              </label>
              <input
                type="time"
                id="tob"
                name="tob"
                value={formData.tob}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="place" className="block text-sm font-medium">
                Place
              </label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="height" className="block text-sm font-medium">
                Height
              </label>
              <input
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="weight" className="block text-sm font-medium">
                Weight
              </label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </fieldset>
        
        <fieldset className="space-y-4 p-4 rounded-lg border border-border">
          <legend className="px-2 text-sm font-medium">Personal Information</legend>
          
          <div className="space-y-2">
            <label htmlFor="qualification" className="block text-sm font-medium">
              Qualification
            </label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="profession" className="block text-sm font-medium">
                Profession
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="income" className="block text-sm font-medium">
                Income
              </label>
              <input
                type="text"
                id="income"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="caste" className="block text-sm font-medium">
              Caste
            </label>
            <input
              type="text"
              id="caste"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="diet" className="block text-sm font-medium">
                Diet
              </label>
              <select
                id="diet"
                name="diet"
                value={formData.diet}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="drink" className="block text-sm font-medium">
                Drink
              </label>
              <select
                id="drink"
                name="drink"
                value={formData.drink}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Occasionally">Occasionally</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="smoking" className="block text-sm font-medium">
                Smoking
              </label>
              <select
                id="smoking"
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="Occasionally">Occasionally</option>
              </select>
            </div>
          </div>
        </fieldset>
        
        <fieldset className="space-y-4 p-4 rounded-lg border border-border">
          <legend className="px-2 text-sm font-medium">Family Information</legend>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="fatherName" className="block text-sm font-medium">
                Father's Name
              </label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="fatherProfession" className="block text-sm font-medium">
                Father's Profession
              </label>
              <input
                type="text"
                id="fatherProfession"
                name="fatherProfession"
                value={formData.fatherProfession}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="motherName" className="block text-sm font-medium">
                Mother's Name
              </label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="motherStatus" className="block text-sm font-medium">
                Mother's Status
              </label>
              <select
                id="motherStatus"
                name="motherStatus"
                value={formData.motherStatus}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select</option>
                <option value="Working">Working</option>
                <option value="Housewife">Housewife</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="siblings" className="block text-sm font-medium">
              Siblings
            </label>
            <input
              type="text"
              id="siblings"
              name="siblings"
              value={formData.siblings}
              onChange={handleChange}
              placeholder="e.g., 1 Brother, 2 Sisters"
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </fieldset>
        
        <fieldset className="space-y-4 p-4 rounded-lg border border-border">
          <legend className="px-2 text-sm font-medium">Contact Information</legend>
          
          <div className="space-y-2">
            <label htmlFor="currentAddress" className="block text-sm font-medium">
              Current Address
            </label>
            <textarea
              id="currentAddress"
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contactPerson" className="block text-sm font-medium">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="whatsappNumber" className="block text-sm font-medium">
                WhatsApp Number
              </label>
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="requirements" className="block text-sm font-medium">
                Any Other Requirements
              </label>
              <input
                type="text"
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="preferredCity" className="block text-sm font-medium">
                Preferred City
              </label>
              <input
                type="text"
                id="preferredCity"
                name="preferredCity"
                value={formData.preferredCity}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="source" className="block text-sm font-medium">
              Source
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="e.g., WhatsApp Group Name"
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </fieldset>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => setFormData(initialData)}
          className="px-4 py-2 text-sm font-medium rounded-md border border-input bg-background text-foreground hover:bg-secondary transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
