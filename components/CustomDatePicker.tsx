"use client";

import { CalendarDateTime } from "@internationalized/date";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/react";

import CustomCalendar from "./CustomCalendar";

interface CustomDatePickerProps {
  label?: string;
  description?: string;
  value: CalendarDateTime | null;
  onChange: (value: CalendarDateTime | null) => void;
  minValue?: CalendarDateTime;
  isInvalid?: boolean;
  className?: string;
}

export default function CustomDatePicker({
  label,
  description,
  value,
  onChange,
  minValue,
  isInvalid,
  className = "",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Закривати календар при кліку поза ним
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Конвертуємо CalendarDateTime в Date
  const selectedDate = value
    ? new Date(value.year, value.month - 1, value.day)
    : null;

  // Мінімальна дата - сьогодні або minValue+1 день (якщо minValue задано)
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  let minDate = today;

  if (minValue) {
    const minValueDate = new Date(
      minValue.year,
      minValue.month - 1,
      minValue.day
    );

    minValueDate.setHours(0, 0, 0, 0);
    // Додаємо 1 день до minValue, щоб дата виселення була мінімум наступний день
    minValueDate.setDate(minValueDate.getDate() + 1);
    // Використовуємо більше значення: або today, або minValue+1
    minDate = minValueDate > today ? minValueDate : today;
  }

  // Конвертуємо Date назад в CalendarDateTime
  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null);
      setIsOpen(false);

      return;
    }

    const calendarDate = new CalendarDateTime(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      0,
      0
    );

    onChange(calendarDate);
    setIsOpen(false); // Закрити після вибору
  };

  // Форматування дати для відображення
  const displayValue = selectedDate
    ? format(selectedDate, "dd MMMM yyyy", { locale: uk })
    : "Оберіть дату";

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <Input
          readOnly
          description={description}
          isInvalid={isInvalid}
          label={label}
          placeholder="Оберіть дату"
          value={displayValue === "Оберіть дату" ? "" : displayValue}
        />
      </div>

      {/* Календар у попапі */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white shadow-lg rounded-lg border border-gray-200">
          <CustomCalendar
            compact
            fromDate={minDate}
            selected={selectedDate}
            toDate={new Date(2030, 11, 31)}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}
