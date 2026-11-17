import { site } from '../site';

export default function Footer() {
  return (
    <footer className="border-t border-garis bg-krem py-8 text-sm text-redup">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-lg text-tinta">{site.nama}</span>
        <nav aria-label="Menu bawah" className="flex flex-wrap gap-x-5 gap-y-1">
          <a href="#galeri">Galeri</a><a href="#harga">Harga</a><a href="#faq">FAQ</a><a href="#kontak">Kontak</a>
        </nav>
        <span>© {new Date().getFullYear()} {site.nama}</span>
      </div>
    </footer>
  );
}
