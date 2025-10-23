"use client";

import {
  Input,
  DatePicker,
  Select,
  SelectItem,
  Checkbox,
  Button,
} from "@heroui/react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { parseISO, format as fmt, differenceInCalendarDays } from "date-fns";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";

import { calculateFinalPrice } from "@/lib/pricing";

/* ── константи дорослі / діти ─────────────────────── */
const ADULTS = [
  { key: "1", label: "1 дорослий" },
  { key: "2", label: "2 дорослих" },
  { key: "3", label: "3 дорослих" },
  { key: "4", label: "4 дорослих" },
];
const KIDS = [
  { key: "0", label: "0 дітей" },
  { key: "1", label: "1 дитина" },
  { key: "2", label: "2 дитини" },
];

/* ── схема валідації ─────────────────────────────── */
const phoneRe = /^\+?[0-9\s\-]{7,15}$/;
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(phoneRe, "Невірний номер"),
  checkIn: z.date(),
  checkOut: z.date(),
  adults: z.number().min(1),
  children: z.number().min(0),
  roomId: z.string().min(1, "Оберіть номер"),
  price: z.number().positive(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "Погодьтесь з умовами" }),
  }),
});

/* ── Date → CalendarDateTime (локальна дата, без UTC-зсуву) ── */
const toCDT = (d: Date | null) =>
  d
    ? new CalendarDateTime(d.getFullYear(), d.getMonth() + 1, d.getDate(), 0, 0)
    : null;

/* ─────────────────────────────────────────────────── */

