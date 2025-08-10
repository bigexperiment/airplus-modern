"use client";
import * as Accordion from "@radix-ui/react-accordion";

export default function FAQ() {
  const items = [
    { q: "Do I need a guide?", a: "We strongly recommend licensed local guides for safety, culture, and logistics." },
    { q: "What fitness level is required?", a: "Most itineraries are moderate; we tailor acclimatization and pace to your experience." },
    { q: "Is tap water safe?", a: "No. Use boiled or filtered water. We can arrange purification systems." },
    { q: "Can I charge devices?", a: "Yes, at tea houses (small fees). We also recommend a power bank." },
  ];
  return (
    <Accordion.Root type="multiple" className="grid md:grid-cols-2 gap-3">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q} className="rounded-2xl border border-white/10 overflow-hidden">
          <Accordion.Header>
            <Accordion.Trigger className="w-full text-left px-4 py-3 hover:bg-white/5">{item.q}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}


