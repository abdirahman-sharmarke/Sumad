'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

interface NavigationItem {
  id: string;
  name: string;
  url: string;
  order: number;
  isActive: boolean;
  icon?: string;
}

export default function NavigationManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mock navigation data - replace with actual API calls
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    { id: '1', name: 'Home', url: '/', order: 1, isActive: true },
    { id: '2', name: 'TV Shows', url: '/tv-shows', order: 2, isActive: true },
    { id: '3', name: 'Movies', url: '/movies', order: 3, isActive: true },
    { id: '4', name: 'New & Popular', url: '/new-popular', order: 4, isActive: true },
    { id: '5', name: 'My List', url: '/my-list', order: 5, isActive: true },
    { id: '6', name: 'Browse by Languages', url: '/languages', order: 6, isActive: true }
  ]);

  const [editForm, setEditForm] = useState<NavigationItem[]>(navigationItems);
  const [newItem, setNewItem] = useState({ name: '', url: '' });
  const [showAddForm, setShowAddForm] = useState(false);

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
    setNavigationItems(editForm);
    setIsEditing(false);
    console.log('Saving navigation data:', editForm);
    alert('Navigation settings saved successfully!');
  };

  const handleCancel = () => {
    setEditForm(navigationItems);
    setIsEditing(false);
    setShowAddForm(false);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.url) {
      const item: NavigationItem = {
        id: Date.now().toString(),
        name: newItem.name,
        url: newItem.url,
        order: editForm.length + 1,
        isActive: true
      };
      setEditForm([...editForm, item]);
      setNewItem({ name: '', url: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setEditForm(editForm.filter(item => item.id !== id));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...editForm];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      // Update order numbers
      newItems.forEach((item, i) => {
        item.order = i + 1;
      });
      setEditForm(newItems);
    }
  };

  const updateItem = (id: string, field: keyof NavigationItem, value: string | number | boolean) => {
    setEditForm(editForm.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F56D22] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading navigation management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Navigation Management"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Action Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Navigation Management</h2>
                  <p className="text-gray-600 mt-1">Manage your website&apos;s navigation menu items and their order</p>
                </div>
                <div className="flex space-x-3">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-[#F56D22] text-white px-6 py-3 rounded-lg hover:bg-[#E55A1C] transition-colors font-medium"
                    >
                      Edit Navigation
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

        {/* Navigation Preview */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
            <p className="text-gray-600">This is how your navigation will appear on the website</p>
          </div>
          
          {/* Header Preview */}
          <div className="bg-black px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-[#F56D22] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-white text-xl font-bold">SUMAD</span>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {editForm.filter(item => item.isActive).map((item) => (
                  <a 
                    key={item.id} 
                    href="#" 
                    className="text-white hover:text-[#F56D22] transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items Management */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Navigation Items</h2>
              {isEditing && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Item</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Add New Item Form */}
            {showAddForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Navigation Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Menu Name</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Documentaries"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                    <input
                      type="text"
                      value={newItem.url}
                      onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="e.g., /documentaries"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddItem}
                    className="bg-[#F56D22] text-white px-4 py-2 rounded-lg hover:bg-[#E55A1C] transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Items List */}
            <div className="space-y-3">
              {editForm.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0 || !isEditing}
                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === editForm.length - 1 || !isEditing}
                        className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                      {item.order}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                          />
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.url}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        onChange={(e) => updateItem(item.id, 'isActive', e.target.checked)}
                        disabled={!isEditing}
                        className="w-4 h-4 text-[#F56D22] bg-gray-100 border-gray-300 rounded focus:ring-[#F56D22] focus:ring-2"
                      />
                      <label className="ml-2 text-sm text-gray-700">Active</label>
                    </div>
                    
                    {isEditing && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex">
            <svg className="w-6 h-6 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">Navigation Best Practices</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Keep navigation menu items to 7 or fewer for better usability</li>
                  <li>Use clear, descriptive names that users can easily understand</li>
                  <li>Order items by importance and user priority</li>
                  <li>Test navigation on mobile devices to ensure it&apos;s responsive</li>
                  <li>Use consistent URL patterns (e.g., /category-name)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
} 