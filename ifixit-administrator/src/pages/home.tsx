import { FaClipboard, FaWrench, FaReceipt, FaChartBar } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-blue-600 tracking-tight">
        I Fix <span className="text-orange-500">It</span>
      </h1>
      
      <div className="w-full max-w-md shadow-lg bg-white rounded-lg">
        <div className="grid grid-cols-2 gap-4 p-4">
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg"
            onClick={() => navigate('/registration')}
          >
            <FaClipboard className="h-8 w-8 mb-2" />
            <span>Registration</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg"
            onClick={() => navigate('/workstation')}
          >
            <FaWrench className="h-8 w-8 mb-2" />
            <span>Work station</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg"
            onClick={() => navigate('/billing')}
          >
            <FaReceipt className="h-8 w-8 mb-2" />
            <span>Billing</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center h-24 text-left border border-gray-300 rounded-lg"
            onClick={() => navigate('/reports')}
          >
            <FaChartBar className="h-8 w-8 mb-2" />
            <span>Reports</span>
          </button>
        </div>
      </div>
    </div>
  )
}
