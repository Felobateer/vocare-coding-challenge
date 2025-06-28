import { randomUUID } from "crypto";
import { AppointmentRequest, AppointmentResponse } from "./interface";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const normalizeAppointment = (a: AppointmentRequest | AppointmentResponse) => ({
  ...a,
  start: new Date(a.start),
  end: new Date(a.end),
  updated_at: new Date(),
});

// Get all appointments
const getAppointments = async () => {
  return await prisma.appointments.findMany();
};

// Get appointment by ID
const getAppointmentById = async (id: string) => {
  const appointment = await prisma.appointments.findUnique({ where: { id } });
  if (!appointment) throw new Error("Appointment not found");
  return appointment;
};

// Create new appointment
const createAppointment = async (appointment: AppointmentRequest) => {
  return await prisma.appointments.create({
    data: {
      ...normalizeAppointment(appointment),
      id: randomUUID(),
      created_at: new Date(),
    },
  });
};

// Update appointment
const updateAppointment = async (appointment: AppointmentResponse) => {
  return await prisma.appointments.update({
    where: { id: appointment.id },
    data: normalizeAppointment(appointment),
  });
};

// Delete appointment
const deleteAppointment = async (id: string) => {
  return await prisma.appointments.delete({ where: { id } });
};

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
