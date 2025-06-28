import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function ModalForm() {
  const addAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(formData.entries());

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add");

      toast("Termin erfolgreich hinzugefügt");
    } catch (err) {
      console.error("Error adding appointment:", err);
      toast("Termin konnte nicht hinzugefügt werden");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Neuer Termin</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[350px] max-w-[90vw] w-[400px]">
        <DialogHeader>
          <DialogTitle>Neue Termin</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-3.5" onSubmit={addAppointment}>
          <div className="mb-4">
            <Label htmlFor="title" className="mb-2">
              Titel
            </Label>
            <Input name="title" id="title" type="text" className="mt-1" />
          </div>
          <div className="mb-4">
            <Label htmlFor="notes" className="mb-2">
              Notizen
            </Label>
            <Input name="note" id="notes" type="text" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="location" className="mb-2">
              Ort
            </Label>
            <Input name="location" id="location" type="text" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="start" className="mb-2">
              Start
            </Label>
            <Input
              name="start"
              id="start"
              type="datetime-local"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="end" className="mb-2">
              Ende
            </Label>
            <Input name="end" id="end" type="datetime-local" className="mt-1" />
          </div>
          <Button type="submit" className="w-full">
            Einreichen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
