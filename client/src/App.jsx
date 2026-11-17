import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Gallery from "./components/Gallery";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import OrderBuilder from "./components/OrderBuilder";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Closing from "./components/Closing";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";

export default function App() {
  const [preset, setPreset] = useState(null);
  if (window.location.pathname.startsWith("/admin")) return <Admin />;

  return (
    <>
      <Header />
      <main id="atas">
        <Hero />
        <Section id="tentang" title="Tentang pelukis">
          <About />
        </Section>
        <Section
          id="galeri"
          title="Galeri pesanan"
          sub="Contoh lukisan yang dikerjakan khusus dari foto pelanggan."
        >
          <Gallery onPick={setPreset} />
        </Section>
        <Section
          id="cara-pesan"
          title="Cara pesan"
          sub="Empat langkah dari foto sampai lukisan di rumahmu."
        >
          <HowItWorks />
        </Section>
        <Section
          id="harga"
          title="Daftar harga"
          sub="Perkiraan harga berdasarkan bahan, ukuran, jumlah orang, dan bagian tubuh."
        >
          <Pricing />
        </Section>
        <Section
          id="pesan"
          title="Lukis wajahmu"
          sub="Ikuti langkahnya satu per satu. Perkiraan harga berubah otomatis."
        >
          <OrderBuilder preset={preset} />
        </Section>
        <Section id="faq" title="Pertanyaan umum">
          <FAQ />
        </Section>
        <Closing />
        <Section
          id="kontak"
          title="Kontak"
          sub="Ada pertanyaan sebelum memesan? Hubungi kami."
        >
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  );
}
