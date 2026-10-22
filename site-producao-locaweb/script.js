/* ─── MACHINE DATA ─── */
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5547992199265&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es!%20%5BPor%20favor%2C%20enviar%20essa%20mensagem%5D";

const categories = [
  {
    id: "escavadeiras", label: "Escavadeiras",
    machines: [
      { name: "KX27E", img: "images/Escavadeiras/KX27E.png", catalog: "images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX27E.pdf", specs: ["Peso Operacional: 2.700 kg", "Potência do Motor: 20 hp"] },
      { name: "KX38E", img: "images/Escavadeiras/KX38E.webp", catalog: "images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX38E.pdf", specs: ["Peso Operacional: 3.880 kg", "Potência do Motor: 26 hp"] },
      { name: "KX60E", img: "images/Escavadeiras/KX60E 2.webp", catalog: "images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX60E.pdf", specs: ["Peso Operacional: 5.960 kg", "Potência do Motor: 50 hp"] },
      { name: "KX85E", img: "images/Escavadeiras/KX85E.webp", catalog: "images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX85E.pdf", specs: ["Peso Operacional: 8.150 kg", "Potência do Motor: 50 hp"] },
      { name: "KX130E", img: "images/Escavadeiras/KX130E.webp", catalog: "images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX130E.pdf", specs: ["Peso Operacional: 13.500 kg", "Potência do Motor: 125 hp"] },
      { name: "KX150E", img: "images/Escavadeiras/KX150E.webp", catalog: "images/Escavadeiras/CATÁLOGO ESCAVADEIRA KX150E.pdf", specs: ["Peso Operacional: 14.500 kg", "Potência do Motor: 125 hp"] },
    ],
  },
  {
    id: "pa-carregadeira", label: "Pá Carregadeira",
    machines: [
      { name: "KX920L", img: "images/PÁ CARREGADEIRA/KX920L.webp", catalog: "images/PÁ CARREGADEIRA/Catálogo PÁ KX920L.pdf", specs: ["Peso Operacional: 5.900 kg", "Capacidade de Carga: 2.000 kg", "Potência do Motor: 95 hp"] },
      { name: "KX936L", img: "images/PÁ CARREGADEIRA/KX936L.webp", catalog: "images/PÁ CARREGADEIRA/Catálogo PÁ KX936L.pdf", specs: ["Peso Operacional: 10.500 kg", "Capacidade de Carga: 3.000 kg", "Potência do Motor: 130 hp"] },
      { name: "KX946L", img: "images/PÁ CARREGADEIRA/KX946L.png", catalog: "images/PÁ CARREGADEIRA/Catálogo PÁ KX946L.pdf", specs: ["Peso Operacional: 11.400 kg", "Capacidade de Carga: 4.000 kg", "Potência do Motor: 140 hp"] },
      { name: "KX947L", img: "images/PÁ CARREGADEIRA/KX947L.webp", catalog: "images/PÁ CARREGADEIRA/Catálogo PÁ KX947L.pdf", specs: ["Peso Operacional: 12.300 kg", "Capacidade de Carga: 4.000 kg", "Potência do Motor: 140 hp"] },
      { name: "KX956L", img: "images/PÁ CARREGADEIRA/foto KX956L.webp", catalog: "images/PÁ CARREGADEIRA/Catálogo PÁ KX956L.pdf", specs: ["Peso Operacional: 17.300 kg", "Capacidade de Carga: 5.000 kg", "Potência do Motor: 220 hp"] },
    ],
  },
  {
    id: "retroescavadeira", label: "Retroescavadeira",
    machines: [
      { name: "KX870R", img: "images/RETROESCAVADEIRA/KX870R 2.webp", catalog: "images/RETROESCAVADEIRA/Catálogo RETRO KX870R.pdf", specs: ["Peso Operacional: 8.200 kg", "Capacidade de Carga: 2.500 kg", "Potência: 102 hp"] },
    ],
  },
  {
    id: "rolo-compactador", label: "Rolo Compactador",
    machines: [
      { name: "KX08C", img: "images/ROLO COMPACTADOR/Foto KX08C.webp", catalog: "images/ROLO COMPACTADOR/CATÁLOGO ROLO KX08C.pdf", specs: ["Peso Operacional: 8.000 kg", "Largura do Tambor: 1.700 mm", "Potência do Motor: 100 cv"] },
      { name: "KX12C", img: "images/ROLO COMPACTADOR/Foto ROLO.webp", catalog: "images/ROLO COMPACTADOR/CATÁLOGO ROLO KX12C.pdf", specs: ["Peso Operacional: 12.500 kg", "Largura do Tambor: 2.150 mm", "Potência do Motor: 140 cv"] },
    ],
  },
  {
    id: "trator-esteira", label: "Trator de Esteira",
    machines: [
      { name: "KX14B", img: "images/TRATOR DE ESTEIRA/Foto KX14B.webp", catalog: "images/TRATOR DE ESTEIRA/CATÁLOGO KX14B.pdf", specs: ["Peso Operacional: 14.000 kg", "Potência do Motor: 140 hp"] },
      { name: "KX17B", img: "images/TRATOR DE ESTEIRA/Foto KX17B.webp", catalog: "images/TRATOR DE ESTEIRA/CATÁLOGO KX17B.pdf", specs: ["Peso Operacional: 16.500 kg", "Potência do Motor: 175 hp"] },
    ],
  },
  {
    id: "motoniveladora", label: "Motoniveladora",
    machines: [
      { name: "KX190G", img: "images/MOTONIVELADORA/KX190G.webp", catalog: "images/MOTONIVELADORA/CATALOGO_NOVO.pdf", specs: ["Peso Operacional: 15.600 kg", "Potência do Motor: 190 hp"] },
    ],
  },
  {
    id: "mini-carregadeira", label: "Mini Carregadeira",
    machines: [
      { name: "KX65L", img: "images/MINI CARREGADEIRA/Foto KX65L.webp", catalog: "images/MINI CARREGADEIRA/Catálogo MINI CARREGADEIRA KX65L.pdf", specs: ["Peso Operacional: 3.050 kg", "Capacidade de Carga: 900 kg", "Potência do Motor: 50 hp"] },
    ],
  },
];

