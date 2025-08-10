import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Director = { name: string; title: string; photo: string; message: string[] };

async function readDirector(): Promise<Director> {
  const file = path.join(process.cwd(), "public/information/director.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Director;
}

export default async function DirectorPage() {
  const director = await readDirector();

  return (
    <div className="container-px section grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Image src={director.photo} alt={director.name} width={800} height={1000} className="w-full h-auto object-cover" />
        </div>
        <div className="mt-3">
          <div className="text-xl font-semibold">{director.name}</div>
          <div className="text-muted-foreground">{director.title}</div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        {(director.message || []).map((p, i) => (
          <p key={i} className="text-muted-foreground text-lg">{p}</p>
        ))}
        <p className="text-sm text-muted-foreground">— {director.name}, {director.title}</p>
      </div>
    </div>
  );
}


