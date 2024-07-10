'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../api/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await login(email, password);
      if (response) {
        setSuccess(response.message || 'Login successful!');
        // Save user info to localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        setTimeout(() => {
          router.push('/dashboard'); // redirect to dashboard
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12m0 0a3 3 0 00-3-3m3 3a3 3 0 01-3 3m3-3H9m6 0a3 3 0 01-3 3m3-3a3 3 0 00-3-3M6.343 6.343a8.004 8.004 0 000 11.314M17.657 6.343a8.004 8.004 0 010 11.314"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.97 10.97 0 0112 19.5a10.97 10.97 0 01-1.875-.675m3.75 0A10.97 10.97 0 0012 17.25c-1.56 0-3.05.354-4.406.975m11.281-4.5a8.001 8.001 0 00-11.313-11.313m15.188 8.25a12.002 12.002 0 00-16.872 0m0 0a12.002 12.002 0 010 16.872m15.188-8.25a12.002 12.002 0 010-16.872"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Don't have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.push('/register')}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
