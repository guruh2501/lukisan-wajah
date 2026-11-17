import Reveal from './Reveal';

export default function Section({ id, title, sub, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-16 border-t border-garis py-14 md:py-20 ${className}`}>
      <Reveal className="mx-auto max-w-6xl px-5">
        <h2 className="text-3xl md:text-4xl">{title}</h2>
        {sub && <p className="mb-8 mt-3 max-w-xl text-redup">{sub}</p>}
        {children}
      </Reveal>
    </section>
  );
}
