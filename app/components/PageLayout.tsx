'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import ScrollProgress from './ScrollProgress';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <ScrollProgress />
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
