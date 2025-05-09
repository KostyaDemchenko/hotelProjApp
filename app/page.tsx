"use client";

import { Calendar } from "@heroui/calendar";
import { I18nProvider } from "@react-aria/i18n";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <I18nProvider locale="ua">
        <Calendar
          showMonthAndYearPickers
          aria-label="Date (Show Month and Year Picker)"
        />
      </I18nProvider>
      <p className="text-center font-bold text-[24px]"> LKASNDL</p>
    </section>
  );
}
