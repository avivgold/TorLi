"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, Search } from "lucide-react";
import { Badge } from "./ui/badge";

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
  const [selectedService, setSelectedService] = useState<ServiceOption | null>(
    null,
  );
  const [selectedBranches, setSelectedBranches] = useState<BranchOption[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for services
  const services: ServiceOption[] = [
    {
      id: "passport",
      name: "Passport & ID",
      icon: "🛂",
      description: "Passport renewals and ID card services",
    },
    {
      id: "drivers-license",
      name: "Driver's License",
      icon: "🚗",
      description: "License renewals and driving tests",
    },
    {
      id: "national-insurance",
      name: "National Insurance",
      icon: "🏥",
      description: "Bituach Leumi services and claims",
    },
    {
      id: "tax-authority",
      name: "Tax Authority",
      icon: "📊",
      description: "Tax filing and consultations",
    },
  ];

  // Mock data for branches
  const branches: BranchOption[] = [
    {
      id: "tlv-1",
      name: "Tel Aviv Central",
      address: "123 Dizengoff St, Tel Aviv",
      region: "Tel Aviv",
    },
    {
      id: "tlv-2",
      name: "Tel Aviv South",
      address: "45 Allenby St, Tel Aviv",
      region: "Tel Aviv",
    },
    {
      id: "jlm-1",
      name: "Jerusalem Central",
      address: "78 Jaffa St, Jerusalem",
      region: "Jerusalem",
    },
    {
      id: "jlm-2",
      name: "Jerusalem East",
      address: "23 Salah ad-Din St, Jerusalem",
      region: "Jerusalem",
    },
    {
      id: "hfa-1",
      name: "Haifa Main",
      address: "90 Ben Gurion Blvd, Haifa",
      region: "Haifa",
    },
    {
      id: "bsh-1",
      name: "Beer Sheva Central",
      address: "56 Herzl St, Beer Sheva",
      region: "South",
    },
    {
      id: "nth-1",
      name: "Tiberias Office",
      address: "12 Galilee St, Tiberias",
      region: "North",
    },
  ];

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.region.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleServiceSelect = (service: ServiceOption) => {
    setSelectedService(service);
    onServiceSelected(service);
  };

  const handleBranchToggle = (branch: BranchOption) => {
    if (selectedBranches.some((b) => b.id === branch.id)) {
      const updatedBranches = selectedBranches.filter(
        (b) => b.id !== branch.id,
      );
      setSelectedBranches(updatedBranches);
      onBranchesSelected(updatedBranches);
    } else {
      const updatedBranches = [...selectedBranches, branch];
      setSelectedBranches(updatedBranches);
      onBranchesSelected(updatedBranches);
    }
  };

  const handleNext = () => {
    if (selectedService && selectedBranches.length > 0) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-background p-4 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select a Service</h2>
        <p className="text-muted-foreground mb-4">
          Choose the government service you need an appointment for
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all hover:shadow-md ${selectedService?.id === service.id ? "border-primary ring-2 ring-primary/20" : ""}`}
              onClick={() => handleServiceSelect(service)}
            >
              <CardContent className="flex items-center p-4">
                <div className="text-4xl mr-4">{service.icon}</div>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                {selectedService?.id === service.id && (
                  <Check className="ml-auto text-primary" size={20} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Select Branch Locations</h2>
          <p className="text-muted-foreground mb-4">
            Choose one or more branch locations you prefer
          </p>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by city, region or address..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="border rounded-md divide-y">
            {filteredBranches.length > 0 ? (
              filteredBranches.map((branch) => {
                const isSelected = selectedBranches.some(
                  (b) => b.id === branch.id,
                );
                return (
                  <div
                    key={branch.id}
                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-muted ${isSelected ? "bg-primary/5" : ""}`}
                    onClick={() => handleBranchToggle(branch)}
                  >
                    <div>
                      <div className="font-medium">{branch.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {branch.address}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{branch.region}</Badge>
                      {isSelected && (
                        <Check className="text-primary" size={18} />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No branches found matching your search
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {selectedBranches.length} branch
              {selectedBranches.length !== 1 ? "es" : ""} selected
            </div>
            <Button
              onClick={handleNext}
              disabled={selectedBranches.length === 0}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSelector;
