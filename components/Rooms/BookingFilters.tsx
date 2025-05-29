"use client";

import { DatePicker, Select, SelectItem } from "@heroui/react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { parseISO } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { title } from "@/components/primitives";

export const adults = [
  { key: "1", label: "1 дорослий" },
  { key: "2", label: "2 дорослих" },
  { key: "3", label: "3 дорослих" },
  { key: "4", label: "4 дорослих" },
];

export const kids = [
  { key: "0", label: "0 дітей" },
  { key: "1", label: "1 дитина" },
  { key: "2", label: "2 дитини" },
];

const toCDT = (d: Date | null): CalendarDateTime | null =>
  d
    ? new CalendarDateTime(
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes()
      )
    : null;

export default function BookingFilters() {
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initCheckIn = toCDT(
    search.get("checkIn") ? parseISO(search.get("checkIn")!) : null
  );
  const initCheckOut = toCDT(
    search.get("checkOut") ? parseISO(search.get("checkOut")!) : null
  );
  const initAdults = search.get("adults") ?? adults[0].key;
  const initChildren = search.get("children") ?? kids[0].key;

  const [checkIn, setCheckIn] = useState<CalendarDateTime | null>(initCheckIn);
  const [checkOut, setCheckOut] = useState<CalendarDateTime | null>(
    initCheckOut
  );
  const [adultKey, setAdultKey] = useState(initAdults);
  const [kidsKey, setKidsKey] = useState(initChildren);

  const push = () => {
    const sp = new URLSearchParams();

    if (checkIn)
      sp.set("checkIn", checkIn.toDate(getLocalTimeZone()).toISOString());
    if (checkOut)
      sp.set("checkOut", checkOut.toDate(getLocalTimeZone()).toISOString());
    sp.set("adults", adultKey);
    sp.set("children", kidsKey);
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <section>
      <h2 className={title({ size: "sm", color: "default" })}>Фільтри</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DatePicker
          showMonthAndYearPickers
          granularity="day"
          label="Дата та час заселення"
          value={checkIn}
          onChange={setCheckIn}
        />

        <DatePicker
          showMonthAndYearPickers
          granularity="day"
          label="Дата та час виселення"
          minValue={checkIn ?? undefined}
          value={checkOut}
          onChange={setCheckOut}
        />

        <Select
          disallowEmptySelection
          defaultSelectedKeys={[adultKey]}
          label="Дорослі"
          placeholder="Оберіть кількість"
          startContent={<i className="ri-user-line text-lg" />}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0] as string;

            setAdultKey(key);
          }}
        >
          {adults.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>

        <Select
          disallowEmptySelection
          defaultSelectedKeys={[kidsKey]}
          label="Діти"
          placeholder="Оберіть кількість"
          startContent={<i className="ri-group-line text-lg" />}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0] as string;

            setKidsKey(key);
          }}
        >
          {kids.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>

      <button
        className="mt-6 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-black-900 rounded font-semibold"
        onClick={push}
      >
        Застосувати
      </button>
    </section>
  );
}
