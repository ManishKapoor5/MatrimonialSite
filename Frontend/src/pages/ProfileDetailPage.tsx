import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProfileData } from '@/components/profile/ProfileCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/registerdetails/registerdetails/${id}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data: ProfileData = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="min-h-screen">Loading...</div>;
  if (error) return <div className="min-h-screen">Error: {error}</div>;
  if (!profile) return <div className="min-h-screen">Profile not found</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* <button
            onClick={() => navigate('-1')}
            className="mb-4 px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            ← Back to Profiles
          </button> */}

          <div className="bg-card border border-border/60 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={profile.profileImage || 'https://via.placeholder.com/300'}
                  alt={profile.name}
                  className="w-64 h-64 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-medium mb-2">{profile.name}</h1>
                <div className="space-y-2">
                  <p><span className="font-medium">Age:</span> {profile.age}</p>
                  <p><span className="font-medium">Gender:</span> {profile.gender}</p>
                  <p><span className="font-medium">Marital Status:</span> {profile.maritalStatus}</p>
                  <p><span className="font-medium">Caste:</span> {profile.religiousCulturalBackground.caste}</p>
                  <p><span className="font-medium">Profession:</span> {profile.profession}</p>
                  <p><span className="font-medium">Location:</span> {profile.location.city}</p>
                  {/* Add more profile details as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileDetail;