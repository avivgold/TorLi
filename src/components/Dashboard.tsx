"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, History, RefreshCw } from "lucide-react";
import AppointmentCard from "./AppointmentCard";

interface AppointmentRequest {
  id: string;
  service: string;
  branch: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  status: "pending" | "found" | "confirmed" | "paid" | "completed";
  appointmentDate?: Date;
  appointmentTime?: string;
  createdAt: Date;
}

interface DashboardProps {
  userEmail?: string;
  userName?: string;
  appointments?: AppointmentRequest[];
}

export default function Dashboard({
  userEmail = "user@example.com",
  userName = "משתמש",
  appointments = [
    {
      id: "1",
      service: "חידוש דרכון",
      branch: "תל אביב - מרכז",
      dateRange: {
        from: new Date(2023, 5, 1),
        to: new Date(2023, 6, 30),
      },
      status: "pending",
      createdAt: new Date(2023, 4, 15),
    },
    {
      id: "2",
      service: "רישיון נהיגה",
      branch: "ירושלים",
      dateRange: {
        from: new Date(2023, 5, 10),
        to: new Date(2023, 6, 20),
      },
      status: "found",
      appointmentDate: new Date(2023, 5, 25),
      appointmentTime: "10:15",
      createdAt: new Date(2023, 4, 20),
    },
    {
      id: "3",
      service: "ביטוח לאומי",
      branch: "חיפה",
      dateRange: {
        from: new Date(2023, 4, 1),
        to: new Date(2023, 5, 30),
      },
      status: "paid",
      appointmentDate: new Date(2023, 5, 12),
      appointmentTime: "14:30",
      createdAt: new Date(2023, 3, 28),
    },
  ] as AppointmentRequest[],
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState("active");

  const activeAppointments = appointments.filter((app) =>
    ["pending", "found", "confirmed"].includes(app.status),
  );

  const completedAppointments = appointments.filter((app) =>
    ["paid", "completed"].includes(app.status),
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">לוח בקרה</h1>
          <p className="text-muted-foreground">ברוך הבא, {userName}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 ml-2" />
            התראות
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 ml-2" />
            הגדרות
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">בקשות פעילות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">תורים בחיפוש</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">תורים שנמצאו</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter((app) => app.status === "found").length}
            </div>
            <p className="text-xs text-muted-foreground">ממתינים לאישור שלך</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              הזמנות שהושלמו
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedAppointments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              תורים שהוזמנו בהצלחה
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="active" onClick={() => setActiveTab("active")}>
              בקשות פעילות
            </TabsTrigger>
            <TabsTrigger
              value="history"
              onClick={() => setActiveTab("history")}
            >
              היסטוריית הזמנות
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 ml-2" />
            רענון
          </Button>
        </div>

        <TabsContent value="active" className="space-y-4">
          {activeAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  serviceType={appointment.service}
                  branch={appointment.branch}
                  date={appointment.appointmentDate || new Date()}
                  time={appointment.appointmentTime || ""}
                  status={
                    appointment.status === "found"
                      ? "found"
                      : appointment.status === "confirmed"
                        ? "confirmed"
                        : "pending"
                  }
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <History className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">אין בקשות פעילות</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                  אין לך בקשות פעילות לתורים. צור בקשה חדשה כדי להתחיל בחיפוש
                  תורים.
                </p>
                <Button>צור בקשה חדשה</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {completedAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  serviceType={appointment.service}
                  branch={appointment.branch}
                  date={appointment.appointmentDate || new Date()}
                  time={appointment.appointmentTime || ""}
                  status={appointment.status === "paid" ? "paid" : "cancelled"}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <History className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  אין היסטוריית הזמנות
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  טרם השלמת הזמנות. התורים המאושרים והמשולמים שלך יופיעו כאן.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
