import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { RealTimeInfo } from '@/components/notifications/RealTimeInfo';
import  {LiveChatSupport}  from '@/components/customer/LiveChatSupport';

export const MainLayout = () => {
  const { theme } = useTheme();
  
  // Add Google Fonts
  useEffect(() => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  // Generate theme-specific background patterns or styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return 'bg-background text-foreground';
      case 'light':
        return 'bg-dotted-pattern bg-dotted bg-background text-foreground';
      case 'purple':
        return 'bg-gradient-to-br from-purple-50 to-background text-foreground';
      case 'ocean':
        return 'bg-gradient-to-br from-blue-50 to-background text-foreground';
      default:
        return 'bg-background text-foreground';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${getThemeStyles()} font-sans`}>
      <Header />
      <div className="container mt-4">
        <RealTimeInfo variant="shipping" />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <LiveChatSupport />
      <Toaster />
    </div>
  );
};
