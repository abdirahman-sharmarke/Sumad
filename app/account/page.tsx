'use client';

import { useState } from 'react';
import Header from '@/components/header';

export default function AccountSettings() {
  const [accountData] = useState({
    email: 'user@example.com',
    phone: '+1 (555) 123-4567',
    plan: 'Premium',
    paymentMethod: 'Visa ending in 1234',
    billingDate: '15th of each month'
  });

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">Account Settings</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
          </div>

          {/* Account Information */}
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400 text-sm">{accountData.email}</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Change</button>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Phone</div>
                    <div className="text-gray-400 text-sm">{accountData.phone}</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Change</button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <div className="text-white font-medium">Password</div>
                    <div className="text-gray-400 text-sm">••••••••</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Change</button>
                </div>
              </div>
            </div>

            {/* Plan Information */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-6">Plan Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium flex items-center gap-2">
                      {accountData.plan}
                      <span className="bg-[#F56D22] text-white text-xs px-2 py-1 rounded">4K + HDR</span>
                    </div>
                    <div className="text-gray-400 text-sm">4 screens at a time, Ultra HD</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Change plan</button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <div className="text-white font-medium">Add-ons</div>
                    <div className="text-gray-400 text-sm">No add-ons</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Manage</button>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-6">Payment Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Payment method</div>
                    <div className="text-gray-400 text-sm">{accountData.paymentMethod}</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Manage</button>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Billing date</div>
                    <div className="text-gray-400 text-sm">{accountData.billingDate}</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Change date</button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <div className="text-white font-medium">Billing history</div>
                    <div className="text-gray-400 text-sm">View your past payments</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">View</button>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-medium text-white mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Parental controls</div>
                    <div className="text-gray-400 text-sm">Manage content restrictions</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Manage</button>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div>
                    <div className="text-white font-medium">Download quality</div>
                    <div className="text-gray-400 text-sm">Standard</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Change</button>
                </div>
                <div className="flex justify-between items-center py-3">
                  <div>
                    <div className="text-white font-medium">Privacy & data settings</div>
                    <div className="text-gray-400 text-sm">Manage your data preferences</div>
                  </div>
                  <button className="text-[#F56D22] hover:underline">Manage</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 