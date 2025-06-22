import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ListTab() {
  let date = new Date();
  let today =
    date.getDate() +
    "." +
    (date.getMonth() + 1 < 10 ? "0" : "") +
    (date.getMonth() + 1) +
    "." +
    date.getFullYear();
  return (
    <>
      <p className="text-center text-gray-600 font-medium mt-10 h-16">
        Termine vor dem {today} laden
      </p>
      <Card className="w-3/4 h-full mx-auto"></Card>

      <p className="text-center text-gray-600 font-medium mt-10 h-16">
        Keine weiteren Termine gefunden
      </p>
    </>
  );
}
