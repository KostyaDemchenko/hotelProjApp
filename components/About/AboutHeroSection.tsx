"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

import Container from "@/components/Container";
import imgObj from "@/public/images/utils"; // restorant1–5 вже імпортовані
import { title } from "@/components/primitives";

const slides = [
  imgObj.about1,
  imgObj.about2,
  imgObj.about3,
  imgObj.about4,
  imgObj.about5,
  imgObj.about6,
  imgObj.about7,
];

export default function RestaurantHeroSection() {
  return (
    <section className="w-full mt-[64px]">
      {/* обгортка з явною висотою і позицією */}
      <div className="relative h-[80vh] md:h-[70vh] w-full">
        <Swiper
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-full"
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
        >
          {slides.map((src) => (
            <SwiperSlide key={src.src} className="relative w-full h-full">
              <Image
                fill
                priority
                alt="Ресторан В.О.Л.Я."
                className="object-cover"
                src={src}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-black/50" />

        <Container className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-center gap-[35px] md:gap-[90px]">
          <h1
            className={title({
              color: "yellow",
              size: "2xl",
              fullWidth: true,
            })}
          >
            Про нас
          </h1>
        </Container>
      </div>
    </section>
  );
}
