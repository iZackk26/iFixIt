import React from "react";
import { getVehicle } from "../utils/vehicle";
import { getOwner } from "../utils/owner";


export default function RegistrationSummary() {
  // Datos simulados para el resumen
  const ownerData = getOwner();
  const vehicleData = getVehicle();

  return (
    <div className="w-96 mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold w-full text-center">Summary</h2>

      {/* Owner Information */}
      {ownerData ? (
        <div className="p-4 border rounded space-y-2">
          <h3 className="text-xl font-semibold">Owner Information</h3>
          <p><strong>Name:</strong> {ownerData.name}</p>
          <p><strong>DNI:</strong> {ownerData.dni}</p>
          <p><strong>Email:</strong> {ownerData.mail}</p>
          <p><strong>Phone:</strong> {ownerData.phone}</p>
        </div>
      ) : (
        <p>Loading owner information...</p>
      )}

      {/* Vehicle Information */}
      {vehicleData ? (
        <div className="p-4 border rounded space-y-2">
          <h3 className="text-xl font-semibold">Vehicle Information</h3>
          <p><strong>Brand:</strong> {vehicleData.brand}</p>
          <p><strong>Year:</strong> {vehicleData.year}</p>
          <p><strong>License Plate:</strong> {vehicleData.licensePlate}</p>
        </div>
      ) : (
        <p>Loading vehicle information...</p>
      )}

    </div>
  );

}
