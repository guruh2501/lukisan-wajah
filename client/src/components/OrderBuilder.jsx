import { useEffect, useRef, useState } from 'react';
import { API, WA, OPT, estimate, rp } from '../data';
import Pic from './Pic';
import PhotoTips from './PhotoTips';
import { btn, btnGhost, card } from '../ui';

const STEPS = [
  { k: 'bahan', t: 'Bahan', sub: 'Setiap bahan punya kesan berbeda. Klik untuk melihat penjelasannya.' },
  { k: 'orang', t: 'Jumlah orang', sub: 'Berapa orang yang ingin dilukis dalam satu bingkai?' },
  { k: 'badan', t: 'Bagian tubuh', sub: 'Seberapa banyak yang ingin dilukis? Garis putus-putus menunjukkan batas potongan.' },
  { k: 'ukuran', t: 'Ukuran kertas', sub: 'Ukuran yang lebih besar menampung lebih banyak detail.' },
  { k: 'foto', t: 'Upload foto', sub: 'Unggah foto referensi. Pelukis akan melukis dari foto ini.' },
  { k: 'catatan', t: 'Catatan', sub: 'Isi namamu dan hal yang ingin ditambahkan.' },
];
const first = Object.fromEntries(Object.entries(OPT).map(([g, v]) => [g, v.items[0].n]));
const init = () => ({ ...first, ukuran: 'A4' });
const input = 'w-full rounded-lg border-2 border-garis bg-white px-3 py-3';

