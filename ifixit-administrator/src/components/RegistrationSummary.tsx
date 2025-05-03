// src/components/RegistrationSummary.tsx
import { getOwner, OwnerData } from "../utils/owner";
import { getVehicle, VehicleData } from "../utils/vehicle";

export default function RegistrationSummary() {
  const ownerData: OwnerData | null = getOwner();
  const vehicleData: VehicleData | null = getVehicle();

  return (
    <div className="w-96 mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold w-full text-center">Summary</h2>

      {/* Owner Information */}
      {ownerData ? (
        <div className="p-4 border rounded space-y-2">
          <h3 className="text-xl font-semibold">Owner Information</h3>
          <p>
            <strong>Name:</strong> {ownerData.name}
          </p>
          <p>
            <strong>DNI:</strong> {ownerData.dni}
          </p>
          <p>
            <strong>Email:</strong> {ownerData.mail}
          </p>
          <p>
            <strong>Phone:</strong> {ownerData.phone}
          </p>
        </div>
      ) : (
        <p>Loading owner information...</p>
      )}

      {/* Vehicle Information */}
      {vehicleData ? (
        <div className="p-4 border rounded space-y-2">
          <h3 className="text-xl font-semibold">Vehicle Information</h3>
          <p>
            <strong>Brand:</strong> {vehicleData.brand}
          </p>
          <p>
            <strong>Year:</strong> {vehicleData.year}
          </p>
          <p>
            <strong>License Plate:</strong> {vehicleData.licensePlate}
          </p>
        </div>
      ) : (
        <p>Loading vehicle information...</p>
      )}
    </div>
  );
}
