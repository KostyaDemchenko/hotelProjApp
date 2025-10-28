"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useState } from "react";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: (isPaid: boolean) => void;
};

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  onPaymentComplete,
}: PaymentModalProps) {
  const [processing, setProcessing] = useState(false);

  const handleMonobankPay = async () => {
    setProcessing(true);

    // Тут мав би бути запит до Monobank API для створення інвойсу
    // const invoice = await fetch('/api/monobank/create-invoice', {
    //   method: 'POST',
    //   body: JSON.stringify({ amount })
    // });
    // window.location.href = invoice.pageUrl;

    // Для демонстрації просто симулюємо успішну оплату
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setProcessing(false);
    onPaymentComplete(true);
    onClose();
  };

  const handleCancel = () => {
    onPaymentComplete(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Онлайн оплата</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-black-900 to-black-800 p-6 rounded-xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="6" fill="white" />
                  <path
                    d="M8 12h16M8 16h16M8 20h10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="text-xl font-bold">monobank</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">Сума до сплати:</p>
              <p className="text-3xl font-bold">{amount} грн</p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Безпечна оплата через Monobank Acquiring</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Підтримка Visa, Mastercard, Apple Pay, Google Pay</span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>3D Secure захист</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded border border-blue-200">
              ℹ️ Демонстраційна інтеграція. При натисканні `Оплатити` статус
              буде змінено на `Оплачено` без реального списання коштів.
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleCancel}>
            Скасувати
          </Button>
          <Button
            className="bg-gradient-to-br from-black-900 to-black-800 text-white"
            isLoading={processing}
            onPress={handleMonobankPay}
          >
            {processing
              ? "Обробка..."
              : `Оплатити ${amount} грн через Monobank`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
