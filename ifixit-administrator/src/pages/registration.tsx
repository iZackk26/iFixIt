import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FaCar, FaUser, FaBook } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import OwnerForm from "../components/OwnerForm";
import VehicleForm from "../components/VehicleForm";
import RegistrationSummary from "../components/RegistrationSummary";
import { getUser } from "../utils/auth";
import { getOwner } from "../utils/owner";
import { getVehicle } from "../utils/vehicle";
import axios from "axios";

export function Registration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const navigate = useNavigate(); 

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

  const handleNextStep = async () => {
    if (currentStep === 2) {
      await handleSubmit();
      navigate("/workstation");
    } else {
      setCurrentStep((cur) => cur + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((cur) => cur - 1);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="max-w-lg mx-auto p-6 space-y-6">
        {/* Stepper de Material Tailwind */}
        <Stepper
          activeStep={currentStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setCurrentStep(0)}>
            <FaUser className="h-5 w-5" />
          </Step>
          <Step onClick={() => setCurrentStep(1)}>
            <FaCar className="h-5 w-5" />
          </Step>
          <Step onClick={() => setCurrentStep(2)}>
            <FaBook className="h-5 w-5" />
          </Step>
        </Stepper>

        {/* Step Content */}
        <div className="p-4 border rounded">
          {currentStep === 0 && <OwnerForm />}
          {currentStep === 1 && <VehicleForm />}
          {currentStep === 2 && <RegistrationSummary />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            disabled={currentStep === 0}
            onClick={handlePreviousStep}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
          >
            {currentStep === 2 ? "Send" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
