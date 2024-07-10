'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import History from '../history/page'; // Updated path

export default function Dashboard() {
  const [userName, setUserName] = useState('Zayar');
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

  const handleDateRangeChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const formatDateRange = (range) => {
    const start = range[0].startDate.toLocaleDateString();
    const end = range[0].endDate.toLocaleDateString();
    return `${start} - ${end}`;
  };

  const setPresetDateRange = (startDate, endDate) => {
    setDateRange([{ startDate, endDate, key: 'selection' }]);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center text-gray-800 dark:text-gray-200 mb-8">
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

      <div className="flex justify-between items-center mb-8  dark:text-gray-200">
        <h2 className="text-xl font-bold">Overview</h2>
        <button 
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        >
          {formatDateRange(dateRange)}
        </button>
      </div>

      {isDatePickerOpen && (
        <div className="relative mb-8">
          <div className="absolute right-0 flex bg-white  dark:text-gray-200 p-4 rounded-lg shadow">
            <div>
              <DateRange
                editableDateInputs={true}
                onChange={handleDateRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>
            <div className="ml-4 flex flex-col justify-around">
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(new Date(), new Date())}
              >
                Today
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(subDays(new Date(), 1), subDays(new Date(), 1))}
              >
                Yesterday
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(subDays(new Date(), 6), new Date())}
              >
                Last 7 days
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(subDays(new Date(), 13), new Date())}
              >
                Last 14 days
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(subDays(new Date(), 29), new Date())}
              >
                Last 30 days
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(startOfWeek(new Date()), endOfWeek(new Date()))}
              >
                This Week
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(startOfWeek(subDays(new Date(), 7)), endOfWeek(subDays(new Date(), 7)))}
              >
                Last Week
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(startOfMonth(new Date()), endOfMonth(new Date()))}
              >
                This Month
              </button>
              <button
                className="text-gray-700 dark:text-gray-200 hover:text-black"
                onClick={() => setPresetDateRange(startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1)))}
              >
                Last Month
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-200">Income</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">$0.00</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-200">Expense</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">$0.00</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-200">Balance</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">$0.00</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-200">Incomes by category</h3>
          <p className="text-gray-500 dark:text-gray-400">No data for the selected period. Try selecting a different period or try adding new incomes.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-gray-700 dark:text-gray-200">Expenses by category</h3>
          <p className="text-gray-500 dark:text-gray-400">No data for the selected period. Try selecting a different period or try adding new expenses.</p>
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

      <History />
    </div>
  );
}
