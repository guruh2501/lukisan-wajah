import { card } from '../ui';

const steps = [
  ['Pilih dan unggah foto', 'Tentukan bahan, jumlah orang, bagian tubuh, ukuran, lalu unggah fotomu.'],
  ['Konfirmasi harga', 'Pelukis melihat fotomu dan mengonfirmasi harga final lewat WhatsApp.'],
  ['Lihat sketsa', 'Kamu menyetujui sketsa dulu sebelum lukisan diwarnai.'],
  ['Lukisan dikirim', 'Lukisan dikemas aman dan dikirim ke alamatmu.'],
];

export default function HowItWorks() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(([t, d], i) => (
        <li key={t} className={card}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-kayu font-semibold text-white">{i + 1}</span>
          <h3 className="mt-3 text-xl">{t}</h3>
          <p className="mt-1 text-redup">{d}</p>
        </li>
      ))}
    </ol>
  );
}
