import { Button } from "@/components/ui/button";
import DatePicker from "./datePicker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavbarProps {
  tab: string;
  setTab: (tab: string) => void;
}

export default function Navbar({ tab, setTab }: NavbarProps) {
  const requestAppointments = async () => {
    const res = await fetch("api/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <nav className="flex flex-row mx-6 h-16 items-center justify-between">
      <DatePicker />
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list" onClick={() => setTab("list")}>
            Liste
          </TabsTrigger>
          <TabsTrigger value="week" onClick={() => setTab("week")}>
            Woche
          </TabsTrigger>
          <TabsTrigger value="month" onClick={() => setTab("month")}>
            Monat
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button variant="outline">Termine filtern</Button>
      <Button onClick={requestAppointments}>Neuer Termin</Button>
    </nav>
  );
}
