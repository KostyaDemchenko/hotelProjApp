"use client";

import Head from "next/head";

import HeroSection from "@/components/Home/HeroSection";
import BookingSection from "@/components/Home/BookingSection";
import InfoBlocks from "@/components/Home/InfoBlocks";

export default function Home() {
  return (
    <>
      <Head>
        <title>Онлайн-бронювання готелів — Ваш ідеальний відпочинок</title>
        <meta
          content="Забронюйте номер у нашому готелі швидко та зручно: виберіть дати, кількість гостей та насолоджуйтеся комфортом і високоякісним сервісом."
          name="description"
        />
      </Head>

      <HeroSection />
      <BookingSection />
      <InfoBlocks />
    </>
  );
}
