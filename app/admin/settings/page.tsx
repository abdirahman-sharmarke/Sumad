'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Sumad Plus',
    siteDescription: 'Premium Streaming Platform',
    maintenanceMode: false,
    newUserRegistrations: true,
    emailNotifications: true,
    pushNotifications: true,
    analyticsTracking: true,
    contentAutoApproval: false,
    maxUploadSize: '500',
    allowedFileTypes: 'mp4,mkv,avi',
    streamingQuality: '4K',
    cacheExpiry: '24'
  });

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'content', name: 'Content', icon: '🎬' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'system', name: 'System', icon: '💻' }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Settings"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Tabs */}
            <div className="lg:w-64">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-[#F56D22] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => handleSettingChange('siteName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                        <textarea
                          value={settings.siteDescription}
                          onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
                          <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.maintenanceMode}
                            onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F56D22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F56D22]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Content Settings */}
                {activeTab === 'content' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Max Upload Size (MB)</label>
                        <input
                          type="number"
                          value={settings.maxUploadSize}
                          onChange={(e) => handleSettingChange('maxUploadSize', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
                        <input
                          type="text"
                          value={settings.allowedFileTypes}
                          onChange={(e) => handleSettingChange('allowedFileTypes', e.target.value)}
                          placeholder="mp4,mkv,avi"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Streaming Quality</label>
                        <select
                          value={settings.streamingQuality}
                          onChange={(e) => handleSettingChange('streamingQuality', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                        >
                          <option value="720p">720p HD</option>
                          <option value="1080p">1080p Full HD</option>
                          <option value="4K">4K Ultra HD</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Auto-approve Content</label>
                          <p className="text-sm text-gray-500">Automatically approve uploaded content</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.contentAutoApproval}
                            onChange={(e) => handleSettingChange('contentAutoApproval', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F56D22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F56D22]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Users Settings */}
                {activeTab === 'users' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">User Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Allow New User Registrations</label>
                          <p className="text-sm text-gray-500">Enable new users to register</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.newUserRegistrations}
                            onChange={(e) => handleSettingChange('newUserRegistrations', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F56D22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F56D22]"></div>
                        </label>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Default User Permissions</h4>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22]" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Can create playlists</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22]" defaultChecked />
                            <span className="ml-2 text-sm text-gray-700">Can rate content</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-[#F56D22] focus:ring-[#F56D22]" />
                            <span className="ml-2 text-sm text-gray-700">Can upload content</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                          <p className="text-sm text-gray-500">Send email notifications to users</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F56D22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F56D22]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                          <p className="text-sm text-gray-500">Send push notifications to mobile devices</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.pushNotifications}
                            onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F56D22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F56D22]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                    <div className="space-y-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                            <p className="mt-1 text-sm text-yellow-700">Changes to security settings will require all users to log in again.</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                          Reset All User Sessions
                        </button>
                        <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                          Clear All Cached Data
                        </button>
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                          Generate New API Keys
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* System Settings */}
                {activeTab === 'system' && (
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cache Expiry (hours)</label>
                        <input
                          type="number"
                          value={settings.cacheExpiry}
                          onChange={(e) => handleSettingChange('cacheExpiry', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F56D22] focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Analytics Tracking</label>
                          <p className="text-sm text-gray-500">Enable analytics tracking</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.analyticsTracking}
                            onChange={(e) => handleSettingChange('analyticsTracking', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F56D22]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F56D22]"></div>
                        </label>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">System Information</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Platform Version:</span>
                            <span>v2.1.4</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Database Version:</span>
                            <span>PostgreSQL 14.2</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Server Uptime:</span>
                            <span>15 days, 6 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Storage Used:</span>
                            <span>2.4 TB / 5 TB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 