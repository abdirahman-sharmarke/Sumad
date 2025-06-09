'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onLogout?: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/Dashboard', active: true },
    { name: 'TV Shows', href: '/tv-shows' },
    { name: 'Movies', href: '/movies' },
    { name: 'New & Popular', href: '/new-popular' },
    { name: 'My List', href: '/my-list' },
    { name: 'Browse by Languages', href: '/browse-languages' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-3">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/Sumad.png"
              alt="Sumad"
              width={80}
              height={28}
              className="h-6 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-white hover:text-[#F56D22] transition-colors duration-200 text-sm font-normal ${
                  item.active ? 'text-[#F56D22] font-medium' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Right Side - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black bg-opacity-70 border border-gray-600 text-white px-3 py-1.5 rounded-l text-sm focus:outline-none focus:border-[#F56D22] w-56"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="bg-black bg-opacity-70 border border-l-0 border-gray-600 px-2 py-1.5 rounded-r text-white hover:text-[#F56D22]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-[#F56D22] transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>



          {/* Notifications */}
          <button className="text-white hover:text-[#F56D22] transition-colors duration-200 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9a6 6 0 10-12 0v3L3 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-black">
              8
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-1 text-white hover:text-[#F56D22] transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-lg border-2 border-gray-600 shadow-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black bg-opacity-90 rounded-lg shadow-lg border border-gray-700">
                <div className="py-2">
                  <a href="/profile" className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#F56D22] transition-colors duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </a>
                  <a href="/account" className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#F56D22] transition-colors duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Account Settings
                  </a>
                  <a href="/subscription-management" className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#F56D22] transition-colors duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Manage Subscription
                  </a>
                  <a href="/help" className="flex items-center px-4 py-2 text-white hover:bg-gray-800 hover:text-[#F56D22] transition-colors duration-200">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help Center
                  </a>
                  <hr className="border-gray-700 my-2" />
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 text-white hover:bg-gray-800 hover:text-[#F56D22] transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
