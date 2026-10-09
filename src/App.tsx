import { useState, useEffect, useMemo } from "react";
import patternUrl from "container:///mnt/data/src/assets/45f4bb7a8b379383-pattern.jpg";
import fotoUrl from "container:///mnt/data/src/assets/4b6b7d87a231b3c6-foto_portada_web_5.png";
import placeholderUrl from "container:///mnt/data/src/assets/b990711bb8bf7a1f-image_39c0e0.png";

// content.json in-memory editable - extended with slugs for internal templates
const defaultContent = {
  header: {
    logo: "FERCHU ESCOLA",
    badges: ["EST. 2007", "VECTOR", "ARCADE", "BA • AR"],
    nav: {
      es: ["Trabajos", "Vectores", "Clientes", "Libro “Marquesinas”", "Contacto"],
      en: ["Works", "Vectors", "Clients", "Book “Marquees”", "Contact"]
    }
  },
  hero: {
    line1: "FERCHU",
    line2: "ESCOLA",
    box: "MARQUESINAS &\nVIDEO GAME ART\nSINCE 2007",
    sub: "UN TALLER VECTORIAL DENTRO DE UNA MAQUINA"
  },
  infoBar: "UN TALLER VECTORIAL DENTRO DE UNA MAQUINA • BUENOS AIRES • EST. 2007 • ARCADE WORKSHOP",
  trabajos: {
    title: "TRABAJOS",
    subtitle: "MARQUESINAS VECTORIZADAS • 10 PIEZAS • 100% VECTOR",
    count: "010",
    items: [
      { id: "01", slug: "galaxy-game", title: "GALAXY GAME", year: "2019", client: "FICHIN BAR", color: "#FFEB00", type: "MARQUESINA • 3.2M", location: "PALERMO • CABA", technique: "COREL DRAW X8 • 100% VECTOR", medidas: "3.2M x 0.75M • LONA BACKLIGHT", tipografia: "IMPACT + CUSTOM BEZIER", colores: "CMYK + FLUO AMARILLO", desc: "Marquesina completa para Fichin Bar Palermo. Relevamiento de fachada, trazado de logo original, armado de caja luminosa con tubos led. 1.4K nodos." },
      { id: "02", slug: "space-invaders", title: "SPACE INVADERS", year: "2020", client: "SALON RECOLETA", color: "#00E5FF", type: "MARQUESINA • 2.8M", location: "RECOLETA • CABA", technique: "COREL DRAW 2021 • TRAZADO MANUAL", medidas: "2.8M x 0.90M • CHAPA + VINILO", tipografia: "PIXEL CUSTOM • 8-BIT", colores: "CYAN + MAGENTA + NEGRO", desc: "Recreación pixel perfect del clásico 1978, vectorizado sin autotrace. Caja con iluminación lateral." },
      { id: "03", slug: "pac-man-club", title: "PAC-MAN CLUB", year: "2018", client: "PALERMO ARCADE", color: "#FF00AA", type: "MARQUESINA • 4.0M", location: "PALERMO SOHO • CABA", technique: "COREL DRAW • BEZIER PURO", medidas: "4.0M x 1.1M • LONA FRONTLIGHT", tipografia: "PAC-FONT + BOLD", colores: "AMARILLO FLUO + NEGRO + ROSA", desc: "Marquesina insignia, 4 metros de largo, 3 capas de vinilo, fondo negro mate." },
      { id: "04", slug: "mortal-kombat", title: "MORTAL KOMBAT", year: "2021", client: "VILLA CRESPO", color: "#FFEB00", type: "MARQUESINA • 3.5M", location: "VILLA CRESPO • CABA", technique: "COREL + PHOTOPAINT", medidas: "3.5M x 0.85M • BACKLIGHT", tipografia: "MK DRAGON • CUSTOM", colores: "ROJO SANGRE + AMARILLO", desc: "Dragón trazado nodo por nodo, degradado manual CMYK." },
      { id: "05", slug: "street-fighter-ii", title: "STREET FIGHTER II", year: "2019", client: "ARCADE BA", color: "#00E5FF", type: "MARQUESINA • 3.0M", location: "ALMAGRO • CABA", technique: "COREL DRAW X8", medidas: "3.0M x 0.80M • VINILO + CHAPA", tipografia: "STREET FIGHTER BOLD", colores: "AZUL + ROJO + AMARILLO", desc: "Select screen completo, personajes en silueta." },
      { id: "06", slug: "neo-geo-zone", title: "NEO GEO ZONE", year: "2022", client: "FICHIN LAB", color: "#000", type: "MARQUESINA • 2.5M", location: "LA BOCA • CABA", technique: "COREL 2022 • 2.1K NODOS", medidas: "2.5M x 0.70M • LONA MATE", tipografia: "NEO GEO SANS • CONDENSED", colores: "BLANCO + ROJO + NEGRO", desc: "Minimal, tipografía blanca sobre negro, franja roja inferior." },
      { id: "07", slug: "capcom-corner", title: "CAPCOM CORNER", year: "2020", client: "BARRIO CHINO", color: "#FF00AA", type: "MARQUESINA • 3.8M", location: "BELGRANO • CABA", technique: "COREL DRAW • OFFSET", medidas: "3.8M x 0.95M • CAJA ALUMINIO", tipografia: "CAPCOM LOGO CUSTOM", colores: "AZUL CAPCOM + AMARILLO", desc: "Esquina completa, dos frentes, continuidad de trama." },
      { id: "08", slug: "sega-world", title: "SEGA WORLD", year: "2017", client: "ONCE ARCADE", color: "#FFEB00", type: "MARQUESINA • 4.2M", location: "ONCE • CABA", technique: "COREL X7 • HAND TRACE", medidas: "4.2M x 1.2M • LONA + NEON", tipografia: "SEGA SONIC BOLD", colores: "AZUL SEGA + BLANCO", desc: "La más larga del portfolio, 4.2 metros, neon azul perimetral." },
      { id: "09", slug: "atari-legends", title: "ATARI LEGENDS", year: "2023", client: "LA BOCA", color: "#00E5FF", type: "MARQUESINA • 3.1M", location: "BARRIO CHINO • CABA", technique: "COREL 2023 • CMYK", medidas: "3.1M x 0.80M • BACKLIGHT", tipografia: "ATARI CLASSIC", colores: "NARANJA + NEGRO", desc: "Homenaje Atari, trazado de 6 logos originales." },
      { id: "10", slug: "kof-98", title: "KOF '98", year: "2022", client: "ALMAGRO", color: "#FF00AA", type: "MARQUESINA • 2.9M", location: "ALMAGRO • CABA", technique: "COREL DRAW • 1.8K NODOS", medidas: "2.9M x 0.75M • VINILO", tipografia: "KOF BOLD + KATAKANA", colores: "ROJO + AMARILLO + NEGRO", desc: "Tipografía japonesa trazada a mano, fondo explosión." }
    ]
  },
  vectores: {
    title: "VECTORES",
    subtitle: "VIDEO GAME ART • 100% BEZIER • CORELDRAW",
    count: "005",
    items: [
      { id: "V01", slug: "marquesina-neon", title: "MARQUESINA NEON", game: "GALAGA '81", detail: "TRAZO: 1.2K NODOS • CMYK", color: "#FFEB00", year: "2019", desc: "Estudio de neon, brillo y halftone. Cada tubo trazado con 2 trazos paralelos, efecto glow manual en Corel.", nodos: "1.2K NODOS", soft: "COREL DRAW X8" },
      { id: "V02", slug: "character-select", title: "CHARACTER SELECT", game: "STREET FIGHTER II", detail: "TRAZO: 2.4K NODOS • PANTONE", color: "#00E5FF", year: "2020", desc: "Character select completo, 8 luchadores en silueta vectorial, fondo degradado CMYK sin bitmap.", nodos: "2.4K NODOS", soft: "COREL 2021" },
      { id: "V03", slug: "boss-stage", title: "BOSS STAGE", game: "METAL SLUG", detail: "TRAZO: 3.1K NODOS • SPOT COLOR", color: "#FF00AA", year: "2021", desc: "Boss Stage Metal Slug, detalle máximo, 3.1K nodos, spot color flúo para impresión offset.", nodos: "3.1K NODOS", soft: "COREL + PANTONE" },
      { id: "V04", slug: "insert-coin", title: "INSERT COIN", game: "ORIGINAL", detail: "TRAZO: 890 NODOS • 300 DPI", color: "#000", year: "2018", desc: "Lettering original Insert Coin, trazado desde boceto a mano alzada, 890 nodos, versión blanca y negra.", nodos: "890 NODOS", soft: "COREL X7" },
      { id: "V05", slug: "game-over", title: "GAME OVER", game: "PAC-MAN", detail: "TRAZO: 1.8K NODOS • VECTOR", color: "#FFEB00", year: "2022", desc: "Game Over estilo Pac-Man, tipografía pixel + contorno grueso, fondo laberinto trazado.", nodos: "1.8K NODOS", soft: "COREL 2022" }
    ]
  },
  clientes: {
    title: "CLIENTES",
    subtitle: "SALONES • BARES • COLECCIONES • 2007—2025",
    count: "008",
    items: [
      { slug: "arcade-club-ba", name: "ARCADE CLUB BA", tag: "BA • 2018", desc: "Club privado de coleccionistas, 3 marquesinas + 2 vectores para merch.", trabajos: ["galaxy-game", "space-invaders", "neo-geo-zone"], color: "#FFEB00" },
      { slug: "fichin-bar", name: "FICHIN BAR", tag: "PALERMO • 2019", desc: "Bar arcade Palermo, identidad completa, marquesina principal + carta + stickers.", trabajos: ["galaxy-game", "pac-man-club", "kof-98"], color: "#00E5FF" },
      { slug: "galaxia-retro", name: "GALAXIA RETRO", tag: "CABA • 2020", desc: "Local de venta y reparación, 2 marquesinas exteriores, vinilo interior.", trabajos: ["space-invaders", "sega-world"], color: "#FF00AA" },
      { slug: "museo-del-juguete", name: "MUSEO DEL JUGUETE", tag: "AR • 2021", desc: "Exhibición temporal 2021, marquesinas reproducciones históricas.", trabajos: ["atari-legends", "sega-world"], color: "#FFEB00" },
      { slug: "neo-geo-lab", name: "NEO GEO LAB", tag: "ALMAGRO • 2022", desc: "Laboratorio de restauración Neo Geo, marquesina + manual técnico.", trabajos: ["neo-geo-zone", "kof-98"], color: "#000" },
      { slug: "capcom-ar", name: "CAPCOM AR", tag: "BA • 2020", desc: "Fan club oficial, corner en Barrio Chino.", trabajos: ["capcom-corner", "street-fighter-ii"], color: "#FF00AA" },
      { slug: "sega-fans-arg", name: "SEGA FANS ARG", tag: "ONCE • 2019", desc: "Comunidad Sega, evento anual, marquesina escenario principal.", trabajos: ["sega-world"], color: "#00E5FF" },
      { slug: "insert-coin-fest", name: "INSERT COIN FEST", tag: "FEST • 2023", desc: "Festival arcade, señalética completa, 12 piezas.", trabajos: ["insert-coin", "game-over", "pac-man-club"], color: "#FFEB00" }
    ]
  },
  libro: {
    title: "LIBRO",
    subtitle: "“MARQUESINAS”",
    year: "2022 • 240 PAG • ED. LIMITADA",
    description: "Archivo visual de marquesinas de fichines argentinas. 15 años de relevamiento en salones de barrio, fotos, vectores y entrevistas. 100% relevado a mano, trazado en CorelDRAW. Offset CMYK + spot flúo.",
    specs: ["240 PAGINAS • 21x27CM", "OFFSET CMYK + 1 FLUO", "TAPA DURA • LOMO ROJO", "EST. 2007—2022"],
    cta: "CONSULTAR DISPONIBILIDAD",
    chapters: [
      { num: "01", title: "INTRO • EL TALLER VECTORIAL", pages: "PAG 6-24", desc: "Cómo se arma una marquesina desde el relevamiento hasta el archivo final .CDR" },
      { num: "02", title: "PALERMO • FICHIN BAR", pages: "PAG 26-68", desc: "Fotos de campo, bocetos, vectores, instalación. Galaxy Game, Pac-Man Club." },
      { num: "03", title: "ONCE • SEGA WORLD", pages: "PAG 70-112", desc: "Salones de Once, 4.2 metros de marquesina, neón, entrevistas a dueños." },
      { num: "04", title: "TIPOGRAFIAS ARCADE", pages: "PAG 114-158", desc: "Relevamiento tipográfico, pixeles, custom lettering, comparativa original vs vector." },
      { num: "05", title: "TECNICA • CORELDRAW", pages: "PAG 160-200", desc: "Workflow completo: nodos cuadrados, handles circulares, color plano, CMYK." },
      { num: "06", title: "ARCHIVO • 2007-2022", pages: "PAG 202-240", desc: "Índice completo de 150 marquesinas relevadas, mapa de salones, créditos." }
    ],
    comprar: "https://ferchuescola.bigcartel.com • CONSULTAR STOCK • ENVIO BA • AR • 100% DIRECTO DE TALLER",
    precio: "$12.500 ARS • ED. LIMITADA 300 EJ.",
    detalle: "Offset CMYK + 1 tinta flúo amarilla, papel ilustración 150g, tapa dura con lomo rojo, 21x27cm, encuadernado cosido."
  },
  contacto: {
    title: "CONTACTO",
    subtitle: "TALLER VECTORIAL • BUENOS AIRES",
    email: "ferchu.escola@gmail.com",
    instagram: "@ferchuescola",
    location: "BUENOS AIRES • AR • GMT-3",
    note: "RESPUESTA EN 24/48H • 100% VECTOR"
  }
};

