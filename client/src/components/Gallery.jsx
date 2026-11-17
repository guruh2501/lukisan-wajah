import Face from './Face';
import { GALLERY } from '../data';

// Posisi tersebar untuk layar lebar: kiri (%), atas (px), kemiringan (derajat)
const POS = [
  { l: '3%', t: 10, r: -6 }, { l: '27%', t: 0, r: 3 }, { l: '51%', t: 24, r: -3 }, { l: '75%', t: 6, r: 5 },
  { l: '8%', t: 400, r: 4 }, { l: '32%', t: 420, r: -5 }, { l: '56%', t: 395, r: 2 }, { l: '79%', t: 410, r: -4 },
];

function Polaroid({ p, onPick, className = '', style }) {
  return (
    <button
      type="button"
      onClick={() => onPick({ bahan: p.m, ukuran: p.s })}
      style={style}
      className={`rotate-[var(--r)] bg-white p-2.5 pb-3 text-left shadow-lg transition duration-300 hover:z-20 hover:rotate-0 hover:scale-105 focus-visible:z-20 focus-visible:rotate-0 motion-reduce:transition-none ${className}`}
    >
      <Face p={p} />
      <span className="mt-2 block font-display text-base leading-tight">{p.t}</span>
      <span className="block text-xs text-redup">{p.m} · {p.s} · {p.o}</span>
      <span className="mt-1 block text-xs font-semibold text-kayu underline">Pesan yang seperti ini</span>
    </button>
  );
}

export default function Gallery({ onPick }) {
  return (
    <>
      {/* Layar lebar: tersebar seperti foto di meja kerja */}
      <div className="relative mx-auto hidden h-[780px] md:block lg:h-[820px]">
        {GALLERY.map((p, i) => (
          <Polaroid key={p.id} p={p} onPick={onPick} className="absolute w-[21%] max-w-[210px]" style={{ left: POS[i].l, top: POS[i].t, '--r': `${POS[i].r}deg` }} />
        ))}
      </div>
      {/* HP: dua kolom dengan kemiringan bergantian */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {GALLERY.map((p, i) => (
          <Polaroid key={p.id} p={p} onPick={onPick} style={{ '--r': `${i % 2 ? 2 : -2}deg` }} />
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-redup">Ketuk satu lukisan untuk memesan yang seperti itu.</p>
    </>
  );
}
