import Container from "@/components/Container";
import RoomCard from "@/components/Rooms/RoomCard";
import { sanity } from "@/lib/sanity";
import { roomsQuery } from "@/lib/queries";
import { Room } from "@/types/sanity";

// ISR / перегенерація кожні 60 сек.
export const revalidate = 60;

export default async function RoomsPage() {
  const rooms: Room[] = await sanity.fetch(roomsQuery);

  return (
    <Container className="py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </Container>
  );
}
