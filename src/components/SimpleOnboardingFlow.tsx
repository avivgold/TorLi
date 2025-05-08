"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const SimpleOnboardingFlow = () => {
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!contact) {
      setError("נא להזין אימייל או מספר טלפון");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">התחל עם תור לי</h2>
      <p className="text-muted-foreground mb-6">
        מלא את הטופס הקצר כדי להתחיל לחפש תורים ממשלתיים.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="contact" className="block text-sm font-medium mb-1">
            אימייל או טלפון
          </Label>
          <Input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full"
            placeholder="הכנס את האימייל או מספר הטלפון שלך"
          />
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "מעבד..." : "המשך"}
        </Button>
      </form>
    </div>
  );
};

export default SimpleOnboardingFlow;
