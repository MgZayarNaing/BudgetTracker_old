'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [userName, setUserName] = useState('Zayar');
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const handleNewIncomeClick = () => {
    setIsIncomeModalOpen(true);
  };

  const handleNewExpenseClick = () => {
    setIsExpenseModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsIncomeModalOpen(false);
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center text-gray-800 dark:text-gray-200">
        <h1 className="text-2xl font-bold">
          Hello, {userName}! <span className="wave-emoji">👋</span>
        </h1>
        <div className="flex space-x-4">
          <button 
            className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleNewIncomeClick}
          >
            New income <span className="ml-2">💰</span>
          </button>
          <button 
            className="bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleNewExpenseClick}
          >
            New expense <span className="ml-2">🤯</span>
          </button>
        </div>
      </div>

      {isIncomeModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create a new <span className="text-green-700">income</span> transaction</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-200">Description</label>
                <input 
                  type="text" 
                  id="description" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Transaction description (optional)"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 dark:text-gray-200">Amount</label>
                <input 
                  type="number" 
                  id="amount" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Transaction amount (required)"
                  defaultValue="0"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 dark:text-gray-200">Category</label>
                <select 
                  id="category" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select category</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 dark:text-gray-200">Transaction date</label>
                <input 
                  type="date" 
                  id="date" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue="2024-07-09"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create a new <span className="text-red-700">expense</span> transaction</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="description-expense" className="block text-gray-700 dark:text-gray-200">Description</label>
                <input 
                  type="text" 
                  id="description-expense" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Transaction description (optional)"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="amount-expense" className="block text-gray-700 dark:text-gray-200">Amount</label>
                <input 
                  type="number" 
                  id="amount-expense" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Transaction amount (required)"
                  defaultValue="0"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category-expense" className="block text-gray-700 dark:text-gray-200">Category</label>
                <select 
                  id="category-expense" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select category</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="date-expense" className="block text-gray-700 dark:text-gray-200">Transaction date</label>
                <input 
                  type="date" 
                  id="date-expense" 
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue="2024-07-09"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
