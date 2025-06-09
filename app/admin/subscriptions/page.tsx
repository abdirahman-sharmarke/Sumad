'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  email: string;
  plan: 'basic' | 'standard' | 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  nextBilling: string;
  price: number;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  status: 'active' | 'inactive';
  subscribers: number;
}

export default function SubscriptionsAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'subscribers' | 'plans'>('overview');
  const router = useRouter();

  // Mock data - in real app, this would come from your backend
  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      email: 'john@example.com',
      plan: 'premium',
      status: 'active',
      startDate: '2024-01-15',
      nextBilling: '2024-12-15',
      price: 9.99,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'standard',
      status: 'active',
      startDate: '2024-02-01',
      nextBilling: '2024-12-01',
      price: 5.99,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Mike Johnson',
      email: 'mike@example.com',
      plan: 'basic',
      status: 'cancelled',
      startDate: '2024-01-01',
      nextBilling: '2024-11-01',
      price: 2.99,
    },
  ]);

  const [plans] = useState<SubscriptionPlan[]>([
    {
      id: '1',
      name: 'Basic',
      price: 2.99,
      features: ['SD Quality', '1 Device', 'Mobile + Tablet'],
      status: 'active',
      subscribers: 1243,
    },
    {
      id: '2',
      name: 'Standard',
      price: 5.99,
      features: ['HD Quality', '2 Devices', 'All Devices'],
      status: 'active',
      subscribers: 4821,
    },
    {
      id: '3',
      name: 'Premium',
      price: 9.99,
      features: ['4K + HDR', '4 Devices', 'All Devices', 'Downloads'],
      status: 'active',
      subscribers: 2156,
    },
  ]);

  // Check authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const stats = {
    totalRevenue: subscriptions.reduce((sum, sub) => sum + sub.price, 0),
    activeSubscriptions: subscriptions.filter(sub => sub.status === 'active').length,
    totalSubscribers: subscriptions.length,
    churnRate: (subscriptions.filter(sub => sub.status === 'cancelled').length / subscriptions.length * 100).toFixed(1),
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F56D22] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
            <p className="text-gray-600">Manage subscription plans, users, and revenue</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="text-green-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeSubscriptions}</p>
                </div>
                <div className="text-blue-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalSubscribers}</p>
                </div>
                <div className="text-purple-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stats.churnRate}%</p>
                </div>
                <div className="text-red-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'subscribers', 'plans'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-[#F56D22] text-[#F56D22]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - integrate with your preferred charting library</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Distribution</h3>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          plan.name === 'Basic' ? 'bg-gray-400' :
                          plan.name === 'Standard' ? 'bg-[#F56D22]' : 'bg-purple-500'
                        }`}></div>
                        <span className="font-medium text-gray-900">{plan.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{plan.subscribers} users</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Subscriber Management</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{subscription.userName}</div>
                            <div className="text-sm text-gray-500">{subscription.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            subscription.plan === 'basic' ? 'bg-gray-100 text-gray-800' :
                            subscription.plan === 'standard' ? 'bg-orange-100 text-orange-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                            subscription.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(subscription.nextBilling).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${subscription.price}/month
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
                <button className="bg-[#F56D22] hover:bg-[#E55A1B] text-white px-4 py-2 rounded-lg font-medium">
                  Add New Plan
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div key={plan.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {plan.status}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">${plan.price}/month</div>
                      <div className="text-sm text-gray-600 mb-4">{plan.subscribers} subscribers</div>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium">
                        Edit Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 