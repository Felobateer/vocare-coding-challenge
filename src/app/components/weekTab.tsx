"use client";

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
              return (
                <div
                  key={`${dayIndex}-${hourIndex}`}
                  className={clsx(
                    "border border-gray-200 cursor-pointer",
                    isSelected ? "bg-blue-500" : "hover:bg-blue-100",
                  )}
                  style={{ height: "80px" }}
                  onClick={() =>
                    setSelected({ day: dayIndex, hour: hourIndex })
                  }
                ></div>
              );
            })}
          </>
        ))}
        <WeekhourPointer />
      </div>
    </div>
  );
}
