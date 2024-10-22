import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Transaction {
  id: number;
  carName: string;
  licensePlate: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
}

const transactions: Transaction[] = [
  { id: 1, carName: 'Toyota Corolla', licensePlate: 'ABC123', date: '27 March 2023, 12:30 PM', amount: 2500, status: 'pending' },
  { id: 2, carName: 'Honda Civic', licensePlate: 'XYZ987', date: '27 March 2023, 04:30 AM', amount: 2000, status: 'paid' },
  { id: 3, carName: 'Ford Mustang', licensePlate: 'MUS456', date: '26 March 2023, 13:45 PM', amount: 2500, status: 'pending' },
  { id: 4, carName: 'Chevrolet Camaro', licensePlate: 'CAM123', date: '26 March 2023, 12:30 PM', amount: 750, status: 'paid' },
  { id: 5, carName: 'Tesla Model S', licensePlate: 'TES789', date: '26 March 2023, 08:30 AM', amount: 1400, status: 'paid' },
];

const Billing: React.FC = () => {
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
            <div
              className={'text-md font-bold'}
            >
                <span className="text-gray-800">${transaction.amount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Billing;
