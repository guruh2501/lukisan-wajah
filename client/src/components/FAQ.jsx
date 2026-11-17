import { OPT } from '../data';

const waktu = OPT.bahan.items.map((b) => `${b.n} ${b.w}`).join(', ');
const faq = [
  ['Berapa lama pengerjaannya?', `Perkiraan pengerjaan: ${waktu}. Waktu bisa lebih lama saat pesanan sedang ramai.`],
  ['Foto seperti apa yang cocok?', 'Foto terang, wajah terlihat jelas dan menghadap kamera, resolusi besar. Hindari foto buram, gelap, atau wajah yang tertutup.'],
  ['Apakah harganya sudah final?', 'Harga di website adalah perkiraan. Harga final dikonfirmasi pelukis setelah melihat fotomu, sebelum lukisan dikerjakan.'],
  ['Apakah saya bisa melihat sketsa dulu?', '[Isi sesuai aturanmu, misalnya: sketsa dikirim lewat WhatsApp dan bisa direvisi sebelum diwarnai.]'],
  ['Bagaimana cara membayar?', '[Isi sesuai aturanmu: metode pembayaran, DP, dan pelunasan.]'],
  ['Bagaimana pengirimannya?', '[Isi sesuai aturanmu: ekspedisi, kemasan, dan estimasi tiba.]'],
  ['Bisa pesan lukisan untuk hadiah?', 'Bisa. Tulis momen dan nama penerima di kolom catatan, dan sebutkan kalau kamu butuh lukisan selesai sebelum tanggal tertentu.'],
];

export default function FAQ() {
  return (
    <div className="max-w-3xl divide-y divide-garis rounded-2xl border border-garis bg-white">
      {faq.map(([q, a]) => (
        <details key={q} className="group p-5">
          <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {q}<span aria-hidden="true" className="text-xl text-kayu transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-redup">{a}</p>
        </details>
      ))}
    </div>
  );
}
