"use client";

import { useState } from 'react';
import { Button, Input, Alert } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa"; 
import { AnimatePresence, motion } from 'framer-motion';
import { getOwner } from '../utils/owner';
import axios from 'axios';
import { setVehicleData } from '../utils/vehicle';

export function VehicleForm() {
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleResult, setVehicleResult] = useState<any>(null);
  const [isVehicleFormVisible, setIsVehicleFormVisible] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ brand: '', year: '', licensePlate: '', ownerID: '' });
  const [showSuccess, setShowSuccess] = useState(false); // Estado para la alerta de éxito
  const [showError, setShowError] = useState(false); // Estado para la alerta de error
  const [addedVehiclePlate, setAddedVehiclePlate] = useState(''); // Almacena la placa del vehículo agregado

  const handleVehicleSearch = async () => {
    if (!vehicleSearch) {
      console.error("License plate is required");
      return;
    }
  
    const apiUrl = import.meta.env.VITE_API_KEY;
    const searchUrl = `${apiUrl}vehicles/licensePlate/${vehicleSearch}`;  // Completa la URL con la placa del vehículo
  
    try {
      const response = await axios.get(searchUrl); // Hacer la solicitud GET al endpoint de la API
  
      if (response.data) {
        console.log('Vehicle found:', response.data);
        setVehicleResult(response.data);  // Guardar el resultado del vehículo en el estado
        setShowSuccess(true); // Mostrar la alerta de éxito
        setShowError(false); // Ocultar la alerta de error
        setVehicleData(response.data); // Guardar el resultado en el almacenamiento local
      } else {
        console.log("Vehicle not found");
        setVehicleResult(null);
        setShowSuccess(false); // No mostrar la alerta de éxito si no hay resultados
        setShowError(true); // Mostrar la alerta de error
      }
    } catch (error) {
      console.error("Error searching for vehicle:", error);
      setVehicleResult(null);  // Borrar el resultado en caso de error
      setShowSuccess(false); // No mostrar la alerta de éxito en caso de error
      setShowError(true); // Mostrar la alerta de error
    }
  };

  const handleAddVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const owner = getOwner();
    if (!owner) {
      console.error('No owner found');
      return;
    }
    const apiUrl = import.meta.env.VITE_API_KEY;
    const addVehicleUrl = `${apiUrl}vehicles/`;  // La URL con la ruta POST correcta

    try {
      const response = await axios.post(addVehicleUrl, {
        brand: newVehicle.brand,
        year: newVehicle.year,
        licensePlate: newVehicle.licensePlate,
        ownerID: owner.id
      });

      if (response.data) {
        console.log('Vehicle added:', response.data);
        setVehicleData(response.data); // Guardar el resultado en el almacenamiento local
        setAddedVehiclePlate(response.data.licensePlate); // Almacenar la placa del vehículo agregado
        setShowSuccess(true); // Mostrar la alerta de éxito
        setShowError(false); // Ocultar la alerta de error si existía
      }

      setNewVehicle({ brand: '', year: '', licensePlate: '', ownerID: '' });
      setIsVehicleFormVisible(false); // Ocultar el formulario después de agregar el vehículo
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="w-96 mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold w-full text-center">Search Vehicle by Plate</h2>
      
      {/* Search field */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search vehicle by license plate"
          value={vehicleSearch}
          onChange={(e) => setVehicleSearch(e.target.value)}
          className="pr-10"
        />
        <button
          onClick={handleVehicleSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <FaSearch className="text-gray-500" />
        </button>
      </div>

      {/* Button to show/hide the form to add a new vehicle */}
      <Button 
        variant="outlined" 
        fullWidth 
        onClick={() => setIsVehicleFormVisible(!isVehicleFormVisible)}
      >
        {isVehicleFormVisible ? 'Cancel' : 'Add New Vehicle'}
      </Button>

      {/* Animated form to add a new vehicle */}
      <AnimatePresence>
        {isVehicleFormVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <Input 
                label="Brand" 
                value={newVehicle.brand} 
                onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                required
              />
              <Input 
                label="Year" 
                type="number" 
                value={newVehicle.year} 
                onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                required
              />
              <Input 
                label="License Plate" 
                value={newVehicle.licensePlate} 
                onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
                required
              />
              <Button type="submit" fullWidth>Add Vehicle</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show success alert */}
      {showSuccess && (
        <div className="mt-4 animate-pulse">
          <Alert variant="gradient" color="green">
            <span>
              Vehicle {vehicleResult?.licensePlate || addedVehiclePlate} was successfully added
            </span>
          </Alert>
        </div>
      )}

      {/* Show error alert */}
      {showError && (
        <div className="mt-4 animate-pulse">
          <Alert variant="gradient" color="red">
            <span>Vehicle not found</span>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default VehicleForm;
