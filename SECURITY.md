# 🛡️ Документація з безпеки додатку

## Огляд

Незважаючи на використання зовнішнього сервісу (Sanity CMS) замість власної бази даних, додаток має кілька рівнів захисту від можливих атак.

---

## 10 Рівнів Захисту

### 1️⃣ Rate Limiting (Обмеження кількості запитів)

**Що захищає:** DDoS атаки, спам, автоматизовані атаки

**Реалізація:**

- Максимум 5 запитів на бронювання за 1 хвилину з одного IP
- Використовується Map для зберігання лічильників
- Автоматичне скидання після закінчення таймауту

**Код:**

```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (limit.count >= 5) {
    return false; // Блокуємо
  }

  limit.count++;
  return true;
}
```

---

### 2️⃣ Валідація вхідних даних (Zod Schema)

**Що захищає:** Некоректні дані, переповнення буферів, невалідні типи

**Реалізація:**

- Використання Zod для строгої типізації
- Перевірка формату UUID, дат, телефонів, імен
- Обмеження довжини рядків та діапазонів чисел

**Приклад:**

```typescript
const bookingSchema = z.object({
  roomId: z.string().uuid(),
  payload: z.object({
    user_name: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[\p{L}\s'-]+$/u),
    user_phone: z.string().regex(/^\+?[0-9\s\-]{7,15}$/),
    rent_price: z.number().positive().max(1000000),
    people_count: z.number().int().min(1).max(10),
  }),
});
```

---

### 3️⃣ XSS Санітизація (Cross-Site Scripting)

**Що захищає:** Впровадження шкідливого JavaScript коду

**Реалізація:**

- Екранування спеціальних HTML символів: `< > " ' &`
- Застосовується до всіх текстових полів від користувача
- Очищення пробілів (trim)

**Код:**

```typescript
function sanitizeString(str: string): string {
  return str
    .replace(/[<>"'&]/g, (char) => {
      const entities: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return entities[char] || char;
    })
    .trim();
}
```

---

### 4️⃣ IP Tracking

**Що захищає:** Відстеження джерела запитів

**Реалізація:**

- Витягування IP з header `x-forwarded-for`
- Використовується для rate limiting
- Логування підозрілої активності

---

### 5️⃣ Schema Validation на рівні API

**Що захищає:** Модифіковані запити, обхід клієнтської валідації

**Реалізація:**

- Подвійна валідація: на клієнті (форма) і на сервері (API)
- Сервер **не довіряє** клієнту
- Перевірка всіх полів перед записом в БД

---

### 6️⃣ Бізнес-логіка валідації дат

**Що захищає:** Некоректні бронювання, маніпуляції з датами

**Перевірки:**

- ✅ Дата виїзду > дата заїзду
- ✅ Дата заїзду в майбутньому
- ✅ Формат дат валідний (ISO)
- ✅ Дати існують (не 32 лютого)

**Код:**

```typescript
if (toDate <= fromDate) {
  return NextResponse.json(
    { error: "Дата виїзду має бути пізніше дати заїзду" },
    { status: 400 }
  );
}

if (!isFuture(fromDate)) {
  return NextResponse.json(
    { error: "Дата заїзду має бути в майбутньому" },
    { status: 400 }
  );
}
```

---

### 7️⃣ Параметризовані запити (GROQ Injection Protection)

**Що захищає:** Injection атаки на Sanity

**Реалізація:**

- Використання параметрів замість конкатенації рядків
- Sanity автоматично екранує параметри
- Немає можливості впровадити шкідливий GROQ код

**Безпечно:**

```typescript
await sanityClient.fetch(
  `*[_type=="room" && _id==$id][0]`,
  { id: roomId } // Параметр передається окремо
);
```

**Небезпечно (НЕ використовується):**

```typescript
// ❌ НЕ РОБИТИ ТАК:
await sanityClient.fetch(
  `*[_type=="room" && _id=="${roomId}"][0]` // Вразливо до injection
);
```

---

### 8️⃣ Data Sanitization перед збереженням

**Що захищає:** Шкідливі дані в БД, XSS при виведенні

**Реалізація:**

- Санітизація перед записом в Sanity
- Подвійний захист: при вводі та виводі
- Чисті дані в базі

---

### 9️⃣ Приховування помилок на продакшені

**Що захищає:** Розкриття структури системи, витік чутливої інформації

**Реалізація:**

- В development: повні деталі помилок
- В production: загальні повідомлення
- Stack trace тільки в логах сервера

**Код:**

```typescript
return NextResponse.json(
  {
    error: "Помилка сервера",
    ...(process.env.NODE_ENV === "development" && {
      details: e.message,
      stack: e.stack,
    }),
  },
  { status: 500 }
);
```

---

### 🔟 CORS (Cross-Origin Resource Sharing)

**Що захищає:** Несанкціонований доступ з інших доменів

**Реалізація:**

- Обмеження доменів які можуть робити запити
- Дозволені методи: POST, OPTIONS
- Налаштовується через змінну `NEXT_PUBLIC_APP_URL`

---

## Додаткові рівні захисту

### 🔐 HTTPS/TLS

- Всі дані передаються в зашифрованому вигляді
- Захист від man-in-the-middle атак
- Сертифікат SSL/TLS

### 🔑 Sanity токен (Bearer Auth)

- API токен з обмеженими правами
- Токен зберігається тільки на сервері (не передається клієнту)
- Змінна `SANITY_API_DEVELOPER_TOKEN` в `.env.local`
- Можна відкликати та перевипустити токен

### 🎯 Environment Variables

- Чутливі дані (токени, ключі) в `.env.local`
- Не потрапляють в Git (через `.gitignore`)
- Окремі змінні для клієнта (`NEXT_PUBLIC_*`) та сервера

---

## Що можна покращити

### 1. Redis для Rate Limiting

Замість Map використовувати Redis для distributed rate limiting:

```typescript
import Redis from "ioredis";
const redis = new Redis();

await redis.incr(`rate:${ip}`);
await redis.expire(`rate:${ip}`, 60);
```

### 2. JWT Authentication

Додати авторизацію користувачів:

```typescript
const token = jwt.sign({ userId }, SECRET_KEY);
```

### 3. CAPTCHA

Додати Google reCAPTCHA для захисту відботів

### 4. Webhook Signatures

Перевірка підпису webhook від Monobank:

```typescript
const signature = crypto
  .createHmac("sha256", WEBHOOK_SECRET)
  .update(body)
  .digest("hex");
```

### 5. CSP (Content Security Policy)

Додати HTTP headers:

```typescript
headers: {
  'Content-Security-Policy': "default-src 'self'",
}
```

---

## Висновок

**Навіть з використанням Sanity (зовнішнього сервісу), додаток має 10 рівнів захисту:**

1. ✅ Rate Limiting
2. ✅ Input Validation (Zod)
3. ✅ XSS Sanitization
4. ✅ IP Tracking
5. ✅ API Schema Validation
6. ✅ Business Logic Validation
7. ✅ Parameterized Queries
8. ✅ Data Sanitization
9. ✅ Error Hiding (Production)
10. ✅ CORS

**Додатково:**

- 🔐 HTTPS/TLS шифрування
- 🔑 Bearer Token аутентифікація (Sanity)
- 🎯 Environment Variables

Це забезпечує комплексний захист від найпоширеніших веб-вразливостей: SQL/NoSQL Injection, XSS, CSRF, DDoS, Rate Abuse.
