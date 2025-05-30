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
          content="Дізнайтеся про нашу місію, цінності та історію створення бренду «В.О.Л.Я.» — людей, які роблять якість і гостинність понад усе."
          name="description"
        />
      </Head>

      <AboutHeroSection />

      <Stats
        className=" bg-gray-500 py-[25px]"
        data={[
          { label: "Років досвіду", value: 12 },
          { label: "Співробітників у команді", value: 60 },
          { label: "Реалізованих проєктів", value: 75 },
        ]}
      />

      <Container className="py-12 space-y-6 text-gray-700 text-base leading-relaxed">
        <p>
          Ми&nbsp;— це згуртована команда професіоналів, яка щоденно працює над
          тим, щоб створювати незабутній сервіс і&nbsp;найкращий досвід для
          наших гостей. Почавши свій шлях як невеликий стартап із&nbsp;кількох
          ентузіастів, ми&nbsp;поступово перетворилися на&nbsp;міцну дружню
          організацію, де кожен співробітник привносить свої унікальні знання та
          талант.
        </p>

        <p>
          У&nbsp;нашій команді ви зустрінете креативних шеф-кухарів, які
          постійно експериментують з&nbsp;новими рецептами, уважних менеджерів,
          які завжди готові зробити ваше перебування максимально комфортним,
          а&nbsp;також привітних працівників, що щиро дбають про кожного гостя.
        </p>

        <div>
          <h3 className="font-semibold mb-2">Наші основні цінності:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <b>Якість</b> — ми завжди обираємо найкращі продукти
              та&nbsp;послуги, щоб забезпечити бездоганний результат.
            </li>
            <li>
              <b>Інновації</b> — ми не&nbsp;боїмося впроваджувати нові ідеї та
              рішення, роблячи ваш відпочинок сучасним і&nbsp;приємним.
            </li>
            <li>
              <b>Людяність</b> — кожен гість для нас особливий, тому ми
              завжди&nbsp;допоможемо і&nbsp;подбаємо про ваш комфорт.
            </li>
          </ul>
        </div>

        <p>
          Завітайте до&nbsp;нас і&nbsp;переконайтеся самі: у&nbsp;«В.О.Л.Я.»
          завжди тепло, затишно й&nbsp;привітно!
        </p>

        <div>
          <h3 className="font-semibold mb-2">Контактна інформація:</h3>
          <p>
            Телефон:{" "}
            <a className="underline" href="tel:+380XXXXXXXXX">
              +380&nbsp;(XX)&nbsp;XXX-XX-XX
            </a>
          </p>
          <p>
            Email:&nbsp;
            <a className="underline" href="mailto:info@ourhotel.com">
              info@ourhotel.com
            </a>
          </p>
          <p>
            Адреса: вул.&nbsp;Аркадія, Ліве крило&nbsp;2/1, Одеса,
            Одеська&nbsp;область, Україна
          </p>
        </div>
      </Container>
    </>
  );
}
