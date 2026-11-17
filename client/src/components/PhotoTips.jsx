const ok = ['Foto terang, sebaiknya cahaya alami', 'Wajah terlihat jelas dan menghadap kamera', 'Resolusi besar (foto asli, bukan tangkapan layar)', 'Untuk couple atau keluarga, semua wajah di satu foto'];
const no = ['Foto buram atau gelap', 'Wajah tertutup kacamata hitam, masker, atau topi', 'Filter yang mengubah warna kulit', 'Foto yang sudah dikompres berkali-kali'];

export default function PhotoTips() {
  const List = ({ items, mark, cls }) => (
    <ul className="mt-2 grid gap-1.5 text-sm">
      {items.map((t) => (
        <li key={t} className="flex gap-2"><span className={`font-bold ${cls}`} aria-hidden="true">{mark}</span><span>{t}</span></li>
      ))}
    </ul>
  );
  return (
    <div className="mt-4 grid gap-4 rounded-2xl bg-gading/60 p-4 sm:grid-cols-2">
      <div><b>Sebaiknya</b><List items={ok} mark="✓" cls="text-green-800" /></div>
      <div><b>Hindari</b><List items={no} mark="✕" cls="text-red-800" /></div>
    </div>
  );
}
