import { useState } from "react";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { uk } from "date-fns/locale";
import Container from "@/components/Container";

export default function BookingSection() {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleBookingCheck = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Будь ласка, виберіть дати заселення та виселення");

      return;
    }

    // Будуємо параметри запиту
    const params = new URLSearchParams({
      checkIn: checkInDate.toISOString ? checkInDate.toISOString() : "",
      checkOut: checkOutDate.toISOString ? checkOutDate.toISOString() : "",
      adults: adults.toString(),
      children: children.toString(),
    });

    // Перенаправлення на сторінку кімнат з параметрами
    router.push(`/rooms?${params.toString()}`);
  };

  // Функції для обробки вибору дат
  const handleCheckInChange = (date: Date | null) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date: Date) => {
    setCheckOutDate(date);
  };
  // Форматування дати для відображення
  const formatDate = (date: string | number | Date) => {
    if (!date) return "";

    return format(new Date(date), "dd MMMM yyyy", { locale: uk });
  };

  return (
    <div className="w-full bg-blue-100 p-6">
      <Container>
        <h2 className="text-2xl font-bold mb-4 text-black-800">
          Забронювати номер
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Дата заселення */}
          <div>
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="check-in-date"
            >
              Дата заселення
            </label>
            <div className="relative">
              <input
                className="w-full p-2 pl-10 bg-white border border-black-300 rounded-md"
                id="check-in-date"
                type="date"
                value={
                  checkInDate ? format(new Date(checkInDate), "yyyy-MM-dd") : ""
                }
                onChange={(e) =>
                  handleCheckInChange(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
              />
            </div>
            {checkInDate && (
              <p className="text-sm mt-1 text-black-600">
                {formatDate(checkInDate)}
              </p>
            )}
          </div>

          {/* Дата виселення */}
          <div>
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="check-out-date"
            >
              Дата виселення
            </label>
            <div className="relative">
              <input
                className="w-full p-2 pl-10 bg-white border border-black-300 rounded-md"
                id="check-out-date"
                min={
                  checkInDate ? format(new Date(checkInDate), "yyyy-MM-dd") : ""
                }
                type="date"
                value={
                  checkOutDate
                    ? format(new Date(checkOutDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;

                  if (date !== null) {
                    handleCheckOutChange(date);
                  } else {
                  }
                }}
              />
            </div>
            {checkOutDate && (
              <p className="text-sm mt-1 text-black-600">
                {formatDate(checkOutDate)}
              </p>
            )}
          </div>

          {/* Кількість дорослих */}
          <div>
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="adults-select"
            >
              Дорослі
            </label>
            <div className="relative">
              <select
                className="w-full p-2 pl-10 bg-white border border-black-300 rounded-md appearance-none"
                id="adults-select"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}{" "}
                    {num === 1 ? "дорослий" : num < 5 ? "дорослих" : "дорослих"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Кількість дітей */}
          <div>
            <label
              className="block text-sm font-medium text-black-700 mb-1"
              htmlFor="children-select"
            >
              Діти
            </label>
            <div className="relative">
              <select
                className="w-full p-2 pl-10 bg-white border border-black-300 rounded-md appearance-none"
                id="children-select"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}{" "}
                    {num === 0
                      ? "дітей"
                      : num === 1
                        ? "дитина"
                        : num < 5
                          ? "дитини"
                          : "дітей"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Кнопка перевірки */}
        <button
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-black-900 font-bold py-3"
          onClick={handleBookingCheck}
        >
          Перевірити наявність місць
        </button>
      </Container>
    </div>
  );
}
