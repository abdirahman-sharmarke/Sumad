'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Image from 'next/image';

export default function BannerManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock banner data - replace with actual API calls
  const [bannerData, setBannerData] = useState({
    title: 'Heestii Kaalay Muno',
    subtitle: 'NEW',
    year: '2025',
    rating: 'PG-13',
    duration: '3:50',
    description: 'Welcome to Astaan TV channel! Make sure to SUBSCRIBE and turn on the notifications. Astaan tv is local Television Across Somalia, It Promotes local Entertainment Programs included Drams, Music, Sports, Education and Various Social Programs. This is #astaantv',
    backgroundImage: '/images/banner-bg.jpg',
    logoImage: '/images/banner-logo.png',
    isActive: true,
    type: 'featured'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(bannerData);

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }
    setIsLoading(false);
  }, [router]);

  const handleSave = () => {
    setBannerData(editForm);
    setIsEditing(false);
    // Here you would typically send data to your API
    console.log('Saving banner data:', editForm);
  };

  const handleCancel = () => {
    setEditForm(bannerData);
    setIsEditing(false);
  };

  const handleImageUpload = (type: 'background' | 'logo') => {
    // Mock file upload - replace with actual file upload logic
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setEditForm(prev => ({
            ...prev,
            [type === 'background' ? 'backgroundImage' : 'logoImage']: result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F56D22] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading banner management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Home Banner Management"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Action Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Banner Management</h2>
                  <p className="text-gray-600 mt-1">Manage the featured content banner displayed on your homepage</p>
                </div>
                <div className="flex space-x-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#F56D22] text-white px-6 py-3 rounded-lg hover:bg-[#E55A1C] transition-colors font-medium"
                    >
                      Edit Banner
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

        {/* Banner Preview */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
            <p className="text-gray-600">This is how your banner will appear on the homepage</p>
          </div>
          
          <div className="relative h-[500px] bg-gradient-to-r from-black/80 to-transparent">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={editForm.backgroundImage || "https://images.unsplash.com/photo-1489599217030-4fb6ca6d7b5b?w=1200&h=600&fit=crop"}
                alt="Banner Background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center p-12">
              <div className="max-w-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-[#F56D22] text-white px-3 py-1 rounded text-sm font-bold">
                    {editForm.subtitle}
                  </span>
                  <span className="text-white text-sm">{editForm.year}</span>
                  <span className="text-white text-sm bg-gray-600 px-2 py-1 rounded">{editForm.rating}</span>
                  <span className="text-white text-sm">{editForm.duration}</span>
                </div>
                
                <h1 className="text-5xl font-bold text-white mb-6">
                  {editForm.title}
                </h1>
                
                <p className="text-white text-lg leading-relaxed mb-8 max-w-2xl">
                  {editForm.description}
                </p>
                
                <div className="flex space-x-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>More Info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Banner Content</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle/Badge</label>
                  <input
                    type="text"
                    value={editForm.subtitle}
                    onChange={(e) => setEditForm(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={editForm.year}
                      onChange={(e) => setEditForm(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select
                      value={editForm.rating}
                      onChange={(e) => setEditForm(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                    >
                      <option>G</option>
                      <option>PG</option>
                      <option>PG-13</option>
                      <option>R</option>
                      <option>NC-17</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={editForm.duration}
                      onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Media & Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Media & Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-2">Click to upload background image</p>
                    <p className="text-sm text-gray-500">Recommended: 1920x1080px, JPG or PNG</p>
                    <button
                      onClick={() => handleImageUpload('background')}
                      className="mt-4 bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Banner Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                  >
                    <option value="featured">Featured Content</option>
                    <option value="promotional">Promotional</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editForm.isActive}
                    onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#F56D22] bg-gray-100 border-gray-300 rounded focus:ring-[#F56D22] focus:ring-2"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                    Show banner on homepage
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Tips for better banners</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Use high-quality images (1920x1080px recommended)</li>
                          <li>Keep titles short and compelling</li>
                          <li>Descriptions should be 2-3 sentences max</li>
                          <li>Test on different screen sizes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Banner History</h2>
          
          <div className="space-y-4">
            {[
              { title: 'Heestii Kaalay Muno', date: '2025-01-15', status: 'Active', views: '45.2K' },
              { title: 'Breaking Bad Season 6', date: '2025-01-10', status: 'Archived', views: '38.1K' },
              { title: 'The Dark Knight Returns', date: '2025-01-05', status: 'Archived', views: '52.3K' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">Published on {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-sm text-gray-600">{item.views} views</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                  <button className="text-[#F56D22] hover:text-[#E55A1C] text-sm font-medium">
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
} 