"use client";

import { useState } from "react";

import CustomCalendar from "@/components/CustomCalendar";
import Container from "@/components/Container";
import { title } from "@/components/primitives";

export default function CalendarTestPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <main className="min-h-screen py-12">
      <Container>
        <h1 className={title({ size: "lg" })}>
          Тест календаря з візуалізацією
        </h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Календар</h2>
            <CustomCalendar
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || null)}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Інформація</h2>
            <div className="space-y-4">
              {selectedDate ? (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium">Вибрана дата:</p>
                  <p className="text-lg">
                    {selectedDate.toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Оберіть дату на календарі</p>
                </div>
              )}

              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-2">Легенда:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-200 opacity-60" />
                    <span>Червоний - всі номери зайняті (недоступно)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-200" />
                    <span>Жовтий - високий сезон (травень-вересень, +15%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white border border-gray-300" />
                    <span>Білий - звичайні дні (доступно)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-600" />
                    <span>Синій - вибрана дата</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
