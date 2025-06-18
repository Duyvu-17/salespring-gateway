
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { RealTimeInfo } from '@/components/notifications/RealTimeInfo';
import { LiveChatSupport } from '@/components/customer/LiveChatSupport';

export const MainLayout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Add Google Fonts
  useEffect(() => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';
    document.head.appendChild(linkElement);

    // Add meta viewport tag for better mobile responsiveness
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const newViewportMeta = document.createElement('meta');
      newViewportMeta.name = 'viewport';
      newViewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(newViewportMeta);
    }

    // Add touch-action for better mobile interaction
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        -webkit-tap-highlight-color: transparent;
      }
      .xs\\:inline {
        @media (min-width: 480px) {
          display: inline;
        }
      }
      .xs\\:hidden {
        @media (min-width: 480px) {
          display: none;
        }
      }
      .order-timeline-item::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: #e5e7eb;
        z-index: 0;
      }
      .order-timeline-item:last-child::before {
        height: 50%;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(linkElement);
      document.head.removeChild(style);
    };
  }, []);

  // Determine whether to show RealTimeInfo based on current route
  const shouldShowRealTimeInfo = () => {
    const excludedPaths = ['/checkout', '/order/', '/account'];
    return !excludedPaths.some(path => location.pathname.includes(path));
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-300`}>
      <Header />
      {shouldShowRealTimeInfo() && (
        <div className="container mt-4">
          <RealTimeInfo variant="shipping" />
        </div>
      )}
      <main className="flex-1 w-full pb-16 md:pb-8">
        <Outlet />
      </main>
      <Footer />
      <LiveChatSupport />
      <Toaster />
    </div>
  );
};
