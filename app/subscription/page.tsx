'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PlanFeature {
  name: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const plans = {
    basic: {
      name: 'Basic',
      price: 2.99,
      color: 'border-gray-400',
      bgColor: 'bg-gray-50',
      description: 'Good video quality in SD (480p). Watch on 1 device at a time.',
      popular: false,
    },
    standard: {
      name: 'Standard',
      price: 5.99,
      color: 'border-[#F56D22]',
      bgColor: 'bg-orange-50',
      description: 'Great video quality in HD (1080p). Watch on 2 devices at the same time.',
      popular: true,
    },
    premium: {
      name: 'Premium',
      price: 9.99,
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      description: 'Our best video quality in Ultra HD (4K) and HDR. Watch on 4 devices at the same time.',
      popular: false,
    },
  };

  const features: PlanFeature[] = [
    {
      name: 'Monthly price',
      basic: '$2.99',
      standard: '$5.99',
      premium: '$9.99',
    },
    {
      name: 'Video and sound quality',
      basic: 'Good',
      standard: 'Better',
      premium: 'Best',
    },
    {
      name: 'Resolution',
      basic: '480p',
      standard: '1080p',
      premium: '4K+HDR',
    },
    {
      name: 'Supported devices',
      basic: 'TV, computer, mobile phone, tablet',
      standard: 'TV, computer, mobile phone, tablet',
      premium: 'TV, computer, mobile phone, tablet',
    },
    {
      name: 'Devices you can use to watch at the same time',
      basic: '1',
      standard: '2',
      premium: '4',
    },
    {
      name: 'Download devices',
      basic: '1',
      standard: '2',
      premium: '4',
    },
    {
      name: 'Ads',
      basic: false,
      standard: false,
      premium: false,
    },
  ];

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store subscription info
    const subscriptionData = {
      plan: selectedPlan,
      price: plans[selectedPlan].price,
      startDate: new Date().toISOString(),
      status: 'active',
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    localStorage.setItem('subscription', JSON.stringify(subscriptionData));
    localStorage.setItem('isSubscribed', 'true');
    
    setIsProcessing(false);
    
    // Redirect to dashboard or welcome page
    router.push('/Dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 md:p-12 border-b border-gray-800">
        <Image
          src="/Sumad.png"
          alt="Sumad Logo"
          width={120}
          height={40}
          className="h-8 md:h-10 w-auto cursor-pointer"
          onClick={() => router.push('/')}
        />
        <button
          onClick={() => router.push('/')}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Back to Home
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose the plan that&apos;s right for you
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Join millions and watch on any device. Cancel anytime.
          </p>
          
          {/* Plan Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedPlan === key 
                    ? `${plan.color} ${plan.bgColor} transform scale-105` 
                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                }`}
                onClick={() => setSelectedPlan(key as 'basic' | 'standard' | 'premium')}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#F56D22] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${selectedPlan === key ? 'text-gray-900' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-3xl font-bold mb-4 ${selectedPlan === key ? 'text-gray-900' : 'text-white'}`}>
                    ${plan.price}
                    <span className="text-lg font-normal">/month</span>
                  </div>
                  <p className={`text-sm ${selectedPlan === key ? 'text-gray-700' : 'text-gray-400'}`}>
                    {plan.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Comparison Table */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-2"></th>
                <th className="text-center py-4 px-2">
                  <div className="font-bold text-lg">Basic</div>
                </th>
                <th className="text-center py-4 px-2">
                  <div className="font-bold text-lg text-[#F56D22]">Standard</div>
                </th>
                <th className="text-center py-4 px-2">
                  <div className="font-bold text-lg text-purple-400">Premium</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="py-4 px-2 font-medium">{feature.name}</td>
                  <td className="py-4 px-2 text-center">
                    {typeof feature.basic === 'boolean' ? (
                      feature.basic ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-gray-300">{feature.basic}</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-center">
                    {typeof feature.standard === 'boolean' ? (
                      feature.standard ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-[#F56D22] font-medium">{feature.standard}</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-center">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-purple-400 font-medium">{feature.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Subscribe Button */}
        <div className="text-center">
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="bg-[#F56D22] hover:bg-[#E55A1B] disabled:bg-gray-600 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 min-w-[200px]"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              `Subscribe to ${plans[selectedPlan].name} - $${plans[selectedPlan].price}/month`
            )}
          </button>
          
          <div className="mt-6 text-center text-gray-400">
            <p className="text-sm mb-2">
              Cancel anytime online. No commitments, no cancellation fees.
            </p>
            <p className="text-xs">
              By clicking "Subscribe", you agree to our Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 