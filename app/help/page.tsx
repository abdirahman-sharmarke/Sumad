'use client';

import { useState } from 'react';
import Header from '@/components/header';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleLogout = () => {
    window.location.href = '/';
  };

  const faqData = [
    {
      question: "How do I change my plan?",
      answer: "You can change your plan at any time by going to Account Settings > Plan Details and selecting 'Change plan'. Your new plan will take effect immediately."
    },
    {
      question: "What video quality can I expect?",
      answer: "Video quality depends on your plan and internet connection. Our Premium plan supports 4K Ultra HD and HDR content on compatible devices."
    },
    {
      question: "How many devices can I use?",
      answer: "The number of devices depends on your plan: Basic (1 screen), Standard (2 screens), Premium (4 screens). You can watch on unlimited devices but limited simultaneous streams."
    },
    {
      question: "How do I download content?",
      answer: "Look for the download icon on eligible titles. Downloaded content is available in your 'My Downloads' section and can be watched without internet connection."
    },
    {
      question: "Why is a title not available?",
      answer: "Content availability varies by region due to licensing agreements. Titles may also be removed when licensing expires, but we're always adding new content."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel anytime from Account Settings. Your account will remain active until the end of your current billing period."
    }
  ];

  const popularTopics = [
    { title: "Account & Billing", icon: "💳" },
    { title: "Troubleshooting", icon: "🔧" },
    { title: "Downloads", icon: "📱" },
    { title: "Parental Controls", icon: "👨‍👩‍👧‍👦" },
    { title: "Device Setup", icon: "📺" },
    { title: "Content Quality", icon: "🎬" }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header onLogout={handleLogout} />
      
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2">Help Center</h1>
            <div className="w-16 h-1 bg-[#F56D22]"></div>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Describe your issue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-[#F56D22] text-lg"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-white mb-6">Popular Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularTopics.map((topic, index) => (
                <button
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">{topic.icon}</div>
                  <div className="text-white font-medium">{topic.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-white font-medium text-lg">{faq.question}</span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-medium text-white mb-4">Need More Help?</h2>
            <p className="text-gray-300 mb-6">
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#F56D22] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#E5611F] transition-colors">
                Start Live Chat
              </button>
              <button className="border border-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors">
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 