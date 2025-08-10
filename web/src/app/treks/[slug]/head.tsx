import { promises as fs } from "node:fs";
import path from "node:path";

type Trek = { title: string; coverImage?: string; images?: { src: string }[] };

async function getTrek(slug: string): Promise<Trek | null> {
  const file = path.join(process.cwd(), "public/information/treks", `${slug}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Trek;
  } catch {
    return null;
  }
}

export default async function Head({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = await getTrek(slug);
  const title = trek?.title ? `${trek.title} — AirPlus Nepal` : "Treks — AirPlus Nepal";
  const image = trek?.coverImage || trek?.images?.[0]?.src || "/images/everest-base-camp.jpg";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content="Discover curated trekking itineraries in Nepal with AirPlus Nepal." />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}


