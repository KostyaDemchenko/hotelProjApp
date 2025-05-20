"use client";

import CountUp from "react-countup";

import { subtitle } from "@/components/primitives";

const statsData = [
  { label: "Лет успешных на рынке", value: 15 },
  { label: "Довольных клиентов", value: 3412 },
  { label: "Наш рейтинг", value: 4.8 },
];

export default function Stats() {
  return (
    <div className="flex flex-wrap justify-center max-w-[75%] w-full">
      {statsData.map(({ label, value }, i) => (
        <div key={i} className="flex flex-col items-center w-[33%]">
          <CountUp
            className="text-4xl font-bold text-yellow-500"
            decimals={label === "Наш рейтинг" ? 1 : 0}
            duration={2.5}
            end={value}
          />
          <p className={subtitle({ color: "muted" })}>{label}</p>
        </div>
      ))}
    </div>
  );
}
