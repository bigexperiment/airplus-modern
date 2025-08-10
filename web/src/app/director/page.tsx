import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";

type Director = { name: string; title: string; photo: string; message: string[] };

async function readDirector(): Promise<Director> {
  const file = path.join(process.cwd(), "public/information/director.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Director;
}

export default async function DirectorPage() {
  const director = await readDirector();
  const script = Dancing_Script({ subsets: ["latin"], weight: ["400", "600"] });

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
        <p className={`${script.className} text-2xl`}>Namaste and welcome!</p>
        <p className="text-muted-foreground text-lg">I began my journey as a young porter in the hills, learned every bend of the trail as a guide, and built AirPlus Nepal to share the Himalayas with care and integrity. Our itineraries are crafted for real acclimatization, safety, and the joy of unhurried travel.</p>
        <p className="text-muted-foreground text-lg">We are a small, dedicated team of local experts—licensed guides, coordinators, and drivers—who treat every traveler like family. Whether you dream of Everest Base Camp, a quiet village homestay, or a cultural circuit in the Kathmandu Valley, we’ll tailor it to your pace and interests.</p>
        <p className={`text-muted-foreground text-lg ${script.className}`}>Dhanyabad—thank you—and we look forward to welcoming you to Nepal.</p>
      </div>
    </div>
  );
}


