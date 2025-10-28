"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface RoomGalleryProps {
  photoUrls: string[];
  roomName: string;
}

export default function RoomGallery({ photoUrls, roomName }: RoomGalleryProps) {
  return (
    <div className="w-full">
      <Swiper
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden"
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
      >
        {photoUrls.length ? (
          photoUrls.map((url, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <Image fill alt={roomName} className="object-cover" src={url} />
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
  );
}
