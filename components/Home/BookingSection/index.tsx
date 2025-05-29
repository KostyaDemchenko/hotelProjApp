"use client";

import { DatePicker, Select, SelectItem } from "@heroui/react";
import { CalendarDateTime, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { z } from "zod";

import Container from "@/components/Container";
import { title, description } from "@/components/primitives";

const toJSDate = (v: CalendarDateTime | null) =>
  v ? v.toDate(getLocalTimeZone()) : null;

const bookingSchema = z.object({
  checkInDate: z.date().nullable().refine(Boolean, {
    message: "Будь ласка, оберіть дату заселення",
  }),
  checkOutDate: z.date().nullable().refine(Boolean, {
    message: "Будь ласка, оберіть дату виселення",
  }),
  adults: z.number().min(1),
  children: z.number().min(0),
});

type BookingForm = {
  checkInDate: CalendarDateTime | null;
  checkOutDate: CalendarDateTime | null;
  adults: number;
  children: number;
};

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

export default function BookingSection() {
  const router = useRouter();

  const [form, setForm] = useState<BookingForm>({
    checkInDate: null,
    checkOutDate: null,
    adults: 1,
    children: 0,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingForm, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) {
      setErrors({});

      return;
    }

    const parsed = {
      ...form,
      checkInDate: toJSDate(form.checkInDate),
      checkOutDate: toJSDate(form.checkOutDate),
    };
    const result = bookingSchema.safeParse(parsed);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingForm, string>> = {};

      result.error.errors.forEach((err) => {
        if (err.path[0])
          fieldErrors[err.path[0] as keyof BookingForm] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }, [form, submitted]);

  const handleBookingCheck = () => {
    setSubmitted(true);

    const parsed = {
      ...form,
      checkInDate: toJSDate(form.checkInDate),
      checkOutDate: toJSDate(form.checkOutDate),
    };
    const result = bookingSchema.safeParse(parsed);

    if (!result.success) return;

    const params = new URLSearchParams({
      checkIn: parsed.checkInDate!.toISOString(),
      checkOut: parsed.checkOutDate!.toISOString(),
      adults: form.adults.toString(),
      children: form.children.toString(),
    });

    router.push(`/rooms?${params.toString()}`);
  };

  const formatDate = (d: CalendarDateTime | null) =>
    d ? format(toJSDate(d)!, "dd MMMM yyyy", { locale: uk }) : "";

  return (
    <I18nProvider locale="uk-UA">
      <div className="w-full bg-blue-100 p-6">
        <Container className="flex flex-col w-full gap-4 items-start">
          <h2
            className={title({ size: "sm", color: "default", align: "center" })}
          >
            Забронювати номер
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 mb-6">
            <div>
              <DatePicker
                showMonthAndYearPickers
                isInvalid={Boolean(errors.checkInDate)}
                label="Дата та час заселення"
                value={form.checkInDate}
                onChange={(val) => setForm((f) => ({ ...f, checkInDate: val }))}
              />
              {submitted && errors.checkInDate && (
                <p className={description({ color: "accent", size: "sm" })}>
                  {errors.checkInDate}
                </p>
              )}
              {form.checkInDate && !errors.checkInDate && (
                <p className={description({ color: "default", size: "sm" })}>
                  {formatDate(form.checkInDate)}
                </p>
              )}
            </div>

            <div>
              <DatePicker
                showMonthAndYearPickers
                isInvalid={Boolean(errors.checkOutDate)}
                label="Дата та час виселення"
                minValue={form.checkInDate ?? undefined}
                value={form.checkOutDate}
                onChange={(val) =>
                  setForm((f) => ({ ...f, checkOutDate: val }))
                }
              />
              {submitted && errors.checkOutDate && (
                <p className={description({ color: "accent", size: "sm" })}>
                  {errors.checkOutDate}
                </p>
              )}
              {form.checkOutDate && !errors.checkOutDate && (
                <p className={description({ color: "default", size: "sm" })}>
                  {formatDate(form.checkOutDate)}
                </p>
              )}
            </div>

            <Select
              disallowEmptySelection
              className="w-full"
              defaultSelectedKeys={[adults[0].key]}
              label="Дорослі"
              placeholder="Оберіть кількість"
              scrollShadowProps={{ isEnabled: false }}
              startContent={<i className="ri-user-line text-lg" />}
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0] as string;

                setForm((f) => ({ ...f, adults: Number(key) }));
              }}
            >
              {adults.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>

            <Select
              disallowEmptySelection
              className="w-full"
              defaultSelectedKeys={[kids[0].key]}
              label="Діти"
              placeholder="Оберіть кількість"
              scrollShadowProps={{ isEnabled: false }}
              startContent={<i className="ri-group-line text-lg" />}
              onSelectionChange={(keys) => {
                const key = Array.from(keys)[0] as string;

                setForm((f) => ({ ...f, children: Number(key) }));
              }}
            >
              {kids.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>

          <button
            className={`w-full max-w-[300px] font-semibold py-3 rounded text-black-900 ${
              errors.checkInDate || errors.checkOutDate
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
            disabled={!!errors.checkInDate || !!errors.checkOutDate}
            onClick={handleBookingCheck}
          >
            Перевірити наявність місць
          </button>
        </Container>
      </div>
    </I18nProvider>
  );
}
