"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-full text-sm transition ${
        active ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10 bg-black/30">
      <div className="container-px h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">AirPlus Nepal</Link>
        <nav className="flex items-center gap-1">
          <NavLink href="/treks" label="Treks" />
          <NavLink href="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}