const WHATSAPP_SVG = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
const CATALOG_SVG = '<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>';

/* ─── NAV SCROLL ─── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

/* ─── NAV MOBILE MENU ─── */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

/* ─── HERO PARALLAX ─── */
const heroSection = document.getElementById("heroSection");
const heroBg = document.getElementById("heroBg");
const heroContent = document.getElementById("heroContent");

window.addEventListener("scroll", () => {
  const rect = heroSection.getBoundingClientRect();
  const sectionH = heroSection.offsetHeight;
  if (rect.bottom < 0 || rect.top > window.innerHeight) return;

  const progress = Math.min(Math.max(-rect.top / sectionH, 0), 1);
  const yPct = progress * 20;
  const scale = 1 + progress * 0.15;
  heroBg.style.transform = `translateY(${yPct}%) scale(${scale})`;

  const opacityProgress = Math.min(progress / 0.6, 1);
  heroContent.style.opacity = 1 - opacityProgress;
});

/* ─── REVEAL ON SCROLL (IntersectionObserver) ─── */
function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || "0", 10);
          setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "-80px", threshold: 0 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
}
setupReveal();

/* ─── COMPARATIVO ROW REVEAL ─── */
const rowObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rows = document.querySelectorAll(".reveal-row");
        rows.forEach((row, i) => {
          setTimeout(() => row.classList.add("visible"), i * 50);
        });
        rowObserver.disconnect();
      }
    });
  },
  { rootMargin: "-80px", threshold: 0 }
);
const comparativoBody = document.getElementById("comparativoBody");
if (comparativoBody) rowObserver.observe(comparativoBody);

/* ─── MÁQUINAS ─── */
let activeTab = "escavadeiras";
const maquinasContent = document.getElementById("maquinasContent");
const maquinasTabs = document.getElementById("maquinasTabs");

