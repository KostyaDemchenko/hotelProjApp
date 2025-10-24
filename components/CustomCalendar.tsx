"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { uk } from "date-fns/locale";

import "react-day-picker/dist/style.css";
import { getDateType } from "@/lib/calendar-utils";

interface CustomCalendarProps {
  selected?: Date | null;
  onSelect?: (date: Date | undefined) => void;
  disabled?: Date | Date[];
  className?: string;
  mode?: "single" | "range";
  fromDate?: Date; // Мінімальна доступна дата
  toDate?: Date;
  compact?: boolean; // Компактний режим для форм
}

export default function CustomCalendar({
  selected,
  onSelect,
  disabled,
  className = "",
  mode = "single",
  fromDate,
  toDate,
  compact = false,
}: CustomCalendarProps) {
  const [calendarData, setCalendarData] = useState<{
    totalRooms: number;
    unavailableRanges: { from: string; to: string }[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/bookings-calendar")
      .then((res) => res.json())
      .then((data) => setCalendarData(data))
      .catch(() => {
        setCalendarData({ totalRooms: 0, unavailableRanges: [] });
      });
  }, []);

  // Функция для определения disabled дат
  const isDateDisabled = (date: Date) => {
    const dateToCheck = new Date(date);

    dateToCheck.setHours(0, 0, 0, 0);

    // 1. Блокуємо минулі дати
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (dateToCheck < today) return true;

    // 2. Блокуємо дати < fromDate (якщо fromDate задано)
    if (fromDate) {
      const minDate = new Date(fromDate);

      minDate.setHours(0, 0, 0, 0);
      if (dateToCheck < minDate) return true;
    }

    // 3. Блокуємо повністю заброньовані дати
    if (!calendarData) return false;

    return (
      getDateType(
        date,
        calendarData.totalRooms,
        calendarData.unavailableRanges
      ) === "fully-booked"
    );
  };

  // Модификаторы для стилизации дней
  const modifiers = {
    fullyBooked: (date: Date) => {
      if (!calendarData) return false;

      return (
        getDateType(
          date,
          calendarData.totalRooms,
          calendarData.unavailableRanges
        ) === "fully-booked"
      );
    },
    highSeason: (date: Date) => {
      if (!calendarData) return false;

      return (
        getDateType(
          date,
          calendarData.totalRooms,
          calendarData.unavailableRanges
        ) === "high-season"
      );
    },
  };

  const disabledDays = [
    ...(Array.isArray(disabled) ? disabled : disabled ? [disabled] : []),
    isDateDisabled,
  ];

  return (
    <div
      className={`custom-calendar-wrapper ${compact ? "compact-mode" : ""} ${className}`}
    >
      <DayPicker
        className="rdp-custom"
        disabled={disabledDays}
        fromDate={fromDate}
        locale={uk}
        mode={mode as any}
        modifiers={modifiers}
        modifiersClassNames={{
          fullyBooked: "fully-booked-day",
          highSeason: "high-season-day",
          selected: "rdp-day_selected",
          today: "rdp-day_today",
          disabled: "rdp-day_disabled",
        }}
        selected={selected || undefined}
        toDate={toDate}
        onSelect={onSelect}
      />
      {/* Завжди показуємо легенду */}
      <div
        className={`calendar-legend ${compact ? "mt-3" : "mt-4"} flex flex-col gap-2 ${compact ? "text-xs" : "text-sm"}`}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded bg-red-300 opacity-80 flex items-center justify-center"
            style={{ fontSize: "6px" }}
          >
            🚫
          </div>
          <span className="text-gray-700">Зайнято</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-200" />
          <span className="text-gray-700">Високий сезон +15%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-white border border-gray-300" />
          <span className="text-gray-700">Звичайна ціна</span>
        </div>
      </div>
    </div>
  );
}