// CORELDRAW ONLY NODES: square node + circle handles, no Adobe diamond
function BezierNode({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={style} className="absolute w-[11px] h-[11px] bg-white border-[2px] border-[#0066FF] shadow-[0_0_0_1px_white] z-10">
      <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-white border-[1.5px] border-[#0066FF] rounded-full" />
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-white border-[1.5px] border-[#0066FF] rounded-full" />
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#0066FF]/70 -translate-x-1/2 -z-10" />
    </div>
  );
}
function CornerNodes() {
  return (
    <>
      <div className="absolute -top-[7px] -left-[7px] w-[13px] h-[13px] bg-white border-[2px] border-[#0066FF] shadow-[1px_1px_0_#000] z-20" />
      <div className="absolute -top-[7px] -right-[7px] w-[13px] h-[13px] bg-white border-[2px] border-[#0066FF] shadow-[1px_1px_0_#000] z-20" />
      <div className="absolute -bottom-[7px] -left-[7px] w-[13px] h-[13px] bg-white border-[2px] border-[#0066FF] shadow-[1px_1px_0_#000] z-20" />
      <div className="absolute -bottom-[7px] -right-[7px] w-[13px] h-[13px] bg-white border-[2px] border-[#0066FF] shadow-[1px_1px_0_#000] z-20" />
      <div className="absolute -top-[7px] -left-[7px] w-[22px] h-[1px] bg-[#0066FF] -rotate-45 origin-center translate-x-[-8px] translate-y-[-6px] opacity-50" />
      <div className="absolute -top-[7px] -left-[18px] -translate-y-[9px] w-[6px] h-[6px] bg-white border-[1.5px] border-[#0066FF] rounded-full opacity-80" />
      <div className="absolute -top-[7px] -right-[7px] w-[22px] h-[1px] bg-[#0066FF] rotate-45 origin-center translate-x-[8px] translate-y-[-6px] opacity-50" />
      <div className="absolute -top-[7px] -right-[18px] -translate-y-[9px] w-[6px] h-[6px] bg-white border-[1.5px] border-[#0066FF] rounded-full opacity-80" />
    </>
  );
}
function HalftoneDots({ color = "#00E5FF", className = "", size = 120, dot = 2.2, gap = 12, opacity = 0.18 }: { color?: string; className?: string; size?: number; dot?: number; gap?: number; opacity?: number; }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ width: size, height: size, opacity, backgroundImage: `radial-gradient(circle, ${color} ${dot}px, transparent ${dot + 0.4}px)`, backgroundSize: `${gap}px ${gap}px`, backgroundPosition: "0 0" }} />
  );
}
function Crosshair({ className }: { className?: string }) {
  return (
    <div className={`absolute w-[44px] h-[44px] pointer-events-none ${className}`}>
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/60 -translate-x-1/2" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/60 -translate-y-1/2" />
      <div className="absolute left-1/2 top-1/2 w-[28px] h-[28px] border border-black/50 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute left-1/2 top-1/2 w-[14px] h-[14px] border border-black/30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute left-1/2 top-1/2 w-[3px] h-[3px] bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}
function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[10px] mono uppercase tracking-wide">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-30">/</span>}
          {it.href ? (
            <a href={it.href} className="bg-white border-[1.5px] border-black px-2 py-[3px] font-bold hover:bg-[#FFEB00] transition-colors">{it.label}</a>
          ) : (
            <span className="bg-black text-white px-2 py-[3px] font-bold">{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
function useHashRoute() {
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash || "#/" : "#/"));
  useEffect(() => {
    const h = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return hash;
}

export default function App() {
  const [lang, setLang] = useState<"ES" | "EN">("ES");
  const [adminOpen, setAdminOpen] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultContent, null, 2));
  const [jsonError, setJsonError] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactToast, setContactToast] = useState("");

  const routeHash = useHashRoute();
  const routePath = useMemo(() => {
    const raw = routeHash.replace(/^#/, "") || "/";
    return raw.startsWith("/") ? raw : `/${raw}`;
  }, [routeHash]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("edit=1")) setAdminOpen(true);
  }, []);

  const navItems = lang === "ES" ? content.header.nav.es : content.header.nav.en;
  const navHrefs = ["#/trabajos", "#/vectores", "#/clientes", "#/libro", "#/contacto"];

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setContent(parsed);
      setJsonError("");
      setAdminOpen(false);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };
  useEffect(() => {
    if (contactToast) {
      const t = setTimeout(() => setContactToast(""), 3000);
      return () => clearTimeout(t);
    }
  }, [contactToast]);

  const findTrabajo = (slug: string) => (content.trabajos.items as any[]).find((x) => x.slug === slug);
  const findVector = (slug: string) => (content.vectores.items as any[]).find((x) => x.slug === slug);
  const findCliente = (slug: string) => (content.clientes.items as any[]).find((x) => x.slug === slug);

  // routing parse
  let page: "home" | "trabajos" | "trabajo-detail" | "vectores" | "vector-detail" | "clientes" | "cliente-detail" | "libro" | "contacto" = "home";
  let slug: string | null = null;
  if (routePath === "/" || routePath === "") page = "home";
  else if (routePath === "/trabajos" || routePath === "/trabajos/") page = "trabajos";
  else if (routePath.startsWith("/trabajos/")) { page = "trabajo-detail"; slug = routePath.split("/")[2]; }
  else if (routePath === "/vectores" || routePath === "/vectores/") page = "vectores";
  else if (routePath.startsWith("/vectores/")) { page = "vector-detail"; slug = routePath.split("/")[2]; }
  else if (routePath === "/clientes" || routePath === "/clientes/") page = "clientes";
  else if (routePath.startsWith("/clientes/")) { page = "cliente-detail"; slug = routePath.split("/")[2]; }
  else if (routePath.startsWith("/libro")) page = "libro";
  else if (routePath.startsWith("/contacto")) page = "contacto";

  return (
    <div className="min-h-screen bg-[#FCFDFD] text-black relative overflow-x-clip selection:bg-[#FFEB00]">
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundColor: "#fbfdff", backgroundImage: `linear-gradient(to right, rgba(120,180,255,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,180,255,0.28) 1px, transparent 1px)`, backgroundSize: "22px 22px", opacity: 0.32 }} />
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ backgroundImage: `url(${patternUrl})`, backgroundRepeat: "repeat", backgroundSize: "340px", backgroundPosition: "0 0", opacity: 0.6, mixBlendMode: "multiply" as any }} />
      <div className="fixed inset-0 pointer-events-none z-[2] bg-white/10 mix-blend-normal" />
      <style>{`
        * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .display { font-family: 'Impact', 'Arial Black', 'Anton', sans-serif; font-stretch: condensed; }
        .mono { font-family: 'Courier New', Courier, monospace; }
        ::-webkit-scrollbar { width: 8px; }
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 68px; }
      `}</style>

      <div className="relative z-10">
        <div className="bg-black text-white h-[30px] flex items-center px-3 md:px-5 text-[10px] tracking-[0.14em] uppercase font-mono leading-none border-b-[2px] border-black">
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <span className="bg-[#FFEB00] text-black px-2 py-[3px] font-black tracking-tight">● REC</span>
            <span className="hidden md:inline opacity-90">{content.infoBar}</span>
            <span className="md:hidden opacity-90">MARQUESINAS & VIDEO GAME ART • BA • EST. 2007</span>
          </div>
          <div className="ml-auto hidden lg:flex items-center gap-2">
            <span className="opacity-60">100% VECTOR</span>
            <span className="w-px h-3 bg-white/30" />
            <span className="opacity-60">CORELDRAW • TEMPLATE MODE</span>
          </div>
          <div className="ml-auto lg:ml-4 bg-[#FFEB00] text-black h-full flex items-center px-3 -mr-3 md:-mr-5 font-black text-[11px]">EST. 2007 • {page.toUpperCase()}</div>
        </div>

        <header className="bg-white border-b-[3px] border-black sticky top-0 z-30">
          <div className="max-w-[1600px] mx-auto px-3 md:px-6 h-[54px] md:h-[58px] flex items-center gap-3 md:gap-4">
            <a href="#/" className="flex items-center gap-2 shrink-0 hover:bg-[#FFEB00] px-1 border border-transparent hover:border-black">
              <div className="w-[28px] h-[28px] bg-black text-white flex items-center justify-center font-black text-[16px] leading-none display border-[2px] border-black">F</div>
              <span className="font-black text-[13px] md:text-[14px] tracking-[-0.02em] uppercase">{content.header.logo}</span>
            </a>
            <div className="hidden lg:flex items-center gap-[6px] ml-1">
              <span className="bg-[#00E5FF] border-[2px] border-black text-[9px] font-black px-[7px] py-[2px] uppercase tracking-wide leading-none">EST. 2007</span>
              <span className="bg-black text-white border-[2px] border-black text-[9px] font-black px-[7px] py-[2px] uppercase tracking-wide leading-none">VECTOR</span>
              <span className="bg-[#FF00AA] text-white border-[2px] border-black text-[9px] font-black px-[7px] py-[2px] uppercase tracking-wide leading-none">TEMPLATES</span>
              <span className="bg-[#FFEB00] border-[2px] border-black text-[9px] font-black px-[7px] py-[2px] uppercase tracking-wide leading-none">BA • AR</span>
            </div>
            <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-5 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.02em]">
              {navItems.map((item, i) => (
                <a key={i} href={navHrefs[i]} className={`relative px-1 py-[1px] border-[1.5px] transition-colors ${routePath.startsWith(navHrefs[i].replace("#","")) ? "bg-[#FFEB00] border-black" : "border-transparent hover:border-black hover:bg-[#FFEB00]"}`}>
                  {item}
                </a>
              ))}
            </nav>
            <div className="ml-auto md:ml-3 flex items-center gap-2 md:gap-3 shrink-0">
              <button onClick={() => setLang(lang === "ES" ? "EN" : "ES")} className="border-[2px] border-black px-[6px] py-[3px] text-[11px] font-black flex items-center gap-[2px] leading-none hover:bg-black hover:text-white transition-colors">
                <span className={`${lang === "ES" ? "bg-black text-white px-1" : "px-1 opacity-60"}`}>ES</span>
                <span className="opacity-20">|</span>
                <span className={`${lang === "EN" ? "bg-black text-white px-1" : "px-1 opacity-60"}`}>EN</span>
              </button>
              <div className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] bg-[#FF2D7B] border-[2px] border-black shadow-[2px_2px_0_#000]" />
              <button onClick={() => setAdminOpen(true)} className="hidden md:flex w-[22px] h-[22px] border-[2px] border-black items-center justify-center text-[10px] font-black hover:bg-black hover:text-white" title="CMS">⚙</button>
            </div>
          </div>
          <div className="lg:hidden bg-white border-t-[2px] border-black flex gap-[6px] px-3 py-[6px] overflow-x-auto">
            {navHrefs.map((h, i)=>(
              <a key={i} href={h} className={`border-[1.5px] border-black text-[8px] font-black px-2 py-[2px] uppercase shrink-0 ${routePath.startsWith(h.replace("#","")) ? "bg-[#FFEB00]" : "bg-white"}`}>{navItems[i]}</a>
            ))}
          </div>
        </header>

        {/* HOME HERO */}
        {page === "home" && (
          <section className="relative max-w-[1600px] mx-auto bg-[#fbfdff]/55 backdrop-blur-[0.5px] overflow-hidden border-x-[1px] border-black/10">
            <div className="absolute inset-0 pointer-events-none opacity-[0.09]" style={{ backgroundImage: `linear-gradient(to right, #78b4ff 1px, transparent 1px), linear-gradient(to bottom, #78b4ff 1px, transparent 1px)`, backgroundSize: "22px 22px" }} />
            <HalftoneDots color="#00E5FF" className="top-[38%] left-[2%] rotate-[-8deg] hidden md:block" size={220} gap={14} dot={2.6} opacity={0.18} />
            <HalftoneDots color="#FF00AA" className="top-[8%] right-[42%] rotate-[12deg] hidden lg:block" size={140} gap={11} dot={2.2} opacity={0.14} />
            <HalftoneDots color="#FFEB00" className="bottom-[18%] left-[28%] rotate-[-4deg] hidden md:block" size={180} gap={13} dot={2.4} opacity={0.16} />
            <div className="absolute top-0 left-0 right-0 h-[18px] bg-white border-b border-black/20 hidden md:flex items-center px-12 text-[8px] mono opacity-60">
              <div className="flex gap-6"><span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span><span>600</span><span>700</span><span>800</span><span>900</span><span>1000</span></div>
            </div>
            <Crosshair className="top-[26px] left-[12px] md:left-[20px]" />
            <Crosshair className="top-[26px] right-[12px] md:right-[20px]" />
            <Crosshair className="bottom-[12px] left-[12px] md:left-[20px] hidden md:block" />
            <Crosshair className="bottom-[12px] right-[12px] md:right-[20px] hidden md:block" />
            <div className="absolute top-[48px] left-6 md:left-10 hidden md:flex gap-2 z-10">
              <span className="bg-black text-white text-[8px] font-bold px-2 py-[2px] mono">ART - 300 DPI</span>
              <span className="bg-[#00E5FF] border border-black text-[8px] font-bold px-2 py-[2px] mono">CMYK • VECTOR</span>
              <span className="bg-[#FF00AA] text-white border border-black text-[8px] font-bold px-2 py-[2px] mono">100% • K</span>
            </div>
            <div className="relative px-4 md:px-10 lg:px-12 pt-[54px] md:pt-[72px] pb-10 md:pb-16 flex flex-col lg:flex-row gap-8 lg:gap-6 xl:gap-10 overflow-hidden">
              <div className="flex-1 relative min-w-0 overflow-hidden">
                <div className="absolute top-[42%] left-[-12px] right-[10%] md:right-[22%] bottom-[18%] md:bottom-[20%] pointer-events-none" style={{ backgroundColor: "#FFF7A0", backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`, backgroundSize: "18px 18px", border: "1px dashed rgba(0,0,0,0.15)" }} />
                <div className="relative z-10">
                  <div className="relative">
                    <h1 className="display font-black leading-[0.84] tracking-[-0.04em] select-none whitespace-nowrap" style={{ fontSize: "clamp(48px, 8vw, 88px)" }}>
                      <span className="block text-white" style={{ WebkitTextStroke: "3px black", paintOrder: "stroke fill", textShadow: "3px 3px 0 black" }}>{content.hero.line1}</span>
                    </h1>
                    <BezierNode style={{ top: "6%", left: "4%" }} />
                    <BezierNode style={{ top: "6%", left: "28%" }} />
                    <BezierNode style={{ top: "54%", left: "62%" }} />
                  </div>
                  <div className="relative -mt-2 md:-mt-4 ml-1 md:ml-2 inline-block rotate-[-1.8deg] max-w-[calc(100%-8px)]">
                    <div className="bg-[#FFEB00] border-[4px] md:border-[5px] border-black px-3 md:px-6 py-1 md:py-[6px] shadow-[5px_5px_0_0_#000] md:shadow-[8px_8px_0_0_#000] relative max-w-full overflow-hidden">
                      <span className="display block text-black font-black leading-[0.86] tracking-[-0.03em] whitespace-nowrap" style={{ fontSize: "clamp(42px, 7.2vw, 78px)" }}>{content.hero.line2}</span>
                      <div className="absolute -top-[7px] -left-[7px] w-[11px] h-[11px] bg-white border-[2px] border-[#0066FF]" />
                      <div className="absolute -top-[7px] -right-[7px] w-[11px] h-[11px] bg-white border-[2px] border-[#0066FF]" />
                      <div className="absolute -bottom-[7px] -left-[7px] w-[11px] h-[11px] bg-white border-[2px] border-[#0066FF]" />
                      <div className="absolute -bottom-[7px] -right-[7px] w-[11px] h-[11px] bg-white border-[2px] border-[#0066FF]" />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-10 relative z-20 max-w-[300px]">
                    <div className="bg-white border-[2.5px] border-black inline-block px-4 py-3 shadow-[4px_4px_0_0_#000]">
                      <p className="font-black text-[13px] md:text-[14px] leading-[1.05] uppercase tracking-[0.01em] whitespace-pre-line">{content.hero.box}</p>
                    </div>
                    <div className="mt-[8px] bg-black text-white text-[9px] font-mono uppercase px-3 py-[5px] tracking-[0.12em] inline-block">{content.hero.sub}</div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <a href="#/trabajos" className="bg-black text-white border-[2px] border-black px-4 py-2 text-[11px] font-black uppercase hover:bg-[#FFEB00] hover:text-black">VER TRABAJOS →</a>
                    <a href="#/vectores" className="bg-white border-[2px] border-black px-4 py-2 text-[11px] font-black uppercase hover:bg-black hover:text-white">VECTORES</a>
                    <span className="bg-[#00E5FF] border-[2px] border-black px-3 py-2 text-[10px] mono font-bold">TEMPLATES • MISMO ESTILO</span>
                  </div>
                </div>
              </div>
              <div className="relative lg:w-[480px] xl:w-[540px] shrink-0 flex justify-center lg:justify-end items-start mt-2 lg:mt-0 w-full max-w-full">
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:w-[460px] xl:w-[500px] h-[440px] sm:h-[480px] md:h-[620px] lg:h-[680px] border-[5px] border-black bg-white shadow-[8px_8px_0_0_#FFEB00] md:shadow-[16px_16px_0_0_#FFEB00] overflow-hidden group mx-auto lg:mx-0">
                  <img src={fotoUrl} alt="Ferchu Escola - Arcade Workshop" className="w-full h-full object-cover object-top" style={{ objectPosition: "top center" }} />
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />
                  <CornerNodes />
                  <div className="absolute bottom-3 left-3 bg-black text-white text-[8px] mono px-2 py-1 uppercase tracking-widest">FOTO_PORTADA_WEB_5.PNG • 3:4 • 680PX</div>
                  <div className="absolute top-3 right-3 bg-[#FFEB00] border-[2px] border-black text-[8px] font-black px-2 py-1">100% VECTOR</div>
                </div>
              </div>
            </div>
            <div className="relative bg-black text-white text-[9px] mono uppercase tracking-[0.16em] h-[26px] flex items-center px-4 md:px-10">
              <span>Un taller vectorial dentro de una maquina — Marquesinas & Video Game Art Since 2007</span>
              <span className="ml-auto hidden md:inline opacity-60">PLANTILLAS INTERNAS • MISMO ESTILO • PATTERN 60% + GRID 9%</span>
            </div>
          </section>
        )}

        {/* GLOBAL WRAPPER FOR INTERNAL PAGES */}
        <div className="max-w-[1600px] mx-auto border-x-[1px] border-black/10 bg-[#fbfdff]/60 backdrop-blur-[0.5px] min-h-[60vh]">
          {/* HOME SECTIONS PREVIEW */}
          {page === "home" && (
            <>
              <section className="relative overflow-hidden border-t-[3px] border-black">
                <HalftoneDots color="#FFEB00" className="top-[8%] right-[6%] hidden md:block" size={180} gap={12} dot={2.5} opacity={0.18} />
                <div className="relative bg-black text-white h-[34px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-b-[3px] border-black">
                  <span className="bg-[#FFEB00] text-black px-2 py-[2px] font-black mr-3">SECTION 01</span>
                  <span className="font-black tracking-wide">{content.trabajos.title} • {content.trabajos.count} • PREVIEW</span>
                  <a href="#/trabajos" className="ml-auto bg-white text-black px-3 py-[3px] font-black border border-black hover:bg-[#FFEB00]">VER TODOS →</a>
                </div>
                <div className="px-4 md:px-10 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {(content.trabajos.items as any[]).slice(0,5).map((item:any, idx:number)=>(
                    <a key={idx} href={`#/trabajos/${item.slug}`} className="group relative bg-white border-[3px] border-black shadow-[5px_5px_0_#000] hover:shadow-[6px_6px_0_#FFEB00] hover:-translate-y-[2px] transition-all">
                      <CornerNodes />
                      <div className="h-[7px] w-full" style={{ backgroundColor: item.color === "#000" ? "black" : item.color }} />
                      <div className="aspect-[4/3] bg-[#111] relative overflow-hidden border-b-[3px] border-black flex items-center justify-center">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${patternUrl})`, backgroundSize: "180px" }} />
                        <div className="display font-black text-[22px] text-center" style={{ color: item.color === "#000" ? "#FFEB00" : item.color }}>{item.title}</div>
                      </div>
                      <div className="p-3"><div className="font-black text-[12px] uppercase">{item.title}</div><div className="text-[9px] mono opacity-60">{item.year} • {item.client}</div></div>
                    </a>
                  ))}
                </div>
              </section>
              <section className="relative overflow-hidden border-t-[3px] border-black bg-[#FFFDF0]/60">
                <div className="relative bg-[#FF00AA] text-white h-[34px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-y-[3px] border-black">
                  <span className="bg-black text-white px-2 py-[2px] font-black mr-3 border border-white">SECTION 02</span>
                  <span className="font-black">{content.vectores.title} • PREVIEW</span>
                  <a href="#/vectores" className="ml-auto bg-white text-black px-3 py-[3px] font-black border border-black hover:bg-[#FFEB00]">VER VECTORES →</a>
                </div>
                <div className="px-4 md:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(content.vectores.items as any[]).slice(0,3).map((it:any,i:number)=>(
                    <a key={i} href={`#/vectores/${it.slug}`} className="bg-white border-[3px] border-black p-3 shadow-[5px_5px_0_#000] hover:translate-y-[-2px] transition-transform">
                      <div className="text-[9px] mono bg-black text-white inline-block px-1">{it.id}</div>
                      <div className="font-black uppercase mt-1">{it.title}</div>
                      <div className="text-[10px] mono opacity-60">{it.game}</div>
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* TRABAJOS LISTING */}
          {page === "trabajos" && (
            <div className="relative">
              <HalftoneDots color="#FFEB00" className="top-[6%] right-[8%] hidden md:block" size={200} gap={12} dot={2.6} opacity={0.16} />
              <HalftoneDots color="#00E5FF" className="bottom-[10%] left-[4%] hidden lg:block" size={160} gap={13} dot={2.2} opacity={0.14} />
              <div className="bg-black text-white h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-b-[3px] border-black">
                <span className="bg-[#FFEB00] text-black px-2 py-[2px] font-black mr-3">TRABAJOS</span>
                <span>10 MARQUESINAS • 100% VECTOR • TEMPLATE</span>
                <span className="ml-auto hidden md:inline opacity-60">GRID • 22PX • PATTERN 340PX 60%</span>
              </div>
              <div className="px-4 md:px-10 py-8">
                <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"TRABAJOS"}]} />
                <div className="mt-6 flex flex-col md:flex-row md:items-end gap-4">
                  <h2 className="display font-black text-[48px] md:text-[68px] leading-[0.85] tracking-[-0.03em]"><span className="text-white" style={{ WebkitTextStroke:"2.5px black", textShadow:"3px 3px 0 black" as any}}>TRABAJOS</span></h2>
                  <div className="bg-[#FFEB00] border-[2px] border-black px-3 py-1 text-[11px] font-black uppercase shadow-[3px_3px_0_#000]">{content.trabajos.subtitle} • EDITABLE VIA content.json</div>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                  {(content.trabajos.items as any[]).map((item:any, idx:number)=>(
                    <a key={idx} href={`#/trabajos/${item.slug}`} className="group relative bg-white border-[3px] border-black shadow-[5px_5px_0_#000] hover:shadow-[7px_7px_0_#FFEB00] hover:-translate-y-[2px] transition-all duration-150">
                      <CornerNodes />
                      <div className="h-[7px] w-full" style={{ backgroundColor: item.color === "#000" ? "black" : item.color }} />
                      <div className="aspect-[4/3] bg-[#0a0a0a] relative overflow-hidden border-b-[3px] border-black">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${patternUrl})`, backgroundSize:"180px" }} />
                        <img src={placeholderUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
                          <div className="bg-white border-[2px] border-black px-2 py-[2px] text-[8px] font-black mono mb-2">FILE: {item.id}_{item.title.replace(/\s/g,"_")}.CDR</div>
                          <div className="display font-black text-[22px] md:text-[24px] leading-[0.9] text-center tracking-tight" style={{ color: item.color === "#000" ? "#FFEB00" : item.color }}>{item.title.split(" ").map((w:string,i:number)=><span key={i} className="block">{w}</span>)}</div>
                        </div>
                        <div className="absolute bottom-1 left-1 bg-black text-white text-[7px] mono px-1">X:{420+idx*13}.5 Y:{120+idx*8}.2</div>
                        <div className="absolute top-1 right-1 bg-[#FFEB00] border border-black text-[7px] font-black px-1">100%</div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1"><span className="text-[10px] mono font-bold bg-black text-white px-1">{item.id}</span><span className="text-[9px] mono opacity-60">{item.year} • {item.slug}</span></div>
                        <div className="font-black text-[13px] leading-[1] uppercase tracking-tight">{item.title}</div>
                        <div className="text-[9px] mono opacity-70 mt-1">{item.client} • {item.type}</div>
                        <div className="mt-2 bg-black text-white text-[8px] mono px-2 py-1 inline-block group-hover:bg-[#FF00AA]">VER DETALLE →</div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-8 bg-white border-[2px] border-black p-3 flex flex-wrap gap-2 text-[9px] mono uppercase">
                  <span className="bg-[#FFEB00] border border-black px-2 py-1 font-black">10 ITEMS • SLUG EDITABLE</span>
                  <span className="bg-black text-white border border-black px-2 py-1">content.json → trabajos.items[].slug, title, year, images</span>
                </div>
              </div>
            </div>
          )}

          {/* TRABAJO DETAIL */}
          {page === "trabajo-detail" && (
            <div className="relative">
              {(() => {
                const item = findTrabajo(slug || "");
                if (!item) return <div className="p-10"><div className="bg-white border-[3px] border-black p-6"><div className="font-black text-[24px]">NO ENCONTRADO • {slug}</div><a href="#/trabajos" className="mt-4 inline-block bg-black text-white px-4 py-2 text-[12px] font-black">← VOLVER A TRABAJOS</a></div></div>;
                return (
                  <>
                    <HalftoneDots color={item.color === "#000" ? "#FFEB00" : item.color} className="top-[10%] right-[6%] hidden md:block" size={220} gap={12} dot={2.8} opacity={0.16} />
                    <div className="bg-black text-white h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-b-[3px] border-black">
                      <span className="bg-[#FFEB00] text-black px-2 py-[2px] font-black mr-3">TRABAJO • {item.id}</span>
                      <span>{item.title} • {item.year} • TEMPLATE DETAIL</span>
                    </div>
                    <div className="px-4 md:px-10 py-6">
                      <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"TRABAJOS", href:"#/trabajos"}, {label:item.title}]} />
                      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-8">
                        <div>
                          <div className="inline-block bg-[#FFEB00] border-[4px] border-black px-4 py-2 shadow-[6px_6px_0_#000] rotate-[-1deg]">
                            <h1 className="display font-black text-[36px] md:text-[56px] leading-[0.85] tracking-[-0.03em]">{item.title}</h1>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="bg-black text-white border-[2px] border-black px-3 py-1 text-[11px] font-black mono">YEAR: {item.year}</span>
                            <span className="bg-white border-[2px] border-black px-3 py-1 text-[11px] font-black mono">LOC: {item.location}</span>
                            <span className="bg-[#00E5FF] border-[2px] border-black px-3 py-1 text-[11px] font-black mono">{item.technique}</span>
                            <span className="border-[2px] border-black px-3 py-1 text-[11px] font-black mono" style={{ backgroundColor: item.color === "#000" ? "black" : item.color, color: item.color === "#000" ? "white" : "black" }}>{item.type}</span>
                          </div>
                          <div className="mt-6 relative border-[5px] border-black bg-white shadow-[10px_10px_0_#000] overflow-hidden aspect-[16/10] md:aspect-[16/9]">
                            <CornerNodes />
                            <img src={placeholderUrl} alt={`${item.title} marquesina`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage:`linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`, backgroundSize:"24px 24px"}} />
                            <div className="absolute bottom-2 left-2 bg-black text-white text-[8px] mono px-2 py-1">{item.slug}.JPG • 3:2 • 2400PX • 300 DPI</div>
                            <div className="absolute top-2 right-2 bg-[#FFEB00] border-[2px] border-black text-[8px] font-black px-2 py-1">100% VECTOR • {item.id}</div>
                            <div className="absolute top-2 left-2 bg-white border-[2px] border-black text-[8px] font-black px-2 py-1">MARQUESINA PHOTO • PLACEHOLDER</div>
                          </div>
                          <div className="mt-4 bg-white border-[3px] border-black p-4 shadow-[4px_4px_0_#000]">
                            <div className="text-[10px] mono font-bold opacity-60 mb-1">DESCRIPCION • TECNICA</div>
                            <p className="text-[14px] leading-[1.4] font-medium">{item.desc} — Trazado en CorelDRAW, nodos cuadrados, handles circulares, color plano CMYK + flúo. Archivo final .CDR + PDF para imprenta.</p>
                          </div>
                          <div className="mt-6">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="bg-black text-white px-2 py-1 text-[10px] mono font-bold">PROCESO • 3 PASOS</span>
                              <span className="text-[10px] mono opacity-60">BOCETO → VECTOR → INSTALACION</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[
                                {label:"BOCETO", code:"SKETCH_01.JPG", color:"#FFEB00"},
                                {label:"VECTOR", code:"VECTOR_CDR.PNG", color:"#00E5FF"},
                                {label:"INSTALACION", code:"INSTALL_03.JPG", color:"#FF00AA"},
                              ].map((s,i)=>(
                                <div key={i} className="relative bg-white border-[3px] border-black shadow-[4px_4px_0_#000] overflow-hidden">
                                  <CornerNodes />
                                  <div className="h-[6px] w-full" style={{ backgroundColor: s.color }} />
                                  <div className="aspect-[4/3] bg-[#111] relative flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage:`url(${patternUrl})`, backgroundSize:"160px"}} />
                                    <img src={i===1 ? fotoUrl : placeholderUrl} alt={s.label} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                                    <div className="relative z-10 bg-white border-[2px] border-black px-2 py-1 text-[10px] font-black mono">{s.label}</div>
                                  </div>
                                  <div className="p-2 flex justify-between items-center bg-[#f6f6f6] border-t-[2px] border-black">
                                    <span className="text-[8px] mono font-bold">{s.code}</span>
                                    <span className="text-[8px] mono bg-black text-white px-1">0{i+1}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white border-[3.5px] border-black shadow-[8px_8px_0_#000] relative overflow-hidden">
                            <CornerNodes />
                            <div className="bg-black text-white px-4 py-2 text-[11px] font-black mono uppercase flex justify-between">
                              <span>SPECS • FICHA TECNICA</span>
                              <span className="opacity-60">{item.id} • {item.slug}</span>
                            </div>
                            <div className="p-4 space-y-3">
                              {[
                                {k:"MEDIDAS", v:item.medidas},
                                {k:"CLIENTE", v:item.client},
                                {k:"UBICACION", v:item.location},
                                {k:"TIPOGRAFIA", v:item.tipografia},
                                {k:"COLORES", v:item.colores},
                                {k:"TECNICA", v:item.technique},
                                {k:"AÑO", v:item.year},
                              ].map((r,i)=>(
                                <div key={i} className="flex gap-3 border-b border-black/10 pb-2 last:border-0">
                                  <span className="w-[90px] shrink-0 bg-[#FFEB00] border border-black text-[9px] font-black px-1 py-[2px] mono h-fit">{r.k}</span>
                                  <span className="text-[12px] font-bold leading-[1.2] uppercase">{r.v}</span>
                                </div>
                              ))}
                              <div className="pt-2 grid grid-cols-3 gap-2">
                                <div className="bg-[#00E5FF] border border-black h-6" title="CYAN" />
                                <div className="bg-[#FF00AA] border border-black h-6" title="MAGENTA" />
                                <div className="bg-[#FFEB00] border border-black h-6" title="YELLOW" />
                              </div>
                              <div className="bg-[#f5f5f5] border border-dashed border-black p-2 text-[9px] mono opacity-70">
                                ARCHIVO: {item.id}_{item.title.replace(/\s/g,"_")}.CDR<br/>NODOS: ~1.4K • BEZIER 100% • NO BITMAP
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#FFEB00] border-[3px] border-black p-4 shadow-[5px_5px_0_#000]">
                            <div className="text-[10px] mono font-bold mb-2">SIGUIENTE • NAVEGACION</div>
                            <div className="flex flex-col gap-2">
                              <a href="#/trabajos" className="bg-black text-white border-[2px] border-black px-3 py-2 text-[11px] font-black uppercase hover:bg-white hover:text-black text-center">← VOLVER A /TRABAJOS</a>
                              <a href="#/contacto" className="bg-white border-[2px] border-black px-3 py-2 text-[11px] font-black uppercase hover:bg-black hover:text-white text-center">CONSULTAR PRESUPUESTO →</a>
                            </div>
                          </div>
                          <div className="bg-white border-[2px] border-black p-3">
                            <div className="text-[9px] mono font-bold opacity-60 mb-2">EDITABLE VIA content.json</div>
                            <pre className="text-[10px] mono bg-[#f6f8ff] border border-black p-2 overflow-auto">{`{\n  "slug": "${item.slug}",\n  "title": "${item.title}",\n  "year": "${item.year}",\n  "images": ["${item.slug}_01.jpg", "${item.slug}_02.jpg"]\n}`}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* VECTORES LISTING */}
          {page === "vectores" && (
            <div className="relative">
              <HalftoneDots color="#FF00AA" className="top-[10%] left-[5%] hidden md:block" size={200} gap={12} dot={2.4} opacity={0.15} />
              <div className="bg-[#FF00AA] text-white h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-b-[3px] border-black">
                <span className="bg-black text-white px-2 py-[2px] font-black mr-3 border border-white">VECTORES</span>
                <span>5 VIDEO GAME ART • 100% BEZIER • TEMPLATE</span>
              </div>
              <div className="px-4 md:px-10 py-8">
                <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"VECTORES"}]} />
                <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
                  <h2 className="display font-black text-[48px] md:text-[64px] leading-[0.85]"><span className="inline-block bg-black text-white px-3 py-1 border-[3px] border-black shadow-[4px_4px_0_#FFEB00]">VECTORES</span><span className="block mt-2 text-black bg-[#FFEB00] border-[3px] border-black px-3 py-1 shadow-[4px_4px_0_#000] inline-block">VIDEO GAMES</span></h2>
                  <div className="bg-white border-[2.5px] border-black p-4 shadow-[4px_4px_0_#000] max-w-[420px]">
                    <div className="text-[11px] mono font-bold uppercase opacity-70 mb-1">WORKFLOW:</div>
                    <div className="text-[13px] font-black uppercase leading-[1.15]">FOTO → BEZIER → COLOR PLANO → CMYK + FLUO • EDITABLE content.json</div>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(content.vectores.items as any[]).map((it:any, idx:number)=>(
                    <a key={idx} href={`#/vectores/${it.slug}`} className={`relative bg-white border-[3.5px] border-black shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#FFEB00] hover:-translate-y-[1px] transition-all group overflow-hidden ${idx===0 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                      <CornerNodes />
                      <div className="flex h-[52px] border-b-[3px] border-black">
                        <div className="flex-1 bg-black text-white flex items-center px-3 gap-2">
                          <span className="bg-white text-black text-[9px] font-black px-1 mono">{it.id}</span>
                          <span className="text-[11px] font-black uppercase">{it.title}</span>
                        </div>
                        <div className="w-[92px] border-l-[3px] border-black flex items-center justify-center text-[9px] mono font-bold" style={{ backgroundColor: it.color === "#000" ? "black" : it.color, color: it.color === "#000" ? "white" : "black" }}>{it.game}</div>
                      </div>
                      <div className="relative bg-[#0a0a0a] h-[220px] overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-15" style={{ backgroundImage:`url(${patternUrl})`, backgroundSize:"220px"}} />
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-[88px] h-[88px] border-[3px] border-white bg-black flex items-center justify-center display font-black text-[36px] text-white" style={{ textShadow:`2px 2px 0 ${it.color}` as any}}>{it.title.charAt(0)}</div>
                          <div className="mt-2 bg-white border border-black px-2 py-[2px] text-[8px] font-black mono">{it.detail}</div>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-[#FFEB00] border border-black text-[7px] font-black px-1 group-hover:bg-black group-hover:text-white">VER →</div>
                      </div>
                      <div className="bg-[#f6f6f6] border-t-[2px] border-black px-3 py-2 flex justify-between">
                        <span className="text-[9px] mono uppercase opacity-60">{it.nodos} • {it.year}</span>
                        <span className="text-[9px] font-black uppercase">{it.slug}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VECTOR DETAIL */}
          {page === "vector-detail" && (
            <div className="relative">
              {(() => {
                const it = findVector(slug || "");
                if (!it) return <div className="p-10"><div className="bg-white border-[3px] border-black p-6"><div className="font-black text-[24px]">VECTOR NO ENCONTRADO • {slug}</div><a href="#/vectores" className="mt-4 inline-block bg-black text-white px-4 py-2 text-[12px] font-black">← VOLVER A VECTORES</a></div></div>;
                return (
                  <>
                    <div className="bg-black text-white h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase border-b-[3px] border-black">
                      <span className="bg-[#00E5FF] text-black px-2 py-[2px] font-black mr-3">VECTOR • {it.id}</span>
                      <span>{it.title} • {it.game} • {it.year}</span>
                    </div>
                    <div className="px-4 md:px-10 py-6">
                      <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"VECTORES", href:"#/vectores"}, {label: it.title}]} />
                      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
                        <div>
                          <div className="bg-white border-[5px] border-black shadow-[10px_10px_0_#000] aspect-[4/3] relative overflow-hidden">
                            <CornerNodes />
                            <div className="absolute inset-0 bg-[#111]" />
                            <img src={fotoUrl} alt={it.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-[#FFEB00] border-[4px] border-black px-6 py-4 shadow-[6px_6px_0_#000] rotate-[-2deg]">
                                <div className="display font-black text-[48px] leading-[0.85]">{it.title}</div>
                                <div className="text-[10px] mono font-bold mt-1">{it.game} • {it.detail}</div>
                              </div>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black text-white text-[8px] mono px-2 py-1">{it.slug}.CDR • {it.nodos}</div>
                          </div>
                          <div className="mt-6 bg-white border-[3px] border-black p-4 shadow-[4px_4px_0_#000]">
                            <p className="text-[14px] leading-[1.5]">{it.desc} Técnica 100% vector, sin autotrace. Archivo editable en content.json, cada entrada tiene slug, title, year, images.</p>
                            <div className="mt-3 flex gap-2">
                              <span className="bg-black text-white text-[9px] mono px-2 py-1">{it.soft}</span>
                              <span className="bg-[#FFEB00] border border-black text-[9px] font-black px-2 py-1">{it.nodos}</span>
                              <span className="bg-[#00E5FF] border border-black text-[9px] font-black px-2 py-1">300 DPI</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white border-[3px] border-black p-4 shadow-[6px_6px_0_#000]">
                            <div className="text-[10px] mono font-bold opacity-60">SPECS</div>
                            <div className="mt-2 space-y-2 text-[12px] font-bold uppercase">
                              <div className="flex justify-between border-b pb-1"><span className="bg-[#FFEB00] border border-black px-1 text-[9px]">ID</span><span>{it.id}</span></div>
                              <div className="flex justify-between border-b pb-1"><span className="bg-black text-white px-1 text-[9px]">GAME</span><span>{it.game}</span></div>
                              <div className="flex justify-between border-b pb-1"><span className="bg-[#00E5FF] border border-black px-1 text-[9px]">YEAR</span><span>{it.year}</span></div>
                              <div className="flex justify-between"><span className="bg-[#FF00AA] text-white px-1 text-[9px]">NODOS</span><span>{it.nodos}</span></div>
                            </div>
                          </div>
                          <a href="#/vectores" className="block bg-black text-white border-[3px] border-black text-center py-3 font-black uppercase text-[12px] hover:bg-[#FFEB00] hover:text-black">← VOLVER A /VECTORES</a>
                          <a href="#/trabajos" className="block bg-white border-[3px] border-black text-center py-3 font-black uppercase text-[12px] hover:bg-black hover:text-white">VER MARQUESINAS →</a>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* CLIENTES LISTING */}
          {page === "clientes" && (
            <div className="relative">
              <HalftoneDots color="#00E5FF" className="top-[12%] left-[6%] hidden lg:block" size={180} gap={12} dot={2.5} opacity={0.16} />
              <div className="bg-[#00E5FF] text-black h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-b-[3px] border-black font-black">
                <span className="bg-black text-white px-2 py-[2px] mr-3">CLIENTES</span>
                <span>{content.clientes.count} SELECCION • TEMPLATE</span>
              </div>
              <div className="px-4 md:px-10 py-8">
                <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"CLIENTES"}]} />
                <h2 className="mt-6 display font-black text-[48px] md:text-[62px] leading-[0.86] tracking-[-0.03em]"><span className="text-white" style={{ WebkitTextStroke:"2.5px black", textShadow:"3px 3px 0 #00E5FF" } as any}>CLIENTES</span></h2>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(content.clientes.items as any[]).map((c:any,i:number)=>(
                    <a key={i} href={`#/clientes/${c.slug}`} className="group relative bg-white border-[2.5px] border-black h-[110px] flex flex-col justify-between p-3 shadow-[4px_4px_0_#000] hover:shadow-[5px_5px_0_#FF00AA] hover:-translate-y-[1px] transition-all">
                      <CornerNodes />
                      <div className="flex justify-between"><span className="text-[8px] mono bg-black text-white px-1">0{i+1}</span><span className="text-[8px] mono opacity-50">{c.tag}</span></div>
                      <div className="font-black text-[15px] leading-[0.95] uppercase">{c.name}</div>
                      <div className="text-[9px] mono opacity-60">{c.slug}</div>
                      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#FFEB00] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CLIENTE DETAIL */}
          {page === "cliente-detail" && (
            <div className="relative">
              {(() => {
                const cl = findCliente(slug || "");
                if (!cl) return <div className="p-10"><div className="bg-white border-[3px] border-black p-6"><div className="font-black text-[24px]">CLIENTE NO ENCONTRADO • {slug}</div><a href="#/clientes" className="mt-4 inline-block bg-black text-white px-4 py-2 text-[12px] font-black">← VOLVER</a></div></div>;
                return (
                  <>
                    <div className="bg-black text-white h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase border-b-[3px] border-black">
                      <span className="bg-[#FFEB00] text-black px-2 py-[2px] font-black mr-3">CLIENTE</span>
                      <span>{cl.name} • {cl.tag}</span>
                    </div>
                    <div className="px-4 md:px-10 py-6">
                      <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"CLIENTES", href:"#/clientes"}, {label: cl.name}]} />
                      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
                        <div className="bg-white border-[5px] border-black shadow-[10px_10px_0_#000] p-6 relative">
                          <CornerNodes />
                          <div className="w-20 h-20 bg-black text-white flex items-center justify-center display font-black text-[32px] border-[3px] border-black">{cl.name.charAt(0)}</div>
                          <div className="mt-4 font-black text-[28px] leading-[0.9] uppercase">{cl.name}</div>
                          <div className="mt-2 bg-[#FFEB00] border-[2px] border-black inline-block px-2 py-1 text-[10px] mono font-bold">{cl.tag} • {cl.slug}</div>
                          <p className="mt-4 text-[13px] leading-[1.4]">{cl.desc}</p>
                          <div className="mt-4 bg-black text-white p-3 text-[10px] mono">
                            LOGO: {cl.slug}_LOGO.CDR<br/>TRABAJOS: {cl.trabajos.length} • VECTOR
                          </div>
                        </div>
                        <div>
                          <div className="bg-[#FFEB00] border-[3px] border-black px-4 py-2 font-black uppercase text-[13px] shadow-[4px_4px_0_#000] inline-block">TRABAJOS PARA {cl.name} • {cl.trabajos.length}</div>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {cl.trabajos.map((tSlug:string, i:number)=>{
                              const t = findTrabajo(tSlug);
                              if (!t) return <div key={i} className="bg-white border-[2px] border-black p-3 text-[11px] mono">{tSlug} • NO ENCONTRADO</div>;
                              return (
                                <a key={i} href={`#/trabajos/${t.slug}`} className="bg-white border-[3px] border-black shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#FF00AA] hover:-translate-y-[1px] transition-all flex gap-3 p-3">
                                  <div className="w-[80px] h-[60px] bg-[#111] border-[2px] border-black shrink-0 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage:`url(${patternUrl})`, backgroundSize:"120px"}} />
                                    <span className="relative z-10 font-black text-[12px]" style={{ color: t.color === "#000" ? "#FFEB00" : t.color }}>{t.id}</span>
                                  </div>
                                  <div>
                                    <div className="font-black uppercase text-[13px] leading-[1]">{t.title}</div>
                                    <div className="text-[9px] mono opacity-60 mt-1">{t.year} • {t.type}</div>
                                    <div className="mt-1 bg-black text-white text-[8px] mono px-1 inline-block">VER →</div>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                          <div className="mt-6 flex gap-2">
                            <a href="#/clientes" className="bg-black text-white border-[2px] border-black px-4 py-2 text-[11px] font-black uppercase">← CLIENTES</a>
                            <a href="#/trabajos" className="bg-white border-[2px] border-black px-4 py-2 text-[11px] font-black uppercase hover:bg-[#FFEB00]">TRABAJOS →</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* LIBRO DETAIL */}
          {page === "libro" && (
            <div className="relative">
              <HalftoneDots color="#FF00AA" className="top-[8%] right-[10%] hidden md:block" size={190} gap={12} dot={2.4} opacity={0.16} />
              <div className="bg-black text-white h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-y-[3px] border-black">
                <span className="bg-[#FFEB00] text-black px-2 py-[2px] font-black mr-3">LIBRO</span>
                <span className="font-black">LIBRO {content.libro.subtitle} • TEMPLATE DETAIL • CAPITULOS</span>
              </div>
              <div className="px-4 md:px-10 py-8">
                <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"LIBRO"}]} />
                <div className="mt-6 flex flex-col lg:flex-row gap-10 items-start">
                  <div className="relative w-full max-w-[420px] shrink-0 mx-auto lg:mx-0">
                    <div className="relative border-[5px] border-black bg-white shadow-[14px_14px_0_#FF00AA] aspect-[3/4] overflow-hidden">
                      <CornerNodes />
                      <div className="h-full w-full bg-[#FFEB00] relative">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage:`url(${patternUrl})`, backgroundSize:"260px"}} />
                        <div className="absolute inset-0 p-5 flex flex-col">
                          <div className="border-[3px] border-black bg-black text-white p-3">
                            <div className="text-[10px] mono">FERCHU ESCOLA • 2022</div>
                            <div className="display font-black text-[46px] leading-[0.85] mt-2">MARQUE<br/>SINAS</div>
                          </div>
                          <div className="mt-auto bg-white border-[3px] border-black p-3">
                            <div className="text-[11px] font-black uppercase">ARCHIVO VISUAL<br/>DE FICHINES<br/>ARGENTINOS</div>
                            <div className="mt-2 h-[2px] bg-black w-full" />
                            <div className="mt-2 text-[8px] mono">15 AÑOS • 240 PAG • BA • AR</div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] bg-[#FF00AA] border-[2px] border-black text-white text-[10px] font-black px-2 py-1 shadow-[2px_2px_0_#000]">ED. LIMITADA</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 bg-white border-[3px] border-black p-4 shadow-[5px_5px_0_#000]">
                      <div className="text-[10px] mono font-bold opacity-60">DETALLE TECNICO</div>
                      <div className="mt-2 text-[12px] font-bold uppercase leading-[1.3]">{content.libro.detalle}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {content.libro.specs.map((s:string,i:number)=><div key={i} className="bg-black text-white text-[9px] mono px-2 py-1 uppercase">{s}</div>)}
                      </div>
                      <div className="mt-4 bg-[#FFEB00] border-[2px] border-black p-2">
                        <div className="text-[11px] font-black">{content.libro.precio}</div>
                        <div className="text-[9px] mono opacity-70 mt-1">{content.libro.comprar}</div>
                      </div>
                      <button onClick={()=>setContactToast("LIBRO: consulta en borrador • link directo")} className="mt-3 w-full bg-[#FF00AA] border-[3px] border-black text-white font-black text-[13px] uppercase py-3 shadow-[4px_4px_0_#000] hover:translate-y-[-1px]">COMPRAR / CONSULTAR →</button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="display font-black text-[48px] md:text-[72px] leading-[0.84] tracking-[-0.04em]">
                      <span className="block text-white" style={{ WebkitTextStroke:"3px black", textShadow:"4px 4px 0 black" as any}}>LIBRO</span>
                      <span className="inline-block bg-[#FFEB00] border-[4px] border-black px-3 md:px-5 py-1 shadow-[6px_6px_0_#000] mt-2 rotate-[-1.5deg]">{content.libro.subtitle}</span>
                    </h2>
                    <div className="mt-6 bg-white border-[3px] border-black p-5 shadow-[5px_5px_0_#000] max-w-[560px]">
                      <div className="text-[12px] mono font-bold uppercase opacity-60 mb-2">{content.libro.year}</div>
                      <p className="text-[15px] leading-[1.35] font-medium">{content.libro.description}</p>
                    </div>
                    <div className="mt-8">
                      <div className="bg-black text-white inline-block px-3 py-1 text-[11px] font-black mono uppercase">CAPITULOS • 06 • 240 PAG</div>
                      <div className="mt-4 space-y-3">
                        {(content.libro.chapters as any[]).map((ch:any, i:number)=>(
                          <div key={i} className="bg-white border-[2.5px] border-black p-3 shadow-[4px_4px_0_#000] flex gap-4 group hover:shadow-[6px_6px_0_#FFEB00] hover:-translate-y-[1px] transition-all">
                            <div className="w-[56px] h-[56px] bg-black text-white border-[2px] border-black flex flex-col items-center justify-center shrink-0">
                              <span className="font-black text-[18px] leading-none display">{ch.num}</span>
                              <span className="text-[7px] mono opacity-60">{ch.pages}</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-black uppercase text-[13px] leading-[1.1]">{ch.title}</div>
                              <div className="text-[11px] leading-[1.3] opacity-70 mt-1">{ch.desc}</div>
                              <div className="mt-2 h-[2px] bg-black w-[24px] group-hover:w-full transition-all" />
                            </div>
                            <div className="hidden md:block text-[8px] mono bg-[#FFEB00] border border-black px-1 h-fit">PAG {ch.pages}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTACTO PAGE */}
          {page === "contacto" && (
            <div className="relative">
              <HalftoneDots color="#FFEB00" className="top-[14%] right-[8%] hidden md:block" size={180} gap={12} dot={2.5} opacity={0.18} />
              <div className="bg-[#FFEB00] text-black h-[36px] flex items-center px-4 md:px-10 text-[10px] mono uppercase tracking-[0.18em] border-b-[3px] border-black font-black">
                <span className="bg-black text-white px-2 py-[2px] mr-3">CONTACTO</span>
                <span>{content.contacto.subtitle} • TEMPLATE</span>
              </div>
              <div className="px-4 md:px-10 py-8">
                <Breadcrumb items={[{label:"HOME", href:"#/"} , {label:"CONTACTO"}]} />
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
                  <div>
                    <h2 className="display font-black text-[48px] md:text-[64px] leading-[0.85]"><span className="text-white" style={{ WebkitTextStroke:"2.5px black", textShadow:"3px 3px 0 black" } as any}>CONTACTO</span></h2>
                    <div className="mt-6 space-y-3">
                      <div className="bg-black text-white border-[2px] border-black p-3 flex items-center gap-3"><span className="bg-[#FFEB00] text-black text-[9px] font-black px-1 mono">EMAIL</span><span className="text-[13px] mono font-bold">{content.contacto.email}</span></div>
                      <div className="bg-white border-[2px] border-black p-3 flex items-center gap-3"><span className="bg-[#FF00AA] text-white text-[9px] font-black px-1 mono">IG</span><span className="text-[13px] mono font-bold">{content.contacto.instagram}</span></div>
                      <div className="bg-[#00E5FF] border-[2px] border-black p-3 flex items-center gap-3"><span className="bg-black text-white text-[9px] font-black px-1 mono">LOC</span><span className="text-[12px] mono font-bold">{content.contacto.location}</span></div>
                    </div>
                  </div>
                  <div className="bg-white border-[3.5px] border-black shadow-[8px_8px_0_#000] relative">
                    <CornerNodes />
                    <div className="bg-black text-white px-4 py-2 flex items-center justify-between"><span className="text-[11px] font-black mono uppercase">FORM_CONTACTO.CDR • TEMPLATE</span><span className="text-[9px] mono opacity-60">100% VECTOR</span></div>
                    <div className="p-5 md:p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block"><span className="text-[10px] mono font-bold uppercase">NOMBRE / STUDIO</span><input value={contactForm.name} onChange={e=>setContactForm({...contactForm, name:e.target.value})} placeholder="TU NOMBRE" className="mt-1 w-full border-[2.5px] border-black px-3 py-[10px] text-[13px] font-bold uppercase focus:outline-none focus:bg-[#FFEB00] placeholder:opacity-40" /></label>
                        <label className="block"><span className="text-[10px] mono font-bold uppercase">EMAIL</span><input value={contactForm.email} onChange={e=>setContactForm({...contactForm, email:e.target.value})} placeholder="EMAIL@DOMINIO.COM" className="mt-1 w-full border-[2.5px] border-black px-3 py-[10px] text-[13px] font-bold mono focus:outline-none focus:bg-[#00E5FF] placeholder:opacity-40" /></label>
                      </div>
                      <label className="block"><span className="text-[10px] mono font-bold uppercase">MENSAJE</span><textarea value={contactForm.message} onChange={e=>setContactForm({...contactForm, message:e.target.value})} placeholder="CONTAME DEL PROYECTO..." rows={6} className="mt-1 w-full border-[2.5px] border-black px-3 py-3 text-[13px] font-medium leading-[1.4] focus:outline-none focus:bg-[#f5f5f5] placeholder:opacity-40 resize-none" /></label>
                      <div className="flex gap-3"><button onClick={()=>{ if(!contactForm.email){ setContactToast("Falta email • borrador local"); return;} setContactToast("Mensaje en borrador • preview"); setContactForm({name:"",email:"",message:""}); }} className="flex-1 bg-black text-white border-[3px] border-black font-black uppercase text-[13px] py-3 shadow-[4px_4px_0_#FFEB00]">ENVIAR BORRADOR → (PREVIEW)</button><button onClick={()=>setContactForm({name:"",email:"",message:""})} className="md:w-[120px] bg-white border-[3px] border-black font-black uppercase text-[11px] py-3 hover:bg-[#FFEB00]">LIMPIAR</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="max-w-[1600px] mx-auto bg-black text-white border-x-[1px] border-t-[4px] border-black">
          <div className="px-4 md:px-10 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="#/" className="w-8 h-8 bg-white text-black flex items-center justify-center font-black display border-2 border-white">F</a>
              <div><div className="font-black text-[13px] leading-none">FERCHU ESCOLA</div><div className="text-[9px] mono opacity-60">MARQUESINAS & VIDEO GAME ART SINCE 2007 • TEMPLATES INTERNAS</div></div>
            </div>
            <div className="flex flex-wrap gap-2 text-[8px] mono items-center">
              <span className="flex items-center gap-1"><span className="w-[8px] h-[8px] bg-[#00E5FF] border border-white inline-block" />CYAN 100%</span>
              <span className="flex items-center gap-1"><span className="w-[8px] h-[8px] bg-[#FF0090] border border-white inline-block" />MAGENTA 100%</span>
              <span className="flex items-center gap-1"><span className="w-[8px] h-[8px] bg-[#FFEB00] border border-white inline-block" />YELLOW 100%</span>
              <span className="flex items-center gap-1"><span className="w-[8px] h-[8px] bg-white border border-white inline-block" />KEY 100%</span>
              <span className="opacity-30">•</span>
              <span className="opacity-60">PATTERN 340PX 60% MULTIPLY • GRID 22PX 9% • COREL NODES ONLY</span>
            </div>
          </div>
          <div className="bg-[#FFEB00] text-black h-[28px] flex items-center px-4 md:px-10 text-[10px] font-black uppercase tracking-wide">
            <span className="hidden md:inline">PLANTILLAS INTERNAS • /TRABAJOS • /VECTORES • /CLIENTES/:SLUG • /LIBRO • content.json EDITABLE • MISMO ESTILO BASE FAVORITA</span>
            <span className="md:hidden">TEMPLATES • MISMO ESTILO • PATTERN 60% + GRID 9%</span>
            <span className="ml-auto flex gap-2">
              <a href="#/" className="hover:bg-black hover:text-white px-1">HOME</a>
              <a href="#/trabajos" className="hover:bg-black hover:text-white px-1">TRABAJOS</a>
              <a href="#/libro" className="hover:bg-black hover:text-white px-1">LIBRO</a>
            </span>
          </div>
        </div>

        {contactToast && (<div className="fixed bottom-4 right-4 z-[80] bg-black text-white border-[2px] border-white shadow-[4px_4px_0_#FFEB00] px-4 py-2 text-[11px] mono font-bold uppercase max-w-[320px]">{contactToast}</div>)}

        {adminOpen && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border-[4px] border-black w-full max-w-[860px] max-h-[90vh] overflow-hidden shadow-[12px_12px_0_#000] flex flex-col">
              <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
                <span className="font-black text-[13px] tracking-wide uppercase">/admin CMS — content.json • PLANTILLAS INTERNAS • EDITABLE SLUGS</span>
                <button onClick={() => setAdminOpen(false)} className="bg-white text-black px-2 py-1 text-[11px] font-black border border-black hover:bg-[#FFEB00]">CLOSE ✕</button>
              </div>
              <div className="p-4 flex-1 overflow-auto">
                <p className="text-[11px] mono mb-3 opacity-70">Edición local sin guardado. Ahora cada trabajo/vector/cliente tiene slug editable. Copiá JSON para build final ZIP.</p>
                <textarea value={jsonText} onChange={(e) => setJsonText(e.target.value)} className="w-full h-[520px] bg-[#f6f8ff] border-[2px] border-black p-3 text-[12px] mono leading-[1.4] focus:outline-none focus:bg-white" spellCheck={false} />
                {jsonError && <div className="mt-2 bg-red-100 border border-red-500 text-red-700 text-[11px] p-2 mono">{jsonError}</div>}
                <div className="mt-3 bg-[#FFEB00] border-[2px] border-black p-3 text-[11px] leading-[1.4]">
                  <strong>Plantillas:</strong> #/trabajos (10), #/trabajos/:slug (hero + foto grande + specs + galería 3 pasos), #/vectores (5), #/vectores/:slug, #/clientes/:slug (logo + trabajos list), #/libro (capítulos + comprar). <br/>
                  <strong>Estilo lock:</strong> pattern.jpg 340px 60% multiply + grid 22px 9% + halftone CMYK + Corel nodes only (square + circle) + foto 3:4 vertical. Tipografía clamp 48px-88px máx 2 líneas.<br/>
                  <strong>Editable:</strong> content.json → trabajos.items[].slug, title, year, medidas, tipografia, colores, cliente, desc, location, technique. Ídem vectores, clientes, libro.chapters.
                </div>
              </div>
              <div className="border-t-[3px] border-black p-3 flex gap-2 justify-end bg-[#f5f5f5]">
                <button onClick={() => { navigator.clipboard.writeText(jsonText); setContactToast("JSON COPIADO • listo para ZIP"); }} className="border-[2px] border-black px-4 py-2 text-[12px] font-black bg-white hover:bg-black hover:text-white">COPY JSON</button>
                <button onClick={handleApplyJson} className="border-[2px] border-black px-5 py-2 text-[12px] font-black bg-[#00E5FF] hover:bg-black hover:text-white">APPLY PREVIEW</button>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-6 hidden md:block">
          <details className="border-[2px] border-black bg-white">
            <summary className="px-4 py-2 font-black text-[11px] uppercase cursor-pointer bg-[#f5f5f5] hover:bg-[#FFEB00]">content.json — editable source (preview + slugs) • para ZIP final</summary>
            <pre className="p-4 text-[11px] mono overflow-auto max-h-[300px] bg-[#fbfdff]">{JSON.stringify(content, null, 2)}</pre>
          </details>
        </div>
      </div>
    </div>
  );
}
