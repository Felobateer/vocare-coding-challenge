"use client";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import { AppointmentResponse } from "../api/appointments/interface";
import { Button } from "@/components/ui/button";

interface MonthTabProps {
  meetings: AppointmentResponse[];
}

export default function MonthTab({ meetings }: MonthTabProps) {
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
  const [selected, setSelected] = useState<number | null>(null);
  const [details, setDetails] = useState<AppointmentResponse | null>(null);

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

            // Filter meetings that start on this exact day in the current month
            const meetingsForDay = meetings.filter((meeting) => {
              if (!day) return false;
              const start = new Date(meeting.start);
              return (
                start.getFullYear() === currentYear &&
                start.getMonth() === currentMonth &&
                start.getDate() === day
              );
            });

            return (
              <div
                key={i}
                className={`bg-white text-left p-2 h-full border border-gray-200 overflow-auto cursor-pointer ${
                  isToday ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => setSelected(day)}
              >
                <div className="text-center mb-1">{day || ""}</div>

                {/* Render cards for meetings on this day */}
                {meetingsForDay.map((meeting, idx) => (
                  <Button
                    variant={"outline"}
                    className="h-fit border-0 shadow-white"
                    onClick={() => setDetails(meeting)}
                  >
                    <Card
                      className="mb-2"
                      key={meeting.id ?? idx}
                      onClick={(e) => e.stopPropagation()} // prevent day select toggle
                    >
                      <CardHeader>
                        <CardTitle className="text-sm line-clamp-1">
                          {meeting.title || "Termin"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {meeting.notes || "Keine weiteren Details verfügbar."}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(meeting.start).toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          -{" "}
                          {new Date(meeting.end).toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </CardContent>
                    </Card>
                  </Button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden md:flex flex-col md:w-1/4 bg-gray-100 p-4">
        <div className="border-t-2 border-b-2 py-2 border-gray-300 text-center">
          {details ? (
            <>
              <Card className="w-3/4 h-full mx-auto mb-4">
                <CardHeader>
                  <CardTitle>{details.title || "Termin"}</CardTitle>
                  {details.notes && (
                    <CardDescription>{details.notes}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Start:{" "}
                    {new Date(details.start).toLocaleString("de-DE") ||
                      "Keine weiteren Details verfügbar."}
                  </p>
                  {/* Example: <WeekhourPointer time={meeting.time} /> */}
                </CardContent>
                <CardFooter>
                  <span className="text-sm text-gray-400">
                    Ende:{" "}
                    {new Date(details.end).toLocaleString("de-DE")
                      ? new Date(details.end).toLocaleString("de-DE")
                      : ""}
                  </span>
                </CardFooter>
              </Card>
            </>
          ) : (
            "Kein Tag ausgewählt"
          )}
        </div>
        {/* Optionally render details for selected day here */}
      </div>
    </section>
  );
}
