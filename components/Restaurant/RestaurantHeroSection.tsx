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
  imgObj.restorant1,
  imgObj.restorant2,
  imgObj.restorant3,
  imgObj.restorant4,
  imgObj.restorant5,
];

export default function RestaurantHeroSection() {
  return (
    <section className="w-full mt-[64px]">
      {/* обгортка з явною висотою і позицією */}
      <div className="relative h-[80vh] md:h-[70vh] w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {slides.map((src) => (
            <SwiperSlide
              key={src.src}
              className="relative w-full h-full" // <-- тут критично!
            >
              <Image
                src={src}
                alt="Ресторан В.О.Л.Я."
                fill
                priority
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* затемнення */}
        <div className="absolute inset-0 bg-black/50" />

        {/* заголовок поверх слайдів */}
        <Container className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-center gap-[35px] md:gap-[90px]">
          <h1
            className={title({
              color: "yellow",
              size: "2xl",
              fullWidth: true,
            })}
          >
            Ресторан&nbsp;«В.О.Л.Я.»
          </h1>
        </Container>
      </div>
    </section>
  );
}
