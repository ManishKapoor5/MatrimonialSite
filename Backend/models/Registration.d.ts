import { Model } from 'mongoose';

interface IRegistration {
  gender: string;
  marital_status: string;
  mangal_dosh: string;
  name: string;
  dob: string;
  tob: string;
  place: string;
  height: string;
  weight: string;
  qualification: string;
  profession: string;
  income: string;
  profilePhoto: string;
  caste: string;
  diet: string;
  drink: string;
  smoking: string;
  father_name: string;
  father_profession: string;
  mother_name: string;
  mother_status: string;
  siblings: string;
  current_address: string;
  requirements: string;
  preferred_city: string;
  contact_person: string;
  whatsapp_number: string;
  source: string;
  created_at: Date;
}

interface RegistrationModel extends Model<IRegistration> {
  prepare(query: string): { run: (data: any) => void };
}

declare const Registration: RegistrationModel;
export default Registration; 