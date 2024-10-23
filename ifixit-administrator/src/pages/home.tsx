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
      console.log('Usuario autenticado:', user); // Imprimir solo si user está definido
    }
  }, [user]);

  const handleLogout = () => {
    logout(); // Llamar la función de logout para cerrar sesión
    navigate('/login'); // Redirigir al login después de cerrar sesión
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Muestra el logo en lugar del título */}
      <img src={logo} alt="I Fix It Logo" className="h-24 mb-8" />
      
      <div className="w-full max-w-md shadow-lg bg-white rounded-lg">
        <div className="grid grid-cols-2 gap-4 p-4">
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/registration')}
          >
            <FaClipboard className="h-8 w-8 mb-2" />
            <span>Registration</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/workstation')}
          >
            <FaWrench className="h-8 w-8 mb-2" />
            <span>Work station</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
            onClick={() => navigate('/billing')}
          >
            <FaReceipt className="h-8 w-8 mb-2" />
            <span>Billing</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
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
