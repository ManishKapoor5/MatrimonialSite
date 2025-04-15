import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { register } from 'module';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ProfileSidebarProps {
  image: string | null;
  name: string;
  id: string;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ image, name, id }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(image || null);
  const [avatar, setAvatar] = useState<string | null>(image || null);
  const [inputdata, setInputdata] = useState<string | null>(image || null);
  const { user, setUser } = useAuth();

  useEffect(() => {
    axios.get(`${API_URL}/registerdetails/photodetails/${user._id}`)
      .then((response) => {
        const { data } = response.data;
        setPreviewUrl(data.profileImage);
        setInputdata(data.profileImage);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [ user._id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const localUrl = URL.createObjectURL(file);
    setInputdata(localUrl);

    const img = new Image();
    img.src = localUrl;
    img.onload = () => URL.revokeObjectURL(localUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!imageFile) {
      setUploadError("Please select an image before uploading.");
      return;
    }

    setIsUploading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'image_upload_using_cloudinary');
      formData.append('cloud_name', 'drlfjg9g4');

      const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/drlfjg9g4/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;
      setAvatar(imageUrl);

      console.log("Cloudinary Image URL:", imageUrl);

      const token = localStorage.getItem("token");

      if (!id || id === "") {
        const createResponse = await axios.post(`${API_URL}/registerdetails/photodetails`, {
          id,
          name,
          image: imageUrl,
        });

        console.log("Created new image:", createResponse.data);
        setUser({ ...user, images: imageUrl });
        setImageFile(null);
      } else {
        const updateResponse = await fetch(`${API_URL}/registerdetails/photodetails/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: user._id,
             name: user.name,
            profileImage: imageUrl, // ✅ Correctly send just the string URL
          }),
        });

        console.log("Updated image:", await updateResponse.json());
        console.log("Profile photo from frontend",imageUrl)
        setUser({ ...user, images: imageUrl });
      }

      setPreviewUrl(imageUrl);
    } catch (error: any) {
      console.error(error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-gray-300 relative">
            <img
              src={inputdata || "/default-profile.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUploading}
          />
          <label htmlFor="fileInput" className="text-cyan-600 cursor-pointer text-sm">
            {isUploading ? "Uploading..." : "Change Profile Picture"}
          </label>
        </div>

        {uploadError && (
          <div className="text-red-500 text-sm text-center mb-2">{uploadError}</div>
        )}

        <Button type="submit" disabled={isUploading} className="w-full">
          Upload
        </Button>

        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">{name}</h2>
        </div>
      </form>
    </div>
  );
};

export default ProfileSidebar;