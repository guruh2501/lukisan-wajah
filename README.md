# Kuas & Wajah — toko lukisan wajah custom (MERN + Tailwind)

Pelanggan memilih bahan, jumlah orang, bagian tubuh, dan ukuran, mengunggah foto, lalu mengirim pesanan.
Foto dan data pesanan tersimpan di server, dan pelukis memantaunya di `/admin`.

## Struktur
- `server/` Express + MongoDB (Mongoose) + Multer untuk unggah foto
- `client/` React (Vite) + Tailwind CSS v3

## Menjalankan (butuh Node 18+ dan MongoDB)
```bash
# terminal 1: backend
cd server
cp .env.example .env      # isi MONGO_URI dan ADMIN_TOKEN
npm install
npm run dev               # http://localhost:5000

# terminal 2: frontend
cd client
cp .env.example .env      # isi VITE_WA_NUMBER
npm install
npm run dev               # http://localhost:5173
```
Halaman pelukis: `http://localhost:5173/admin` (masukkan `ADMIN_TOKEN`).

## Komponen (client/src/components)
Tiap bagian halaman berdiri sendiri, jadi bisa diambil satu per satu.

| Komponen | Isi |
|---|---|
| `Header.jsx` | Menu atas, jadi tombol Menu di HP |
| `Hero.jsx` | Dua baris lukisan bergerak kiri dan kanan |
| `Gallery.jsx` | Foto miring bertumpuk, 2 kolom di HP |
| `HowItWorks.jsx` | Empat langkah pesan |
| `Pricing.jsx` | Tabel harga dari rumus di `data.js` |
| `OrderBuilder.jsx` | Stepper 3 kolom, jadi satu kolom di HP |
| `About.jsx`, `FAQ.jsx`, `Contact.jsx`, `Closing.jsx`, `Footer.jsx` | Bagian pelengkap |

Warna (Kayu dan Krem) ada di `client/tailwind.config.js`. Data kontak di `client/src/site.js`. Teks dalam kurung siku `[...]` di About dan FAQ perlu kamu isi sendiri.

## Yang perlu kamu ganti
1. **Harga**: `server/pricing.js` (harga final) dan `client/src/data.js` (tampilan). Samakan keduanya.
2. **Nomor WhatsApp**: `VITE_WA_NUMBER` di `client/.env`.
3. **Galeri**: `GALLERY` di `client/src/data.js`. Untuk foto asli, ganti `<Face p={p} />` di `components/Gallery.jsx` dengan `<img src="/karya/nama.jpg" alt={p.t} />` (taruh file di `client/public/karya/`).
4. **Contoh gambar tiap bahan**: `components/Pic.jsx` memakai efek filter pada ilustrasi. Ganti dengan foto karya asli per bahan jika sudah ada.

## Sebelum online
- Deploy: frontend (`npm run build`) ke Netlify/Vercel, backend ke Render/Railway/VPS, database ke MongoDB Atlas. Set `CLIENT_URL` di server dan `VITE_API_URL` di client.
- Foto tersimpan di `server/uploads`. Banyak hosting menghapus disk saat redeploy, jadi pakai volume persisten atau layanan seperti Cloudinary/S3.
- Tambahkan pembatas laju (misalnya `express-rate-limit`) pada `POST /api/orders`, dan pakai HTTPS.
- `ADMIN_TOKEN` adalah pengaman sederhana. Untuk beberapa admin, ganti dengan login sungguhan (JWT).
