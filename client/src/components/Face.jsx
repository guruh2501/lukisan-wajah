const BG = [['#ff9a8b', '#ffd36e'], ['#ffd86b', '#ff8fa3'], ['#7fd1ff', '#b69cff'], ['#ff8fcf', '#ffc371'], ['#5eead4', '#c7f36b'], ['#ff9ec4', '#8ec5fc']];

// Ilustrasi potret sederhana. Ganti dengan <img> foto karya aslimu kapan saja.
export default function Face({ p, slice = false, className = 'block h-auto w-full' }) {
  const { id, t, skin, hair, cl, h } = p;
  const [c1, c2] = BG[(id - 1) % BG.length];
  const gid = 'g' + id;
  return (
    <svg viewBox="0 0 200 250" role="img" aria-label={`Potret ${t}`} className={className} preserveAspectRatio={slice ? 'xMidYMin slice' : 'xMidYMid meet'}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill={`url(#${gid})`} />
      <path d="M-10 60Q60 30 120 70T210 40" stroke="#fff" strokeOpacity=".18" strokeWidth="14" fill="none" />
      <path d="M-10 200Q70 170 130 210T210 180" stroke="#000" strokeOpacity=".12" strokeWidth="18" fill="none" />
      {h === 'bun' && <circle cx="100" cy="48" r="17" fill={hair} />}
      {h === 'long' && <path d="M54 112Q48 56 100 52Q152 56 146 112L152 210L48 210Z" fill={hair} />}
      {h === 'bob' && <path d="M54 112Q48 56 100 52Q152 56 146 112L148 150L52 150Z" fill={hair} />}
      <path d="M16 250Q28 190 100 184Q172 190 184 250Z" fill={cl} />
      <rect x="87" y="148" width="26" height="42" rx="8" fill={skin} />
      <rect x="87" y="148" width="26" height="16" fill="#000" opacity=".12" />
      <ellipse cx="100" cy="110" rx="38" ry="48" fill={skin} />
      <path d="M60 108Q58 56 100 54Q142 56 140 108Q126 80 100 80Q74 80 60 108Z" fill={hair} />
      <path d="M74 98Q82 93 90 97M110 97Q118 93 126 98" stroke={hair} strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="82" cy="109" rx="5" ry="3.2" fill="#2a1a14" />
      <ellipse cx="118" cy="109" rx="5" ry="3.2" fill="#2a1a14" />
      <path d="M100 112Q95 128 101 131" stroke="#000" strokeOpacity=".3" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M87 143Q100 152 113 143" stroke="#9c3b3b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="128" rx="8" ry="5" fill="#d9626b" opacity=".25" />
      <ellipse cx="128" cy="128" rx="8" ry="5" fill="#d9626b" opacity=".25" />
    </svg>
  );
}