function buildMachineCard(m, isCarousel) {
  const card = document.createElement("div");
  card.className = "machine-card" + (isCarousel ? " carousel-card" : "");

  card.innerHTML = `
    <div class="machine-img-wrap">
      <img src="${m.img}" alt="${m.name}" loading="lazy">
    </div>
    <div class="machine-info">
      <h3 class="machine-name">${m.name}</h3>
      <ul class="machine-specs">
        ${m.specs.map((s) => `<li class="machine-spec">${s}</li>`).join("")}
      </ul>
      <div class="machine-actions">
        <a href="${WHATSAPP_URL}Olá, tenho interesse no equipamento ${m.name} da Kratux." target="_blank" rel="noopener noreferrer" class="machine-btn-whatsapp">
          ${WHATSAPP_SVG}
          Solicitar Orçamento
        </a>
        <a href="${m.catalog}" target="_blank" rel="noopener noreferrer" class="machine-btn-catalog">
          ${CATALOG_SVG}
          Baixar Catálogo
        </a>
      </div>
    </div>
  `;
  return card;
}

function updateArrows(track, leftBtn, rightBtn) {
  if (!track || !leftBtn || !rightBtn) return;
  leftBtn.style.display = track.scrollLeft > 10 ? "flex" : "none";
  rightBtn.style.display =
    track.scrollLeft < track.scrollWidth - track.clientWidth - 10 ? "flex" : "none";
}

function renderMachines(tabId) {
  const cat = categories.find((c) => c.id === tabId);
  if (!cat) return;

  maquinasContent.classList.add("fading");

  setTimeout(() => {
    maquinasContent.innerHTML = "";
    const useCarousel = cat.machines.length > 3;

    if (useCarousel) {
      const wrapper = document.createElement("div");
      wrapper.className = "maquinas-carousel";

      const track = document.createElement("div");
      track.className = "maquinas-track";

      cat.machines.forEach((m) => {
        track.appendChild(buildMachineCard(m, true));
      });

      const leftBtn = document.createElement("button");
      leftBtn.className = "carousel-arrow carousel-arrow--left";
      leftBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';

      const rightBtn = document.createElement("button");
      rightBtn.className = "carousel-arrow carousel-arrow--right";
      rightBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';

      leftBtn.addEventListener("click", () => {
        const cardW = track.querySelector(".machine-card")?.offsetWidth || 380;
        track.scrollBy({ left: -(cardW + 24), behavior: "smooth" });
        setTimeout(() => updateArrows(track, leftBtn, rightBtn), 400);
      });

      rightBtn.addEventListener("click", () => {
        const cardW = track.querySelector(".machine-card")?.offsetWidth || 380;
        track.scrollBy({ left: cardW + 24, behavior: "smooth" });
        setTimeout(() => updateArrows(track, leftBtn, rightBtn), 400);
      });

      track.addEventListener("scroll", () => updateArrows(track, leftBtn, rightBtn));

      wrapper.appendChild(track);
      wrapper.appendChild(leftBtn);
      wrapper.appendChild(rightBtn);
      maquinasContent.appendChild(wrapper);

      setTimeout(() => updateArrows(track, leftBtn, rightBtn), 200);
    } else {
      const grid = document.createElement("div");
      grid.className = "maquinas-grid";
      cat.machines.forEach((m) => {
        grid.appendChild(buildMachineCard(m, false));
      });
      maquinasContent.appendChild(grid);
    }

    maquinasContent.classList.remove("fading");
  }, 200);
}

maquinasTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".maquinas-tab");
  if (!btn) return;
  const tabId = btn.dataset.tab;
  if (tabId === activeTab) return;

  activeTab = tabId;
  maquinasTabs.querySelectorAll(".maquinas-tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  renderMachines(tabId);
});

// Initial render
renderMachines("escavadeiras");

/* ─── WHATSAPP FLOAT ENTRANCE ─── */
setTimeout(() => {
  document.getElementById("whatsappFloat").classList.add("visible");
}, 1500);
