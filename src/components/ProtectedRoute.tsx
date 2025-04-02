
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="min-h-[70vh] flex items-center justify-center">Loading...</div>;
  }
  
  // If not authenticated, redirect to login with a toast message
  if (!isAuthenticated) {
    toast({
      title: "Authentication Required",
      description: "Please log in to access this feature",
      variant: "destructive",
    });
    
    // Redirect to login and remember where the user was trying to go
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  return <Outlet />;
};
