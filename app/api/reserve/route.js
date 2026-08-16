import { NextResponse } from "next/server";
import { appendItem } from "../../../lib/db";

export async function POST(req) {
  try {
    const { customerName, phone, date, time, guests } = await req.json();

    if (!customerName || !phone || !date || !time || !guests) {
      return NextResponse.json({ error: "لطفاً همه‌ی فیلدها رو پر کن." }, { status: 400 });
    }

    const reservation = appendItem("reservations", {
      customerName,
      phone,
      date,
      time,
      guests,
      status: "pending",
    });

    return NextResponse.json({ ok: true, reservation });
  } catch (err) {
    console.error("reserve error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
