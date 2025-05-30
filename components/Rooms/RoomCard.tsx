"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";

import { urlFor } from "@/lib/sanity";
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
  /* ── ціна й картинка ──────────────────────────── */
  const cover = room.room_photos?.[0]
    ? urlFor(room.room_photos[0]).width(500).height(340).url()
    : "/placeholder.jpg";
  const total = room.room_price * nights;

  /* ── формуємо URL /contacts з поточними query ── */
  const qs = typeof window === "undefined" ? "" : window.location.search;
  const delim = qs ? "&" : "?";
  const bookUrl = `/contacts${qs}${delim}room=${room._id}&price=${total}`;

  /* ── сама картка ──────────────────────────────── */
  const card = (
    <Card
      className={`flex md:flex-row w-full overflow-hidden ${
        isFree ? "hover:shadow-lg" : "opacity-50 grayscale cursor-not-allowed"
      }`}
      shadow="sm"
    >
      <Image
        alt={room.room_name}
        className="object-cover h-full w-full md:w-[40%] min-h-[180px]"
        height={220}
        src={cover}
        width={320}
      />

      <div className="flex flex-col gap-2 p-4 w-full md:w-[60%]">
        <h3 className="font-semibold text-lg">{room.room_name}</h3>

        <p className="text-muted-foreground text-sm line-clamp-5 md:line-clamp-3 overflow-y-scroll flex-1">
          {room.room_description}
        </p>

        <div className="mt-auto text-yellow-600 font-bold">
          {total}₴ / {nights} дн.
        </div>

        {isFree && (
          <Link passHref className="mt-2" href={bookUrl}>
            <Button color="primary">
              <span>Забронювати</span>
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );

  return isFree ? card : <Tooltip content={tooltip}>{card}</Tooltip>;
}
