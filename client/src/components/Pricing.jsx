import { OPT, rp } from '../data';
import { card } from '../ui';

const price = (b, f) => Math.round((b * f) / 10000) * 10000;

export default function Pricing() {
  const sizes = OPT.ukuran.items;
  return (
    <>
      <p className="mb-3 text-sm text-redup">Harga mulai untuk 1 orang, wajah saja. Geser tabel ke samping di layar kecil.</p>
      <div className="overflow-x-auto rounded-2xl border border-garis bg-white">
        <table className="w-full min-w-[520px] text-left">
          <thead className="bg-gading/60">
            <tr>
              <th className="p-3 font-semibold">Bahan</th>
              {sizes.map((s) => <th key={s.n} className="p-3 font-semibold">{s.n}<span className="block text-xs font-normal text-redup">{s.s}</span></th>)}
            </tr>
          </thead>
          <tbody>
            {OPT.bahan.items.map((b) => (
              <tr key={b.n} className="border-t border-garis">
                <th scope="row" className="p-3 font-semibold">{b.n}</th>
                {sizes.map((s) => <td key={s.n} className="p-3">{rp(price(s.b, b.f))}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {['orang', 'badan'].map((g) => (
          <div key={g} className={card}>
            <h3 className="text-xl">Pengali {OPT[g].title.toLowerCase()}</h3>
            <ul className="mt-2">
              {OPT[g].items.map((it) => (
                <li key={it.n} className="flex justify-between border-b border-garis py-2 text-sm last:border-0"><span>{it.n}{it.s ? ` (${it.s})` : ''}</span><b>×{it.f}</b></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-redup">Harga akhir = harga ukuran × pengali bahan × pengali jumlah orang × pengali bagian tubuh. Hitung otomatis di form pesan.</p>
    </>
  );
}
