import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Mountain, Map, Camera, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import GradientText from "@/components/GradientText";
import TrekCard from "@/components/TrekCard";
import FAQ from "@/components/FAQ";
import PlanForm from "@/components/PlanForm";
import MasonryGallery from "@/components/MasonryGallery";

async function readJson<T>(relative: string): Promise<T> {
  const file = path.join(process.cwd(), "public", relative);
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data) as T;
}

type HomeData = {
  hero: { title: string; subtitle: string; image: string };
  trekkingPackages: { name: string; duration: string; image: string; link: string }[];
  tourPackages: { name: string; duration: string; image: string; link: string }[];
  activities: { name: string; icon: string }[];
  testimonials: { name: string; text: string }[];
  gallery: { images: string[] };
  reviews: { score: number; countText: string };
};

type ContactData = {
  headOffice: { name: string; address: string; phones: string[]; whatsapp?: string; email: string };
};

export default async function Home() {
  const [home, contact] = await Promise.all([
    readJson<HomeData>("information/home.json"),
    readJson<ContactData>("information/contact.json"),
  ]);

  const iconFor = (name: string) => {
    switch (name) {
      case "Trekking":
        return <Mountain className="size-5" />;
      case "Cultural Tours":
        return <Camera className="size-5" />;
      default:
        return <Map className="size-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-noise">
      {/* Hero */}
      <section className="section container-px">
        <Hero title={home.hero.title} subtitle={home.hero.subtitle} image={home.hero.image} primaryHref="#trekking" secondaryHref="#tours" />
      </section>

      {/* Activities */}
      <section className="section container-px">
        <div className="grid gap-3 sm:grid-cols-3">
          {home.activities.map((a) => (
            <div key={a.name} className="glass rounded-2xl p-5 flex items-center gap-3">
              <div className="text-primary">{iconFor(a.name)}</div>
              <div className="text-sm/6 text-muted-foreground">{a.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick stats */}
      <section className="section container-px">
        <div className="grid gap-3 sm:grid-cols-4">
          {[{k:"Years",v:"12+"},{k:"Curated Treks",v:"100+"},{k:"Local Guides",v:"25+"},{k:"Support",v:"24/7"}].map((s)=>(
            <div key={s.k} className="rounded-2xl border border-white/10 p-5">
              <div className="text-2xl font-semibold">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trekking packages */}
      <section id="trekking" className="section container-px">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured Treks</h2>
          <Link href="/treks" className="text-sm text-muted-foreground hover:text-foreground">View all</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {home.trekkingPackages.map((p) => {
            const slug = p.link.split("/").filter(Boolean).pop() || "";
            return (
              <TrekCard
                key={p.name}
                title={p.name}
                slug={slug}
                region={"Nepal"}
                duration={p.duration}
                cover={p.image}
              />
            );
          })}
        </div>
      </section>

      {/* Tour packages */}
      <section id="tours" className="section container-px">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Cultural Tours</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {home.tourPackages.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-3xl border border-white/10">
              <div className="relative">
                <Image src={p.image} alt={p.name} width={960} height={600} className="h-56 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="text-white">
                    <div className="text-lg font-medium">{p.name}</div>
                    <div className="text-xs/5 opacity-80">{p.duration}</div>
                  </div>
                  <div className="text-xs text-white/70">Discover →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section container-px">
        <div className="grid gap-4 md:grid-cols-2">
          {home.testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6">
              <blockquote className="text-balance text-lg">“{t.text}”</blockquote>
              <div className="mt-3 text-sm text-muted-foreground">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section container-px">
        <h2 className="text-2xl md:text-3xl font-semibold"><GradientText>Moments from Nepal</GradientText></h2>
        <div className="mt-4">
          <MasonryGallery images={home.gallery.images} />
        </div>
      </section>

      {/* Why AirPlus */}
      <section className="section container-px">
        <h2 className="text-2xl md:text-3xl font-semibold">Why AirPlus Nepal</h2>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="text-lg font-medium">Certified & trusted</div>
            <p className="text-sm text-muted-foreground">Registered company with valid tourism licenses and VAT; decades of operational expertise.</p>
          </div>
          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="text-lg font-medium">Local expertise</div>
            <p className="text-sm text-muted-foreground">Local, trained guides with deep knowledge of trails, culture, and safety.</p>
          </div>
          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="text-lg font-medium">Tailor‑made itineraries</div>
            <p className="text-sm text-muted-foreground">We customize routes, acclimatization, and logistics to fit your fitness and time.</p>
          </div>
          <div className="glass rounded-2xl p-6 space-y-2">
            <div className="text-lg font-medium">Safety first</div>
            <p className="text-sm text-muted-foreground">Reliable communication, emergency plans, and ethical operations throughout.</p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="section container-px">
        <div className="rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div>
            <div className="text-2xl font-semibold">Ready for the Himalayas?</div>
            <div className="text-sm text-muted-foreground">Tell us your dates and goals—get a free custom plan.</div>
          </div>
          <Link href="#contact" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">Start planning</Link>
        </div>
      </section>

      {/* Reviews summary */}
      <section className="section container-px pb-16">
        <div className="glass rounded-3xl p-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Rated {home.reviews.score} / 5</div>
            <div className="text-sm text-muted-foreground">{home.reviews.countText}</div>
          </div>
          <Link href="/contact" className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition">Plan your trip</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container-px">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-3">
          <FAQ />
        </div>
      </section>

      {/* Contact (inline) + Plan form */}
      <section id="contact" className="section container-px pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold">Plan Your Trek</h2>
        <p className="text-sm text-muted-foreground mt-1">Tell us your dates and goals. We’ll craft an itinerary that matches your pace and acclimatization needs.</p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <PlanForm />
          </div>
          <div className="space-y-3">
            <div className="glass rounded-2xl p-6 space-y-2">
              <div className="text-lg font-medium">Contact</div>
              <div className="text-sm text-muted-foreground">{contact.headOffice.name}</div>
              <div className="text-sm text-muted-foreground">{contact.headOffice.address}</div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div className="inline-flex items-center gap-2"><Phone className="size-4" /> {contact.headOffice.phones.join(", ")}</div>
                <div className="inline-flex items-center gap-2"><Mail className="size-4" /> <a className="underline" href={`mailto:${contact.headOffice.email}`}>{contact.headOffice.email}</a></div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="font-medium mb-2">Why trek with us?</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Licensed guides & safety‑first planning</li>
                <li>Flexible itineraries with acclimatization days</li>
                <li>Local‑first, low‑impact travel ethos</li>
                <li>24/7 support during your trek</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
