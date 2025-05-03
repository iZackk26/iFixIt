// src/pages/registration.tsx
import { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { FaCar, FaUser, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OwnerForm from "../components/OwnerForm";
import VehicleForm from "../components/VehicleForm";
import RegistrationSummary from "../components/RegistrationSummary";
import { useAuth } from "../contexts/AuthContext";
import { getOwner } from "../utils/owner";
import { getVehicle } from "../utils/vehicle";
import axios from "axios";

export function Registration() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const ownerData = getOwner();
  const vehicleData = getVehicle();

  const handleSubmit = async () => {
    const apiUrl = import.meta.env.VITE_API_KEY;
    const url = `${apiUrl}registration/`;

    if (!ownerData || !vehicleData || !user) {
      console.error("Faltan datos para completar el registro");
      return;
    }

    const registrationData = {
      ownerID: ownerData.id,
      employeeID: user.id,
      vehicleID: vehicleData.id,
      date: new Date().toISOString(),
    };

    try {
      const response = await axios.post(url, registrationData);
      console.log("Vehicle registered:", response.data);
    } catch (err) {
      console.error("Error al registrar:", err);
    }
  };

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
        <Stepper
          activeStep={currentStep}
          isLastStep={(value: boolean) => setIsLastStep(value)}
          isFirstStep={(value: boolean) => setIsFirstStep(value)}
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

        <div className="p-4 border rounded">
          {currentStep === 0 && <OwnerForm />}
          {currentStep === 1 && <VehicleForm />}
          {currentStep === 2 && <RegistrationSummary />}
        </div>

        <div className="flex justify-between">
          <Button disabled={isFirstStep} onClick={handlePreviousStep}>
            Previous
          </Button>
          <Button disabled={isLastStep} onClick={handleNextStep}>
            {currentStep === 2 ? "Send" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
