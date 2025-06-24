import { db } from "./db_config";
import { appointments } from "./db_handler";
import { eq } from "drizzle-orm";
import { AppointmentRequest, AppointmentResponse } from "./interface";
import { randomUUID } from "crypto";

const normalizeAppointment = (a: AppointmentRequest) => ({
  ...a,
  id: randomUUID(),
  created_at: new Date(),
  updated_at: new Date(),
  start: new Date(a.start),
  end: new Date(a.end),
});

// Get all appointments
const getAppointments = async () => {
  const data = await db
    .select({
      id: appointments.id,
      start: appointments.start,
      end: appointments.end,
      location: appointments.location,
      title: appointments.title,
      notes: appointments.notes,
    })
    .from(appointments)
    .orderBy(appointments.start);

  return data;
};

// Get appointment by ID
const getAppointmentById = async (id: string) => {
  const [appointment] = await db
    .select()
    .from(appointments)
    .where(eq(appointments.id, id));

  if (!appointment) throw new Error("Appointment not found");

  return appointment;
};

// Create new appointment
const createAppointment = async (appointment: AppointmentRequest) => {
  const [created] = await db
    .insert(appointments)
    .values(normalizeAppointment(appointment))
    .returning();

  return created;
};

// Update appointment
const updateAppointment = async (appointment: AppointmentResponse) => {
  const [updated] = await db
    .update(appointments)
    .set(normalizeAppointment(appointment))
    .where(eq(appointments.id, appointment.id))
    .returning();

  return updated;
};

// Delete appointment
const deleteAppointment = async (id: string) => {
  const [deleted] = await db
    .delete(appointments)
    .where(eq(appointments.id, id))
    .returning();

  return deleted;
};

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
