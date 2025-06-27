import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WeekhourPointer from "./weekhourPointer";

export default function ListTab() {
  let date = new Date();
  let today =
    date.getDate() +
    "." +
    (date.getMonth() + 1 < 10 ? "0" : "") +
    (date.getMonth() + 1) +
    "." +
    date.getFullYear();
  let resDate = today;
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
        ) : (
          ""
        )}
      </div>
      <Card className="w-3/4 h-full mx-auto">
        <CardHeader>
          <CardTitle>Termin 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Details zum Termin 1...</p>
          <p className="text-gray-500">Details zum Termin 1...</p>
          <p className="text-gray-500">Details zum Termin 1...</p>
        </CardContent>
      </Card>

      <p className="text-center text-gray-600 font-medium mt-10 h-16">
        Keine weiteren Termine gefunden
      </p>
    </>
  );
}
