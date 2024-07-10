"use client";

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Transactions = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      category: 'Work',
      description: 'Work',
      date: '07/10/2024',
      type: 'Income',
      amount: '$300,000.00'
    }
  ]); // Example data
  const [visibleColumns, setVisibleColumns] = useState({
    category: true,
    description: true,
    date: true,
    type: true,
    amount: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

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

  const toggleColumnVisibility = (column) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const closeAllDropdowns = () => {
    setIsViewDropdownOpen(false);
    setIsCategoryDropdownOpen(false);
    setIsTypeDropdownOpen(false);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center text-gray-800 dark:text-gray-200 mb-8">
        <h1 className="text-2xl font-bold">Transactions history</h1>
        <button 
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        >
          {formatDateRange(dateRange)}
        </button>
      </div>

      {isDatePickerOpen && (
        <div className="relative mb-8">
          <div className="absolute right-0 flex bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
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

      <div className="mb-8 flex justify-between items-center">
        <div className="relative">
          <button
            className="border rounded p-2"
            onClick={() => {
              closeAllDropdowns();
              setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
            }}
          >
            Category
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute mt-2 bg-white border rounded shadow-lg p-4">
              <p className="text-gray-700">No results found.</p>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="border rounded p-2 ml-4"
            onClick={() => {
              closeAllDropdowns();
              setIsTypeDropdownOpen(!isTypeDropdownOpen);
            }}
          >
            Type
          </button>
          {isTypeDropdownOpen && (
            <div className="absolute mt-2 bg-white border rounded shadow-lg p-4">
              <p className="text-gray-700">No results found.</p>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Export CSV</button>
          <div className="relative">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-md ml-4"
              onClick={() => {
                closeAllDropdowns();
                setIsViewDropdownOpen(!isViewDropdownOpen);
              }}
            >
              View
            </button>
            {isViewDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-4">
                <div className="flex flex-col">
                  {Object.keys(visibleColumns).map((column) => (
                    <label key={column} className="inline-flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={visibleColumns[column]}
                        onChange={() => toggleColumnVisibility(column)}
                        className="form-checkbox h-4 w-4 text-gray-600"
                      />
                      <span className="ml-2">{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              {visibleColumns.category && <th className="py-2 px-4 border-b">Category</th>}
              {visibleColumns.description && <th className="py-2 px-4 border-b">Description</th>}
              {visibleColumns.date && <th className="py-2 px-4 border-b">Date</th>}
              {visibleColumns.type && <th className="py-2 px-4 border-b">Type</th>}
              {visibleColumns.amount && <th className="py-2 px-4 border-b">Amount</th>}
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={Object.values(visibleColumns).filter(Boolean).length} className="text-center py-4">No results.</td>
              </tr>
            ) : (
              currentTransactions.map((transaction, index) => (
                <tr key={index}>
                  {visibleColumns.category && <td className="py-2 px-4 border-b">{transaction.category}</td>}
                  {visibleColumns.description && <td className="py-2 px-4 border-b">{transaction.description}</td>}
                  {visibleColumns.date && <td className="py-2 px-4 border-b">{transaction.date}</td>}
                  {visibleColumns.type && <td className="py-2 px-4 border-b">{transaction.type}</td>}
                  {visibleColumns.amount && <td className="py-2 px-4 border-b">{transaction.amount}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
