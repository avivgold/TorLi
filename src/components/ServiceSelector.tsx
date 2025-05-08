"use client";

import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface ServiceOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface BranchOption {
  id: string;
  name: string;
  address: string;
  region: string;
}

interface ServiceSelectorProps {
  onServiceSelected?: (service: ServiceOption) => void;
  onBranchesSelected?: (branches: BranchOption[]) => void;
  onNext?: () => void;
}

const ServiceSelector = ({
  onServiceSelected = () => {},
  onBranchesSelected = () => {},
  onNext = () => {},
}: ServiceSelectorProps) => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  // Mock data for services
  const services = [
    {
      id: "passport",
      name: "דרכון",
      icon: "🛂",
      description: "חידוש דרכון ותעודת זהות",
    },
    {
      id: "license",
      name: "רישיון נהיגה",
      icon: "🚗",
      description: "חידוש רישיון נהיגה ומבחני נהיגה",
    },
    {
      id: "bituach",
      name: "ביטוח לאומי",
      icon: "🏥",
      description: "שירותי ביטוח לאומי ותביעות",
    },
    {
      id: "tax",
      name: "רשות המסים",
      icon: "📊",
      description: "הגשת מסים וייעוץ",
    },
  ];

  // Mock data for branches
  const branches = {
    passport: [
      {
        id: "tlv",
        name: "תל אביב - מרכז",
        address: "דיזנגוף 123, תל אביב",
        region: "מרכז",
      },
      {
        id: "jlm",
        name: "ירושלים",
        address: "יפו 78, ירושלים",
        region: "ירושלים",
      },
      {
        id: "hfa",
        name: "חיפה",
        address: "שדרות בן גוריון 90, חיפה",
        region: "צפון",
      },
      {
        id: "bsh",
        name: "באר שבע",
        address: "הרצל 56, באר שבע",
        region: "דרום",
      },
    ],
    license: [
      {
        id: "tlv",
        name: "תל אביב",
        address: "דרך פתח תקווה 45, תל אביב",
        region: "מרכז",
      },
      {
        id: "jlm",
        name: "ירושלים",
        address: "יפו 120, ירושלים",
        region: "ירושלים",
      },
      { id: "hfa", name: "חיפה", address: "העצמאות 80, חיפה", region: "צפון" },
    ],
    bituach: [
      {
        id: "tlv",
        name: "תל אביב",
        address: "אלנבי 45, תל אביב",
        region: "מרכז",
      },
      {
        id: "jlm",
        name: "ירושלים",
        address: "יפו 30, ירושלים",
        region: "ירושלים",
      },
      { id: "hfa", name: "חיפה", address: "הנביאים 22, חיפה", region: "צפון" },
    ],
    tax: [
      {
        id: "tlv",
        name: "תל אביב",
        address: "דרך מנחם בגין 125, תל אביב",
        region: "מרכז",
      },
      {
        id: "jlm",
        name: "ירושלים",
        address: "כנפי נשרים 5, ירושלים",
        region: "ירושלים",
      },
      { id: "hfa", name: "חיפה", address: "פל-ים 15, חיפה", region: "צפון" },
    ],
  };

  const handleServiceChange = useCallback(
    (value: string) => {
      setSelectedService(value);
      setSelectedBranches([]);

      const serviceObj = services.find((s) => s.id === value);
      if (serviceObj) {
        onServiceSelected(serviceObj as ServiceOption);
      }
    },
    [onServiceSelected],
  );

  const handleBranchToggle = useCallback(
    (branchId: string) => {
      setSelectedBranches((prev) => {
        let updatedBranches;
        if (prev.includes(branchId)) {
          updatedBranches = prev.filter((id) => id !== branchId);
        } else {
          updatedBranches = [...prev, branchId];
        }

        if (
          selectedService &&
          branches[selectedService as keyof typeof branches]
        ) {
          const selectedBranchObjects = branches[
            selectedService as keyof typeof branches
          ].filter((branch) =>
            updatedBranches.includes(branch.id),
          ) as BranchOption[];

          onBranchesSelected(selectedBranchObjects);
        }

        return updatedBranches;
      });
    },
    [selectedService, onBranchesSelected],
  );

  const handleNextClick = useCallback(() => {
    if (selectedService && selectedBranches.length > 0) {
      onNext();
    }
  }, [selectedService, selectedBranches, onNext]);

  return (
    <div className="space-y-6 bg-white p-4 rounded-lg">
      <div>
        <h3 className="text-lg font-medium mb-3">בחר שירות</h3>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selectedService === service.id ? "border-primary ring-2 ring-primary/20" : ""}`}
              onClick={() => handleServiceChange(service.id)}
            >
              <CardContent className="flex items-center p-4">
                <div className="text-4xl ml-4">{service.icon}</div>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedService &&
        branches[selectedService as keyof typeof branches] && (
          <div>
            <h3 className="text-lg font-medium mb-3">בחר סניפים</h3>
            <div className="space-y-2">
              {branches[selectedService as keyof typeof branches].map(
                (branch) => (
                  <div
                    key={branch.id}
                    className={`flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted ${selectedBranches.includes(branch.id) ? "bg-primary/5 border-primary" : ""}`}
                    onClick={() => handleBranchToggle(branch.id)}
                  >
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {branch.address}
                      </div>
                    </div>
                    <div className="text-sm bg-muted px-2 py-1 rounded">
                      {branch.region}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

      {selectedService && selectedBranches.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleNextClick}>המשך</Button>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
