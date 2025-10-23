//конфиг для подклюяения к нашим таблицам
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    `Missing Sanity environment variables. Please add:
    - NEXT_PUBLIC_SANITY_PROJECT_ID
    - NEXT_PUBLIC_SANITY_DATASET
    to your Vercel project settings or .env.local file.`
  );
}

/* 🔒 серверний: із token */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-12-01", // дата ≤ сьогодні
  token: process.env.SANITY_API_DEVELOPER_TOKEN,
  useCdn: false,
});

/* 🌐 браузерний: без token, лише для urlFor() */
export const sanityReadClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-12-01",
  useCdn: true,
});

export const urlFor = (src: any) =>
  imageUrlBuilder({ projectId, dataset }).image(src);
