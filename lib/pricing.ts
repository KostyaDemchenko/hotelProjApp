/**
 * Утилита для расчета цены бронирования с учетом сезонности и длительности
 */

/**
 * Определяет сезонный коэффициент для даты
 * Высокий сезон (май-сентябрь): +15%
 * Низкий сезон (октябрь-апрель): базовая цена
 */
function getSeasonalMultiplier(date: Date): number {
  const month = date.getMonth(); // 0-11

  // Май (4) - Сентябрь (8) = высокий сезон
  if (month >= 4 && month <= 8) {
    return 1.15; // +15%
  }

  return 1.0; // базовая цена
}

/**
 * Определяет скидку за длительность бронирования
 * 3-6 дней: -5%
 * 7-13 дней: -10%
 * 14+ дней: -15%
 */
function getDurationDiscount(nights: number): number {
  if (nights >= 14) {
    return 0.15; // -15%
  }

  if (nights >= 7) {
    return 0.1; // -10%
  }

  if (nights >= 3) {
    return 0.05; // -5%
  }

  return 0; // нет скидки
}

/**
 * Рассчитывает итоговую цену с учетом всех факторов
 *
 * @param basePrice - базовая цена за ночь
 * @param checkIn - дата заселения
 * @param checkOut - дата выселения
 * @param nights - количество ночей
 * @returns объект с детальным расчетом цены
 */
export function calculatePrice(
  basePrice: number,
  checkIn: Date,
  checkOut: Date,
  nights: number
) {
  // Рассчитываем среднее сезонное повышение для периода
  let totalSeasonalMultiplier = 0;
  const currentDate = new Date(checkIn);

  for (let i = 0; i < nights; i++) {
    totalSeasonalMultiplier += getSeasonalMultiplier(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const avgSeasonalMultiplier = totalSeasonalMultiplier / nights;

  // Рассчитываем скидку за длительность
  const durationDiscount = getDurationDiscount(nights);

  // Формула расчета:
  // 1. Применяем сезонный коэффициент к базовой цене
  // 2. Умножаем на количество ночей
  // 3. Применяем скидку за длительность
  const priceWithSeason = basePrice * avgSeasonalMultiplier * nights;
  const discountAmount = priceWithSeason * durationDiscount;
  const finalPrice = priceWithSeason - discountAmount;

  return {
    basePrice, // базовая цена за ночь
    nights, // количество ночей
    subtotal: basePrice * nights, // базовая сумма без учета сезона
    seasonalMultiplier: avgSeasonalMultiplier, // средний сезонный коэффициент
    priceWithSeason, // цена с учетом сезона
    durationDiscount, // процент скидки за длительность
    discountAmount, // сумма скидки в гривнах
    finalPrice: Math.round(finalPrice), // итоговая цена (округленная)
  };
}

/**
 * Упрощенная версия для быстрого расчета итоговой цены
 */
export function calculateFinalPrice(
  basePrice: number,
  checkIn: Date,
  checkOut: Date,
  nights: number
): number {
  return calculatePrice(basePrice, checkIn, checkOut, nights).finalPrice;
}
