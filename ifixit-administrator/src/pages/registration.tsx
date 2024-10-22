import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FaCar, FaUser, FaBook } from "react-icons/fa"; // Iconos de react-icons
import OwnerForm from "../components/OwnerForm";
import VehicleForm from "../components/VehicleForm";
import RegistrationSummary from "../components/RegistrationSummary"; // Import corregido
import axios from "axios";

export function Registration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);

  const handleNextStep = () => !isLastStep && setCurrentStep((cur) => cur + 1);
  const handlePreviousStep = () => !isFirstStep && setCurrentStep((cur) => cur - 1);

  const handleSearch = async () => {
    const apiUrl = import.meta.env.VITE_API_KEY;
    const searchUrl = `${apiUrl}owner/${dni}`;
    const response = await axios.get(searchUrl);

    if (response.data) {
      setOwnerData(response.data);
      localStorage.setItem("ownerData", JSON.stringify(response.data));
    } else {
      setError("No se encontró ningún propietario con ese DNI.");
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
            disabled={isFirstStep}
            onClick={handlePreviousStep}
            className={currentStep === 0 ? "disable" : ""}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={isLastStep}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
