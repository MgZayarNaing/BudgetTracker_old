'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    if (savedMode) {
      toggleMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleMode('dark');
    }

    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        } else {
          console.error('Invalid user data found in localStorage');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        localStorage.removeItem('user');
      }
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

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axios.defaults.headers.common['Authorization'] = '';
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <Link href="/dashboard" className="ml-2 text-xl font-bold text-orange-500">BudgetTracker</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-black">
            Dashboard
          </Link>
          <Link href="/transactions" className="text-gray-800 dark:text-gray-200 hover:text-black">
            Transactions
          </Link>
          <Link href="/manage" className="text-gray-800 dark:text-gray-200 hover:text-black">
            Manage
          </Link>
        </div>
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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 md:hidden"
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white focus:outline-none"
            >
              {user ? user.username[0] : 'Z'}
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
                {user && (
                  <div className="px-4 py-2">
                    <div className="text-sm text-gray-800 dark:text-gray-200 font-semibold">{user.username}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-600"></div>
                <Link href="/profile">
                  <span className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Manage account</span>
                </Link>
                <span
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Sign out
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <nav className="flex flex-col space-y-2 p-4">
          <Link href="/dashboard" className="text-gray-800 dark:text-gray-200 hover:text-black">
            Dashboard
          </Link>
          <Link href="/transactions" className="text-gray-800 dark:text-gray-200 hover:text-black">
            Transactions
          </Link>
          <Link href="/manage" className="text-gray-800 dark:text-gray-200 hover:text-black">
            Manage
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
