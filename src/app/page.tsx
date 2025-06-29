"use client";
import { useState } from "react";
import useSWR from "swr";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Navbar from "./components/navbar";
import ListTab from "./components/listTab";
import WeekTab from "./components/weekTab";
import MonthTab from "./components/monthTab";
import LoadingScreen from "./components/loadingScreen";

export default function ScreenTabs() {
  const [tab, setTab] = useState("list");
  // const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const fetchAppointments = async () => {
  //     const res = await fetch("/api/appointments", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     setAppointments(data);
  //   };

  //   fetchAppointments();
  // }, []);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/appointments", fetcher);

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Tabs value={tab} onValueChange={setTab}>
          <TabsContent value="list">
            <ListTab meetings={data} />
          </TabsContent>
          <TabsContent value="week">
            <WeekTab meetings={data} />
          </TabsContent>
          <TabsContent value="month">
            <MonthTab meetings={data} />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
