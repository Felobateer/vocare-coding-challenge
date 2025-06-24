import { pgTable, uuid, timestamp, text, numeric } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  firstname: text("firstname"),
  lastname: text("lastname"),
  birth_date: timestamp("birth_date", { withTimezone: true }),
  care_level: numeric("care_level"),
  pronoun: text("pronoun"),
  email: text("email"),
  active: text("active"),
  active_since: timestamp("active_since", { withTimezone: true }),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
  label: text("label"),
  description: text("description"),
  color: text("color").default("#00ff00"),
  icon: text("icon"),
});

export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }),
  start: timestamp("start", { withTimezone: true }),
  end: timestamp("end", { withTimezone: true }),
  location: text("location"),
  patient: uuid("patient"),
  attachements: text("attachements").array(), // Assuming array of strings
  category: uuid("category"),
  notes: text("notes"),
  title: text("title"),
});

export const activities = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  created_by: uuid("created_by"),
  appointment: uuid("appointment"),
  type: text("type"),
  content: text("content"),
});

export const appointment_assignee = pgTable("appointment_assignee", {
  id: uuid("id").defaultRandom().primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  appointment: uuid("appointment"),
  user: uuid("user"),
  user_type: text("user_type").default("relatives"),
});
