import Face from "./Face";
import { GALLERY } from "../data";
import { btn, btnGhost } from "../ui";

const row1 = [3, 0, 6, 2, 5, 1, 4, 7];
const row2 = [4, 7, 1, 5, 2, 6, 0, 3];

// Baris digandakan agar putarannya tidak terputus (translateX -50%)
function Row({ ids, anim, pos }) {
  return (
    <div
      className={`absolute left-0 flex w-max ${pos} ${anim} motion-reduce:animate-none`}
      aria-hidden="true"
    >
      {[...ids, ...ids].map((i, k) => (
        <div
          key={k}
          className="mr-4 w-24 shrink-0 border-4 border-[#3A2A18] bg-white shadow-lg sm:w-32 md:w-36"
        >
          <Face p={GALLERY[i % GALLERY.length]} />
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative h-[640px] overflow-hidden bg-gading/50 md:h-[660px]">
      <Row ids={row1} anim="animate-marquee" pos="top-6 md:top-8" />
      <Row ids={row2} anim="animate-marquee-rev" pos="bottom-6 md:bottom-8" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-krem md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-krem md:w-24" />
      <div className="absolute inset-x-4 top-1/2 mx-auto max-w-2xl -translate-y-1/2 rounded-2xl bg-krem/95 p-6 text-center shadow-xl md:p-10">
        <span className="inline-block rounded-full bg-gading px-4 py-1.5 text-sm font-semibold text-kayu-gelap">
          Lukisan wajah pesanan khusus
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl">
          Wajah yang dilukis dengan tangan, bukan dicetak.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-redup md:text-lg">
          Kirim fotomu, pilih bahan dan ukuran, lalu pelukis mengerjakan lukisan
          wajahmu dari awal.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#pesan" className={btn}>
            Pesan lukisan wajahmu
          </a>
          <a href="#galeri" className={btnGhost}>
            Lihat galeri
          </a>
        </div>
      </div>
    </div>
  );
}
