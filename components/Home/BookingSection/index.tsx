"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { z } from "zod";

import Container from "@/components/Container";

const bookingSchema = z.object({
  checkInDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Будь ласка, оберіть дату заселення",
    }),
  checkOutDate: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Будь ласка, оберіть дату виселення",
    }),
  adults: z.number().min(1),
  children: z.number().min(0),
});

type BookingForm = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  adults: number;
  children: number;
};

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

    const result = bookingSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingForm, string>> = {};

      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof BookingForm] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }, [form, submitted]);

  const handleBookingCheck = () => {
    setSubmitted(true);

    const result = bookingSchema.safeParse(form);

    if (!result.success) {
      // Ошибки покажутся через useEffect
      return;
    }

    const params = new URLSearchParams({
      checkIn: form.checkInDate!.toISOString(),
      checkOut: form.checkOutDate!.toISOString(),
      adults: form.adults.toString(),
      children: form.children.toString(),
    });

    router.push(`/rooms?${params.toString()}`);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";

    return format(date, "dd MMMM yyyy", { locale: uk });
  };

  const iconClass = "absolute left-3 top-1/2  text-black-500";

  return (
    <div className="w-full bg-blue-100 p-6">
      <Container>
        <h2 className="text-2xl font-bold mb-4 text-black-800">
          Забронювати номер
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative">
          <div className="relative">
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="check-in-date"
            >
              Дата заселення
            </label>
            <input
              className={`w-full p-2 bg-white border rounded-md ${
                errors.checkInDate ? "border-red-500" : "border-black-300"
              }`}
              id="check-in-date"
              type="date"
              value={
                form.checkInDate ? format(form.checkInDate, "yyyy-MM-dd") : ""
              }
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  checkInDate: e.target.value ? new Date(e.target.value) : null,
                }))
              }
            />
            {submitted && errors.checkInDate && (
              <p className="text-red-600 text-sm mt-1">{errors.checkInDate}</p>
            )}
            {form.checkInDate && !errors.checkInDate && (
              <p className="text-sm mt-1 text-black-600">
                {formatDate(form.checkInDate)}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="check-out-date"
            >
              Дата виселення
            </label>
            <input
              className={`w-full p-2 bg-white border rounded-md ${
                errors.checkOutDate ? "border-red-500" : "border-black-300"
              }`}
              id="check-out-date"
              min={
                form.checkInDate ? format(form.checkInDate, "yyyy-MM-dd") : ""
              }
              type="date"
              value={
                form.checkOutDate ? format(form.checkOutDate, "yyyy-MM-dd") : ""
              }
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  checkOutDate: e.target.value
                    ? new Date(e.target.value)
                    : null,
                }))
              }
            />
            {submitted && errors.checkOutDate && (
              <p className="text-red-600 text-sm mt-1">{errors.checkOutDate}</p>
            )}
            {form.checkOutDate && !errors.checkOutDate && (
              <p className="text-sm mt-1 text-black-600">
                {formatDate(form.checkOutDate)}
              </p>
            )}
          </div>

          <div className="relative">
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="adults-select"
            >
              Дорослі
            </label>
            <i className={`${iconClass} ri-user-line`} />
            <select
              className="w-full p-2 pl-10 bg-white border border-black-300 rounded-md appearance-none"
              id="adults-select"
              value={form.adults}
              onChange={(e) =>
                setForm((f) => ({ ...f, adults: Number(e.target.value) }))
              }
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "дорослий" : "дорослих"}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="children-select"
            >
              Діти
            </label>
            <i className={`${iconClass} ri-group-line`} />
            <select
              className="w-full p-2 pl-10 bg-white border border-black-300 rounded-md appearance-none"
              id="children-select"
              value={form.children}
              onChange={(e) =>
                setForm((f) => ({ ...f, children: Number(e.target.value) }))
              }
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 0 ? "дітей" : num === 1 ? "дитина" : "дитини"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Кнопка перевірки */}
        <button
          className={`w-full font-bold py-3 rounded text-black-900 ${
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
  );
}
