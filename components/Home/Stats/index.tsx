"use client";

import CountUp from "react-countup";

import { subtitle } from "@/components/primitives";

interface StatItem {
  label: string;
  value: number | string;
}

interface StatsProps {
  data?: StatItem[];
  className?: string;
}

const defaultStats: StatItem[] = [
  { label: "Лет успішних на ринку", value: 15 },
  { label: "Задоволених клієнтів", value: 3412 },
  { label: "Наш рейтинг", value: 4.8 },
];

export default function Stats({ data = defaultStats, className }: StatsProps) {
  return (
    <div
      className={
        "flex flex-col items-start justify-center gap-4 md:flex-row" +
        (className || "")
      }
    >
      {data.map(({ label, value }, i) => (
        <div key={i} className="flex flex-col items-center w-[100%] md:w-[28%]">
          {typeof value === "number" ? (
            <CountUp
              className="text-2xl font-bold text-yellow-500"
              decimals={label.toLowerCase().includes("рейтинг") ? 1 : 0}
              duration={2.5}
              end={value}
            />
          ) : (
            <span className="text-2xl font-bold text-yellow-500">{value}</span>
          )}
          <p className={subtitle({ color: "muted", align: "center" })}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
