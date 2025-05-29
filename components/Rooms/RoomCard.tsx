"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Room } from "@/types/sanity";

interface Props {
  room: Room;
}

export default function RoomCard({ room }: Props) {
  const photo = room.room_photos?.length
    ? urlFor(room.room_photos[0]).width(600).height(400).url()
    : "/placeholder.jpg";

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <Image
        src={photo}
        alt={room.room_name}
        width={600}
        height={400}
        className="object-cover w-full h-[200px]"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{room.room_name}</h3>
        <p className="text-gray-600 line-clamp-2">{room.room_description}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-yellow-600 font-bold">
            {room.room_price}₴ / ніч
          </span>
          <span className="text-sm text-gray-500">
            {room.room_size} м² · {room.room_beds} ліж.
          </span>
        </div>
      </div>
    </div>
  );
}
