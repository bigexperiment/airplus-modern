"use client";
import Link from "next/link";

function digitsOnly(input: string): string {
  return (input || "").replace(/\D/g, "");
}

export default function WhatsAppFab({ phone }: { phone: string | undefined }) {
  if (!phone) return null;
  const href = `https://wa.me/${digitsOnly(phone)}`;
  return (
    <Link
      href={href}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 hover:scale-[1.03] transition"
      aria-label="Chat on WhatsApp"
    >
      {/* Simple WhatsApp glyph */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M20.52 3.48A11.77 11.77 0 0 0 12.01.25C5.67.25.5 5.42.5 11.76c0 2.05.54 4.06 1.57 5.84L.25 23.75l6.32-1.76c1.72.94 3.66 1.43 5.64 1.43 6.34 0 11.51-5.17 11.51-11.51 0-3.07-1.19-5.96-3.2-8.43zM12.21 21.1c-1.77 0-3.49-.47-4.99-1.36l-.36-.21-3.75 1.05 1.04-3.64-.24-.37a9.3 9.3 0 0 1-1.46-5.02c0-5.14 4.18-9.32 9.32-9.32a9.27 9.27 0 0 1 9.31 9.32c0 5.14-4.18 9.32-9.31 9.32zm5.38-6.97c-.29-.15-1.68-.82-1.94-.92-.26-.1-.45-.15-.65.15s-.74.92-.91 1.11c-.17.19-.34.21-.63.08-.29-.13-1.21-.45-2.31-1.44a8.65 8.65 0 0 1-1.6-1.98c-.17-.3-.02-.46.12-.61.12-.12.29-.32.44-.48.15-.16.2-.27.3-.45.1-.19.05-.35-.03-.5-.08-.15-.65-1.57-.89-2.15-.23-.55-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.77.35-.26.28-1 .97-1 2.37 0 1.4 1.02 2.75 1.17 2.94.14.19 2.01 3.07 4.88 4.31.68.29 1.22.47 1.63.6.68.22 1.3.19 1.79.11.55-.09 1.68-.69 1.92-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.2-.55-.34z"/>
      </svg>
    </Link>
  );
}


