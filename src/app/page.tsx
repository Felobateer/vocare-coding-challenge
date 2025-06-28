"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Navbar from "./components/navbar";
import ListTab from "./components/listTab";
import WeekTab from "./components/weekTab";
import MonthTab from "./components/monthTab";

export default function ScreenTabs() {
  const [tab, setTab] = useState("list");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch("/api/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="list">
          <ListTab meetings={appointments} />
        </TabsContent>
        <TabsContent value="week">
          <WeekTab meetings={appointments} />
        </TabsContent>
        <TabsContent value="month">
          <MonthTab meetings={appointments} />
        </TabsContent>
      </Tabs>
    </>
  );
}
