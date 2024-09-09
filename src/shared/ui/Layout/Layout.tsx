import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-custom-bg">
      <Header />
      <main className="flex-grow p-4 mx-auto w-[1200px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
