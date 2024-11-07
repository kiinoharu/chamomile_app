import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px 0',maxWidth: '400px',margin: '0 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;