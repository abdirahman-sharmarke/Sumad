'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';


export default function HeaderManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab] = useState('logo');

  // Mock header data - replace with actual API calls
  const [headerData, setHeaderData] = useState({
    logo: {
      url: '/images/sumad-logo.png',
      width: 120,
      height: 40,
      alt: 'SUMAD Plus'
    },
    brandName: 'SUMAD',
    tagline: 'Your Entertainment Platform',
    headerStyle: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      accentColor: '#F56D22',
      transparency: 0,
      position: 'sticky'
    },
    socialLinks: {
      facebook: 'https://facebook.com/sumadplus',
      twitter: 'https://twitter.com/sumadplus',
      instagram: 'https://instagram.com/sumadplus',
      youtube: 'https://youtube.com/sumadplus'
    }
  });

  const [editForm, setEditForm] = useState(headerData);
  const [previewMode] = useState(false);

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
      return;
    }
    setIsLoading(false);
  }, [router]);



  const handleLogoUpload = () => {
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
            logo: { ...prev.logo, url: result }
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
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Header & Logo Management"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Logo Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-2">Upload your logo</p>
                <button
                  onClick={handleLogoUpload}
                  className="bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors"
                >
                  Choose File
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
              <input
                type="text"
                value={editForm.brandName}
                onChange={(e) => setEditForm(prev => ({ ...prev, brandName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22]"
              />
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
} 