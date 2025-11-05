"use client";

import Head from "next/head";
import Link from "next/link";

import Container from "@/components/Container";

export default function MenuPage() {
  return (
    <>
      <Head>
        <title>Меню ресторану «В.О.Л.Я.»</title>
        <meta
          content="Ознайомтеся з меню нашого ресторану — широкий вибір страв для справжніх гурманів."
          name="description"
        />
      </Head>

      <div className="relative h-[400px] w-full bg-[url(https://ukrainski-stravy.com.ua/wp-content/uploads/2019/04/%D1%8C%D1%83%D1%82%D0%B3.png)] bg-cover overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Меню ресторану</h1>
            <p className="text-xl">
              Відкрийте для себе вишукані смаки нашої кухні
            </p>
          </div>
        </div>
      </div>

      <Container className="py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Наше меню</h2>
            <p className="text-base leading-relaxed text-gray-700">
              Ми пишаємось нашою авторською кухнею, яка поєднує традиційні
              українські страви з сучасними кулінарними тенденціями. Всі страви
              готуються з найсвіжіших місцевих продуктів.
            </p>
          </div>

          {/* Список позиций меню */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Омлети",
                imgLink:
                  "https://images-ext-1.discordapp.net/external/6FCiTd9q3_vEeSPq-AGFqzx-JoyDIA3but6E5vAbtKU/https/today.ua/wp-content/uploads/2020/04/salo-1.jpg?format=webp&width=1280&height=960",
                desc: "Пример описания",
                price: "250 грн",
              },
              {
                title: "2",
                imgLink: "",
                desc: "",
                price: "250 грн",
              },
              {
                title: "3",
                imgLink: "",
                desc: "",
                price: "250 грн",
              },
              {
                title: "4",
                imgLink: "",
                desc: "",
                price: "250 грн",
              },
              {
                title: "5",
                imgLink: "",
                desc: "",
                price: "250 грн",
              },
              {
                title: "6",
                imgLink: "",
                desc: "",
                price: "250 грн",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-lg border shadow-md"
              >
                <div className="relative h-64 bg-gray-200">
                  {/* Изображение */}
                  <div
                    className="flex h-full items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.imgLink})` }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">
                    Опис страви буде доступний найближчим часом
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      від 250 грн
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Меню */}
          <div className="rounded-lg bg-gray-50 p-8">
            <h3 className="mb-6 text-center text-2xl font-semibold text-gray-800">
              Наше меню
            </h3>
            <p className="mb-6 text-center text-gray-700">
              Ознайомтеся з повним меню нашого ресторану
            </p>

            {/* Заглушки меню */}
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Основне меню",
                  icon: "ri-restaurant-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/soups.pdf",
                },
                {
                  title: "Напої",
                  icon: "ri-goblet-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/cold-drinks.pdf",
                },
                {
                  title: "Десерти",
                  icon: "ri-cake-3-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/desserts-ice.pdf",
                },
                {
                  title: "Сніданки",
                  icon: "ri-sun-line",
                  menuLink:
                    "https://ukrainski-stravy.com.ua/wp-content/uploads/2025/03/breakfasts.pdf",
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="overflow-hidden rounded-lg border bg-white shadow-md"
                >
                  <Link
                    className="flex h-48 items-center justify-center bg-gray-100"
                    href={category.menuLink}
                    target="_blank"
                  >
                    <div className="text-center">
                      <i
                        className={`${category.icon} mb-2 text-6xl text-gray-400`}
                      />
                      <p className="text-lg font-semibold text-gray-600">
                        {category.title}
                      </p>
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-center text-sm text-gray-600">
                      Зателефонуйте для ознайомлення з повним меню
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
            <h3 className="mb-2 text-2xl font-semibold text-gray-800">
              Бажаєте дізнатися більше?
            </h3>
            <p className="mb-4 text-gray-700">
              Зателефонуйте нам, і ми з радістю розповімо про всі наші страви та
              спеціальні пропозиції
            </p>
            <a
              className="inline-flex items-center gap-2 text-xl font-semibold text-primary hover:underline"
              href="tel:+380661927167"
            >
              <i className="ri-phone-line" />
              +380 (66) 192-71-67
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
