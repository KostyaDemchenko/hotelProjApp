import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-05-29",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_DEVELOPER_TOKEN,
};

export const sanity = createClient(config);
export const urlFor = (src: any) => imageUrlBuilder(config).image(src);
