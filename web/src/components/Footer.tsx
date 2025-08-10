import Link from "next/link";
import contactData from "../../public/information/contact.json";
import directorData from "../../public/information/director.json";
import { Dancing_Script } from "next/font/google";

type Company = { registered?: string; tourismLicense?: string; vat?: string };
type Rep = { country: string; name: string; phone: string; email: string };

export default function Footer() {
  const year = new Date().getFullYear();
  const company = (contactData as { company?: Company }).company || {};
  const reps = (contactData as { representatives?: Rep[] }).representatives || [];
  const directorNote = ((directorData as { message?: string[] }).message || [])[0] ||
    "Welcome to Nepal — we’re excited to help you plan an unforgettable journey.";
  const script = Dancing_Script({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-script" });

  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="container-px py-8 text-sm text-muted-foreground flex flex-col gap-4">
        <div className={`${script.className} text-base md:text-lg text-foreground/90`}>
          <Link href="/director" className="hover:underline">
            “{directorNote}” — Director’s note
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {year} AirPlus Nepal • Reg: {company.registered} • License: {company.tourismLicense} • VAT: {company.vat}</div>
          <nav className="flex items-center gap-4">
            <Link href="/treks" className="hover:text-foreground">Treks</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </nav>
        </div>

        {/* Mini reps bar (country only) */}
        {Array.isArray(reps) && reps.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-muted-foreground/80">Local reps:</span>
            {reps.map((r: Rep) => (
              <span key={r.email} className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                {flagEmoji(r.country)} {r.country}
              </span>
            ))}
            <span className="opacity-70">•</span>
            <Link href="/contact" className="underline">See details</Link>
          </div>
        )}
      </div>
    </footer>
  );
}

function flagEmoji(country: string): string {
  const m: Record<string, string> = {
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    Japan: "🇯🇵",
    USA: "🇺🇸",
  };
  return m[country] || "🌍";
}


