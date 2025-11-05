"use client";

import Head from "next/head";

import Container from "@/components/Container";

export default function RestaurantBookingPage() {
  return (
    <>
      <Head>
        <title>Забронювати столик у ресторані «В.О.Л.Я.»</title>
        <meta
          content="Забронюйте столик у нашому ресторані та насолоджуйтеся вишуканими стравами та затишною атмосферою."
          name="description"
        />
      </Head>

      <div className="relative h-[400px] w-full overflow-hidden bg-[url(https://maristella.com.ua/wp-content/uploads/2024/02/img_1968-1800x800.jpg)] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Бронювання столика</h1>
            <p className="text-xl">
              Насолоджуйтесь вишуканою кухнею у затишній атмосфері
            </p>
          </div>
        </div>
      </div>

      <Container className="py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center ">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Забронюйте столик у ресторані «В.О.Л.Я.»
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              Наш ресторан пропонує унікальне поєднання вишуканих страв,
              елегантної атмосфери та бездоганного сервісу. Ми завжди раді
              бачити вас у нашому закладі!
            </p>
          </div>

          <div className="rounded-lg border bg-white p-8 shadow-md">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Як забронювати столик?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <i className="ri-phone-line mt-1 text-2xl text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800">
                    Зателефонуйте нам
                  </h4>
                  <p className="text-gray-700">
                    Найпростіший спосіб забронювати столик — зателефонувати за
                    номером:
                  </p>
                  <a
                    className="mt-2 inline-flex items-center gap-2 text-xl font-bold text-primary hover:underline"
                    href="tel:+380661927167"
                  >
                    <i className="ri-phone-fill" />
                    +380 (66) 192-71-67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="ri-time-line mt-1 text-2xl text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800">
                    Час роботи
                  </h4>
                  <p className="text-gray-700">
                    Наш ресторан працює щодня з 12:00 до 23:00
                  </p>
                  <p className="text-sm text-gray-600">
                    Рекомендуємо бронювати столик заздалегідь, особливо у
                    вихідні дні
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <i className="ri-map-pin-line mt-1 text-2xl text-primary" />
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800">
                    Наша адреса
                  </h4>
                  <p className="text-gray-700">
                    вул. Аркадія, Ліве крило 2/1, Одеса, Україна
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Спеціальна пропозиція для груп */}
          <div className="rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 p-8 shadow-md">
            <div className="flex items-start gap-4">
              <i className="ri-gift-line text-4xl text-primary" />
              <div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-800">
                  Спеціальна пропозиція!
                </h3>
                <p className="mb-2 text-lg font-medium text-gray-800">
                  Знижка 10% для компаній від 5 осіб
                </p>
                <p className="text-gray-700">
                  Плануєте святкування або корпоративний захід? При бронюванні
                  столика для компанії від 5 осіб ви отримуєте знижку 10% на все
                  меню! Просто повідомте про це при бронюванні.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Чому обирають наш ресторан?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-check-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Авторська кухня з використанням свіжих місцевих продуктів
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Панорамний вид на море та живописне узбережжя
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Затишна атмосфера та бездоганний сервіс
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Можливість проведення приватних заходів та банкетів
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="mb-4 text-lg text-gray-700">
              Є питання? Зателефонуйте нам, і ми з радістю на них відповімо!
            </p>
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
              href="tel:+380661927167"
            >
              <i className="ri-phone-line text-xl" />
              Зателефонувати зараз
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
