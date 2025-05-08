"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Calendar, Lock } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Processing payment with:", {
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
    });
    // Here you would integrate with Stripe
    router.push("/payment/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            תשלום
          </CardTitle>
          <CardDescription className="text-center">
            השלם את התשלום כדי לאשר את התור שלך
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 mb-6 bg-muted/30">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium text-right">שירות:</div>
              <div className="text-left">חידוש דרכון</div>
              <div className="font-medium text-right">סניף:</div>
              <div className="text-left">תל אביב - מרכז</div>
              <div className="font-medium text-right">תאריך:</div>
              <div className="text-left">15 ביוני 2023</div>
              <div className="font-medium text-right">שעה:</div>
              <div className="text-left">10:30</div>
              <div className="font-medium text-right">סכום לתשלום:</div>
              <div className="text-left font-bold">₪29</div>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardholderName">שם בעל הכרטיס</Label>
              <Input
                id="cardholderName"
                placeholder="ישראל ישראלי"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">מספר כרטיס</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">תוקף</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="pl-10"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              שלם ₪29
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>התשלום מאובטח ומוצפן באמצעות Stripe</p>
        </CardFooter>
      </Card>
    </div>
  );
}
