import { FaClipboard, FaWrench, FaReceipt, FaChartBar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/IFixIt.png'; // Importa el logo desde la carpeta assets
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('Usuario autenticado:', user);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <img src={logo} alt="I Fix It Logo" className="h-24 mb-4" />

      {/* Mensaje de prototipo */}
      <p className="text-sm text-gray-600 italic text-center mb-6 max-w-md">
        This is a non-functional prototype and requires hosting resources and associated costs.  
        To fully try it out, please clone the repository and deploy both backend and frontend yourself:{" "}
        <a
          href="https://github.com/iZackk26/iFixIt"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          iFixIt GitHub repo
        </a>.
      </p>

      <div className="w-full max-w-md shadow-lg bg-white rounded-lg">
        <div className="grid grid-cols-2 gap-4 p-4">
          <button 
            className="flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/registration')}
          >
            <FaClipboard className="h-8 w-8 mb-2" />
            <span>Registration</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/workstation')}
          >
            <FaWrench className="h-8 w-8 mb-2" />
            <span>Work station</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/billing')}
          >
            <FaReceipt className="h-8 w-8 mb-2" />
            <span>Billing</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/stats')}
          >
            <FaChartBar className="h-8 w-8 mb-2" />
            <span>Reports</span>
          </button>
        </div>

        {/* Botón de Logout */}
        <div className="mt-6 p-4">
          <button 
            onClick={handleLogout} 
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

