"use client";
import { useEffect, useMemo, useState } from "react";

type Option = { label: string; value: string };

export default function PlanForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [trek, setTrek] = useState("");
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const base = "/information";
        const [homeRes] = await Promise.all([
          fetch(`${base}/home.json`).then((r) => r.json()),
        ]);
        type HomePkg = { name: string; link: string };
        const home = homeRes as { trekkingPackages?: HomePkg[]; tourPackages?: HomePkg[] };
        const trekLinks: string[] = (home?.trekkingPackages || []).map((p: HomePkg) => p.link);
        const tourLinks: string[] = (home?.tourPackages || []).map((p: HomePkg) => p.link);
        const slugs = [...trekLinks, ...tourLinks].map((l) => (l || "").split("/").filter(Boolean).pop()).filter(Boolean) as string[];
        const labels = [...(home?.trekkingPackages || []), ...(home?.tourPackages || [])].map((p: HomePkg & { name: string }) => p?.name).filter(Boolean);
        const opts: Option[] = labels.map((label: string, i: number) => ({ label, value: slugs[i] || label }));
        setOptions(opts);
      } catch {
        // ignore
      }
    }
    load();
  }, []);

  const countries = useMemo<Option[]>(() => {
    return ["United States","Australia","Canada","Nepal","Japan","United Kingdom","Germany","France","India","China","Singapore","Thailand"].map((c) => ({ label: c, value: c }));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const lines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      `Country: ${country || "-"}`,
      `Preferred: ${trek || "-"}`,
      `Dates: ${dates || "-"}`,
      "---",
      message || ""
    ];
    const payload = lines.join("\n").trim();

    let ok = false;
    try {
      const direct = await fetch("https://ntfy.sh/airplusnepal", {
        method: "POST",
        headers: { Priority: "high" },
        body: payload,
      });
      ok = direct.ok;
    } catch {
      ok = false;
    }

    if (!ok) {
      try {
        const res = await fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, country, trek, dates, message }),
        });
        const data = await res.json().catch(() => ({}));
        ok = !!(res.ok && data?.ok);
      } catch {
        ok = false;
      }
    }

    if (ok) {
      alert("Message sent! Thanks — we’ll reply shortly.");
      setStatus("Sent");
      setName(""); setEmail(""); setCountry(""); setTrek(""); setDates(""); setMessage("");
    } else {
      setStatus("Failed to send. Please email airplusnepal@gmail.com");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 p-4 md:p-5 space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input required placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} className="field" />
        <input required type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="field" />
        <select required value={country} onChange={(e)=>setCountry(e.target.value)} className="field">
          <option value="" disabled>Country</option>
          {countries.map((c)=> (<option key={c.value} value={c.value}>{c.label}</option>))}
        </select>
        <select value={trek} onChange={(e)=>setTrek(e.target.value)} className="field">
          <option value="">Preferred trek/tour (optional)</option>
          {options.map((o)=> (<option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
        <input placeholder="Dates (e.g., Oct 10–24)" value={dates} onChange={(e)=>setDates(e.target.value)} className="field md:col-span-2" />
      </div>
      <textarea placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} className="field min-h-[120px]" />
      <div className="flex items-center gap-3">
        <button className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition" type="submit">Send</button>
        {status && <span className="text-sm text-muted-foreground">{status}</span>}
      </div>
    </form>
  );
}


