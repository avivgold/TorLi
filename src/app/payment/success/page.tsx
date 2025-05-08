import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            התשלום הושלם בהצלחה!
          </CardTitle>
          <CardDescription>התור שלך אושר ושולם</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">פרטי התור נשלחו לדוא"ל שלך</p>
            <p className="font-medium">תודה שבחרת בשירות שלנו!</p>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium text-right">שירות:</div>
              <div className="text-left">חידוש דרכון</div>
              <div className="font-medium text-right">סניף:</div>
              <div className="text-left">תל אביב - מרכז</div>
              <div className="font-medium text-right">תאריך:</div>
              <div className="text-left">15 ביוני 2023</div>
              <div className="font-medium text-right">שעה:</div>
              <div className="text-left">10:30</div>
              <div className="font-medium text-right">סכום ששולם:</div>
              <div className="text-left">₪29</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard" className="w-full">
            <Button className="w-full">חזרה ללוח הבקרה</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
