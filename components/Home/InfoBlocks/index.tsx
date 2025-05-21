"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import imgObj from "@/public/images/utils";
import { title, description } from "@/components/primitives";

export default function InfoBlocks() {
  return (
    <section className="py-16 bg-white">
      <Container className=" flex flex-col items-center w-full gap-[35px]">
        {/* Блок 1: Ресторан */}
        <article className="flex flex-col w-full md:flex-row items-start justify-between gap-8">
          <div className="flex-shrink-0 max-w-[450px] w-full h-[300px] relative rounded-md overflow-hidden shadow-lg">
            <Image
              fill
              priority
              alt="Ресторан при готелі"
              className="object-cover"
              src={imgObj.restaurant}
            />
          </div>

          <div className="">
            <h2 className={title({ color: "yellow", size: "sm" })}>
              Ресторан при готелі
            </h2>
            <p
              className={
                description({ color: "default", size: "md" }) + " mt-4"
              }
            >
              Запрошуємо насолодитися вишуканою кухнею та затишною атмосферою
              нашого ресторану. Від традиційних українських страв до авторських
              кулінарних шедеврів — все для вашого комфорту.
            </p>
            <Link
              className="inline-block mt-6 px-6 py-3 bg-yellow-600 text-black-900 font-semibold rounded hover:bg-yellow-700 transition"
              href="/restaurant"
            >
              Детальніше
            </Link>
          </div>
        </article>

        {/* Блок 2: Про нас */}
        <article className="flex flex-col w-full md:flex-row-reverse items-start justify-between gap-8">
          <div className="flex-shrink-0 max-w-[450px] w-full h-[300px] relative rounded-md overflow-hidden shadow-lg">
            <Image
              fill
              priority
              alt="Про нас"
              className="object-cover"
              src={imgObj.aboutUs}
            />
          </div>

          <div className="">
            <h2 className={title({ color: "blue", size: "sm" })}>О нас</h2>
            <p
              className={
                description({ color: "default", size: "md" }) + " mt-4"
              }
            >
              Готель «В.О.Л.Я.» — це поєднання комфорту, сучасного дизайну та
              гостинності. Ми прагнемо створити для вас затишну атмосферу, щоб
              кожен ваш візит був незабутнім.
            </p>
            <Link
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
              href="/about"
            >
              Дізнатись більше
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
