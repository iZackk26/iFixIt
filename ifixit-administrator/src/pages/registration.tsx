import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FaCar, FaUser, FaBook } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import OwnerForm from "../components/OwnerForm";
import VehicleForm from "../components/VehicleForm";
import RegistrationSummary from "../components/RegistrationSummary";

export function Registration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const navigate = useNavigate(); 

  const handleNextStep = () => {
    if (currentStep === 2) {
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
