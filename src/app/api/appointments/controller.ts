import { supabase } from "./db_handler";
import { AppointmentRequest, AppointmentResponse } from "./interface";

const getAppointments = async () => {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching appointments:", error);
    throw new Error(`Error fetching appointments: ${error.message}`);
  }

  return data;
};

const getAppointmentById = async (id: string) => {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching appointment:", error);
    throw new Error("Failed to fetch appointment");
  }

  return data;
};

const createAppointment = async (appointment: AppointmentRequest) => {
  const { data, error } = await supabase
    .from("appointments")
    .insert([appointment])
    .select("*")
    .single();

  if (error) {
    console.error("Error creating appointment:", error);
    throw new Error("Failed to create appointment");
  }

  return data;
};

const updateAppointment = async (appointment: AppointmentResponse) => {
  const { data, error } = await supabase
    .from("appointments")
    .update(appointment)
    .eq("id", appointment.id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }

  return data;
};

const deleteAppointment = async (id: string) => {
  const { data, error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error deleting appointment:", error);
    throw new Error("Failed to delete appointment");
  }

  return data;
};

export {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
