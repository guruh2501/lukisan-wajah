export const API = import.meta.env.VITE_API_URL || "";
export const WA = import.meta.env.VITE_WA_NUMBER || "6281234567890";
export const rp = (n) => "Rp " + n.toLocaleString("id-ID");

// Faktor harga di sini hanya untuk tampilan. Harga final dihitung server (server/pricing.js).
export const OPT = {
  bahan: {
    title: "Bahan",
    items: [
      {
        n: "Pensil",
        f: 1,
        w: "5–7 hari",
        d: "Gambar hitam-putih dari pensil grafit di atas kertas gambar. Garisnya halus dan bayangannya lembut, kesannya klasik dan bersih. Cocok untuk hadiah yang simpel.",
      },
      {
        n: "Pensil warna",
        f: 1.5,
        w: "7–10 hari",
        d: "Warna dibangun lapis demi lapis sehingga kulit, rambut, dan baju tampak hidup seperti aslinya. Detailnya halus dan warnanya lembut.",
      },
      {
        n: "Cat air",
        f: 1.8,
        w: "7–10 hari",
        d: "Warna tipis dan mengalir, hasilnya cerah dan ringan. Cat yang sudah kering sulit diubah, jadi pelukis mengerjakannya dengan sangat hati-hati.",
      },
      {
        n: "Akrilik",
        f: 2.2,
        w: "10–14 hari",
        d: "Warna pekat, cepat kering, dan tahan lama. Cocok kalau kamu ingin latar yang berani dan warna yang tegas.",
      },
      {
        n: "Cat minyak",
        f: 3,
        w: "14–21 hari",
        d: "Warna kaya dan kulit terlihat halus seperti lukisan klasik. Paling awet, tetapi butuh waktu kering paling lama.",
      },
    ],
  },
  orang: {
    title: "Jumlah orang",
    items: [
      {
        n: "Single",
        s: "1 orang",
        f: 1,
        d: "Satu orang dalam satu lukisan. Pilihan paling umum untuk potret diri atau hadiah.",
      },
      {
        n: "Couple",
        s: "2 orang",
        f: 1.8,
        d: "Dua orang dalam satu bingkai. Cocok untuk pasangan, sahabat, atau ibu dan anak.",
      },
      {
        n: "Keluarga kecil",
        s: "3 orang",
        f: 2.5,
        d: "Tiga orang, misalnya ayah, ibu, dan anak. Posisi diatur agar semua wajah terlihat jelas.",
      },
      {
        n: "Grup",
        s: "4–5 orang",
        f: 3.2,
        d: "Keluarga besar atau sahabat. Sebaiknya pilih ukuran A3 atau A2 supaya wajah tetap detail.",
      },
    ],
  },
  badan: {
    title: "Bagian tubuh",
    items: [
      {
        n: "Wajah saja",
        s: "kepala dan leher",
        f: 1,
        y: 30,
        d: "Fokus penuh pada ekspresi wajah. Detail mata dan senyum paling terlihat.",
      },
      {
        n: "Bust",
        s: "sampai dada",
        f: 1.3,
        y: 46,
        d: "Kepala, bahu, dan dada. Pilihan klasik untuk potret yang dipajang di dinding.",
      },
      {
        n: "Half body",
        s: "sampai pinggang",
        f: 1.7,
        y: 62,
        d: "Terlihat pakaian dan gaya tangan. Pas untuk potret yang bercerita.",
      },
      {
        n: "Full body",
        s: "seluruh badan",
        f: 2.2,
        y: 80,
        d: "Dari kepala sampai kaki beserta latarnya. Paling lengkap, butuh waktu paling lama.",
      },
    ],
  },
  ukuran: {
    title: "Ukuran kertas",
    items: [
      {
        n: "A5",
        s: "14,8 × 21 cm",
        b: 120000,
        d: "Ukuran paling kecil dan hemat. Cocok untuk wajah saja atau hadiah mini.",
      },
      {
        n: "A4",
        s: "21 × 29,7 cm",
        b: 200000,
        d: "Ukuran kecil, pas untuk meja kerja atau rak. Cocok untuk wajah saja dan bust.",
      },
      {
        n: "A3",
        s: "29,7 × 42 cm",
        b: 350000,
        d: "Ukuran sedang, nyaman dipajang di dinding. Pilihan paling seimbang.",
      },
      {
        n: "A2",
        s: "42 × 59,4 cm",
        b: 600000,
        d: "Ukuran besar dengan detail terbaik. Cocok untuk couple, keluarga, dan full body.",
      },
    ],
  },
};

export const getItem = (g, n) => OPT[g].items.find((i) => i.n === n);
export const estimate = (s) =>
  Math.round(
    (getItem("ukuran", s.ukuran).b *
      getItem("bahan", s.bahan).f *
      getItem("orang", s.orang).f *
      getItem("badan", s.badan).f) /
      10000,
  ) * 10000;

// Ganti dengan karya aslimu nanti (lihat README untuk memakai foto sungguhan)
export const GALLERY = [
  {
    id: 1,
    t: "Ibu di Beranda",
    m: "Cat minyak",
    s: "A3",
    o: "Single",
    skin: "#e8b996",
    hair: "#2b1d17",
    cl: "#c4577a",
    h: "bun",
  },
  {
    id: 2,
    t: "Anak Penjual Bunga",
    m: "Akrilik",
    s: "A4",
    o: "Single",
    skin: "#c98e66",
    hair: "#1a1210",
    cl: "#2f5d9e",
    h: "short",
  },
  {
    id: 3,
    t: "Kakek Pembuat Kapal",
    m: "Cat minyak",
    s: "A2",
    o: "Single",
    skin: "#d9a67f",
    hair: "#d7d9de",
    cl: "#7a3b2e",
    h: "short",
  },
  {
    id: 4,
    t: "Gadis Berkebaya",
    m: "Pensil warna",
    s: "A3",
    o: "Single",
    skin: "#f0c7a6",
    hair: "#0e0b0a",
    cl: "#e0a526",
    h: "long",
  },
  {
    id: 5,
    t: "Pemuda Pasar Pagi",
    m: "Akrilik",
    s: "A3",
    o: "Single",
    skin: "#b97d55",
    hair: "#171210",
    cl: "#eef1f7",
    h: "bob",
  },
  {
    id: 6,
    t: "Nenek Tersenyum",
    m: "Cat air",
    s: "A4",
    o: "Single",
    skin: "#e3b08c",
    hair: "#bfc3cc",
    cl: "#2f7f86",
    h: "bun",
  },
  {
    id: 7,
    t: "Bapak Penjual Kopi",
    m: "Akrilik",
    s: "A4",
    o: "Single",
    skin: "#c98e66",
    hair: "#3a2a22",
    cl: "#2f7f86",
    h: "short",
  },
  {
    id: 8,
    t: "Gadis Penari",
    m: "Cat air",
    s: "A3",
    o: "Single",
    skin: "#e8b996",
    hair: "#1a1210",
    cl: "#c4577a",
    h: "long",
  },
];
