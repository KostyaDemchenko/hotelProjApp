import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

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
