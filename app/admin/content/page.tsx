'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import Link from 'next/link';

export default function ContentManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contentStats = [
    { title: 'Total Movies', value: '847', change: '+12', color: 'text-blue-600', icon: '🎬' },
    { title: 'Total TV Shows', value: '298', change: '+5', color: 'text-green-600', icon: '📺' },
    { title: 'Total Episodes', value: '4,256', change: '+48', color: 'text-purple-600', icon: '🎭' },
    { title: 'Categories', value: '24', change: '+2', color: 'text-orange-600', icon: '📁' },
  ];

  const recentContent = [
    { title: 'Spider-Man: No Way Home', type: 'Movie', category: 'Action', dateAdded: '2024-01-20', status: 'Published' },
    { title: 'The Bear S3', type: 'TV Show', category: 'Comedy', dateAdded: '2024-01-19', status: 'Published' },
    { title: 'House of the Dragon', type: 'TV Show', category: 'Fantasy', dateAdded: '2024-01-18', status: 'Draft' },
    { title: 'Top Gun: Maverick', type: 'Movie', category: 'Action', dateAdded: '2024-01-17', status: 'Published' },
    { title: 'Wednesday', type: 'TV Show', category: 'Horror', dateAdded: '2024-01-16', status: 'Published' },
  ];

  const quickActions = [
    {
      title: 'Movies Management',
      description: 'Add, edit, and manage movie content',
      href: '/admin/content/movies',
      icon: '🎬',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'TV Shows Management',
      description: 'Manage TV series and episodes',
      href: '/admin/content/tv-shows',
      icon: '📺',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Categories & Genres',
      description: 'Organize content by categories',
      href: '/admin/content/categories',
      icon: '📁',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          title="Content Management"
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Content Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {contentStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <span className={`text-sm font-medium ${stat.color}`}>+{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{action.icon}</div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Content</h3>
                  <Link href="/admin/content/all" className="text-[#F56D22] hover:text-[#E55A1C] text-sm font-medium">
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#F56D22] rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{content.title}</p>
                          <p className="text-sm text-gray-500">{content.type} • {content.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">{content.dateAdded}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          content.status === 'Published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {content.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Analytics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Content Performance</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Most Watched</span>
                    <span className="text-sm text-gray-900">Stranger Things</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Highest Rated</span>
                    <span className="text-sm text-gray-900">Breaking Bad (9.5★)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Most Recent</span>
                    <span className="text-sm text-gray-900">Spider-Man: No Way Home</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Total Views Today</span>
                    <span className="text-sm text-gray-900">45,892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Avg. Rating</span>
                    <span className="text-sm text-gray-900">8.2★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Categories Overview */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Action', count: 156 },
                  { name: 'Comedy', count: 124 },
                  { name: 'Drama', count: 198 },
                  { name: 'Horror', count: 89 },
                  { name: 'Sci-Fi', count: 76 },
                  { name: 'Romance', count: 64 },
                  { name: 'Thriller', count: 112 },
                  { name: 'Fantasy', count: 93 },
                  { name: 'Crime', count: 87 },
                  { name: 'Documentary', count: 45 },
                  { name: 'Animation', count: 34 },
                  { name: 'Family', count: 67 }
                ].map((category, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-lg font-bold text-[#F56D22]">{category.count}</p>
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