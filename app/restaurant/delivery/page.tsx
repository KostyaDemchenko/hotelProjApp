"use client";

import Head from "next/head";

import Container from "@/components/Container";

export default function RoomDeliveryPage() {
  return (
    <>
      <Head>
        <title>Доставка до номера — ресторан «В.О.Л.Я.»</title>
        <meta
          content="Замовте доставку страв з ресторану прямо до вашого номера. Насолоджуйтесь смачною їжею у комфорті вашого номера."
          name="description"
        />
      </Head>

      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Доставка до номера</h1>
            <p className="text-xl">
              Насолоджуйтесь вишуканими стравами у комфорті вашого номера
            </p>
          </div>
        </div>
      </div>

      <Container className="py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Доставка страв з ресторану до вашого номера
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              Бажаєте насолодитися вишуканими стравами нашого ресторану, не
              виходячи з номера? Ми з радістю доставимо все, що ви забажаєте!
            </p>
          </div>

          {/* Як замовити */}
          <div className="rounded-lg border bg-white p-8 shadow-md">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Як замовити доставку?
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800">
                    Зателефонуйте за внутрішнім номером
                  </h4>
                  <p className="text-gray-700">
                    Знайдіть меню у вашому номері або зателефонуйте на ресепшн
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800">
                    Оберіть страви з меню
                  </h4>
                  <p className="text-gray-700">
                    Наш персонал з радістю допоможе вам обрати найкращі страви
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-gray-800">
                    Очікуйте доставку
                  </h4>
                  <p className="text-gray-700">
                    Ваше замовлення буде доставлено протягом 30-45 хвилин
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-primary/10 p-6">
              <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-800">
                <i className="ri-phone-line text-2xl text-primary" />
                Контактний номер
              </h4>
              <p className="mb-2 text-gray-700">
                Якщо у вас виникли питання або ви хочете зробити замовлення,
                зателефонуйте:
              </p>
              <a
                className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:underline"
                href="tel:+380661927167"
              >
                <i className="ri-phone-fill" />
                +380 (66) 192-71-67
              </a>
            </div>
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
                { title: "Основне меню", icon: "ri-restaurant-line" },
                { title: "Напої", icon: "ri-goblet-line" },
                { title: "Десерти", icon: "ri-cake-3-line" },
                { title: "Сніданки", icon: "ri-sun-line" },
              ].map((category) => (
                <div
                  key={category.title}
                  className="overflow-hidden rounded-lg border bg-white shadow-md"
                >
                  <div className="flex h-48 items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <i
                        className={`${category.icon} mb-2 text-6xl text-gray-400`}
                      />
                      <p className="text-lg font-semibold text-gray-600">
                        {category.title}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-center text-sm text-gray-600">
                      Зателефонуйте для ознайомлення з повним меню
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Переваги */}
          <div className="rounded-lg border bg-white p-8 shadow-md">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Переваги доставки до номера
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-check-double-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Швидка доставка протягом 30-45 хвилин
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-double-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Всі страви подаються в спеціальній упаковці для збереження
                  тепла та свіжості
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-double-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Безкоштовна доставка для гостей готелю
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-double-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Доставка доступна щодня з 07:00 до 23:00
                </span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-check-double-line mt-1 text-xl text-green-600" />
                <span className="text-gray-700">
                  Можливість оплати картою або готівкою
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="mb-4 text-lg text-gray-700">
              Готові зробити замовлення?
            </p>
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
              href="tel:+380661927167"
            >
              <i className="ri-phone-line text-xl" />
              Зателефонувати для замовлення
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
