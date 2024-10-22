import React from "react";
import { getVehicle } from "../utils/vehicle";
import { getOwner } from "../utils/owner";
import { getUser } from "../utils/auth";
import axios from "axios";


export default function RegistrationSummary() {
  // Datos simulados para el resumen
  const userData = getUser();
  const ownerData = getOwner();
  const vehicleData = getVehicle();

  const handleSubmit = async () => {

    const apiUrl = import.meta.env.VITE_API_KEY;
    const searchUrl = `${apiUrl}registration/`;  // La URL con la ruta POST correcta

    if (!ownerData || !vehicleData || !userData) {
      console.error("Missing data to register the vehicle");
      return;
    }
    // Datos que enviarás en la solicitud
    const registrationData = {
      ownerID: ownerData.id, // Cambia por el ID real del propietario
      employeeID: userData.id, // Cambia por el ID real del empleado
      vehicleID: vehicleData.id,
      date: new Date().toISOString(),
      comments: {
        comment: "Vehicle registered",
      }
    };
    const response = await axios.post(searchUrl, registrationData);
    if (response.data) {
      console.log('Vehicle registered:', response.data);
    }
  }


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
  
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Register Vehicle
      </button>
    </div>
  );
  
}
