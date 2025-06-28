"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import clsx from "clsx";
import WeekhourPointer from "./weekhourPointer";
import { AppointmentResponse } from "@/app/api/appointments/interface";

interface WeekTabProps {
  meetings: AppointmentResponse[];
}

export default function WeekTab({ meetings }: WeekTabProps) {
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  });

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const [selected, setSelected] = useState<{
    day: number;
    hour: number;
  } | null>(null);

  return (
    <div className="relative overflow-auto h-[90vh] m-2">
      {/* Header row */}
      <div
        className="grid sticky top-0 z-10 bg-white"
        style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}
      >
        <div></div>
        {daysOfWeek.map((day, i) => (
          <div
            key={i}
            className="text-center font-semibold py-2 border border-gray-200"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}
      >
        {hours.map((hour, hourIndex) => (
          <>
            {/* Hour label */}
            <div
              key={`hour-${hourIndex}`}
              className="border border-gray-200 text-sm text-right pr-2 pt-1 sticky left-0 bg-white z-10"
              style={{ height: "80px" }}
            >
              {hour}
            </div>

            {/* Grid row for each hour across 7 days */}
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const isSelected =
                selected?.day === dayIndex && selected?.hour === hourIndex;

              const currentSlot = new Date();
              currentSlot.setDate(
                currentSlot.getDate() - currentSlot.getDay() + dayIndex,
              );
              currentSlot.setHours(hourIndex, 0, 0, 0);

              const startOfWeek = new Date();
              startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
              startOfWeek.setHours(0, 0, 0, 0);

              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(endOfWeek.getDate() + 7);

              const meetingInSlot = meetings.find((meeting) => {
                const start = new Date(meeting.start);
                return (
                  start >= startOfWeek &&
                  start < endOfWeek &&
                  start.getDay() === currentSlot.getDay() &&
                  start.getHours() === currentSlot.getHours()
                );
              });

              return (
                <div
                  key={`${dayIndex}-${hourIndex}`}
                  className={clsx(
                    "border border-gray-200 relative",
                    isSelected ? "bg-blue-500" : "hover:bg-blue-100",
                  )}
                  style={{ height: "80px" }}
                  onClick={() =>
                    setSelected({ day: dayIndex, hour: hourIndex })
                  }
                >
                  {meetingInSlot && (
                    <div
                      className="absolute top-0 left-0 right-0"
                      style={{
                        height: `${
                          ((new Date(meetingInSlot.end).getTime() -
                            new Date(meetingInSlot.start).getTime()) /
                            3600000) *
                          80
                        }px`,
                        zIndex: 20,
                      }}
                    >
                      <Card className="w-full h-full">
                        <CardHeader>
                          <CardTitle>
                            {meetingInSlot.title || "Termin"}
                          </CardTitle>
                          {meetingInSlot.notes && (
                            <CardDescription>
                              {meetingInSlot.notes}
                            </CardDescription>
                          )}
                        </CardHeader>
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ))}
        <WeekhourPointer />
      </div>
    </div>
  );
}
