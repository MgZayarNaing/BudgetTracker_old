"use client";

import React, { useState } from 'react';

const Manage = () => {
  const [currency, setCurrency] = useState('$ Dollar');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const currencies = ['$ Dollar', '€ Euro', '¥ Yen', '£ Pound'];

  const toggleCurrencyDropdown = () => {
    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
  };

  const handleCurrencySelect = (currency) => {
    setCurrency(currency);
    setIsCurrencyDropdownOpen(false);
  };

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
  };

  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };

  const closeModal = () => {
    setIsIncomeModalOpen(false);
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Manage</h1>
      <p className="text-gray-600 mb-8">Manage your account settings and categories</p>

      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <h2 className="text-xl font-bold mb-2">Currency</h2>
        <p className="text-gray-600 mb-2">Set your default currency for transactions</p>
        <div className="relative">
          <button
            className="border rounded-md px-4 py-2 w-full text-left"
            onClick={toggleCurrencyDropdown}
          >
            {currency}
          </button>
          {isCurrencyDropdownOpen && (
            <div className="absolute mt-2 bg-white border rounded shadow-lg p-2 w-full">
              <input
                type="text"
                placeholder="Filter currency..."
                className="w-full p-2 mb-2 border rounded"
              />
              {currencies.map((currency, index) => (
                <button
                  key={index}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleCurrencySelect(currency)}
                >
                  {currency}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-2">Incomes categories</h2>
          <button
            className="bg-black text-white px-4 py-2 rounded-md"
            onClick={openIncomeModal}
          >
            + Create category
          </button>
        </div>
        <p className="text-gray-600 mb-2">Sorted by name</p>
        <p className="text-gray-600">No <span className="text-green-500">income</span> categories yet</p>
        <p className="text-gray-600">Create one to get started</p>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-2">Expenses categories</h2>
          <button
            className="bg-black text-white px-4 py-2 rounded-md"
            onClick={openExpenseModal}
          >
            + Create category
          </button>
        </div>
        <p className="text-gray-600 mb-2">Sorted by name</p>
        <p className="text-gray-600">No <span className="text-red-500">expense</span> categories yet</p>
        <p className="text-gray-600">Create one to get started</p>
      </div>

      {isIncomeModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create <span className="text-green-700">income</span> category</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="income-category-name" className="block text-gray-700">Name</label>
                <input 
                  type="text" 
                  id="income-category-name" 
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Category"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={closeModal}
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
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create <span className="text-red-700">expense</span> category</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="expense-category-name" className="block text-gray-700">Name</label>
                <input 
                  type="text" 
                  id="expense-category-name" 
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Category"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={closeModal}
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
};

export default Manage;
