"use client";
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Navbar from "./components/navbar";
import ListTab from "./components/listTab";
import WeekTab from "./components/weekTab";
import MonthTab from "./components/monthTab";

export default function ScreenTabs() {
  const [tab, setTab] = useState("list");

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsContent value="list">
          <ListTab />
        </TabsContent>
        <TabsContent value="week">
          <WeekTab />
        </TabsContent>
        <TabsContent value="month">
          <MonthTab />
        </TabsContent>
      </Tabs>
    </>
  );
}
