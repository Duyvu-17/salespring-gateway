
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-16">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};
