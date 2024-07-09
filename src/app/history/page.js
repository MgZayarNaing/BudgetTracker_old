'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function History() {
  const [view, setView] = useState('Year');
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState('July');
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);

  const data = {
    labels: view === 'Year' ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    datasets: [
      {
        label: 'Income',
        data: showIncome ? (view === 'Year' ? [0, 0, 0, 0, 200000, 0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expense',
        data: showExpense ? (view === 'Year' ? [0, 0, 0, 0, 0, 150000, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) : [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income and Expense History',
      },
    },
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center text-gray-800 dark:text-gray-200 mb-8">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="flex items-center space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${view === 'Year' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
            onClick={() => setView('Year')}
          >
            Year
          </button>
          <button
            className={`px-4 py-2 rounded-md ${view === 'Month' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
            onClick={() => setView('Month')}
          >
            Month
          </button>
          <select
            className="px-4 py-2 rounded-md bg-white dark:bg-gray-800"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {[2024, 2023, 2022].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {view === 'Month' && (
            <select
              className="px-4 py-2 rounded-md bg-white dark:bg-gray-800"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          )}
          <div className="flex space-x-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showIncome}
                onChange={() => setShowIncome(!showIncome)}
                className="mr-2"
              />
              Income
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showExpense}
                onChange={() => setShowExpense(!showExpense)}
                className="mr-2"
              />
              Expense
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <Bar data={data} options={options} />
      </div>

      {data.datasets[0].data.length === 0 && data.datasets[1].data.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
          No data for the selected period. Try selecting a different period or adding new transactions.
        </div>
      )}
    </div>
  );
}
