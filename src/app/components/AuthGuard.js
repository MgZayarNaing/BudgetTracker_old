import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Only run this code on the client side
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  // While checking authentication, don't render anything to avoid hydration mismatch
  if (isAuthenticated === null) {
    return null;
  }

  return children;
};

export default AuthGuard;
