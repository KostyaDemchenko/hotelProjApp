"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { urlFor } from "@/lib/sanity";
import { Room } from "@/types/sanity";

interface Props {
  room: Room;
  nights: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function RoomModal({ room, nights, isOpen, onClose }: Props) {
  const photos = room.room_photos ?? [];
  const total = room.room_price * nights;

  const base = typeof window === "undefined" ? "" : window.location.search;
  const bookUrl = `/contacts${base}&room=${room._id}&price=${total}`;

  return (
    <Modal
      backdrop="blur"
      className="max-w-[1300px] w-full max-h-[85vh]"
      isOpen={isOpen}
      size="3xl"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex items-start gap-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{room.room_name}</h2>
            <p className="text-yellow-600 text-sm">
              {total}₴ / {nights} дн.
            </p>
          </div>
        </ModalHeader>

        <ModalBody className="flex flex-col md:flex-row gap-6 height-full overflow-y-scroll no-scrollbar">
          {/* ► ліворуч Swiper (завжди) */}
          <div className="w-full md:w-1/2">
            <Swiper
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-[260px] md:h-[320px] rounded-md overflow-hidden"
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
            >
              {photos.length ? (
                photos.map((p) => (
                  <SwiperSlide key={p._key} className="relative w-full h-full">
                    <Image
                      fill
                      alt={room.room_name}
                      className="object-cover"
                      src={urlFor(p).width(900).height(600).url()}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide className="relative w-full h-full">
                  <Image
                    fill
                    alt="placeholder"
                    className="object-cover"
                    src="/placeholder.jpg"
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>

          <div className="flex-1 flex flex-col gap-4 text-sm overflow-y-scroll no-scrollbar">
            <p className="whitespace-pre-wrap">{room.room_description}</p>

            {room.room_additions?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {room.room_additions.map((add) => (
                  <span
                    key={add._key}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100"
                  >
                    <i className={`${add.icon} text-yellow-600`} />
                    {add.title}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <span>
                Площа: <b>{room.room_size} м²</b>
              </span>
              <span>
                Ліжка: <b>{room.room_beds}</b>
              </span>
              <span>
                До <b>{room.room_max_people}</b> гостей
              </span>
              <span>
                До <b>{room.room_max_child}</b> діте1
              </span>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onPress={onClose}>
            Закрити
          </Button>
          <Button color="primary" onPress={onClose}>
            <Link href={bookUrl}>Забронювати</Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
