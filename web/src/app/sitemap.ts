import { MetadataRoute } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://airplusnepal.com";
  const treksDir = path.join(process.cwd(), "public/information/treks");
  const files = await fs.readdir(treksDir);
  const treks = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/treks`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/director`, lastModified: new Date() },
    ...treks.map((slug) => ({ url: `${baseUrl}/treks/${slug}`, lastModified: new Date() })),
  ];
}