export default function BookingForm() {
  const search = useSearchParams();
  const nav = useRouter();

  /* ---------- список номерів (підтягуємо один раз) ---------- */
  type RoomOpt = { key: string; label: string; price?: number };
  const [rooms, setRooms] = useState<RoomOpt[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/rooms-list");
      const { rooms } = (await res.json()) as {
        rooms: { _id: string; room_name: string; room_price?: number }[];
      };

      setRooms(
        rooms.map((r) => ({
          key: r._id,
          label: r.room_name,
          price: r.room_price ?? 0,
        }))
      );
    })();
  }, []);

  /* ---------- initial state з query-string ---------- */
  const [form, set] = useState({
    name: "",
    phone: "",
    checkIn: toCDT(
      search.get("checkIn") ? parseISO(search.get("checkIn")!) : null
    ),
    checkOut: toCDT(
      search.get("checkOut") ? parseISO(search.get("checkOut")!) : null
    ),
    adults: search.get("adults") ?? "1",
    children: search.get("children") ?? "0",
    roomId: search.get("room") ?? "",
    price: Number(search.get("price") ?? 0),
    agree: false,
  });

  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  /* ---------- автоматический пересчет цены при изменении дат или номера ---------- */
  useEffect(() => {
    // Проверяем что все нужные данные есть
    if (!form.roomId || !form.checkIn || !form.checkOut || rooms.length === 0) {
      return;
    }

    // Ищем комнату в списке
    const found = rooms.find((r) => r.key === form.roomId);

    if (!found || !found.price) {
      return;
    }

    const checkInDate = form.checkIn.toDate(getLocalTimeZone());
    const checkOutDate = form.checkOut.toDate(getLocalTimeZone());
    const nights = Math.max(
      1,
      differenceInCalendarDays(checkOutDate, checkInDate)
    );

    const calculatedPrice = calculateFinalPrice(
      found.price,
      checkInDate,
      checkOutDate,
      nights
    );

    set((f) => ({ ...f, price: calculatedPrice }));
  }, [form.roomId, form.checkIn, form.checkOut, rooms]);

  /* ---------- коли обираємо номер обновлюємо ціну (якщо є) ---------- */
  const handleRoomSelect = (id: string) => {
    set((f) => ({
      ...f,
      roomId: id,
    }));
  };

  /* ---------- submit ---------- */
  const submit = async () => {
    const data = {
      ...form,
      adults: Number(form.adults),
      children: Number(form.children),
      checkIn: form.checkIn?.toDate(getLocalTimeZone()),
      checkOut: form.checkOut?.toDate(getLocalTimeZone()),
    };

    const v = schema.safeParse(data);

    if (!v.success) {
      const map: Record<string, string> = {};

      v.error.errors.forEach((e) => (map[e.path[0] as string] = e.message));
      setErr(map);

      return;
    }
    setErr({});
    setBusy(true);

    /* — відправляємо на свій API-route /api/book-room — */
    const res = await fetch("/api/book-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: form.roomId,
        from: fmt(v.data.checkIn, "yyyy-MM-dd"),
        to: fmt(v.data.checkOut, "yyyy-MM-dd"),
        payload: {
          user_name: form.name,
          user_phone: form.phone,
          rent_from: fmt(v.data.checkIn, "yyyy-MM-dd"),
          rent_to: fmt(v.data.checkOut, "yyyy-MM-dd"),
          rent_price: form.price,
          people_count: v.data.adults,
          child_count: v.data.children,
        },
      }),
    });
    const json = await res.json();

    if (!res.ok) {
      setErr({ general: json.error ?? "Помилка бронювання" });
      setBusy(false);

      return;
    }
    if (json.overlap) {
      setErr({ checkIn: "Номер зайнятий у ці дати" });
      setBusy(false);

      return;
    }

    nav.replace("/thank-you");
  };

  /* ---------- UI ---------- */
  return (
    <div className="max-w-xl mx-auto mt-[64px] py-12 space-y-6">
      <Input
        errorMessage={err.name}
        isInvalid={!!err.name}
        label="Ім’я"
        value={form.name}
        onValueChange={(v) => set((f) => ({ ...f, name: v }))}
      />

      <Input
        errorMessage={err.phone}
        isInvalid={!!err.phone}
        label="Контактний номер"
        placeholder="+38 (0__) ___-__-__"
        value={form.phone}
        onValueChange={(v) => set((f) => ({ ...f, phone: v }))}
      />

      <DatePicker
        classNames={{
          calendar: "seasonal-calendar",
        }}
        description="Травень-вересень: високий сезон (+15%)"
        granularity="day"
        isInvalid={!!err.checkIn}
        label="Дата заїзду"
        value={form.checkIn}
        onChange={(v) => set((f) => ({ ...f, checkIn: v }))}
      />
      <DatePicker
        classNames={{
          calendar: "seasonal-calendar",
        }}
        description="Від 3 днів: знижка від 5%"
        granularity="day"
        isInvalid={!!err.checkOut}
        label="Дата виїзду"
        minValue={form.checkIn ?? undefined}
        value={form.checkOut}
        onChange={(v) => set((f) => ({ ...f, checkOut: v }))}
      />

      <Select
        label="Дорослі"
        selectedKeys={new Set([form.adults])}
        onSelectionChange={(k) =>
          set((f) => ({ ...f, adults: Array.from(k)[0] as string }))
        }
      >
        {ADULTS.map((o) => (
          <SelectItem key={o.key}>{o.label}</SelectItem>
        ))}
      </Select>

      <Select
        label="Діти"
        selectedKeys={new Set([form.children])}
        onSelectionChange={(k) =>
          set((f) => ({ ...f, children: Array.from(k)[0] as string }))
        }
      >
        {KIDS.map((o) => (
          <SelectItem key={o.key}>{o.label}</SelectItem>
        ))}
      </Select>

      <Select
        isInvalid={!!err.roomId}
        label="Номер"
        placeholder="Оберіть номер"
        selectedKeys={new Set([form.roomId])}
        onSelectionChange={(k) => handleRoomSelect(Array.from(k)[0] as string)}
      >
        {rooms.map((r) => (
          <SelectItem key={r.key}>{r.label}</SelectItem>
        ))}
      </Select>

      <Input
        isReadOnly
        label="Вартість, грн"
        value={form.price ? String(form.price) : "—"}
      />

      <Checkbox
        isInvalid={!!err.agree}
        isSelected={form.agree}
        onValueChange={(v) => set((f) => ({ ...f, agree: v }))}
      >
        Я погоджуюсь з умовами користування
      </Checkbox>

      {err.general && <p className="text-sm text-red-500">{err.general}</p>}

      <Button color="primary" isLoading={busy} onPress={submit}>
        Підтвердити бронювання
      </Button>
    </div>
  );
}
