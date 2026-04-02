"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";

/* ─── Fade-in wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Section label ─── */
function Label({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 text-[11px] font-bold tracking-[3px] uppercase ${accent ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`}>
      <span className="w-6 h-px bg-[var(--color-accent)]" />
      {children}
    </div>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  scrollY.on("change", (v) => setScrolled(v > 20));

  const links = [
    { label: "Máquinas", href: "#maquinas" },
    { label: "Financiamento", href: "#financiamento" },
    { label: "A Kratux", href: "#solucao" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[var(--color-background)]/90 backdrop-blur-xl border-b border-[var(--color-border)]" : "bg-transparent"}`}
      initial={{ y: -64 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1200px] mx-auto h-24 flex items-center justify-between px-6 md:px-10">
        <Image src="/images/logo.png" alt="Kratux" width={400} height={92} className="h-20 w-auto" priority />
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-accent)] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <a href="#contato" className="text-[15px] font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Assistências
          </a>
          <a href="#contato" className="text-[12px] font-bold tracking-[1.5px] uppercase bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-6 py-2.5 transition-all hover:shadow-[0_8px_32px_rgba(231,95,13,0.3)]">
            Solicitar Orçamento
          </a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="block w-5 h-[1.5px] bg-[var(--color-foreground)]" /><span className="block w-5 h-[1.5px] bg-[var(--color-foreground)]" /><span className="block w-5 h-[1.5px] bg-[var(--color-foreground)]" />
        </button>
      </div>
      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-background)] border-b border-[var(--color-border)] p-6 flex flex-col gap-5 md:hidden max-w-[1200px] mx-auto">
          {links.map((l) => (<a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)]">{l.label}</a>))}
          <a href="#contato" onClick={() => setMenuOpen(false)} className="text-[12px] font-bold tracking-wider uppercase bg-[var(--color-accent)] text-white px-6 py-3 text-center">Solicitar Orçamento</a>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ─── HERO ─── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: imgY, scale: imgScale }}>
        <Image src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1800&q=80" alt="" fill className="object-cover" priority unoptimized />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/80 to-[var(--color-background)]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]/60" />
      </motion.div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <motion.div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pt-24" style={{ opacity: contentOpacity }}>
        <div className="max-w-[560px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-center gap-3 mb-8 text-[11px] font-bold tracking-[3px] uppercase text-[var(--color-muted)]">
          <span className="w-8 h-px bg-[var(--color-accent)]" /> Kratux — Máquinas Pesadas
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="font-[var(--font-display)] text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Máquinas que <br className="hidden sm:block" />trabalham como <span className="text-[var(--color-accent)]">você.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="text-xl text-[var(--color-foreground)]/75 leading-relaxed mb-10 max-w-[460px]">
          Qualidade de ponta e preço competitivo com o pós-venda que o seu negócio merece.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="flex flex-col sm:flex-row gap-4">
          <a href="#contato" className="inline-block text-[13px] font-bold tracking-[2px] uppercase bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-8 py-4 transition-all hover:shadow-[0_8px_32px_rgba(231,95,13,0.3)] text-center">Solicitar Orçamento</a>
          <a href="#maquinas" className="inline-block text-[13px] font-bold tracking-[2px] uppercase border border-white/15 hover:border-[var(--color-accent)] text-white/70 hover:text-[var(--color-accent)] px-8 py-4 transition-all text-center">Ver Máquinas</a>
        </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-[var(--color-border)] z-10" />
    </section>
  );
}

