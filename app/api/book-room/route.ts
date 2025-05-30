// app/api/book-room/route.ts
import { NextResponse } from "next/server";
import { parseISO } from "date-fns";

import { sanityClient } from "@/lib/sanity";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { roomId, from, to, payload } = body;

    console.log("API received:", { roomId, from, to, payload });

    if (!roomId || !from || !to) {
      return NextResponse.json({ error: "Bad data" }, { status: 400 });
    }

    /* ①  перевіряємо зайнятість */
    console.log("Checking availability for room:", roomId);

    const ranges = (await sanityClient.fetch(
      `*[_type=="room" && _id==$id][0].room_unavailable_ranges[]{from,to}`,
      { id: roomId }
    )) as { from: string; to: string }[] | null;

    console.log("Found ranges:", ranges);

    const overlap =
      ranges?.some((r) => {
        const f = parseISO(r.from);
        const t = parseISO(r.to);
        return t > new Date(from) && f < new Date(to);
      }) ?? false;

    if (overlap) {
      console.log("Room is occupied");
      return NextResponse.json({ overlap: true }, { status: 200 });
    }

    /* ②  створюємо документ booking */
    console.log("Creating booking with payload:", payload);

    const doc = await sanityClient.create({
      _type: "booking",
      ...payload,
      room: { _type: "reference", _ref: roomId },
      status: "pending",
    });

    console.log("Booking created successfully:", doc._id);

    return NextResponse.json({ overlap: false, id: doc._id }, { status: 201 });
  } catch (e) {
    console.error("API Error:", e);

    // Более детальная информация об ошибке
    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: "Server error",
          details: e.message,
          stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}
