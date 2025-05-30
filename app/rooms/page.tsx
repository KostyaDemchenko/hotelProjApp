import { differenceInCalendarDays, parseISO } from "date-fns";

import Container from "@/components/Container";
import BookingFilters from "@/components/Rooms/BookingFilters";
import RoomCard from "@/components/Rooms/RoomCard";
import { roomsQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity";
import { Room } from "@/types/sanity";

/* тип, що відповідає новому PageProps */
interface RoomsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getOverlap(room: Room, start: Date, end: Date) {
  const ranges = room.room_unavailable_ranges ?? [];

  for (const r of ranges) {
    const f = parseISO(r.from);
    const t = parseISO(r.to);

    if (t > start && f < end) return true;
  }

  return false;
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const qs = (searchParams && (await searchParams)) || {};

  const checkIn = typeof qs.checkIn === "string" ? qs.checkIn : undefined;
  const checkOut = typeof qs.checkOut === "string" ? qs.checkOut : undefined;

  const start = checkIn ? parseISO(checkIn) : null;
  const end = checkOut ? parseISO(checkOut) : null;
  const nights =
    start && end ? Math.max(1, differenceInCalendarDays(end, start)) : 1;

  const rooms: Room[] = await sanityClient.fetch(roomsQuery);

  return (
    <Container className="mt-[64px] py-16 flex flex-col gap-8 min-h-[85dvh]">
      <BookingFilters />

      {rooms.map((room) => {
        const busy = start && end ? getOverlap(room, start, end) : false;

        return (
          <RoomCard
            key={room._id}
            isFree={!busy}
            nights={nights}
            room={room}
            tooltip={busy ? "Номер зайнятий у вибрані дати" : ""}
          />
        );
      })}
    </Container>
  );
}