function useTween(v) {
  const [x, setX] = useState(v);
  const ref = useRef(v);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { ref.current = v; setX(v); return; }
    const from = ref.current;
    const t0 = performance.now();
    let id;
    const step = (t) => {
      const k = Math.min((t - t0) / 400, 1);
      const n = k < 1 ? Math.round((from + (v - from) * k) / 1000) * 1000 : v;
      ref.current = n;
      setX(n);
      if (k < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [v]);
  return x;
}

function Crop({ y }) {
  return (
    <svg viewBox="0 0 60 84" className="h-16 w-12 shrink-0 text-tinta" aria-hidden="true">
      <g fill="currentColor" opacity=".3">
        <circle cx="30" cy="16" r="10" /><rect x="18" y="28" width="24" height="30" rx="8" />
        <rect x="20" y="56" width="8" height="26" /><rect x="32" y="56" width="8" height="26" />
      </g>
      <rect x="6" y="3" width="48" height={y - 3} fill="none" stroke="#8A4B2A" strokeWidth="2.5" strokeDasharray="5 3" />
    </svg>
  );
}

const Line = ({ k, v }) => (
  <div className="flex justify-between gap-3 border-b border-garis py-2 text-sm"><span>{k}</span><b className="text-right">{v}</b></div>
);

function Summary({ sel, count }) {
  return (
    <>
      {Object.entries(OPT).map(([g, grp]) => <Line key={g} k={grp.title} v={sel[g]} />)}
      <Line k="Foto" v={count} />
    </>
  );
}

export default function OrderBuilder({ preset }) {
  const [sel, setSel] = useState(init);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [view, setView] = useState('form'); // form | review | done
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', notes: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);
  const root = useRef(null);
  const price = estimate(sel);
  const shown = useTween(price);
  const cur = STEPS[step];
  const scroll = () => root.current?.scrollIntoView({ behavior: 'smooth' });

  // Tombol "Pesan yang seperti ini" di galeri mengisi bahan dan ukuran
  useEffect(() => {
    if (!preset) return;
    setSel((s) => ({ ...s, bahan: preset.bahan, ukuran: preset.ukuran }));
    setStep(0); setView('form'); scroll();
  }, [preset]);

  const go = (i) => { setStep(i); setMaxStep((m) => Math.max(m, i)); setError(''); };
  const next = () => {
    if (cur.k === 'foto' && !photos.length) return setError('Tambahkan minimal 1 foto.');
    if (cur.k === 'catatan') {
      if (!form.name.trim()) return setError('Isi namamu dulu.');
      setError(''); setView('review'); scroll(); return;
    }
    go(step + 1);
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const addPhotos = (e) => {
    const files = [...e.target.files].map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((p) => [...p, ...files].slice(0, 5));
    e.target.value = '';
  };
  const removePhoto = (i) => { URL.revokeObjectURL(photos[i].url); setPhotos((p) => p.filter((_, j) => j !== i)); };

  const submit = async () => {
    setBusy(true); setError('');
    try {
      const fd = new FormData();
      Object.entries({ ...form, ...sel }).forEach(([k, v]) => fd.append(k, v));
      photos.forEach((p) => fd.append('photos', p.file));
      const res = await fetch(`${API}/api/orders`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Pesanan gagal dikirim');
      setDone(data); setView('done');
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  const reset = () => { setSel(init()); setPhotos([]); setForm({ name: '', phone: '', notes: '' }); setDone(null); setStep(0); setMaxStep(0); setView('form'); };

  if (view === 'done') {
    const code = done.id.slice(-6).toUpperCase();
    const msg = `Halo, saya ${form.name}. Saya sudah membuat pesanan lukisan wajah (kode ${code}).\nBahan: ${sel.bahan}\nJumlah orang: ${sel.orang}\nBagian tubuh: ${sel.badan}\nUkuran: ${sel.ukuran}\nPerkiraan harga: ${rp(done.estimate)}`;
    return (
      <div ref={root} className={`${card} max-w-xl scroll-mt-20`}>
        <h3 className="text-2xl">Pesanan terkirim</h3>
        <p className="mt-2">Kode pesananmu <b>{code}</b>. Foto sudah kami terima. Pelukis akan menghubungi untuk konfirmasi harga final.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className={btn} target="_blank" rel="noreferrer" href={`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`}>Hubungi lewat WhatsApp</a>
          <button type="button" onClick={reset} className={btnGhost}>Buat pesanan lain</button>
        </div>
      </div>
    );
  }

  if (view === 'review') {
    return (
      <div ref={root} className={`${card} max-w-xl scroll-mt-20`}>
        <h3 className="text-2xl">Review pesanan</h3>
        <div className="mt-3"><Summary sel={sel} count={photos.length} /></div>
        <p className="mt-3"><b>Nama:</b> {form.name}</p>
        {form.phone && <p><b>WhatsApp:</b> {form.phone}</p>}
        <p><b>Catatan:</b> {form.notes || '-'}</p>
        <div className="my-3 flex flex-wrap gap-2">
          {photos.map((p) => <img key={p.url} src={p.url} alt={p.file.name} className="h-[72px] w-[72px] rounded-lg object-cover" />)}
        </div>
        <div className="flex justify-between py-3 text-xl font-semibold"><span>Perkiraan harga</span><span>{rp(price)}</span></div>
        <p className="text-sm text-redup">Harga final dikonfirmasi pelukis setelah melihat fotomu.</p>
        {error && <p role="alert" className="mt-3 font-semibold text-red-700">{error}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setView('form')} className={btnGhost}>Ubah pesanan</button>
          <button type="button" disabled={busy} onClick={submit} className={`${btn} disabled:opacity-60`}>{busy ? 'Mengirim…' : 'Kirim pesanan'}</button>
        </div>
      </div>
    );
  }

  const grp = OPT[cur.k];
  const idx = grp ? grp.items.findIndex((i) => i.n === sel[cur.k]) : -1;
  const item = grp ? grp.items[idx] : null;

  return (
    <div ref={root} className="grid scroll-mt-20 gap-8 lg:grid-cols-[210px_1fr_290px]">
      {/* Stepper vertikal (komputer) */}
      <ol className="hidden lg:block" aria-label="Langkah pesanan">
        {STEPS.map((s, i) => {
          const state = i === step ? 'a' : i < step || i <= maxStep ? 'd' : 'n';
          const cls = state === 'a' ? 'bg-kayu text-white' : state === 'd' ? 'bg-pasir text-tinta' : 'border-2 border-garis bg-white text-redup';
          return (
            <li key={s.k}>
              <button type="button" disabled={i > maxStep} onClick={() => go(i)} className="flex min-h-[52px] w-full items-center gap-3 text-left disabled:cursor-default">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${cls}`}>{state === 'd' && i !== step ? '✓' : i + 1}</span>
                <span className={i === step ? 'font-semibold' : 'text-redup'}>{s.t}</span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Progres (HP) */}
      <div className="lg:hidden">
        <div className="flex gap-1.5" aria-hidden="true">
          {STEPS.map((s, i) => <span key={s.k} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-kayu' : 'bg-garis'}`} />)}
        </div>
        <p className="mt-2 text-sm text-redup">Langkah {step + 1} dari {STEPS.length}</p>
      </div>

      {/* Isi langkah */}
      <div className="min-w-0">
        <h3 className="text-3xl">{cur.t}</h3>
        <p className="mb-5 mt-1 text-redup">{cur.sub}</p>

        {grp && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              {grp.items.map((it) => (
                <button
                  key={it.n}
                  type="button"
                  aria-pressed={sel[cur.k] === it.n}
                  onClick={() => setSel((s) => ({ ...s, [cur.k]: it.n }))}
                  className="flex min-h-[72px] items-center gap-4 rounded-2xl border-2 border-garis bg-white p-4 text-left transition hover:-translate-y-0.5 aria-pressed:animate-pop aria-pressed:border-kayu aria-pressed:bg-gading/60 motion-reduce:transition-none motion-reduce:aria-pressed:animate-none"
                >
                  {cur.k === 'badan' && <Crop y={it.y} />}
                  <span><b className="block text-lg">{it.n}</b>{it.s && <span className="block text-sm text-redup">{it.s}</span>}</span>
                </button>
              ))}
            </div>
            <div key={sel[cur.k]} className={`${card} mt-5 animate-up motion-reduce:animate-none`} aria-live="polite">
              {cur.k !== 'ukuran' && <Pic g={cur.k} i={idx} item={item} className="mb-3 h-36" />}
              <p className="font-semibold">{item.n}</p>
              <p className="mt-1">{item.d}</p>
              {item.w && <p className="mt-2 text-sm text-redup">Perkiraan pengerjaan: {item.w}</p>}
            </div>
          </>
        )}

        {cur.k === 'foto' && (
          <>
            <label className="block rounded-2xl border-2 border-dashed border-pasir bg-white p-5">
              Pilih foto (maksimal 5, JPG/PNG/WebP)
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addPhotos} className="mt-2 block max-w-full" />
            </label>
            <div className="mt-3 flex flex-wrap gap-3">
              {photos.map((p, i) => (
                <div key={p.url} className="relative h-[84px] w-[84px]">
                  <img src={p.url} alt={p.file.name} className="h-full w-full rounded-lg object-cover" />
                  <button type="button" aria-label="Hapus foto" onClick={() => removePhoto(i)} className="absolute -right-1.5 -top-1.5 h-7 w-7 rounded-full bg-tinta text-white">×</button>
                </div>
              ))}
            </div>
            <PhotoTips />
          </>
        )}

        {cur.k === 'catatan' && (
          <div className="grid gap-4">
            <label className="grid gap-1 font-medium">Nama<input className={input} value={form.name} onChange={set('name')} autoComplete="name" /></label>
            <label className="grid gap-1 font-medium">Nomor WhatsApp (opsional)<input className={input} value={form.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" /></label>
            <label className="grid gap-1 font-medium">Catatan (warna latar, suasana, baju, hal yang ingin ditambahkan)
              <textarea className={input} rows={4} maxLength={1000} value={form.notes} onChange={set('notes')} />
            </label>
          </div>
        )}

        {error && <p role="alert" className="mt-4 font-semibold text-red-700">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          {step > 0 && <button type="button" onClick={() => go(step - 1)} className={btnGhost}>Kembali</button>}
          <button type="button" onClick={next} className={btn}>{step === STEPS.length - 1 ? 'Review pesanan' : `Lanjut ke ${STEPS[step + 1].t.toLowerCase()}`}</button>
        </div>
        <div className={`${card} mt-6 flex items-center justify-between lg:hidden`}>
          <span className="text-sm text-redup">Perkiraan harga</span><b className="font-display text-xl">{rp(shown)}</b>
        </div>
      </div>

      {/* Ringkasan (komputer) */}
      <aside className={`${card} hidden self-start lg:block lg:sticky lg:top-24`}>
        <h3 className="text-xl">Ringkasan</h3>
        <div className="mt-2"><Summary sel={sel} count={photos.length} /></div>
        <div className="flex items-baseline justify-between pt-4"><span className="text-sm text-redup">Perkiraan</span><b className="font-display text-2xl">{rp(shown)}</b></div>
        <p className="mt-2 text-sm text-redup">Harga final dikonfirmasi pelukis setelah melihat fotomu.</p>
      </aside>
    </div>
  );
}
