
import api from './api';

export interface BureauFormData {
  name: string;
  address?: string;
  phone: string;
  email?: string;
  contactPerson?: string;
}

// Get all bureaus (admin only)
export const getAllBureaus = async () => {
  const response = await api.get('/bureaus');
  return response.data;
};

// Get bureau by ID (admin only)
export const getBureauById = async (id: string) => {
  const response = await api.get(`/bureaus/${id}`);
  return response.data;
};

// Create bureau (admin only)
export const createBureau = async (bureauData: BureauFormData) => {
  const response = await api.post('/bureaus', bureauData);
  return response.data;
};

// Update bureau (admin only)
export const updateBureau = async (id: string, bureauData: Partial<BureauFormData>) => {
  const response = await api.put(`/bureaus/${id}`, bureauData);
  return response.data;
};

// Delete bureau (admin only)
export const deleteBureau = async (id: string) => {
  const response = await api.delete(`/bureaus/${id}`);
  return response.data;
};

// Get bureau profiles (admin only)
export const getBureauProfiles = async (id: string) => {
  const response = await api.get(`/bureaus/${id}/profiles`);
  return response.data;
};
