"use client";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useMemo, useState } from "react";

export default function MonthTab() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun, 1=Mon, ...
  const offset = (firstDay + 6) % 7; // Make Monday = 0

  const weeks = useMemo(() => {
    const grid = [];
    let day = 1 - offset;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (day > 0 && day <= daysInMonth) {
          week.push(day);
        } else {
          week.push(null);
        }
        day++;
      }
      grid.push(week);
    }

    return grid;
  }, [currentMonth, currentYear]);

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [selected, setSelected] = useState<any>("test");
  return (
    <section className="flex flex-row h-full">
      <div className="w-full h-screen p-4 bg-white">
        <div className="grid grid-cols-7 text-center text-lg font-semibold border-b border-gray-300 pb-2">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-300 mt-2 h-[calc(100%-4rem)]">
          {weeks.flat().map((day, i) => {
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <div
                key={i}
                className={`bg-white text-center p-2 h-full border border-gray-200 ${
                  isToday ? "font-bold text-blue-600" : ""
                }`}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </div>
      <div className="hidden md:flex flex-col md:w-1/4 bg-gray-100 p-4">
        <div className="border-t-2 border-b-2 py-2 border-gray-300">
          {selected}
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selected}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Hier sind die Details für den ausgewählten Tag.
            </p>
            <p className="text-gray-500">
              Hier sind die Details für den ausgewählten Tag.
              <p className="text-gray-500">
                Hier sind die Details für den ausgewählten Tag.
              </p>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
