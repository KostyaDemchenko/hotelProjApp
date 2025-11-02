"use client";

import Head from "next/head";

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

      <div className="relative h-[400px] w-full overflow-hidden">
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

          {/* Заглушка для меню */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-lg border shadow-md"
              >
                <div className="relative h-64 bg-gray-200">
                  <div className="flex h-full items-center justify-center">
                    <i className="ri-restaurant-line text-6xl text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">
                    Страва {item}
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
