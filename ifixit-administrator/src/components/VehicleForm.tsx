"use client";

import { useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { FaSearch } from "react-icons/fa"; // Icons from react-icons
import { AnimatePresence, motion } from 'framer-motion';
import { getOwner } from '../utils/owner';
import axios from 'axios';

export function VehicleForm() {
  const [vehicleSearch, setVehicleSearch] = useState('');
  const [vehicleResult, setVehicleResult] = useState<any>(null);
  const [isVehicleFormVisible, setIsVehicleFormVisible] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ brand: '', year: '', licensePlate: '', ownerID: '' });

  const handleVehicleSearch = () => {
    // Simulated vehicle search by license plate (simple logic)
    const result = vehicleSearch;
    setVehicleResult(result);
  };

  const handleAddVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const owner = getOwner();
    if (!owner) {
      console.error('No owner found');
      return;
    }
    const apiUrl = import.meta.env.VITE_API_KEY;
    const searchUrl = `${apiUrl}vehicles/`;  // La URL con la ruta POST correcta

    const response = await axios.post(searchUrl, {
      brand: newVehicle.brand,
      year: newVehicle.year,
      licensePlate: newVehicle.licensePlate,
      ownerID: owner.id
    });

    if (response.data) {
      console.log('Vehicle added:', response.data);
    }

    setNewVehicle({ brand: '', year: '', licensePlate: '', ownerID: '' });
    setIsVehicleFormVisible(false); // Hide the form after adding the vehicle
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
          className="pr-10" // Adds space for the icon on the right
        />
        <button
          onClick={handleVehicleSearch}
          className="absolute top-1/2 right-3 transform -translate-y-1/2"
        >
          <FaSearch className="text-gray-500" /> {/* Search icon */}
        </button>
      </div>
      {vehicleResult ? (
        <div className="p-4 border rounded">
          <p>Vehicle found: {vehicleResult.brand} ({vehicleResult.year}), License Plate: {vehicleResult.licensePlate}</p>
        </div>
      ) : (
        vehicleSearch && <p>No vehicle found with that license plate.</p>
      )}

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
    </div>
  );
}

export default VehicleForm;
