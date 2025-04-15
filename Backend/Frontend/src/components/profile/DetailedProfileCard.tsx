import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, User, Briefcase, GraduationCap, MapPin, Check } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export interface DetailedProfileData {
  //id: string;
   _id: string;
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
  photos?: string[]; // Array of photo URLs fetched from the database

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

  // Additional fields
  maritalStatus: string;
  mangalDosh?: string;
  createdAt: Date;
}

interface DetailedProfileCardProps {
  profile: DetailedProfileData;
  onContact?: () => void;
  onInterest?: () => void;
  onShare?: () => void;
  className?: string;
}

const DetailedProfileCard: React.FC<DetailedProfileCardProps> = ({
  profile,
  onContact,
  onInterest,
  onShare,
  className,
}) => {
  
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState<string>(
    profile.profilePhoto || (profile.photos && profile.photos.length > 0 ? profile.photos[0] : '')
  );

  const [interestSent, setInterestSent] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  // Handle selecting a photo as the profile photo
  const handleSetProfilePhoto = (photoUrl: string) => {
    setSelectedProfilePhoto(photoUrl);
    // In a real application, you would also update the backend here
    // For example:
    // await axios.patch(`/api/profiles/${profile.id}`, { profilePhoto: photoUrl });
  };

  const handleShowInterest = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to show interest.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/interest/send`,
      {
        senderId: user._id,
        receiverId: profile._id,
      });

   

      if (response.data.success) {
        toast({
          title: 'Interest Sent!',
          description: `You have shown interest in ${profile.name}.`,
        });
      } else {
        toast({
          title: 'Something went wrong',
          description: response.data.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Show interest failed:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Could not show interest.',
        variant: 'destructive',
      });
    }
  };


  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {/* Left column - Photo and quick info */}
      <div className="md:col-span-1">
        <Card className="h-full flex flex-col bg-[hsl(10_60%_95%)] border-[hsl(30_50%_75%)]">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-48 h-48">
              {profile.profilePhoto ? (
                <img
                  src={""}
                  alt="Profile photo"
                  className="w-full h-full object-cover rounded-full border border-[hsl(30_50%_75%)]"
                  onError={(e) => {
                    e.currentTarget.src = '/default-profile.jpg'; // Fallback on error
                  }}
                />
              ) : (
                <Avatar className="h-48 w-48">
                  <AvatarFallback className="bg-[hsl(30_50%_80%)]">
                    <User size={64} className="text-[hsl(330_50%_35%)]" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Photo Gallery */}
            {profile.photos && profile.photos.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {profile.photos.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`photo-${index + 1}`}
                      className="w-12 h-12 object-cover rounded-md border border-[hsl(30_50%_75%)]"
                      onError={(e) => {
                        e.currentTarget.src = '/default-profile.jpg'; // Fallback on error
                      }}
                    />
                    <button
                      onClick={() => handleSetProfilePhoto(url)}
                      className="absolute top-1 right-1 bg-[hsl(350_80%_50%)] p-1 rounded-full"
                    >
                      {selectedProfilePhoto === url ? (
                        <Check size={12} className="text-[hsl(10_80%_98%)]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-[hsl(10_80%_98%)]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <CardTitle className="text-2xl text-[hsl(330_50%_20%)]">{profile.name}</CardTitle>
            <CardDescription className="text-base text-[hsl(330_50%_35%)]">
              {profile.age} yrs, {profile.height}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[hsl(350_80%_50%)]" />
                <span className="text-[hsl(330_50%_25%)]">
                  {profile.location?.city}, {profile.location?.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-[hsl(350_80%_50%)]" />
                <span className="text-[hsl(330_50%_25%)]">{profile.profession}</span>
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-[hsl(350_80%_50%)]" />
                <span className="text-[hsl(330_50%_25%)]">{profile.education?.level}</span>
              </div>

              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge
                  variant="outline"
                  className="border-[hsl(30_50%_75%)] text-[hsl(330_50%_25%)]"
                >
                  {profile.maritalStatus}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-[hsl(30_50%_75%)] text-[hsl(330_50%_25%)]"
                >
                  {profile.religiousCulturalBackground?.religion || 'Religion not specified'}
                </Badge>
                {profile.mangalDosh && (
                  <Badge
                    variant="outline"
                    className="border-[hsl(30_50%_75%)] text-[hsl(330_50%_25%)]"
                  >
                    Mangal: {profile.mangalDosh}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button
              className="w-full bg-[hsl(350_80%_50%)] text-[hsl(10_80%_98%)] hover:bg-[hsl(350_80%_60%)]"
              onClick={onContact}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1 border-[hsl(30_50%_75%)] text-[hsl(330_50%_25%)] hover:bg-[hsl(30_70%_85%)]"
                onClick={handleShowInterest}
              >
                <Heart className="mr-2 h-4 w-4" />
                Interest
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[hsl(30_50%_75%)] text-[hsl(330_50%_25%)] hover:bg-[hsl(30_70%_85%)]"
                onClick={onShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Right column - Detailed information */}
      <div className="md:col-span-2">
        <Card className="h-full bg-[hsl(10_60%_95%)] border-[hsl(30_50%_75%)]">
          <CardHeader>
            <CardTitle className="text-[hsl(330_50%_20%)]">
              About {profile.name}
            </CardTitle>
            <CardDescription className="text-[hsl(330_50%_35%)]">
              Detailed profile information
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-[hsl(330_50%_20%)]">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Age:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.age} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Height:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.height}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Location:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.location?.city}, {profile.location?.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Marital Status:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.maritalStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Profession:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.profession}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Education:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.education?.level}
                  </span>
                </div>
                {profile.education?.details && (
                  <div className="flex justify-between col-span-2">
                    <span className="text-[hsl(330_50%_35%)]">
                      Education Details:
                    </span>
                    <span className="font-medium text-[hsl(330_50%_25%)]">
                      {profile.education?.details}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Income:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.income}
                  </span>
                </div>
                {profile.mangalDosh && (
                  <div className="flex justify-between">
                    <span className="text-[hsl(330_50%_35%)]">Mangal Dosh:</span>
                    <span className="font-medium text-[hsl(330_50%_25%)]">
                      {profile.mangalDosh}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-[hsl(30_50%_75%)]" />

            {/* Family Background Section */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-[hsl(330_50%_20%)]">
                Family Background
              </h3>
              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Family Values:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.familyValues}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Religion/Culture:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.religiousCulturalBackground?.religion}
                    {profile.religiousCulturalBackground?.caste &&
                      ` (${profile.religiousCulturalBackground?.caste})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Mother Tongue:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.religiousCulturalBackground?.motherTongue ||
                      'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">
                    Father's Occupation:
                  </span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.parentsOccupation?.father || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">
                    Mother's Occupation:
                  </span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.parentsOccupation?.mother || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Siblings:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.siblings.brothers || 0} Brother(s),{' '}
                    {profile.siblings?.sisters || 0} Sister(s)
                    {profile.siblings.details && ` (${profile.siblings?.details})`}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="bg-[hsl(30_50%_75%)]" />

            {/* Partner Preferences Section */}
            <div>
              <h3 className="text-lg font-medium mb-3 text-[hsl(330_50%_20%)]">
                Partner Preferences
              </h3>
              <div className="grid grid-cols-1 gap-y-2">
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Age Range:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.partnerPreferences?.ageRange.min} -{' '}
                    {profile.partnerPreferences?.ageRange.max} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">Education Level:</span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.partnerPreferences?.educationLevel.length > 0
                      ? profile.partnerPreferences.educationLevel.join(', ')
                      : 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">
                    Professional Background:
                  </span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.partnerPreferences?.professionalBackground.length > 0
                      ? profile.partnerPreferences.professionalBackground.join(
                          ', '
                        )
                      : 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[hsl(330_50%_35%)]">
                    Location Preferences:
                  </span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.partnerPreferences?.locationPreferences.length > 0
                      ? profile.partnerPreferences.locationPreferences.join(', ')
                      : 'Not specified'}
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-[hsl(330_50%_35%)] mb-1">
                    Cultural Expectations:
                  </span>
                  <span className="font-medium text-[hsl(330_50%_25%)]">
                    {profile.partnerPreferences?.culturalExpectations}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailedProfileCard;
