import { differenceInCalendarDays, parseISO, format } from "date-fns";
import { uk } from "date-fns/locale";

import Container from "@/components/Container";
import BookingFilters from "@/components/Rooms/BookingFilters";
import RoomCard from "@/components/Rooms/RoomCard";
import { roomsQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity";
import { Room } from "@/types/sanity";

function getOverlap(room: Room, start: Date, end: Date) {
  const ranges = room.room_unavailable_ranges ?? [];

  for (const r of ranges) {
    const f = parseISO(r.from);
    const t = parseISO(r.to);

    if (t > start && f < end) return { from: f, to: t };
  }

  return null;
}

export default async function RoomsPage(props: {
  searchParams?: Promise<Record<string, string>>;
}) {
  const query = await props.searchParams;
  const { checkIn, checkOut } = query ?? {};
  const start = checkIn ? parseISO(checkIn) : null;
  const end = checkOut ? parseISO(checkOut) : null;
  const nights =
    start && end ? Math.max(1, differenceInCalendarDays(end, start)) : 1;

  const rooms: Room[] = await sanityClient.fetch(roomsQuery);

  return (
    <Container className="mt-[64px] py-8 md:py-16 flex flex-col gap-8 min-h-[85dvh]">
      <BookingFilters />

      {rooms.map((room) => {
        let isFree = true;
        let tooltip = "";

        if (start && end) {
          const overlap = getOverlap(room, start, end);

          if (overlap) {
            isFree = false;
            tooltip = `Зайнятий з ${format(overlap.from, "dd MMM yyyy", { locale: uk })}
                       по ${format(overlap.to, "dd MMM yyyy", { locale: uk })}.
                       Доступний з ${format(overlap.to, "dd MMM yyyy", { locale: uk })}`;
          }
        }

        return (
          <RoomCard
            key={room._id}
            isFree={isFree}
            nights={nights}
            room={room}
            tooltip={tooltip}
          />
        );
      })}
    </Container>
  );
}
