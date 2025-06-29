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
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/appointments", fetcher);

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <p className="text-red-500 text-center">Fehler beim Laden.</p>
      ) : Array.isArray(data) ? (
        <>
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
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
