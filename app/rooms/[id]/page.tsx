import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { uk } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { notFound } from "next/navigation";

import Container from "@/components/Container";
import RoomGallery from "@/components/Rooms/RoomGallery";
import { roomByIdQuery } from "@/lib/queries";
import { sanityClient, urlFor } from "@/lib/sanity";
import { calculateFinalPrice } from "@/lib/pricing";
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

export default async function RoomDetailPage(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string>>;
}) {
  const params = await props.params;
  const query = await props.searchParams;
  const { id } = params;
  const { checkIn, checkOut } = query ?? {};

  const room: Room | null = await sanityClient.fetch(roomByIdQuery, { id });

  if (!room) {
    notFound();
  }

  const start = checkIn ? parseISO(checkIn) : null;
  const end = checkOut ? parseISO(checkOut) : null;
  const nights =
    start && end ? Math.max(1, differenceInCalendarDays(end, start)) : 1;

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

  // Рассчитываем цену с учетом сезонности и скидок
  let total = room.room_price * nights;

  if (checkIn && checkOut) {
    total = calculateFinalPrice(
      room.room_price,
      new Date(checkIn),
      new Date(checkOut),
      nights
    );
  }

  const photos = room.room_photos ?? [];
  const photoUrls = photos.map((p) => urlFor(p).width(1200).height(800).url());
  const searchParams = new URLSearchParams(query ?? {});
  const qs = searchParams.toString() ? `?${searchParams}` : "";
  const delim = qs ? "&" : "?";
  const bookUrl =
    `/contacts${qs}${delim}room=${room._id}` +
    `&roomName=${encodeURIComponent(room.room_name)}` +
    `&price=${total}`;

  return (
    <Container className="mt-[64px] py-8 md:py-16 min-h-[85dvh]">
      <div className="mb-6">
        <Link href={`/rooms${qs}`}>
          <Button color="secondary" variant="light">
            ← Назад до номерів
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">{room.room_name}</h1>
            <p className="text-yellow-600 text-xl mt-2">
              {total}₴ / {nights} {nights === 1 ? "день" : "дн."}
            </p>
          </div>

          {!isFree && (
            <Card className="bg-red-50 border-red-200 p-4 max-w-md">
              <p className="text-red-600 text-sm">{tooltip}</p>
            </Card>
          )}
        </div>

        {/* Галерея фотографий */}
        <RoomGallery photoUrls={photoUrls} roomName={room.room_name} />

        {/* Описание и характеристики */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Опис номера</h2>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {room.room_description}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Характеристики</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4" shadow="sm">
                  <p className="text-sm text-gray-600">Площа</p>
                  <p className="text-xl font-semibold">{room.room_size} м²</p>
                </Card>
                <Card className="p-4" shadow="sm">
                  <p className="text-sm text-gray-600">Ліжка</p>
                  <p className="text-xl font-semibold">{room.room_beds}</p>
                </Card>
                <Card className="p-4" shadow="sm">
                  <p className="text-sm text-gray-600">Гості</p>
                  <p className="text-xl font-semibold">
                    До {room.room_max_people}
                  </p>
                </Card>
                <Card className="p-4" shadow="sm">
                  <p className="text-sm text-gray-600">Діти</p>
                  <p className="text-xl font-semibold">
                    До {room.room_max_child}
                  </p>
                </Card>
              </div>
            </div>

            {room.room_additions?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Зручності</h3>
                <div className="flex flex-wrap gap-3">
                  {room.room_additions.map((add) => (
                    <Card
                      key={add._key}
                      className="flex items-center gap-2 px-4 py-2"
                      shadow="sm"
                    >
                      <i className={`${add.icon} text-yellow-600`} />
                      <span className="text-sm">{add.title}</span>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Кнопка бронирования */}
        {isFree && (
          <div className="flex justify-center md:justify-end mt-8">
            <Link href={bookUrl}>
              <Button color="primary" size="lg">
                Забронювати номер
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}
