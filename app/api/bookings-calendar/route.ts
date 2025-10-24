import { NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    const totalRooms = await sanityClient.fetch<number>(
      `count(*[_type=="room"])`
    );

    const rooms = await sanityClient.fetch<
      { ranges: { from: string; to: string }[] }[]
    >(
      `*[_type=="room"]{
        "ranges": room_unavailable_ranges[]{from, to}
      }`
    );

    const unavailableRanges = rooms.flatMap((room) => room.ranges || []);

    return NextResponse.json(
      {
        totalRooms,
        unavailableRanges,
      },
      { status: 200 }
    );
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json(
        {
          error: "Server error",
          details: e.message,
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
