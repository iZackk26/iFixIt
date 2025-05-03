import React, { useState /*, useEffect */ } from 'react';
// import axios from 'axios'; // se mantiene la importación
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
  // 1) Datos “quemados” de ejemplo
  const dummyTransactions: Transaction[] = [
    {
      id: 1,
      carName: 'Honda Civic 2020',
      licensePlate: 'ABC-1234',
      date: formatDate('2025-04-25T10:30:00Z'),
      amount: 250.0,
      status: 'paid',
    },
    {
      id: 2,
      carName: 'Ford Mustang GT',
      licensePlate: 'XYZ-5678',
      date: formatDate('2025-04-27T14:45:00Z'),
      amount: 450.5,
      status: 'pending',
    },
    {
      id: 3,
      carName: 'Chevrolet Spark',
      licensePlate: 'LMN-9012',
      date: formatDate('2025-04-29T09:15:00Z'),
      amount: 120.75,
      status: 'paid',
    },
    {
    id: 4,
    carName: 'Nissan Altima 2019',
    licensePlate: 'DEF-3456',
    date: formatDate('2025-05-02T11:00:00Z'),
    amount: 320.0,
    status: 'pending',
  },
  {
    id: 5,
    carName: 'BMW X5 2021',
    licensePlate: 'GHI-7890',
    date: formatDate('2025-05-03T09:30:00Z'),
    amount: 600.5,
    status: 'paid',
  },
  {
    id: 6,
    carName: 'Audi A4 2018',
    licensePlate: 'JKL-2345',
    date: formatDate('2025-05-04T15:45:00Z'),
    amount: 480.75,
    status: 'pending',
  },
  {
    id: 7,
    carName: 'Volkswagen Golf 2017',
    licensePlate: 'MNO-6789',
    date: formatDate('2025-05-05T12:20:00Z'),
    amount: 220.0,
    status: 'paid',
  },
  {
    id: 8,
    carName: 'Mercedes C300 2019',
    licensePlate: 'PQR-1122',
    date: formatDate('2025-05-06T14:10:00Z'),
    amount: 550.25,
    status: 'pending',
  },
  {
    id: 9,
    carName: 'Subaru Impreza 2020',
    licensePlate: 'STU-3344',
    date: formatDate('2025-05-07T10:05:00Z'),
    amount: 310.0,
    status: 'paid',
  },
  ];

  // 2) Inicializamos con los datos quemados
  const [transactions] = useState<Transaction[]>(dummyTransactions);
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  // 3) Función y efecto de fetch comentados para mantenerlos en el código
  /*
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_KEY;
      const response = await axios.get(`${apiUrl}registration/with-price`);
      const formatted = response.data.map((tx: any) => ({
        id: tx.registrationid,
        carName: tx.vehiclebrand,
        licensePlate: tx.vehiclelicenseplate,
        date: formatDate(tx.date),
        amount: tx.price,
        status: tx.billing ? 'paid' : 'pending',
      }));
      setTransactions(formatted);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Error fetching transactions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  */

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

      {transactions.map((transaction) => (
        <div key={transaction.id} className="mb-4">
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
            <div className="text-md font-bold">
              <span className="text-gray-800">${transaction.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Billing;

