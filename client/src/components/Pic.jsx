import Face from './Face';
import { GALLERY } from '../data';

// Efek berbeda per bahan supaya pelanggan bisa membayangkan hasilnya
const FILTER = [
  '[filter:grayscale(1)_contrast(1.15)]',
  '[filter:saturate(.7)_brightness(1.1)]',
  '[filter:saturate(.9)_brightness(1.2)_blur(.6px)]',
  '[filter:saturate(1.5)_contrast(1.1)]',
  '[filter:saturate(1.25)_contrast(1.2)_sepia(.15)]',
];

function People({ n }) {
  const c = ['#e8b996', '#c98e66', '#f0c7a6', '#b97d55', '#d9a67f'];
  const k = ['#c4577a', '#2f5d9e', '#2f7f86', '#8A4B2A', '#8a4f7d'];
  const r = [0, 13, 11, 9.5, 8.5, 8][n];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect width="100" height="100" fill="#E6D5BC" />
      {Array.from({ length: n }, (_, i) => {
        const x = (100 * (i + 0.5)) / n;
        const hy = 52 - (i % 2) * 6;
        return (
          <g key={i}>
            <ellipse cx={x} cy={hy + r * 2.6} rx={r * 1.7} ry={r * 1.9} fill={k[i]} />
            <circle cx={x} cy={hy} r={r} fill={c[i]} />
          </g>
        );
      })}
    </svg>
  );
}

function Silhouette({ y }) {
  return (
    <svg viewBox="0 0 60 84" className="mx-auto h-full text-[#16213a] dark:text-white">
      <g fill="currentColor" opacity=".25">
        <circle cx="30" cy="16" r="10" />
        <rect x="18" y="28" width="24" height="30" rx="8" />
        <rect x="20" y="56" width="8" height="26" />
        <rect x="32" y="56" width="8" height="26" />
      </g>
      <rect x="6" y="3" width="48" height={y - 3} fill="none" stroke="#8A4B2A" strokeWidth="2.5" strokeDasharray="5 3" />
    </svg>
  );
}

export default function Pic({ g, i, item, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gading ${className}`}>
      {g === 'bahan' && (
        <>
          <div className={`h-full w-full ${FILTER[i]}`}>
            <Face p={GALLERY[0]} slice className="block h-full w-full" />
          </div>
          {i < 2 && <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,.14)_0_1px,transparent_1px_4px)]" />}
          {i === 4 && <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.1)_0_1px,transparent_1px_3px)]" />}
        </>
      )}
      {g === 'orang' && <People n={[1, 2, 3, 5][i]} />}
      {g === 'badan' && <Silhouette y={item.y} />}
    </div>
  );
}
