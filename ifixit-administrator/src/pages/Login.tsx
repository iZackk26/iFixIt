import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';
import { useAuth } from '../contexts/AuthContext'; // Importar el hook de autenticación

export default function Login() {
  const [commerceCredentials, setCommerceCredentials] = useState<string>('');
  const [workerId, setWorkerId] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_KEY;
    const newApi = `${apiUrl}employee/login/`;

    try {
      const response = await axios.post(newApi, {
        mail: commerceCredentials,
        password: workerId,
      });

      const user = response.data;
      login(user); // Llamar a la función login del contexto
      navigate('/'); // Redirigir al home
    } catch (error) {
      setShowError(true);
      setCommerceCredentials('');
      setWorkerId('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please enter your credentials to access the system
        </p>
        <form onSubmit={submitLogin}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="commerceCredentials">
              Email
            </label>
            <div className="relative">
              <input
                id="commerceCredentials"
                type="text"
                value={commerceCredentials}
                onChange={(e) => {
                  setCommerceCredentials(e.target.value);
                  setShowError(false); // Hide error message when user types
                }}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="workerId">
              Password
            </label>
            <div className="relative">
              <input
                id="workerId"
                type="password"
                value={workerId}
                onChange={(e) => {
                  setWorkerId(e.target.value);
                  setShowError(false); // Hide the alert when typing
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            {showError && (
              <div className="mt-4 animate-pulse">
                <Alert variant="gradient" color="red">
                  <span>Incorrect email or password</span>
                </Alert>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
