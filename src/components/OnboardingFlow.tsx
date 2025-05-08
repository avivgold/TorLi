"use client";

import React, { useState } from "react";
import ServiceSelector from "./ServiceSelector";
import { Button } from "./ui/button";

interface ServiceOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface BranchOption {
  id: string;
  name: string;
  address: string;
  region: string;
}

const OnboardingFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null,
  );
  const [selectedBranches, setSelectedBranches] = useState<BranchOption[]>([]);

  const handleServiceSelected = (service: ServiceOption) => {
    setSelectedService(service);
  };

  const handleBranchesSelected = (branches: BranchOption[]) => {
    setSelectedBranches(branches);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Book Your Government Appointment
        </h1>

        {step === 1 && (
          <ServiceSelector
            onServiceSelected={handleServiceSelected}
            onBranchesSelected={handleBranchesSelected}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Select Date Range</h2>
            <p className="mb-6">This step will be implemented next</p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
              <Button onClick={() => setStep(step + 1)}>Continue</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
