"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useMemo, useState } from "react";

export default function MasonryGallery({ images }: { images: string[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const shuffled = useMemo(() => {
    const arr = Array.from(new Set(images.filter(Boolean)));
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [images]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
        {shuffled.map((src) => (
          <button
            key={src}
            type="button"
            className="mb-3 overflow-hidden rounded-xl focus:outline-none group w-full"
            onClick={() => { setActive(src); setOpen(true); }}
          >
            {/* native img for natural masonry heights */}
            <img src={src} alt="Gallery" loading="lazy" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform" />
          </button>
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80" />
          <Dialog.Content className="fixed inset-0 grid place-items-center p-4">
            {active && (
              <img src={active} alt="Preview" className="max-h-[90svh] max-w-[95vw] rounded-xl" />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}


