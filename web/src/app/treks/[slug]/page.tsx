import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";

type ItineraryItem = { day: number; title: string; description: string };
type Trek = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  destination: string;
  maxElevation?: string;
  difficulty?: string;
  accommodation?: string;
  transport?: string;
  coverImage?: string;
  images?: { src: string; name?: string }[];
  overview?: string[];
  highlights?: string[];
  itinerary: ItineraryItem[];
};

async function getTrek(slug: string): Promise<Trek | null> {
  const file = path.join(process.cwd(), "public/information/treks", `${slug}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Trek;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "public/information/treks");
  const files = await fs.readdir(dir);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ slug: f.replace(/\.json$/, "") }));
}

export default async function TrekDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) return notFound();

  const cover = trek.coverImage || trek.images?.[0]?.src || "/images/everest-base-camp.jpg";

  return (
    <div>
      {/* Dynamic metadata via page head tags */}
      {/* Cover */}
      <div className="relative h-[42svh] w-full overflow-hidden">
        <Image src={cover} alt={trek.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 md:from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-white text-3xl md:text-5xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">{trek.title}</h1>
          <p className="text-white/80 text-sm md:text-base mt-1">{trek.region} • {trek.duration}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-px section grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {trek.overview && (
            <div className="glass rounded-2xl p-6 space-y-3">
              {trek.overview.map((p, i) => (
                <p key={i} className="text-muted-foreground">{p}</p>
              ))}
            </div>
          )}
          {trek.images && (
            <div className="grid grid-cols-2 gap-3">
              {trek.images.map((img) => (
                <div className="overflow-hidden rounded-xl" key={img.src}>
                  <Image src={img.src} alt={img.name || trek.title} width={960} height={640} className="h-48 w-full object-cover hover:scale-[1.03] transition" />
                </div>
              ))}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
            <ol className="space-y-3">
              {trek.itinerary.map((d) => (
                <li key={d.day} className="glass rounded-xl p-4">
                  <div className="text-sm text-primary">Day {d.day}</div>
                  <div className="font-medium">{d.title}</div>
                  <div className="text-muted-foreground text-sm mt-1">{d.description}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <aside className="space-y-3">
          <div className="glass rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {trek.maxElevation && (<><div className="text-muted-foreground">Max Elevation</div><div>{trek.maxElevation}</div></>)}
              {trek.difficulty && (<><div className="text-muted-foreground">Difficulty</div><div>{trek.difficulty}</div></>)}
              {trek.accommodation && (<><div className="text-muted-foreground">Accommodation</div><div>{trek.accommodation}</div></>)}
              {trek.transport && (<><div className="text-muted-foreground">Transport</div><div>{trek.transport}</div></>)}
              <div className="text-muted-foreground">Destination</div><div>{trek.destination}</div>
            </div>
          </div>
          {trek.highlights && trek.highlights.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <div className="font-medium mb-2">Highlights</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                {trek.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </div>
          )}
          <div className="glass rounded-2xl p-5">
            <div className="font-medium">Ready to trek?</div>
            <p className="text-sm text-muted-foreground mt-1">Contact us to customize your itinerary and dates.</p>
            <a href="/contact" className="mt-3 inline-block px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium">Plan with AirPlus</a>
          </div>
        </aside>
      </div>
    </div>
  );
}


