import { Button } from "@/components/ui/button";
import DatePicker from "./datePicker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavbarProps {
  tab: string;
  setTab: (tab: string) => void;
}

export default function Navbar({ tab, setTab }: NavbarProps) {
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
      <Button>Neuer Termin</Button>
    </nav>
  );
}
