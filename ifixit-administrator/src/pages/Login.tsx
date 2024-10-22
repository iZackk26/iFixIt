import React, { useState } from 'react';
import axios from 'axios';
import { setAuthData } from '../utils/auth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function Login() {
    const [commerceCredentials, setCommerceCredentials] = useState("");
    const [workerId, setWorkerId] = useState("");
    const navigate = useNavigate(); // Define useNavigate

    // Método para manejar el inicio de sesión
    const submitLogin = async (e) => {
        e.preventDefault();
        // Lógica para el manejo del login
        const apiUrl = import.meta.env.VITE_API_KEY;
        const newApi = apiUrl + 'employee/login/';

        try {
            const response = await axios.post(newApi, {
                mail: commerceCredentials,
                password: workerId
            });

            const user = response.data;
            setAuthData(user);

            // Redirige al usuario a /home si el login es exitoso
            navigate('/home');
        } catch (error) {
            console.error("Error logging in:", error);
            // Aquí puedes agregar manejo de errores si es necesario
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
                    {/* Campo para el Email */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="commerceCredentials">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                id="commerceCredentials"
                                type="text"
                                value={commerceCredentials}
                                onChange={(e) => setCommerceCredentials(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>
    
                    {/* Campo para la Contraseña */}
                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="workerId">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="workerId"
                                type="password"
                                value={workerId}
                                onChange={(e) => setWorkerId(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
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
