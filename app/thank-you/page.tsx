"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react"; // іконка
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

export default function ThankYouPage() {
  return (
    <main className="flex items-center justify-center min-h-[85dvh] p-6">
      <Card className="w-full max-w-md text-center p-8 space-y-6 shadow-lg">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />

        <h1 className="text-2xl font-semibold">
          Дякуємо&nbsp;за&nbsp;бронювання!
        </h1>

        <p className="text-default-600">
          Ми вже отримали ваш запит і невдовзі зв&rsquo;яжемося з&nbsp;вами
          для&nbsp;підтвердження деталей.
        </p>

        <Link href="/">
          <Button color="primary">Повернутися на головну</Button>
        </Link>
      </Card>
    </main>
  );
}
