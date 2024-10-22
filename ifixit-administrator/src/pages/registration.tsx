import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import OwnerForm from "../components/OwnerForm";
import VehicleForm from "../components/VehicleForm";
import axios from "axios";

export function Registration() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="max-w-lg mx-auto p-6 space-y-6">
        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          <div className={`w-1/2 text-center ${currentStep === 1 ? "font-bold" : "text-gray-500"}`}>
            Step 1
          </div>
          <div className="w-1/12 text-center">
            <div className="h-1 bg-gray-300" />
          </div>
          <div className={`w-1/2 text-center ${currentStep === 2 ? "font-bold" : "text-gray-500"}`}>
            Step 2
          </div>
        </div>

        {/* Step Content */}
        <div className="p-4 border rounded">
          {currentStep === 1 ? (
            <Step1 />
          ) : (
            <Step2 />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            disabled={currentStep === 1}
            onClick={handlePreviousStep}
            className={currentStep === 1 ? "disable" : ""}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={currentStep === 2}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Components for each step (empty for now)
const Step1 = () => {
  return <OwnerForm />;
};

const Step2 = () => {
  return <VehicleForm />;
};

export default Registration;
