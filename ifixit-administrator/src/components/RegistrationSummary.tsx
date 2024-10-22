import React from "react";

export default function RegistrationSummary() {
  // Datos simulados para el resumen
  const ownerData = {
    name: "John Doe",
    dni: "123456789",
    email: "john.doe@example.com",
    phone: "+1 555 555 5555",
  };

  const vehicleData = {
    brand: "Toyota",
    year: 2021,
    licensePlate: "ABC-1234",
  };

  return (
    <div className="w-96 mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold w-full text-center">Summary</h2>
      
      {/* Owner Information */}
      <div className="p-4 border rounded space-y-2">
        <h3 className="text-xl font-semibold">Owner Information</h3>
        <p><strong>Name:</strong> {ownerData.name}</p>
        <p><strong>DNI:</strong> {ownerData.dni}</p>
        <p><strong>Email:</strong> {ownerData.email}</p>
        <p><strong>Phone:</strong> {ownerData.phone}</p>
      </div>

      {/* Vehicle Information */}
      <div className="p-4 border rounded space-y-2">
        <h3 className="text-xl font-semibold">Vehicle Information</h3>
        <p><strong>Brand:</strong> {vehicleData.brand}</p>
        <p><strong>Year:</strong> {vehicleData.year}</p>
        <p><strong>License Plate:</strong> {vehicleData.licensePlate}</p>
      </div>
    </div>
  );
}
