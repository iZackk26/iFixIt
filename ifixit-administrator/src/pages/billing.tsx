import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Transaction {
  id: number;
  carName: string;
  licensePlate: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
}

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Billing: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos de las transacciones desde el backend
  const fetchTransactions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_KEY; // Asegúrate de que la URL esté bien configurada
      const response = await axios.get(`${apiUrl}registration/with-price`); // URL correcta para obtener registros con precio

      // Mapear los datos del backend al formato que necesitas
      const formattedTransactions = response.data.map((transaction: any) => ({
        id: transaction.registrationid, // Si el campo se llama diferente, asegúrate de usar el correcto
        carName: transaction.vehiclebrand,
        licensePlate: transaction.vehiclelicenseplate,
        date: formatDate(transaction.date), // Formatear la fecha
        amount: transaction.price,
        status: transaction.billing ? 'paid' : 'pending',
      }));

      setTransactions(formattedTransactions);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error fetching transactions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(); // Llamar la función al montar el componente
  }, []);

  if (loading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">History Transactions</h2>
      <p className="text-gray-500 mb-6">Track and monitor your financial activity.</p>

      {transactions.map((transaction, index) => (
        <div key={transaction.id || index} className="mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="border rounded-md p-2 mr-3">
                {transaction.status === 'paid' ? (
                  <FiChevronUp className="text-green-500" />
                ) : (
                  <FiChevronDown className="text-red-500" />
                )}
              </div>
              <div>
                <h3 className="text-md font-semibold">
                  {transaction.carName} ({transaction.licensePlate})
                </h3>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className={'text-md font-bold'}>
              <span className="text-gray-800">${transaction.amount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Billing;
