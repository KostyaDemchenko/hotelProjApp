"use client";

import Image from "next/image";

import Container from "@/components/Container";
import imgObj from "@/public/images/utils";
import { title } from "@/components/primitives";
import Stats from "@/components/Home/Stats";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] md:h-[70vh] w-full mt-[64px]">
      <Image
        fill
        priority
        alt="Hero background"
        className="object-cover brightness-[35%]"
        src={imgObj.heroPlaceholder}
      />
      <div className="absolute inset-0 bg-black/50" />
      <Container className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-[50px] ">
        <h1 className={title({ color: "yellow", size: "lg", fullWidth: true })}>
          В.О.Л.Я.
        </h1>
        <Stats />
      </Container>
    </section>
  );
}
