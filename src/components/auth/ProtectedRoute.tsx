'use client';

import { AuthLoading } from '../ui/Loading';
import { useTokenStorage } from '@/hooks/core/useTokenStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const { hasTokens } = useTokenStorage();

  useEffect(() => {
    const checkAuth = () => {
      if (!hasTokens()) {
        console.log('No access token found, redirecting to login');
        router.replace('/');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [hasTokens, router]);

  // Show beautiful loading while checking authentication
  if (isAuthenticated === null) {
    return <AuthLoading />;
  }

  // Show children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // This should not be reached due to redirect above
  return null;
}
