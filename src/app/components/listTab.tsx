import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentResponse } from "@/app/api/appointments/interface";
import { JSX } from "react";

interface ListTabProps {
  meetings: AppointmentResponse[];
}

export default function ListTab({ meetings }: ListTabProps) {
  const date = new Date();
  const today =
    date.getDate() +
    "." +
    (date.getMonth() + 1 < 10 ? "0" : "") +
    (date.getMonth() + 1) +
    "." +
    date.getFullYear();
  const resDate = today;

  return (
    <>
      <p className="text-center text-gray-600 font-medium mt-10 h-16">
        Termine vor dem {today} laden
      </p>
      {meetings.length > 0 ? (
        // Group meetings by date
        Object.entries(
          meetings.reduce<Record<string, AppointmentResponse[]>>(
            (acc, meeting) => {
              const d = new Date(meeting.start);
              const meetingDate = `${d
                .getDate()
                .toString()
                .padStart(2, "0")}.${(d.getMonth() + 1)
                .toString()
                .padStart(2, "0")}.${d.getFullYear()}`;

              if (!acc[meetingDate]) acc[meetingDate] = [];
              acc[meetingDate].push(meeting);
              return acc;
            },
            {},
          ),
        ).map(([meetingDate, dayMeetings], idx) => (
          <div key={meetingDate}>
            <div className="flex flex-row justify-between w-3/4 mx-auto px-4 mb-2 mt-8">
              <p className="text-start text-black font-bold text-xl">
                {meetingDate}
              </p>
              {meetingDate === resDate ? (
                <label className="text-green-800 bg-green-300 rounded-xl px-2 py-1">
                  Heute
                </label>
              ) : null}
            </div>
            {dayMeetings.map((meeting, mIdx) => (
              <Card
                className="w-3/4 h-full mx-auto mb-4"
                key={meeting.id ?? mIdx}
              >
                <CardHeader>
                  <CardTitle>{meeting.title || "Termin"}</CardTitle>
                  {meeting.notes && (
                    <CardDescription>{meeting.notes}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Start:{" "}
                    {new Date(meeting.start).toLocaleString("de-DE") ||
                      "Keine weiteren Details verfügbar."}
                  </p>
                  {/* Example: <WeekhourPointer time={meeting.time} /> */}
                </CardContent>
                <CardFooter>
                  <span className="text-sm text-gray-400">
                    Ende:{" "}
                    {new Date(meeting.end).toLocaleString("de-DE")
                      ? new Date(meeting.end).toLocaleString("de-DE")
                      : ""}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        ))
      ) : (
        <Card className="w-3/4 h-full mx-auto mb-4">
          <CardContent>
            <p className="text-gray-500">Keine Termine vorhanden.</p>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-gray-600 font-medium mt-10 h-16">
        Keine weiteren Termine gefunden
      </p>
    </>
  );
}
