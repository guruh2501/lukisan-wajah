import { useState } from 'react';
import { API, rp } from '../data';

const STATUS = ['baru', 'diproses', 'selesai'];

// Buka di /admin. Masukkan ADMIN_TOKEN dari server/.env
export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState('');

  const load = async () => {
    const r = await fetch(`${API}/api/orders`, { headers: { 'x-admin-token': token } });
    if (!r.ok) return setErr('Token salah');
    sessionStorage.setItem('adminToken', token);
    setErr('');
    setOrders(await r.json());
  };

  const setStatus = async (id, status) => {
    const r = await fetch(`${API}/api/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ status }),
    });
    if (r.ok) { const o = await r.json(); setOrders((os) => os.map((x) => (x._id === id ? o : x))); }
  };

  return (
    <main className="mx-auto max-w-4xl p-5">
      <h1 className="mb-4 text-3xl">Pesanan masuk</h1>
      <div className="mb-6 flex gap-2">
        <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token admin" className="flex-1 rounded-md border-2 border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <button type="button" onClick={load} className="rounded-md bg-amber-400 px-5 py-2 font-semibold text-amber-950">Muat</button>
      </div>
      {err && <p role="alert" className="text-red-600">{err}</p>}
      {orders && !orders.length && <p>Belum ada pesanan.</p>}
      <div className="grid gap-4">
        {orders?.map((o) => (
          <article key={o._id} className="rounded-xl border border-slate-300 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl">{o.name} <small className="font-sans text-sm text-slate-500">#{o._id.slice(-6).toUpperCase()}</small></h2>
              <select value={o.status} onChange={(e) => setStatus(o._id, e.target.value)} className="rounded-md border-2 border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800">
                {STATUS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <p className="mt-1">{o.bahan} · {o.orang} · {o.badan} · {o.ukuran} · <b>{rp(o.estimate)}</b></p>
            {o.phone && <p>WhatsApp: {o.phone}</p>}
            {o.notes && <p className="mt-1">Catatan: {o.notes}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {o.photos.map((p) => (
                <a key={p} href={API + p} target="_blank" rel="noreferrer"><img src={API + p} alt="Foto referensi" className="h-20 w-20 rounded-lg object-cover" /></a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
