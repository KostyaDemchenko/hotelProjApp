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
          Ми— це згуртована команда професіоналів, яка щоденно працює над тим,
          щоб створювати незабутній сервіс і найкращий досвід для наших гостей.
          Почавши свій шлях як невеликий стартап із кількох ентузіастів, ми
          поступово перетворилися на міцну дружню організацію, де кожен
          співробітник привносить свої унікальні знання та талант.
        </p>

        <p>
          У нашій команді ви зустрінете креативних шеф-кухарів, які постійно
          експериментують зновими рецептами, уважних менеджерів, які завжди
          готові зробити ваше перебування максимально комфортним, а також
          привітних працівників, що щиро дбають про кожного гостя.
        </p>

        <div>
          <h3 className="font-semibold mb-2">Наші основні цінності:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <b>Якість</b> — ми завжди обираємо найкращі продукти та послуги,
              щоб забезпечити бездоганний результат.
            </li>
            <li>
              <b>Інновації</b> — ми небоїмося впроваджувати нові ідеї та
              рішення, роблячи ваш відпочинок сучасним і приємним.
            </li>
            <li>
              <b>Людяність</b> — кожен гість для нас особливий, тому ми завжди
              допоможемо і подбаємо про ваш комфорт.
            </li>
          </ul>
        </div>

        <p>
          Завітайте до нас і переконайтеся самі: у «В[/\]Я» завжди тепло,
          затишно й привітно!
        </p>

        <div>
          <h3 className="font-semibold mb-2">Контактна інформація:</h3>
          <p>
            Телефон:{" "}
            <a className="underline" href="tel:+380661927167">
              +380(66)1927167
            </a>
          </p>
          <p>
            Email:
            <a className="underline" href="mailto:info@ourhotel.com">
              reception@volyahotel.com
            </a>
          </p>
          <p>
            Адреса: вул.Аркадія, Ліве крило2/1, Одеса, Одеська область, Україна
          </p>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Наше розташування:</h3>
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              allowFullScreen
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2748.8762785472673!2d30.753891776803764!3d46.43544767111721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318a4a39f0f7%3A0x6e7e6f7a0e4b0a8e!2z0LLRg9C7LiDQkNGA0LrQsNC00ZbRjywg0J7QtNC10YHQsCA2NTAwOSwg0KPQutGA0LDRl9C90LA!5e0!3m2!1suk!2suk!4v1698337200000!5m2!1suk!2suk"
              style={{ border: 0 }}
              title="Карта розташування готелю В.О.Л.Я."
              width="100%"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
