import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  userId: { type: String, required: true },  
  name: { type: String, required: true },
  email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    height: { type: String, required: true },
    location: {
        city: { type: String, default: '' },
        country: { type: String, default: '' }
    },
    profession: { type: String, required: true },
    education: {
        level: { type: String, default: '' },
        details: { type: String }
    },
    income: { type: String, required: true },
    profileImage: { type: String },
    familyValues: { type: String, required: true },
    parentsOccupation: {
        father: { type: String },
        mother: { type: String }
    },
    siblings: {
        brothers: { type: Number, default: 0 },
        sisters: { type: Number, default: 0 },
        details: { type: String }
    },
    religiousCulturalBackground: {
        religion: { type: String },
        caste: { type: String },
        subCaste: { type: String },
        motherTongue: { type: String }
    },
    partnerPreferences: {
        ageRange: {
            min: { type: Number, default: 0 },
            max: { type: Number, default: 0 }
        },
        educationLevel: [{ type: String }],
        professionalBackground: [{ type: String }],
        locationPreferences: [{ type: String }],
        culturalExpectations: { type: String, default: '' }
    },
    maritalStatus: { type: String, required: true },
    mangalDosh: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
