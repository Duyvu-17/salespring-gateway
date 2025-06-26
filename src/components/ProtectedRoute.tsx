import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export const ProtectedRoute = () => {
  const { toast } = useToast();
  const location = useLocation();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this feature",
        variant: "destructive",
      });
      setShouldRedirect(true);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center">Loading...</div>;
  }

  if (shouldRedirect) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
