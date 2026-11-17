import { site } from '../site';
import { card } from '../ui';

export default function Contact() {
  const items = [
    ['WhatsApp', `+${site.wa}`, `https://wa.me/${site.wa}`, 'Cara tercepat untuk bertanya'],
    ['Instagram', `@${site.instagram}`, `https://instagram.com/${site.instagram}`, 'Lihat karya terbaru'],
    ['Email', site.email, `mailto:${site.email}`, 'Untuk pertanyaan yang panjang'],
  ];
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(([t, v, href, d]) => (
          <a key={t} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`${card} block transition hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none`}>
            <h3 className="text-xl">{t}</h3>
            <p className="mt-1 break-words font-semibold text-kayu underline">{v}</p>
            <p className="mt-1 text-sm text-redup">{d}</p>
          </a>
        ))}
      </div>
      <p className="mt-6 text-redup">{site.kota} · {site.jam} · {site.balas}</p>
    </>
  );
}
