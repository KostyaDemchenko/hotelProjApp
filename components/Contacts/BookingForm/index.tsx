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
import { parseISO, format as fmt } from "date-fns";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

/* ▼ варіанти селекторів */
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

/* ▼ схемa */
const phoneRe = /^\+?[0-9\s\-]{7,15}$/;
const schema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(phoneRe, "Невірний номер"),
  checkIn: z.date(),
  checkOut: z.date(),
  adults: z.number().min(1),
  children: z.number().min(0),
  roomId: z.string(),
  price: z.number().positive(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "Погодьтесь з умовами" }),
  }),
});

/* ▼ util Date→CalendarDateTime (локально, без UTC-зсуву) */
const toCDT = (d: Date | null) =>
  d
    ? new CalendarDateTime(d.getFullYear(), d.getMonth() + 1, d.getDate(), 0, 0)
    : null;

export default function BookingForm() {
  const sp = useSearchParams();
  const nav = useRouter();

  /* initial state з URL */
  const [form, set] = useState({
    name: "",
    phone: "",
    checkIn: toCDT(sp.get("checkIn") ? parseISO(sp.get("checkIn")!) : null),
    checkOut: toCDT(sp.get("checkOut") ? parseISO(sp.get("checkOut")!) : null),
    adults: sp.get("adults") ?? "1",
    children: sp.get("children") ?? "0",
    roomId: sp.get("room") ?? "",
    roomName: sp.get("roomName") ?? sp.get("room") ?? "",
    price: Number(sp.get("price") ?? 0),
    agree: false,
  });

  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

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
      const m: Record<string, string> = {};

      v.error.errors.forEach((e) => (m[e.path[0] as string] = e.message));
      setErr(m);

      return;
    }

    setErr({});
    setBusy(true);

    try {
      // Подготавливаем payload для API
      const payload = {
        user_name: form.name,
        user_phone: form.phone,
        rent_from: fmt(v.data.checkIn, "yyyy-MM-dd"),
        rent_to: fmt(v.data.checkOut, "yyyy-MM-dd"),
        rent_price: form.price,
        people_count: v.data.adults,
        child_count: v.data.children,
      };

      // Отправляем запрос к API route
      const response = await fetch("/api/book-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: form.roomId,
          from: fmt(v.data.checkIn, "yyyy-MM-dd"),
          to: fmt(v.data.checkOut, "yyyy-MM-dd"),
          payload,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Booking failed");
      }

      if (result.overlap) {
        setErr({ checkIn: "Номер зайнятий у ці дати" });
        setBusy(false);

        return;
      }

      // Успешное бронирование
      nav.replace("/thank-you");
    } catch (error) {
      console.error("Booking error:", error);
      setErr({ general: "Помилка при бронюванні. Спробуйте ще раз." });
      setBusy(false);
    }
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
        granularity="day"
        isInvalid={!!err.checkIn}
        label="Дата заїзду"
        value={form.checkIn}
        onChange={(v) => set((f) => ({ ...f, checkIn: v }))}
      />
      <DatePicker
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

      <Input isReadOnly label="Номер" value={form.roomName} />
      <Input isReadOnly label="Вартість, грн" value={String(form.price)} />

      <Checkbox
        isInvalid={!!err.agree}
        isSelected={form.agree}
        onValueChange={(v) => set((f) => ({ ...f, agree: v }))}
      >
        Я погоджуюсь з умовами користування
      </Checkbox>

      <Button color="primary" isLoading={busy} onPress={submit}>
        Підтвердити бронювання
      </Button>
    </div>
  );
}
