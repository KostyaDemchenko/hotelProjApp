"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import { useSearchParams } from "next/navigation";
import { Users, Baby, Bed, Maximize } from "lucide-react";

import { urlFor } from "@/lib/sanity";
import { calculateFinalPrice } from "@/lib/pricing";
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
  const cover = room.room_photos?.[0]
    ? urlFor(room.room_photos[0]).width(500).height(340).url()
    : "/placeholder.jpg";

  const search = useSearchParams();
  const checkIn = search.get("checkIn");
  const checkOut = search.get("checkOut");

  // Рассчитываем цену с учетом сезонности и скидок
  let total = room.room_price * nights; // fallback

  if (checkIn && checkOut) {
    total = calculateFinalPrice(
      room.room_price,
      new Date(checkIn),
      new Date(checkOut),
      nights
    );
  }

  const qs = search.toString() ? `?${search}` : "";
  const roomDetailUrl = `/rooms/${room._id}${qs}`;

  const cardContent = (
    <Card
      className={`flex md:flex-row w-full overflow-hidden transition-transform ${
        isFree
          ? "hover:shadow-lg hover:scale-[1.01] cursor-pointer"
          : "opacity-50 grayscale cursor-not-allowed"
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

        <p className="text-muted-foreground text-sm line-clamp-2 md:line-clamp-2">
          {room.room_description}
        </p>

        {/* Информация о номере */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{room.room_size} м²</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>
              {room.room_beds} {room.room_beds === 1 ? "кровать" : "кровати"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>до {room.room_max_people} гостей</span>
          </div>
          {room.room_max_child > 0 && (
            <div className="flex items-center gap-1">
              <Baby className="w-4 h-4" />
              <span>до {room.room_max_child} детей</span>
            </div>
          )}
        </div>

        {/* Удобства */}
        {room.room_additions && room.room_additions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {room.room_additions.slice(0, 4).map((addition) => (
              <span
                key={addition._key}
                className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1"
              >
                <i className={`${addition.icon}`} />
                <span>{addition.title}</span>
              </span>
            ))}
            {room.room_additions.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{room.room_additions.length - 4} еще
              </span>
            )}
          </div>
        )}

        <div className="mt-auto text-yellow-600 font-bold">
          {total}₴ / {nights} дн.
        </div>

        {isFree && (
          <div className="mt-2">
            <Button color="primary">
              <span>Детальніше</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );

  if (!isFree) {
    return <Tooltip content={tooltip}>{cardContent}</Tooltip>;
  }

  return <Link href={roomDetailUrl}>{cardContent}</Link>;
}
