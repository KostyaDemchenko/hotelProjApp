"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";

import { urlFor } from "@/lib/sanity";
import RoomModal from "@/components/Rooms/RoomModal";
import { Room } from "@/types/sanity";

interface Props {
  room: Room;
  nights: number;
  isFree: boolean;
  tooltip?: string;
}

export default function RoomCard({
  room,
  nights,
  isFree,
  tooltip = "",
}: Props) {
  const [open, setOpen] = useState(false);

  const cover = room.room_photos?.[0]
    ? urlFor(room.room_photos[0]).width(500).height(340).url()
    : "/placeholder.jpg";

  const total = room.room_price * nights;

  const card = (
    <Card
      className={`flex flex-row w-full overflow-hidden ${
        isFree ? "hover:shadow-lg" : "opacity-50 grayscale cursor-not-allowed"
      }`}
      isPressable={isFree}
      shadow="sm"
      onPress={isFree ? () => setOpen(true) : undefined}
    >
      <Image
        alt={room.room_name}
        className="object-cover h-full w-[40%] min-h-[180px]"
        height={220}
        src={cover}
        width={320}
      />
      <div className="flex flex-col align-start gap-2 p-4 w-[60%]">
        <h3 className="font-semibold text-lg text-left">{room.room_name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 flex-1 text-left">
          {room.room_description}
        </p>
        <div className="mt-auto text-yellow-600 font-bold text-left">
          {total}₴ / {nights} дн.
        </div>
      </div>
    </Card>
  );

  return (
    <>
      {isFree ? card : <Tooltip content={tooltip}>{card}</Tooltip>}
      {isFree && (
        <RoomModal
          isOpen={open}
          nights={nights}
          room={room}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
