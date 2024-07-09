'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Set initial mode based on system preference or saved preference
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      toggleMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleMode('dark');
    }
  }, []);

  const toggleMode = (mode) => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="ml-2 text-xl font-bold text-orange-500">BudgetTracker</h1>
        </div>
        <nav className="flex space-x-4">
          <Link href="/dashboard">
            <span className="text-gray-800 dark:text-gray-200 hover:text-black">Dashboard</span>
          </Link>
          <Link href="/transactions">
            <span className="text-gray-800 dark:text-gray-200 hover:text-black">Transactions</span>
          </Link>
          <Link href="/manage">
            <span className="text-gray-800 dark:text-gray-200 hover:text-black">Manage</span>
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => toggleMode(isDarkMode ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {isDarkMode ? (
              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                />
              </svg>
            ) : (
              <svg
                className="w-[20px] h-[20px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
                />
              </svg>
            )}
          </button>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            Z
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
