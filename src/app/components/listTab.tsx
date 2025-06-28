import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentResponse } from "@/app/api/appointments/interface";

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

      <div className="flex flex-row justify-between w-3/4 mx-auto px-4 mb-4">
        <p className="text-start text-black font-bold text-xl">{resDate}</p>
        {today === resDate ? (
          <label className="text-green-800 bg-green-300 rounded-xl px-2 py-1">
            Heute
          </label>
        ) : null}
      </div>

      {meetings.length > 0 ? (
        meetings.map((meeting, idx) => (
          <Card className="w-3/4 h-full mx-auto mb-4" key={meeting.id ?? idx}>
            <CardHeader>
              <CardTitle>{meeting.title || "Termin"}</CardTitle>
              {meeting.description && (
                <CardDescription>{meeting.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {meeting.details || "Keine weiteren Details verfügbar."}
              </p>
              {/* Example: <WeekhourPointer time={meeting.time} /> */}
            </CardContent>
            <CardFooter>
              <span className="text-sm text-gray-400">
                {meeting.date
                  ? new Date(meeting.date).toLocaleString("de-DE")
                  : ""}
              </span>
            </CardFooter>
          </Card>
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
