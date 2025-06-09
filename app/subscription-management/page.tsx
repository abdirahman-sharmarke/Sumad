'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

interface SubscriptionData {
  plan: string;
  price: number;
  startDate: string;
  nextBilling: string;
  status: string;
}

export default function SubscriptionManagement() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is subscribed
    const isSubscribed = localStorage.getItem('isSubscribed');
    if (isSubscribed !== 'true') {
      router.push('/subscription');
      return;
    }

    // Load subscription data
    const subData = localStorage.getItem('subscription');
    if (subData) {
      setSubscription(JSON.parse(subData));
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isSubscribed');
    localStorage.removeItem('subscription');
    window.location.href = '/';
  };

  const handleCancelSubscription = () => {
    // Update subscription status
    if (subscription) {
      const updatedSubscription = {
        ...subscription,
        status: 'cancelled'
      };
      localStorage.setItem('subscription', JSON.stringify(updatedSubscription));
      setSubscription(updatedSubscription);
    }
    setShowCancelModal(false);
  };

  const handleChangePlan = () => {
    router.push('/subscription?mode=change');
  };

  const handleUpdatePayment = () => {
    alert('Payment update feature would be implemented here with your payment provider');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlanFeatures = (plan: string) => {
    switch (plan) {
      case 'basic':
        return ['SD Quality', '1 Device', 'Mobile + Tablet'];
      case 'standard':
        return ['HD Quality', '2 Devices', 'All Devices'];
      case 'premium':
        return ['4K + HDR', '4 Devices', 'All Devices', 'Downloads'];
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#F56D22] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No subscription found</p>
          <button 
            onClick={() => router.push('/subscription')}
            className="bg-[#F56D22] hover:bg-[#E55A1B] text-white px-6 py-3 rounded-lg"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Manage Subscription</h1>
            <p className="text-gray-400 text-lg">View and manage your Summad Plus subscription</p>
          </div>

          {/* Subscription Status */}
          <div className="bg-gray-900 rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Current Plan</h2>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                    subscription.status === 'active' 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-red-900 text-red-300'
                  }`}>
                    {subscription.status === 'active' ? 'Active' : 'Cancelled'}
                  </span>
                  <span className="text-gray-400">
                    {subscription.status === 'active' 
                      ? `Renews on ${formatDate(subscription.nextBilling)}`
                      : `Expires on ${formatDate(subscription.nextBilling)}`
                    }
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#F56D22]">
                  ${subscription.price}/month
                </div>
                <div className="text-gray-400 capitalize">
                  {subscription.plan} Plan
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Plan Features</h3>
                <ul className="space-y-2">
                  {getPlanFeatures(subscription.plan).map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Subscription Details</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Started:</span>
                    <span>{formatDate(subscription.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next billing:</span>
                    <span>{formatDate(subscription.nextBilling)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="capitalize">{subscription.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>${subscription.price}/month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={handleChangePlan}
              className="bg-[#F56D22] hover:bg-[#E55A1B] text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>Change Plan</span>
            </button>

            <button
              onClick={handleUpdatePayment}
              className="bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Update Payment</span>
            </button>

            <button
              onClick={() => setShowCancelModal(true)}
              disabled={subscription.status === 'cancelled'}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{subscription.status === 'cancelled' ? 'Already Cancelled' : 'Cancel Subscription'}</span>
            </button>
          </div>

          {/* Billing History */}
          <div className="bg-gray-900 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6">Billing History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400">Description</th>
                    <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4">{formatDate(subscription.startDate)}</td>
                    <td className="py-3 px-4">Summad Plus {subscription.plan} - Monthly</td>
                    <td className="py-3 px-4">${subscription.price}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full text-sm">
                        Paid
                      </span>
                    </td>
                  </tr>
                  {/* Add more billing history rows as needed */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Need help with your subscription?</p>
            <a 
              href="/help" 
              className="text-[#F56D22] hover:text-[#E55A1B] underline"
            >
              Visit our Help Center
            </a>
          </div>
        </div>
      </div>

      <Footer />

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Cancel Subscription</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to cancel your subscription? You&apos;ll continue to have access until {formatDate(subscription.nextBilling)}.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 