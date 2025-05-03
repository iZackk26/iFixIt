// src/utils/vehicle.ts
export interface VehicleData {
    brand: string;
    year: number;
    licensePlate: string;
    id: string;
  }
  
  export const setVehicleData = (vehicle: VehicleData): void => {
    localStorage.setItem("vehicle", JSON.stringify(vehicle));
  };
  
  export const getVehicle = (): VehicleData | null => {
    const stored = localStorage.getItem("vehicle");
    return stored ? (JSON.parse(stored) as VehicleData) : null;
  };
  