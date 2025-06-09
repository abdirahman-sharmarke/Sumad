'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
        </svg>
      )
    },
    {
      title: 'Website Management',
      href: '/admin/website',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9m9 9c0 5-4 9-9 9" />
        </svg>
      ),
      subItems: [
        { title: 'Home Banner', href: '/admin/website/banner' },
        { title: 'Header & Logo', href: '/admin/website/header' },
        { title: 'Navigation Menu', href: '/admin/website/navigation' },
        { title: 'Footer Settings', href: '/admin/website/footer' }
      ]
    },
    {
      title: 'Users Management',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: 'Content Management',
      href: '/admin/content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 14h14L17 4M9 9v6m6-6v6" />
        </svg>
      ),
      subItems: [
        { title: 'Movies', href: '/admin/content/movies' },
        { title: 'TV Shows', href: '/admin/content/tv-shows' },
        { title: 'Categories', href: '/admin/content/categories' },
        { title: 'Featured Content', href: '/admin/content/featured' }
      ]
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-72
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#F56D22] to-[#E55A1C] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">SUMAD</h2>
              <p className="text-gray-400 text-xs font-medium">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>



        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto min-h-0">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
                      ${isActive(item.href) 
                        ? 'bg-gradient-to-r from-[#F56D22] to-[#E55A1C] text-white shadow-lg shadow-orange-500/25' 
                        : 'text-gray-300 hover:bg-gray-800/60 hover:text-white hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1 rounded-lg ${isActive(item.href) ? 'bg-white/20' : 'group-hover:bg-gray-700'}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm">{item.title}</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedItems.includes(item.title) ? 'rotate-90' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {expandedItems.includes(item.title) && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-700 pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`
                            block p-3 rounded-lg transition-all duration-200 text-sm group
                            ${isActive(subItem.href) 
                              ? 'bg-[#F56D22] text-white shadow-md' 
                              : 'text-gray-400 hover:bg-gray-800/40 hover:text-white hover:pl-6'
                            }
                          `}
                        >
                          <span className="flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                              isActive(subItem.href) ? 'bg-white' : 'bg-gray-600 group-hover:bg-[#F56D22]'
                            }`}></div>
                            <span>{subItem.title}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`
                    flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group
                    ${isActive(item.href) 
                      ? 'bg-gradient-to-r from-[#F56D22] to-[#E55A1C] text-white shadow-lg shadow-orange-500/25' 
                      : 'text-gray-300 hover:bg-gray-800/60 hover:text-white hover:shadow-md'
                    }
                  `}
                >
                  <div className={`p-1 rounded-lg ${isActive(item.href) ? 'bg-white/20' : 'group-hover:bg-gray-700'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2 bg-gray-900/50">
          <Link
            href="/Dashboard"
            className="flex items-center space-x-3 p-3 rounded-xl text-gray-400 hover:bg-gray-800/60 hover:text-white transition-all duration-200 group"
          >
            <div className="p-1 rounded-lg group-hover:bg-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="font-medium text-sm">Back to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 w-full group"
          >
            <div className="p-1 rounded-lg group-hover:bg-red-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
