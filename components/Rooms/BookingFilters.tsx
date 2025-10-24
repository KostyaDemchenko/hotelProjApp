"use client";

import { Select, SelectItem } from "@heroui/react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { parseISO } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import CustomDatePicker from "@/components/CustomDatePicker";
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

  const initIn = toCDT(
    search.get("checkIn") ? parseISO(search.get("checkIn")!) : null
  );
  const initOut = toCDT(
    search.get("checkOut") ? parseISO(search.get("checkOut")!) : null
  );
  const [checkIn, setIn] = useState<CalendarDateTime | null>(initIn);
  const [checkOut, setOut] = useState<CalendarDateTime | null>(initOut);
  const [adultKey, setAdults] = useState(search.get("adults") ?? adults[0].key);
  const [kidKey, setKids] = useState(search.get("children") ?? kids[0].key);

  /* запис у URL кожного разу, коли щось змінилось */
  useEffect(() => {
    const sp = new URLSearchParams();

    if (checkIn)
      sp.set("checkIn", checkIn.toDate(getLocalTimeZone()).toISOString());
    if (checkOut)
      sp.set("checkOut", checkOut.toDate(getLocalTimeZone()).toISOString());
    sp.set("adults", adultKey);
    sp.set("children", kidKey);
    router.replace(`${pathname}?${sp.toString()}`);
  }, [checkIn, checkOut, adultKey, kidKey, pathname, router]);

  return (
    <section>
      <h2 className={title({ size: "sm", color: "default" })}>Фільтри</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CustomDatePicker
          description="Травень-вересень: високий сезон (+15%)"
          label="Дата заселення"
          value={checkIn}
          onChange={(val) => {
            setIn(val);
            // Якщо нова дата заселення >= дати виселення, скидаємо
            if (val && checkOut) {
              const checkInDate = new Date(val.year, val.month - 1, val.day);
              const checkOutDate = new Date(
                checkOut.year,
                checkOut.month - 1,
                checkOut.day
              );

              if (checkInDate >= checkOutDate) {
                setOut(null);
              }
            }
          }}
        />
        <CustomDatePicker
          description="Від 3 днів: знижка від 5%"
          label="Дата виселення"
          minValue={checkIn ?? undefined}
          value={checkOut}
          onChange={setOut}
        />

        <Select
          label="Дорослі"
          selectedKeys={new Set([adultKey])}
          startContent={<i className="ri-user-line text-lg" />}
          onSelectionChange={(k) => setAdults(Array.from(k)[0] as string)}
        >
          {adults.map((a) => (
            <SelectItem key={a.key}>{a.label}</SelectItem>
          ))}
        </Select>

        <Select
          label="Діти"
          selectedKeys={new Set([kidKey])}
          startContent={<i className="ri-group-line text-lg" />}
          onSelectionChange={(k) => setKids(Array.from(k)[0] as string)}
        >
          {kids.map((k) => (
            <SelectItem key={k.key}>{k.label}</SelectItem>
          ))}
        </Select>
      </div>
    </section>
  );
}
