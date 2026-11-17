import Face from './Face';
import { GALLERY } from '../data';
import { site } from '../site';
import { btnGhost } from '../ui';

export default function About() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[280px_1fr] md:gap-12">
      <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border-4 border-pasir shadow-lg md:h-72 md:w-72">
        <Face p={GALLERY[4]} slice className="block h-full w-full" />
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl">Halo, saya {site.pelukis}</h3>
        <p className="mt-3 max-w-xl text-lg text-redup">
          [Tulis ceritamu: sejak kapan melukis, bahan favoritmu, dan kenapa kamu suka melukis wajah.] Setiap pesanan dikerjakan sendiri dari awal, tanpa cetak ulang.
        </p>
        <ul className="mt-4 grid gap-1.5">
          <li>✓ [Pengalaman melukis, misalnya jumlah tahun]</li>
          <li>✓ [Pendidikan atau pelatihan seni, bila ada]</li>
          <li>✓ [Pameran atau karya yang pernah dibuat, bila ada]</li>
        </ul>
        <a href={`https://wa.me/${site.wa}`} target="_blank" rel="noreferrer" className={`${btnGhost} mt-6`}>Ngobrol dengan pelukis</a>
      </div>
    </div>
  );
}
