import { parseISO } from "date-fns";

/**
 * Проверяет, находится ли дата в высоком сезоне (май-сентябрь)
 */
export function isHighSeason(date: Date): boolean {
  const month = date.getMonth(); // 0-11

  // Май (4) - Сентябрь (8) = высокий сезон
  return month >= 4 && month <= 8;
}

/**
 * Подсчитывает количество забронированных номеров на конкретную дату
 */
export function getBookedRoomsCount(
  date: Date,
  unavailableRanges: { from: string; to: string }[]
): number {
  const targetDate = new Date(date);

  targetDate.setHours(0, 0, 0, 0);

  let bookedCount = 0;

  for (const range of unavailableRanges) {
    const from = parseISO(range.from);
    const to = parseISO(range.to);

    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);

    // Проверяем, попадает ли дата в диапазон
    if (targetDate >= from && targetDate <= to) {
      bookedCount++;
    }
  }

  return bookedCount;
}

/**
 * Проверяет, все ли номера забронированы на конкретную дату
 */
export function isFullyBooked(
  date: Date,
  totalRooms: number,
  unavailableRanges: { from: string; to: string }[]
): boolean {
  const bookedCount = getBookedRoomsCount(date, unavailableRanges);

  return bookedCount >= totalRooms;
}

/**
 * Перевіряє, чи є день днем зі знижкою в ресторані
 * Перший вівторок, середа та четвер кожного місяця
 */
export function isRestaurantDiscountDay(date: Date): boolean {
  const dayOfWeek = date.getDay(); // 0 (неділя) - 6 (субота)
  const dayOfMonth = date.getDate();

  // Перевіряємо, чи це вівторок (2), середа (3) або четвер (4)
  const isCorrectDayOfWeek = dayOfWeek >= 2 && dayOfWeek <= 4;

  // Перевіряємо, чи це перший такий день місяця (дата від 1 до 7)
  const isFirstWeek = dayOfMonth >= 1 && dayOfMonth <= 7;

  return isCorrectDayOfWeek && isFirstWeek;
}

/**
 * Определяет тип даты для стилизации календаря
 * @returns 'fully-booked' | 'high-season' | 'normal'
 */
export function getDateType(
  date: Date,
  totalRooms: number,
  unavailableRanges: { from: string; to: string }[]
): "fully-booked" | "high-season" | "normal" {
  // Сначала проверяем, полностью ли забронированы номера
  if (isFullyBooked(date, totalRooms, unavailableRanges)) {
    return "fully-booked";
  }

  // Затем проверяем высокий сезон
  if (isHighSeason(date)) {
    return "high-season";
  }

  // Иначе обычный день
  return "normal";
}
