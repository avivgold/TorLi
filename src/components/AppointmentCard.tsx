"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type AppointmentStatus =
  | "pending"
  | "found"
  | "confirmed"
  | "paid"
  | "cancelled";

interface AppointmentCardProps {
  id?: string;
  serviceType?: string;
  branch?: string;
  date?: Date;
  time?: string;
  status?: AppointmentStatus;
}

const AppointmentCard = ({
  id = "123456",
  serviceType = "חידוש דרכון",
  branch = "משרד תל אביב",
  date = new Date(),
  time = "10:30",
  status = "pending",
}: AppointmentCardProps) => {
  // Move event handlers inside the client component
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Appointment confirmed", id);
    // Add your confirmation logic here
  };

  const handleCancel = () => {
    console.log("Appointment cancelled", id);
    // Add your cancellation logic here
  };

  const handlePay = () => {
    console.log("Processing payment for appointment", id);
    // Add your payment logic here
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "found":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "paid":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case "pending":
        return "בחיפוש";
      case "found":
        return "נמצא תור";
      case "confirmed":
        return "מאושר";
      case "paid":
        return "שולם";
      case "cancelled":
        return "בוטל";
      default:
        return "לא ידוע";
    }
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "found":
        return <AlertCircle className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "paid":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{serviceType}</CardTitle>
          <Badge className={getStatusColor(status)} variant="outline">
            <span className="flex items-center gap-1">
              {getStatusIcon(status)}
              {getStatusText(status)}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{branch}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {formatDate(date)} בשעה {time}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">מזהה תור: {id}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        {status === "found" && (
          <div className="flex gap-2 w-full">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  צפה בפרטים
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>נמצא תור!</DialogTitle>
                  <DialogDescription>
                    מצאנו תור שמתאים לקריטריונים שלך.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">שירות:</div>
                    <div className="text-sm">{serviceType}</div>
                    <div className="text-sm font-medium">מיקום:</div>
                    <div className="text-sm">{branch}</div>
                    <div className="text-sm font-medium">תאריך ושעה:</div>
                    <div className="text-sm">
                      {formatDate(date)} בשעה {time}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleCancel}>
                    ביטול
                  </Button>
                  <Button onClick={handleConfirm}>אישור התור</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className="flex-1" onClick={handleConfirm}>
              אישור
            </Button>
          </div>
        )}

        {status === "confirmed" && (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleCancel}>
              ביטול
            </Button>
            <Button className="flex-1" onClick={handlePay}>
              תשלום ₪29
            </Button>
          </div>
        )}

        {status === "pending" && (
          <Button variant="outline" className="w-full" onClick={handleCancel}>
            ביטול חיפוש
          </Button>
        )}

        {status === "paid" && (
          <div className="w-full text-center py-1 text-sm text-green-600 font-medium">
            התור שלך מאושר ושולם
          </div>
        )}

        {status === "cancelled" && (
          <div className="w-full text-center py-1 text-sm text-red-600 font-medium">
            התור הזה בוטל
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
