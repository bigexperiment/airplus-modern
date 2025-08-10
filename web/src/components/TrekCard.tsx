import Image from "next/image";
import Link from "next/link";

export default function TrekCard({
  title,
  slug,
  region,
  duration,
  maxElevation,
  difficulty,
  cover,
}: {
  title: string;
  slug: string;
  region: string;
  duration: string;
  maxElevation?: string;
  difficulty?: string;
  cover: string;
}) {
  return (
    <Link href={`/treks/${slug}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-black/20">
      <div className="relative">
        <Image src={cover} alt={title} width={960} height={640} className="h-56 w-full object-cover transition group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15">
          {difficulty || "Moderate"}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white text-lg font-medium">{title}</div>
          <div className="text-white/70 text-xs">{region} • {duration}</div>
          <div className="text-white/60 text-[11px] mt-1">{maxElevation || "—"}</div>
        </div>
      </div>
    </Link>
  );
}


