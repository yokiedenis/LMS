"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

// Define the props for the UserProfile component
type UserProfileProps = {
  name: string;
  email: string;
  dob?: string;
  occupation?: string;
  bio?: string;
  imageUrl?: string;
  role: string; // Role of the user
  gender?: string;
  country?: string;
  contactNo?: string;
  address?: string;
  highestQualification?: string;
  employeeStatus?: string;
  industry?: string;
  paymentOption?: string;
};

// Component to display user profile
const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  dob,
  occupation,
  bio,
  imageUrl,
  role,
  gender,
  country,
  contactNo,
  address,
  highestQualification,
  employeeStatus,
  industry,
  paymentOption,
}) => (
  <div className="max-w-4xl mx-auto bg-gray-900 text-white shadow-lg rounded-lg p-8 mt-10">
    <div className="text-center">
      <img
        src={imageUrl || "/default-avatar.png"}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full border-4 border-teal-500 shadow-md"
      />
      <h1 className="text-2xl font-bold mt-4">{name}</h1>
      <p className="text-sm text-white">{email}</p>
      <p className="text-sm text-white mt-2">Role: {role}</p>
    </div>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {dob && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Date of Birth</p>
          <p className="text-lg font-semibold">{dob}</p>
        </div>
      )}
      {occupation && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Occupation</p>
          <p className="text-lg font-semibold">{occupation}</p>
        </div>
      )}
      {gender && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Gender</p>
          <p className="text-lg font-semibold">{gender}</p>
        </div>
      )}
      {country && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Country</p>
          <p className="text-lg font-semibold">{country}</p>
        </div>
      )}
      {contactNo && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Contact No</p>
          <p className="text-lg font-semibold">{contactNo}</p>
        </div>
      )}
      {address && (
        <div className="bg-gray-800 p-4 rounded-md shadow col-span-full">
          <p className="text-sm text-white">Address</p>
          <p className="text-lg font-semibold">{address}</p>
        </div>
      )}
      {highestQualification && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Highest Qualification</p>
          <p className="text-lg font-semibold">{highestQualification}</p>
        </div>
      )}
      {employeeStatus && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Employee Status</p>
          <p className="text-lg font-semibold">{employeeStatus}</p>
        </div>
      )}
      {industry && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-sm text-white">Industry</p>
          <p className="text-lg font-semibold">{industry}</p>
        </div>
      )}
      {paymentOption && (
        <div className="bg-gray-800 p-4 rounded-md shadow">
          <p className="text-smtext-white">Payment Option</p>
          <p className="text-lg font-semibold">{paymentOption}</p>
        </div>
      )}
      {bio && (
        <div className="bg-gray-800 p-4 rounded-md shadow col-span-full">
          <p className="text-sm text-white">Bio</p>
          <p className="text-lg font-semibold">{bio}</p>
        </div>
      )}
    </div>
  </div>
);

// Main Profile Page component
const ProfilePage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [countries, setCountries] = useState<{ value: string; text: string }[]>([]); // State for countries

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    occupation: "",
    bio: "",
    role: "STUDENT",
    email: "",
    imageUrl: "",
    gender: "",
    country: "",
    contactNo: "",
    address: "",
    highestQualification: "",
    employeeStatus: "",
    industry: "",
    paymentOption: "",
  });

  // Effect to fetch profile data and countries when user is available
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile?userId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setProfileData(data);
            setFormData({
              name: data.name || "",
              dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
              occupation: data.occupation || "",
              bio: data.bio || "",
              role: data.role || "STUDENT",
              email: data.email || user.primaryEmailAddress?.emailAddress || "",
              imageUrl: data.imageUrl || user.imageUrl || "/default-avatar.png",
              gender: data.gender || "",
              country: data.country || "",
              contactNo: data.contactNo || "",
              address: data.address || "",
              highestQualification: data.highestQualification || "",
              employeeStatus: data.employeeStatus || "",
              industry: data.industry || "",
              paymentOption: data.paymentOption || "",
            });
            setShowProfile(true); // Show profile if data exists
          } else {
            setShowProfile(false); // No profile data, show form to create one
          }
        } else {
          setShowProfile(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setShowProfile(false); // In case of an error, show form
      }
    };

    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const countryList = data.map((country: { cca2: string; name: { common: string } }) => ({
          value: country.cca2, // ISO 3166-1 alpha-2 code
          text: country.name.common // Country name
        }));
        setCountries(countryList);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };

    Promise.all([fetchProfile(), fetchCountries()]).finally(() => setLoading(false));
  }, [user]);

  // Handle changes in form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save user profile data
  const handleSave = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      });

      if (response.ok) {
        const savedData = await response.json();
        setProfileData(savedData);
        setSaveMessage("Your profile information has been saved successfully!");
        setTimeout(() => setSaveMessage(null), 3000);
        setShowProfile(true); // Show the profile after saving
      } else {
        const errorText = await response.text();
        console.error("Error saving profile:", errorText);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Render based on user login and data loading state
  if (!user) {
    return <p className="text-center text-gray-500 mt-20">User not logged in.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  }

  // Conditional rendering based on whether profile data exists and if user wants to see or edit profile
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {saveMessage && (
        <div className="bg-green-500 text-white p-2 mb-4 rounded-md text-center">
          {saveMessage}
        </div>
      )}
      {showProfile ? (
        <>
          <UserProfile
            name={formData.name}
            email={formData.email}
            dob={formData.dob}
            occupation={formData.occupation}
            bio={formData.bio}
            imageUrl={formData.imageUrl}
            role={formData.role}
            gender={formData.gender}
            country={formData.country}
            contactNo={formData.contactNo}
            address={formData.address}
            highestQualification={formData.highestQualification}
            employeeStatus={formData.employeeStatus}
            industry={formData.industry}
            paymentOption={formData.paymentOption}
          />
          {/* Button to toggle back to edit mode */}
          <button 
            onClick={() => setShowProfile(false)} 
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 mt-4"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <div className="max-w-4xl mx-auto bg-gray-900 shadow-lg rounded-lg p-8 mt-10">
          <h1 className="text-2xl font-bold mb-6">
            {profileData ? "Edit Your Profile" : "Complete Your Profile"}
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form inputs for user profile */}
            <div>
              <label className="block text-white text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                readOnly
              />
            </div>
            <div>
              <label className="block text-white text-sm">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              >
                <option value="">Select Country</option>
                {countries.map((country: { value: string; text: string }) => (
                  <option key={country.value} value={country.value}>{country.text}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white text-sm">Contact No</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-gray-400 text-sm">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-white text-sm">Highest Qualification</label>
              <input
                type="text"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Employee Status</label>
              <select
                name="employeeStatus"
                value={formData.employeeStatus}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              >
                <option value="">Select Status</option>
                <option value="EMPLOYED">Employed</option>
                <option value="UNEMPLOYED">Unemployed</option>
                <option value="SELF_EMPLOYED">Self-employed</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Payment Option</label>
              <select
                name="paymentOption"
                value={formData.paymentOption}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              >
                <option value="">Select Payment Option</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="PAYPAL">PayPal</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
            </div>
            <div className="col-span-full">
              <label className="block text-white text-sm">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-white text-sm">Profile Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
            <div>
              <label className="block text-white text-sm">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
              >
                <option value="STUDENT">Student</option>
                <option value="EMPLOYEE">Employee</option>
                 
              </select>
            </div>
          </form>
          <button 
            onClick={handleSave} 
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 mt-4"
          >
            {profileData ? "Update Profile" : "Save Profile"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;