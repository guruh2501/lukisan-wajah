import { useState } from "react";
import { btn } from "../ui";
import { site } from "../site";

const links = [
  ["Galeri", "#galeri"],
  ["Tentang", "#tentang"],
  ["Cara pesan", "#cara-pesan"],
  ["Harga", "#harga"],
  ["FAQ", "#faq"],
  ["Kontak", "#kontak"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-garis bg-krem/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#atas" className="font-display text-xl">
          {site.nama}
        </a>
        <nav
          aria-label="Menu utama"
          className="hidden items-center gap-6 text-sm font-medium lg:flex"
        >
          {links.map(([t, h]) => (
            <a key={h} href={h} className="text-redup hover:text-tinta">
              {t}
            </a>
          ))}
          <a href="#pesan" className={`${btn} !min-h-10 !px-4 !py-2 text-sm`}>
            Pesan sekarang
          </a>
        </nav>
        <button
          type="button"
          className="rounded-md border-2 border-tinta px-3 py-2 text-sm font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Menu utama"
          className="border-t border-garis px-5 pb-5 lg:hidden"
        >
          {links.map(([t, h]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="block border-b border-garis py-3 text-lg"
            >
              {t}
            </a>
          ))}
          <a
            href="#pesan"
            onClick={() => setOpen(false)}
            className={`${btn} mt-4 w-full`}
          >
            Pesan sekarang
          </a>
        </nav>
      )}
    </header>
  );
}
