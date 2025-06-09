'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-100 flex overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-gray-900 border-r border-gray-700 flex-shrink-0">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3">
                <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar Skeleton */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center space-x-4">
                <div className="w-64 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="flex-1">
                            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                            <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Skeleton */}
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-28 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Users', value: '12,456', change: '+5.2%', color: 'text-green-500' },
    { title: 'Active Subscriptions', value: '8,329', change: '+2.1%', color: 'text-green-500' },
    { title: 'Total Content', value: '1,847', change: '+12', color: 'text-blue-500' },
    { title: 'Revenue (Monthly)', value: '$284,392', change: '+8.7%', color: 'text-green-500' },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Added new movie', item: 'Spider-Man: No Way Home', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'Updated TV series', item: 'Breaking Bad', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Deleted user account', item: 'user@example.com', time: '6 hours ago' },
    { user: 'Sarah Wilson', action: 'Modified category', item: 'Action Movies', time: '8 hours ago' },
    { user: 'David Brown', action: 'Added new category', item: 'Documentaries', time: '12 hours ago' },
  ];

  const topContent = [
    { title: 'Stranger Things', type: 'TV Show', views: '2.4M', rating: '9.2' },
    { title: 'The Dark Knight', type: 'Movie', views: '1.8M', rating: '9.0' },
    { title: 'Breaking Bad', type: 'TV Show', views: '1.6M', rating: '9.5' },
    { title: 'Inception', type: 'Movie', views: '1.4M', rating: '8.8' },
    { title: 'Game of Thrones', type: 'TV Show', views: '1.2M', rating: '8.7' },
  ];

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          showMenuButton={true}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-[#F56D22] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="font-medium text-[#F56D22]">{activity.item}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Content</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{content.title}</p>
                          <p className="text-sm text-gray-500">{content.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{content.views} views</p>
                        <p className="text-sm text-yellow-600">★ {content.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center justify-center p-4 bg-[#F56D22] text-white rounded-lg hover:bg-[#E55A1C] transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Content
                </button>
                <button className="flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Add User
                </button>
                <button className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Reports
                </button>
                <button className="flex items-center justify-center p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 