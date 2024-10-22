import React, {useState} from 'react'

export default function Login() {
    const [commerceCredentials, setCommerceCredentials] = useState("");
    const [workerId, setWorkerId] = useState("");

    // Método para manejar el inicio de sesión
    const submitLogin = (e) => {
        e.preventDefault();
        // Lógica para el manejo del login
        console.log("Credenciales:", commerceCredentials);
        console.log("ID del trabajador:", workerId);
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
                            Commerce Credentials
                        </label>
                        <div className="relative">
                            <input
                                id="commerceCredentials"
                                type="password"
                                value={commerceCredentials}
                                onChange={(e) => setCommerceCredentials(e.target.value)}
                                placeholder="Enter commerce credentials"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="workerId">
                            Worker ID
                        </label>
                        <div className="relative">
                            <input
                                id="workerId"
                                type="text"
                                value={workerId}
                                onChange={(e) => setWorkerId(e.target.value)}
                                placeholder="Enter your worker ID"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            />
                            <i className="fas fa-id-badge absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
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
