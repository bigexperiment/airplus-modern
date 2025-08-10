import { promises as fs } from "node:fs";
import path from "node:path";
import PlanForm from "@/components/PlanForm";

type ContactData = {
  headOffice: { name: string; address: string; phones: string[]; whatsapp?: string; line?: string; email: string };
  representatives: { country: string; name: string; phone: string; email: string }[];
  company: { registered: string; tourismLicense: string; vat: string };
};

async function readContact(): Promise<ContactData> {
  const file = path.join(process.cwd(), "public/information/contact.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as ContactData;
}

export default async function ContactPage() {
  const data = await readContact();

  return (
    <div className="container-px section">
      <h1 className="text-3xl md:text-4xl font-semibold">Contact & Plan Your Trek</h1>
      <p className="mt-2 text-muted-foreground">We usually respond within 24 hours. Share your dates and goals below.</p>

      {/* Form + office */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <PlanForm />

          <div className="glass rounded-2xl p-5">
            <div className="font-medium">Head Office</div>
            <div className="text-sm text-muted-foreground mt-1">{data.headOffice.name}</div>
            <div className="text-sm text-muted-foreground">{data.headOffice.address}</div>
            <div className="mt-2 text-sm">
              <div>Phones: {data.headOffice.phones.join(", ")}</div>
              <div>Email: <a href={`mailto:${data.headOffice.email}`} className="underline">{data.headOffice.email}</a></div>
              {data.headOffice.whatsapp && (<div>WhatsApp: {data.headOffice.whatsapp}</div>)}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="font-medium mb-1">Company</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Reg: {data.company.registered}</div>
              <div>Tourism License: {data.company.tourismLicense}</div>
              <div>VAT: {data.company.vat}</div>
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="font-medium">Quick contact</div>
            <div className="text-sm text-muted-foreground mt-1">Email: <a className="underline" href={`mailto:${data.headOffice.email}`}>{data.headOffice.email}</a></div>
            {data.headOffice.whatsapp && (<div className="text-sm text-muted-foreground">WhatsApp: {data.headOffice.whatsapp}</div>)}
          </div>
        </aside>
      </div>

      {/* International representatives */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">International Representatives</h2>
        <p className="text-sm text-muted-foreground">Reach out to a local contact in your country.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.representatives.map((r) => {
            const flag = countryFlag(r.country);
            return (
              <div key={r.email} className="rounded-2xl border border-white/10 p-4 flex items-start gap-3">
                <div className="h-9 w-9 grid place-items-center rounded-full bg-white/10 text-lg">
                  <span aria-hidden>{flag}</span>
                </div>
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">{r.country} <span className="text-xs text-muted-foreground">{flagCode(r.country)}</span></div>
                  <div className="text-sm text-muted-foreground">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.phone}</div>
                  <div className="text-sm"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function countryFlag(name: string): string {
  const m: Record<string, string> = {
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    Japan: "🇯🇵",
    USA: "🇺🇸",
    Nepal: "🇳🇵",
    India: "🇮🇳",
    France: "🇫🇷",
    Germany: "🇩🇪",
    "United Kingdom": "🇬🇧",
  };
  return m[name] || "🌏";
}

function flagCode(name: string): string {
  const m: Record<string, string> = {
    Australia: "AU",
    Canada: "CA",
    Japan: "JP",
    USA: "US",
    Nepal: "NP",
    India: "IN",
    France: "FR",
    Germany: "DE",
    "United Kingdom": "GB",
  };
  return m[name] || "";
}


