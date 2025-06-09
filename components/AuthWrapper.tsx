'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthWrapper({ children, requireAuth = true }: AuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
      
      if (requireAuth && isLoggedIn !== 'true') {
        router.push('/admin/login');
        return;
      }
      
      if (!requireAuth && isLoggedIn === 'true') {
        router.push('/admin');
        return;
      }
      
      setIsLoading(false);
    };

    // Small delay to ensure localStorage is available
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [requireAuth, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F56D22]"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 