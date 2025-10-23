//запрос на получение всех номеров для нашей формы
import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-12-01",
  useCdn: true, // читання можна через CDN
});

export async function GET() {
  const rooms = await sanity.fetch(
    `*[_type=="room"]{_id, room_name, room_price} | order(room_name asc)`
  );

  return NextResponse.json({ rooms });
}
