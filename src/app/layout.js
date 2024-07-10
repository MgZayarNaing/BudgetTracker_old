'use client';

import Header from './components/Header';
// import Footer from './components/Footer';
import './globals.css';
import { usePathname } from 'next/navigation';
import AuthGuard from './components/AuthGuard';

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <head>
        <title>My Application</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 dark:bg-gray-900">
        {!hideHeaderFooter && <Header />}
        <main>
          {hideHeaderFooter ? children : <AuthGuard>{children}</AuthGuard>}
        </main>
        {/* {!hideHeaderFooter && <Footer />} */}
      </body>
    </html>
  );
};

export default RootLayout;
