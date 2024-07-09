import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Budget Tracker',
  description: 'A simple budget tracking app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
