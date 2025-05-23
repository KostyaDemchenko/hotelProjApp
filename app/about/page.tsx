"use client";

import Head from "next/head";

import AboutHeroSection from "@/components/About/AboutHeroSection";
import Container from "@/components/Container";
import Stats from "@/components/Home/Stats";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Про нас — команда В.О.Л.Я.</title>
        <meta
          name="description"
          content="Дізнайтеся про нашу місію, цінності та історію створення бренду «В.О.Л.Я.» — людей, які роблять якість і гостинність понад усе."
        />
      </Head>

      <AboutHeroSection />

      <Stats
        className=" bg-gray-500 py-[25px]"
        data={[
          { label: "Років досвіду", value: 12 },
          { label: "Співробітників у команді", value: 30 },
          { label: "Реалізованих проєктів", value: 75 },
        ]}
      />

      <Container className="py-12">
        <p className="text-base leading-relaxed text-gray-700">
          Ми — це згуртована команда професіоналів, об’єднана спільною метою:
          створювати найкращий сервіс і досвід для наших гостей. Починаючи з
          невеликого стартапу з кількох ентузіастів, ми виросли в міцну
          організацію, де кожен вносить свій талант — від креативного шеф-кухаря
          до уважного менеджера. Наші цінності — якість, інновації та людяність.
          Щодня ми прагнемо перевершувати очікування, впроваджувати нові ідеї та
          дбати про комфорт кожного відвідувача.
        </p>
      </Container>
    </>
  );
}