/* ─── PROOF BAR ─── */
function ProofBar() {
  const items = [{ num: "140+", text: "assistências técnicas" }, { num: "17+", text: "anos de experiência" }, { num: "500+", text: "PMEs atendidas" }, { num: "24h", text: "análise de crédito" }];
  return (
    <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] py-5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-wrap justify-between gap-4">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.1} className="flex items-center gap-2 text-[13px] text-[var(--color-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <strong className="text-[var(--color-foreground)] font-semibold text-sm">{item.num}</strong> {item.text}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ─── PROBLEMA ─── */
function Problema() {
  const cards = [
    { num: "01", title: "Grandes Marcas", desc: "Qualidade reconhecida, mas preço proibitivo, financiamento burocrático e relacionamento distante." },
    { num: "02", title: "Máquinas Usadas", desc: "Preço acessível, mas sem garantia, manutenção imprevisível e risco operacional. O barato sai caro." },
    { num: "03", title: "Marcas sem Estrutura", desc: "Preço competitivo, mas sem rede de assistências, sem estoque de peças e sem experiência comprovada." },
  ];
  return (
    <section id="problema" className="py-32 md:py-40 bg-[#F5F5F0] text-[#1C1C1A]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <Label accent>O Cenário</Label>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>O dilema de quem investe<br className="hidden md:block" /> em máquinas pesadas</h2>
          <p className="text-[19px] text-[#1C1C1A]/65 leading-relaxed max-w-lg mb-16">Parece impossível ter qualidade, preço justo e suporte de verdade ao mesmo tempo.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="relative p-10 md:p-12 bg-white border border-[#1C1C1A]/10 hover:border-[var(--color-accent)]/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group h-full">
                <span className="absolute top-6 right-6 text-6xl font-extrabold text-[#1C1C1A]/[0.04] group-hover:text-[#1C1C1A]/[0.08] transition-colors" style={{ fontFamily: "var(--font-display)" }}>{card.num}</span>
                <h3 className="text-xl font-bold mb-3 text-[#1C1C1A]" style={{ fontFamily: "var(--font-display)" }}>{card.title}</h3>
                <p className="text-[16px] text-[#1C1C1A]/65 leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUÇÃO ─── */
function Solucao() {
  const pillars = [
    { num: "01", title: "Qualidade de Ponta", desc: "Mesmo motor e componentes das marcas líderes. Certificação ISO." },
    { num: "02", title: "Preço Competitivo", desc: "Financiamento direto, sem intermediários. Análise de crédito em 24h. Condições flexíveis." },
    { num: "03", title: "Pós-Venda Real", desc: "140+ assistências no Brasil. Peças em 24h. Manutenção preventiva. Presença na sua operação." },
  ];
  return (
    <section id="solucao" className="py-32 md:py-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 lg:items-stretch">
        <Reveal className="relative overflow-hidden border border-[var(--color-border)] hidden lg:block">
          <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Máquina pesada em obra" fill className="object-cover brightness-[0.6] contrast-110" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-2xl font-bold leading-snug" style={{ fontFamily: "var(--font-display)" }}>Respaldada por mais de <span className="text-[var(--color-accent)]">17 anos</span> de experiência</p>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <Label accent>Kratux</Label>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>Qualidade, preço e suporte.<br />Os três juntos.</h2>
            <p className="text-[19px] text-[var(--color-foreground)]/70 leading-relaxed max-w-md mb-12">A primeira marca a entregar os três pilares que o seu negócio precisa.</p>
          </Reveal>
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="grid grid-cols-[56px_1fr] gap-6 py-8 border-b border-[var(--color-border)]">
                <span className="text-sm font-bold text-[var(--color-accent)] tracking-wider" style={{ fontFamily: "var(--font-display)" }}>{p.num}</span>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                  <p className="text-[15px] text-[var(--color-foreground)]/70 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}><p className="text-[13px] text-[var(--color-muted)] mt-8 tracking-wide">Componentes de marcas líderes · Certificação ISO · Garantia de 3 anos</p></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── COMPARATIVO ─── */
function Comparativo() {
  const rows = [
    { attr: "Qualidade", k: true, g: true, u: false }, { attr: "Preço", k: true, g: false, u: true },
    { attr: "Garantia", k: true, g: true, u: false }, { attr: "Financiamento", k: true, g: false, u: false },
    { attr: "Agilidade", k: true, g: false, u: false }, { attr: "Pós-Venda", k: true, g: true, u: false },
    { attr: "Relacionamento", k: true, g: false, u: false },
  ];
  return (
    <section id="comparativo" className="py-32 md:py-40 bg-[#F5F5F0] text-[#1C1C1A]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal><Label accent>Comparativo</Label><h2 className="text-[clamp(28px,3.5vw,44px)] font-bold mb-12" style={{ fontFamily: "var(--font-display)" }}>Na prática</h2></Reveal>
        <Reveal delay={0.2}>
          <table className="w-full">
            <thead><tr className="border-b-2 border-[#1C1C1A]/10 text-[12px] font-bold tracking-[2px] uppercase"><th className="text-left py-4 text-[#1C1C1A]/40" /><th className="text-center py-4 text-[var(--color-accent)]">Kratux</th><th className="text-center py-4 text-[#1C1C1A]/40">Grandes Marcas</th><th className="text-center py-4 text-[#1C1C1A]/40">Usadas</th></tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="border-b border-[#1C1C1A]/5 hover:bg-[#1C1C1A]/[0.02] transition-colors">
                  <td className="py-4 text-[15px] font-medium text-[#1C1C1A]">{r.attr}</td>
                  <td className="py-4 text-center text-[var(--color-accent)] font-semibold bg-[var(--color-accent)]/[0.08]">✓</td>
                  <td className="py-4 text-center text-[#1C1C1A]/35">{r.g ? "✓" : "—"}</td>
                  <td className="py-4 text-center text-[#1C1C1A]/35">{r.u ? "✓" : "—"}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── MÁQUINAS ─── */
function Maquinas() {
  const categories = [
    {
      id: "escavadeiras", label: "Escavadeiras",
      machines: [
        { name: "KX38E", img: "/images/Escavadeiras/KX38E.jpg", catalog: "/images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX38E.pdf", specs: ["3.880 kg", "26 hp Yanmar", "Caçamba 0,12 m³"] },
        { name: "KX60E", img: "/images/Escavadeiras/KX60E 2.png", catalog: "/images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX60E.pdf", specs: ["5.960 kg", "50 hp Weichai", "Caçamba 0,25 m³"] },
        { name: "KX85E", img: "/images/Escavadeiras/KX85E.png", catalog: "/images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX85E.pdf", specs: ["8.150 kg", "50 hp Weichai", "Escavação 66 kN"] },
        { name: "KX130E", img: "/images/Escavadeiras/KX130E.png", catalog: "/images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX130E.pdf", specs: ["13.500 kg", "Caçamba 0,55 m³", "Esteira 500mm"] },
        { name: "KX150E", img: "/images/Escavadeiras/KX85E.png", catalog: "/images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX150E.pdf", specs: ["15.000 kg", "125 hp Weichai", "Tração 135 kN"] },
      ],
    },
    {
      id: "pa-carregadeira", label: "Pá Carregadeira",
      machines: [
        { name: "KX920L", img: "/images/PÁ CARREGADEIRA/KX920L.png", catalog: "/images/PÁ CARREGADEIRA/Catálogo PÁ KX920L.pdf", specs: ["95 cv Changchai", "Caçamba 1,0 m³", "Turbo Diesel"] },
        { name: "KX936L", img: "/images/PÁ CARREGADEIRA/KX936L.png", catalog: "/images/PÁ CARREGADEIRA/Catálogo PÁ KX936L.pdf", specs: ["10.500 kg", "130 hp Weichai", "Caçamba 1,9 m³"] },
        { name: "KX947L", img: "/images/PÁ CARREGADEIRA/KX947L.png", catalog: "/images/PÁ CARREGADEIRA/Catálogo PÁ KX947L.pdf", specs: ["12.300 kg", "140 hp Cummins", "Caçamba 2,35 m³"] },
        { name: "KX956L", img: "/images/PÁ CARREGADEIRA/foto KX956L.jpg", catalog: "/images/PÁ CARREGADEIRA/Catálogo PÁ KX956L.pdf", specs: ["17.300 kg", "220 hp Deutz", "Caçamba 3,1 m³"] },
      ],
    },
    {
      id: "retroescavadeira", label: "Retroescavadeira",
      machines: [
        { name: "KX870R", img: "/images/RETROESCAVADEIRA/KX870R 2.PNG", catalog: "/images/RETROESCAVADEIRA/Catálogo RETRO KX870R.pdf", specs: ["Peso Operacional: 8.200 kg", "Capacidade de Carga: 2.500 kg", "Potência: 102 hp"] },
      ],
    },
    {
      id: "rolo-compactador", label: "Rolo Compactador",
      machines: [
        { name: "KX08C", img: "/images/ROLO COMPACTADOR/Foto KX08C.jpg", catalog: "/images/ROLO COMPACTADOR/CATÁLOGO ROLO KX08C.pdf", specs: ["8.000 kg", "Tambor 1.700mm", "Vibração 50 Hz"] },
        { name: "KX12C", img: "/images/ROLO COMPACTADOR/Foto ROLO.png", catalog: "/images/ROLO COMPACTADOR/CATÁLOGO ROLO KX12C.pdf", specs: ["12.000 kg", "Tambor 2.135mm", "Vibração 30/45 Hz"] },
      ],
    },
    {
      id: "trator-esteira", label: "Trator de Esteira",
      machines: [
        { name: "KX14B", img: "/images/TRATOR DE ESTEIRA/Foto KX14B.jpg", catalog: "/images/TRATOR DE ESTEIRA/CATÁLOGO KX14B.pdf", specs: ["14.000 kg", "140 hp YTO", "Lâmina 3,25m"] },
        { name: "KX17B", img: "/images/TRATOR DE ESTEIRA/Foto KX17B.png", catalog: "/images/TRATOR DE ESTEIRA/CATÁLOGO KX17B.pdf", specs: ["19.700 kg", "175 hp Weichai", "Lâmina 3,44m"] },
      ],
    },
    {
      id: "motoniveladora", label: "Motoniveladora",
      machines: [
        { name: "KX190G", img: "/images/MOTONIVELADORA/KX190G.png", catalog: "/images/MOTONIVELADORA/CATÁLOGO KX190G.pdf", specs: ["15.600 kg", "Lâmina 4.268mm", "190 hp"] },
      ],
    },
    {
      id: "mini-carregadeira", label: "Mini Carregadeira",
      machines: [
        { name: "KX65L", img: "/images/MINI CARREGADEIRA/Foto KX65L.jpg", catalog: "/images/MINI CARREGADEIRA/Catálogo MINI CARREGADEIRA KX65L.pdf", specs: ["3.050 kg", "Carga 900 kg", "Caçamba 0,53 m³"] },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState("escavadeiras");
  const trackRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const activeCat = categories.find((c) => c.id === activeTab)!;
  const useCarousel = activeCat.machines.length > 3;
  const whatsappUrl = "https://api.whatsapp.com/send?phone=5511940000000&text=";

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el || !leftArrowRef.current || !rightArrowRef.current) return;
    leftArrowRef.current.style.display = el.scrollLeft > 10 ? "flex" : "none";
    rightArrowRef.current.style.display = el.scrollLeft < el.scrollWidth - el.clientWidth - 10 ? "flex" : "none";
  };

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 380;
    el.scrollBy({ left: dir === "right" ? cardW + 24 : -(cardW + 24), behavior: "smooth" });
    setTimeout(updateArrows, 400);
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setTimeout(() => {
      if (trackRef.current) { trackRef.current.scrollLeft = 0; }
      updateArrows();
    }, 100);
  };

  const MachineCard = ({ m, animate: shouldAnimate }: { m: { name: string; img: string; catalog: string; specs: string[] }; i: number; animate?: boolean }) => (
    <div
      className={`group bg-white border border-[#e0e0dd] overflow-hidden transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] flex-shrink-0 ${useCarousel ? "w-[340px] sm:w-[360px]" : ""} ${shouldAnimate ? "animate-[fadeInUp_0.4s_ease_forwards]" : ""}`}
    >
      <div className="relative h-56 overflow-hidden bg-white">
        <Image src={m.img} alt={m.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" unoptimized />
      </div>
      <div className="p-6 border-t border-[#e0e0dd]">
        <h3 className="text-xl font-bold mb-3 text-[#1C1C1A]" style={{ fontFamily: "var(--font-display)" }}>{m.name}</h3>
        <ul className="mb-5 space-y-1.5">
          {m.specs.map((s) => (
            <li key={s} className="text-[14px] text-[#1C1C1A]/60 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3">
          <a href={`${whatsappUrl}Olá, tenho interesse no equipamento ${m.name} da Kratux.`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white py-3 px-4 text-[13px] font-bold tracking-[1.5px] uppercase transition-all hover:shadow-[0_8px_24px_rgba(231,95,13,0.3)]"
            style={{ fontFamily: "var(--font-display)" }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Solicitar Orçamento
          </a>
          <a href={m.catalog} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-[#d0d0cd] hover:border-[var(--color-accent)]/40 text-[#1C1C1A]/50 hover:text-[var(--color-accent)] py-3 px-4 text-[13px] font-bold tracking-[1.5px] uppercase transition-all"
            style={{ fontFamily: "var(--font-display)" }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            Baixar Catálogo
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="maquinas" className="py-32 md:py-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <Label accent>Equipamentos</Label>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold mb-10" style={{ fontFamily: "var(--font-display)" }}>Nossa linha completa</h2>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-14">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`px-5 py-2.5 text-[14px] font-semibold tracking-wide transition-all duration-300 border ${
                  activeTab === cat.id
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                    : "bg-transparent border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]"
                }`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Products — Carousel or Grid */}
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
          {useCarousel ? (
            <div className="relative">
              {/* Carousel track */}
              <div
                ref={trackRef}
                onScroll={updateArrows}
                className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
              >
                {activeCat.machines.map((m, i) => <MachineCard key={m.name} m={m} i={i} />)}
              </div>

              {/* Arrows — visibility controlled via DOM ref, no re-renders */}
              <button ref={leftArrowRef} onClick={() => scroll("left")} style={{ display: "none" }} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-12 h-12 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] items-center justify-center text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <button ref={rightArrowRef} onClick={() => scroll("right")} style={{ display: "none" }} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-12 h-12 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] items-center justify-center text-[var(--color-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] z-10">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeCat.machines.map((m, i) => <MachineCard key={m.name} m={m} i={i} />)}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── NÚMEROS ─── */
function Numeros() {
  const items = [
    { num: "140+", label: "Assistências Técnicas" },
    { num: "17+", label: "Anos de Experiência" },
    { num: "500+", label: "PMEs Atendidas" },
    { num: "30%", label: "Economia em Manutenção" },
  ];
  return (
    <section className="relative py-28 md:py-36 bg-[var(--color-surface)] border-y border-[var(--color-border)] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-[700px] h-[700px] bg-[var(--color-accent)]/[0.06] rounded-full blur-[150px]" /></div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>{item.num}</div>
            <div className="text-[14px] text-[var(--color-foreground)] uppercase tracking-[2px] mt-3 font-medium">{item.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── DEPOIMENTOS ─── */
function Depoimentos() {
  const testimonials = [
    { quote: "Economizamos 30% em manutenção no primeiro ano. A assistência técnica é rápida e o financiamento foi aprovado em 2 dias. Melhor decisão que tomei.", author: "Carlos Mendes", role: "Mendes Terraplanagem · SP", initials: "CM" },
    { quote: "A máquina é robusta como as grandes marcas, mas o atendimento é outro nível. Me ligaram em 30 dias pra saber se tava tudo certo. Nunca vi isso.", author: "Roberto Silva", role: "Silva Construções · MG", initials: "RS" },
    { quote: "Financiamento aprovado em 24h, sem burocracia nenhuma. A Kratux entende o ritmo de quem trabalha com obra. Recomendo de olhos fechados.", author: "Ana Ferreira", role: "Ferreira Logística · PR", initials: "AF" },
  ];
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[active];

  return (
    <section id="depoimentos" className="py-32 md:py-44 bg-[#F5F5F0] text-[#1C1C1A] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center">
            <Label>Depoimentos</Label>
          </div>
        </Reveal>

        <div className="max-w-[800px] mx-auto text-center mt-8">
          {/* Stars */}
          <div className="text-[var(--color-accent)] text-lg tracking-[4px] mb-10">★★★★★</div>

          {/* Quote */}
          <div className="relative min-h-[180px] flex items-center justify-center">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(22px,2.5vw,32px)] leading-[1.6] font-medium text-[#1C1C1A]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{t.quote}&rdquo;
            </motion.p>
          </div>

          {/* Author */}
          <motion.div
            key={`author-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#1C1C1A] flex items-center justify-center font-bold text-white text-sm" style={{ fontFamily: "var(--font-display)" }}>
              {t.initials}
            </div>
            <div>
              <div className="text-[16px] font-semibold text-[#1C1C1A]">{t.author}</div>
              <div className="text-[14px] text-[#1C1C1A]/50 mt-1">{t.role}</div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#1C1C1A]/15 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all duration-300 text-[#1C1C1A]/40"
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-[var(--color-accent)] w-6" : "bg-[#1C1C1A]/15 hover:bg-[#1C1C1A]/30"}`}
                  aria-label={`Depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#1C1C1A]/15 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] flex items-center justify-center transition-all duration-300 text-[#1C1C1A]/40"
              aria-label="Próximo"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FINANCIAMENTO ─── */
function Financiamento() {
  const steps = [
    { num: "01", title: "Contato", desc: "Fale conosco por WhatsApp" },
    { num: "02", title: "Análise", desc: "Crédito analisado em até 24 horas" },
    { num: "03", title: "Proposta", desc: "Condições personalizadas para sua operação" },
    { num: "04", title: "Entrega", desc: "Máquina entregue com treinamento incluso" },
  ];
  return (
    <section id="financiamento" className="py-32 md:py-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <Label>Financiamento</Label>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-display)" }}>Crédito em 24h.<br />Sem burocracia.</h2>
          <p className="text-[19px] text-[var(--color-foreground)]/70 leading-relaxed max-w-md mb-16">Financiamento direto, condições personalizadas para sua operação.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="p-8 md:p-10 border border-[var(--color-border)] bg-[var(--color-surface-raised)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                <div className="text-4xl font-bold text-[var(--color-accent)] mb-5" style={{ fontFamily: "var(--font-display)" }}>{s.num}</div>
                <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h4>
                <p className="text-[17px] text-[var(--color-muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.4} className="text-center mt-14">
          <a href="#contato" className="inline-block text-[13px] font-bold tracking-[2px] uppercase bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-10 py-4 transition-all hover:shadow-[0_8px_32px_rgba(231,95,13,0.3)]">Simular Financiamento</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CONTATO ─── */
function Contato() {
  return (
    <section id="contato" className="py-32 md:py-40 bg-[#F5F5F0] text-[#1C1C1A]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal>
          <Label accent>Contato</Label>
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold mb-4 text-[#1C1C1A]" style={{ fontFamily: "var(--font-display)" }}>
            Fale com a gente
          </h2>
          <p className="text-[19px] text-[#1C1C1A]/65 leading-relaxed max-w-lg mb-16">
            Visite nosso escritório ou entre em contato por qualquer um dos canais abaixo. Respondemos em até 24 horas.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-0 border border-[#1C1C1A]/10 overflow-hidden lg:items-stretch">
          {/* Info Column */}
          <Reveal>
            <div className="bg-[var(--color-background)] text-[var(--color-foreground)] p-10 md:p-14 flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <Image src="/images/logo.png" alt="Kratux" width={160} height={40} className="h-10 w-auto" />
                </div>

                <div className="space-y-8">
                  {/* Endereço */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-accent)]"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Endereço</h4>
                      <p className="text-[17px] text-[var(--color-muted)] leading-relaxed">
                        Av. Industrial, 1500<br />
                        Distrito Industrial — São Paulo, SP<br />
                        CEP 01000-000
                      </p>
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-accent)]"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Telefone</h4>
                      <p className="text-[15px] text-[var(--color-muted)]">(11) 4000-0000</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>WhatsApp</h4>
                      <a href="https://wa.me/5511940000000" target="_blank" rel="noopener noreferrer" className="text-[16px] text-[var(--color-accent)] hover:opacity-80 transition-opacity">
                        (11) 94000-0000
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[var(--color-accent)]"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>E-mail</h4>
                      <a href="mailto:contato@kratux.com.br" className="text-[16px] text-[var(--color-accent)] hover:opacity-80 transition-opacity">
                        contato@kratux.com.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
                <p className="text-[13px] text-[var(--color-muted)]">
                  Seg — Sex: 8h às 18h &nbsp;·&nbsp; Sáb: 8h às 12h
                </p>
              </div>
            </div>
          </Reveal>

          {/* Map Column */}
          <Reveal delay={0.2} className="h-full">
            <div className="relative min-h-[480px] lg:min-h-0 h-full bg-[#E8E8E3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975516782!2d-46.6560!3d-23.5615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQxLjQiUyA0NsKwMzknMjEuNiJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Kratux"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#0E0E0D] border-t border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 grid md:grid-cols-[2fr_1fr_1fr] gap-12">
        <div>
          <Image src="/images/logo.png" alt="Kratux" width={280} height={64} className="h-16 w-auto opacity-60 mb-6" />
          <p className="text-[17px] text-[var(--color-muted)] leading-relaxed max-w-xs">Máquinas pesadas para PMEs. Qualidade de ponta, preço competitivo e o pós-venda que o seu negócio merece.</p>
        </div>
        <div>
          <h4 className="text-[11px] font-bold text-[var(--color-muted)] uppercase tracking-[2px] mb-6">Navegação</h4>
          {[{ l: "Máquinas", h: "#maquinas" }, { l: "Financiamento", h: "#financiamento" }, { l: "A Kratux", h: "#solucao" }, { l: "Contato", h: "#contato" }].map(({ l, h }) => (
            <a key={h} href={h} className="block text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors leading-loose">{l}</a>
          ))}
        </div>
        <div>
          <h4 className="text-[11px] font-bold text-[var(--color-muted)] uppercase tracking-[2px] mb-6">Contato</h4>
          <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="block text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors leading-loose">WhatsApp</a>
          <a href="mailto:contato@kratux.com.br" className="block text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors leading-loose">contato@kratux.com.br</a>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-6 border-t border-white/[0.04] flex flex-col md:flex-row justify-between gap-2 text-[12px] text-white/20">
        <span>© 2026 Kratux. Todos os direitos reservados.</span>
        <span>Respaldada por mais de 17 anos de experiência em máquinas pesadas.</span>
      </div>
    </footer>
  );
}

/* ─── WHATSAPP ─── */
function WhatsApp() {
  return (
    <motion.a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="fixed bottom-7 right-7 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center z-50 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.4)]"
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring" }}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </motion.a>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  return (<><Nav /><Hero /><Numeros /><Maquinas /><Problema /><Solucao /><Comparativo /><Financiamento /><Contato /><Footer /><WhatsApp /></>);
}
