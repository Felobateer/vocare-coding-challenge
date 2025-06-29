import { NextRequest, NextResponse } from "next/server";
import { getAppointmentById, deleteAppointment } from "../controller";
import { error } from "console";

// GET an appointment by id (from query string)
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const data = await getAppointmentById(id);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}

// DELETE an appointment by id (from query string)
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const deleted = await deleteAppointment(id);
    return NextResponse.json(deleted);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 },
    );
  }
}
