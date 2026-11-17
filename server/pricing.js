// Harga contoh. Server selalu menghitung ulang harga, jadi klien tidak bisa memalsukannya.
// Jika diubah, samakan juga dengan client/src/data.js
export const PRICING = {
  bahan: { "Pensil": 1, "Pensil warna": 1.5, "Cat air": 1.8, "Akrilik": 2.2, "Cat minyak": 3 },
  orang: { "Single": 1, "Couple": 1.8, "Keluarga kecil": 2.5, "Grup": 3.2 },
  badan: { "Wajah saja": 1, "Bust": 1.3, "Half body": 1.7, "Full body": 2.2 },
  ukuran: { A5: 120000, A4: 200000, A3: 350000, A2: 600000 },
};

export const estimate = (o) =>
  Math.round(
    (PRICING.ukuran[o.ukuran] * PRICING.bahan[o.bahan] * PRICING.orang[o.orang] * PRICING.badan[o.badan]) / 10000
  ) * 10000;
