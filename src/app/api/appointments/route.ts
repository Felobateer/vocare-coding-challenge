import {
  getAppointments,
  createAppointment,
  updateAppointment,
} from "./controller";
import { NextResponse, NextRequest } from "next/server";

// GET all appointments
export async function GET() {
  try {
    const data = await getAppointments();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

// POST a new appointment
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await createAppointment(body);
    return NextResponse.json(created);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

// PUT to update an appointment
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateAppointment(body);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
