import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

type Trek = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  destination: string;
  maxElevation?: string;
  difficulty?: string;
  coverImage?: string;
  images?: { src: string; name?: string }[];
};

async function readTreks(): Promise<Trek[]> {
  const treksDir = path.join(process.cwd(), "public/information/treks");
  const files = await fs.readdir(treksDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const treks = await Promise.all(
    jsonFiles.map(async (f) => {
      const data = await fs.readFile(path.join(treksDir, f), "utf8");
      return JSON.parse(data) as Trek;
    })
  );
  return treks.sort((a, b) => a.title.localeCompare(b.title));
}

export default async function TreksPage() {
  const treks = await readTreks();
  return (
    <div className="section container-px">
      <h1 className="text-3xl md:text-4xl font-semibold">All Treks</h1>
      <p className="mt-2 text-muted-foreground">Curated Himalayan trekking experiences.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treks.map((t) => {
          const cover = t.coverImage || t.images?.[0]?.src || "/images/everest-base-camp.jpg";
          return (
            <Link key={t.slug} href={`/treks/${t.slug}`} className="group rounded-3xl overflow-hidden border border-white/10">
              <div className="relative">
                <Image src={cover} alt={t.title} width={960} height={640} className="h-56 w-full object-cover transition group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-lg font-medium">{t.title}</div>
                  <div className="text-white/70 text-xs">{t.region} • {t.duration}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


