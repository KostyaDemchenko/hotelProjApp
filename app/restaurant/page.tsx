"use client";

import Head from "next/head";

import RestaurantHeroSection from "@/components/Restaurant/RestaurantHeroSection";
import Container from "@/components/Container";
import Stats from "@/components/Home/Stats";

export default function RestaurantPage() {
  return (
    <>
      <Head>
        <title>
          Ресторан «В.О.Л.Я.» — вишукана кухня та панорамний краєвид
        </title>
        <meta
          content="Спробуйте авторські страви в ресторані «В.О.Л.Я.»: сезонні продукти, жива музика та бездоганний сервіс."
          name="description"
        />
      </Head>

      <RestaurantHeroSection />
      <Stats
        className=" bg-gray-500 py-[25px]"
        data={[
          { label: "Місць у залі", value: 48 },
          { label: "Авторських страв", value: 64 },
          { label: "Рейтинг гостей", value: "4.9 / 5" },
        ]}
      />

      <Container className="py-12">
        <p className="text-base leading-relaxed text-gray-700">
          Ресторан « В[/\]Я» поєднує вишукану авторську кухню із неймовірними
          панорамними краєвидами. Ми використовуємо тільки свіжі місцеві
          продукти, а наші шеф-кухарі створюють унікальні страви, які
          задовольнять найвибагливіших гурманів. В затишній атмосфері ви зможете
          насолодитися живою музикою та бездоганним сервісом.
        </p>
      </Container>
    </>
  );
}
