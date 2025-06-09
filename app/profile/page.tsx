'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';

export default function EditProfile() {
  const [profileData, setProfileData] = useState({
    name: 'User Profile',
    email: 'user@example.com',
    language: 'English',
    maturityRating: 'All Maturity Ratings',
    autoplayNextEpisode: true,
    autoplayPreviews: true
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  const handleSave = () => {
    // Handle save logic here
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">Edit Profile</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
          </div>

          {/* Profile Form */}
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-lg mb-4 overflow-hidden border-2 border-gray-600">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="Profile Avatar"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="text-gray-400 hover:text-white text-sm underline">
                  Change Avatar
                </button>
              </div>

              {/* Profile Form Fields */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Profile Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22]"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Language</label>
                  <select
                    value={profileData.language}
                    onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22]"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Somali</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Maturity Rating</label>
                  <select
                    value={profileData.maturityRating}
                    onChange={(e) => setProfileData({...profileData, maturityRating: e.target.value})}
                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-[#F56D22]"
                  >
                    <option>All Maturity Ratings</option>
                    <option>Teen and Below</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-4">Autoplay Controls</label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.autoplayNextEpisode}
                        onChange={(e) => setProfileData({...profileData, autoplayNextEpisode: e.target.checked})}
                        className="mr-3 w-4 h-4 text-[#F56D22] bg-gray-700 border-gray-600 rounded focus:ring-[#F56D22]"
                      />
                      <span className="text-white">Autoplay next episode in a series on all devices</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.autoplayPreviews}
                        onChange={(e) => setProfileData({...profileData, autoplayPreviews: e.target.checked})}
                        className="mr-3 w-4 h-4 text-[#F56D22] bg-gray-700 border-gray-600 rounded focus:ring-[#F56D22]"
                      />
                      <span className="text-white">Autoplay previews while browsing on all devices</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-700 flex gap-4">
              <button
                onClick={handleSave}
                className="bg-white text-black px-8 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => window.history.back()}
                className="border border-gray-600 text-white px-8 py-2 rounded font-medium hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 