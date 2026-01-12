import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_TEXT = "Olá! Quero saber mais sobre os iPhones da Black Rock.";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function App() {
  const items = useMemo(
    () => [
      {
        id: "17",
        title: "iPhone 17",
        descTop: "O futuro na sua mão.",
        descBottom: "Experiência premium total.",
        img: "/src/assets/iphone-17.png",
        highlight: true,
      },
      {
        id: "16",
        title: "iPhone 16",
        descTop: "Velocidade e eficiência.",
        descBottom: "Câmera que impressiona.",
        img: "/src/assets/iphone-16.png",
        highlight: false,
      },
      {
        id: "15",
        title: "iPhone 15",
        descTop: "Arrasa cores novas.",
        descBottom: "Câmera que faz mágica.",
        img: "/src/assets/iphone-15.png",
        highlight: false,
      },
      {
        id: "14",
        title: "iPhone 14",
        descTop: "Tão colorido.",
        descBottom: "E tão poderoso.",
        img: "/src/assets/iphone-14.png",
        highlight: false,
      },
      {
        id: "13",
        title: "iPhone 13",
        descTop: "Rápido e eficiente.",
        descBottom: "Perfeito para o dia a dia.",
        img: "/src/assets/iphone-13.png",
        highlight: false,
      },
      {
        id: "12",
        title: "iPhone 12",
        descTop: "Design clássico e leve.",
        descBottom: "Performance consistente.",
        img: "/src/assets/iphone-12.png",
        highlight: false,
      },
      {
        id: "11",
        title: "iPhone 11",
        descTop: "Excelente custo-benefício.",
        descBottom: "Ótimo para começar.",
        img: "/src/assets/iphone-11.png",
        highlight: false,
      },
    ],
    []
  );

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Header aparece ao rolar
  const [headerVisible, setHeaderVisible] = useState(false);
  useEffect(() => {
    const threshold = 140;
    const onScroll = () => setHeaderVisible((window.scrollY || 0) > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ===== Carrossel premium =====
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);

  // animação por rAF (evita falhas de botão)
  const animRef = useRef({ raf: 0, running: false, from: 0, to: 0, start: 0, dur: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const stopAnim = () => {
    const a = animRef.current;
    if (a.raf) cancelAnimationFrame(a.raf);
    a.raf = 0;
    a.running = false;
  };

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateScrollTo = (targetLeft, durationMs = 520) => {
    const el = scrollerRef.current;
    if (!el) return;

    stopAnim();

    if (reducedMotion.current) {
      el.scrollLeft = targetLeft;
      return;
    }

    const a = animRef.current;
    a.running = true;
    a.from = el.scrollLeft;
    a.to = targetLeft;
    a.start = performance.now();
    a.dur = durationMs;

    const tick = (now) => {
      if (!a.running) return;
      const t = clamp((now - a.start) / a.dur, 0, 1);
      const v = a.from + (a.to - a.from) * easeOutCubic(t);
      el.scrollLeft = v;

      if (t < 1) a.raf = requestAnimationFrame(tick);
      else {
        a.running = false;
        a.raf = 0;
      }
    };

    a.raf = requestAnimationFrame(tick);
  };

  const getCards = () => {
    const el = scrollerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll("[data-card]"));
  };

  const getActiveByNearest = () => {
    const el = scrollerRef.current;
    if (!el) return 0;

    // primeiro card sempre destacado no começo
    if (el.scrollLeft <= 8) return 0;

    const cards = getCards();
    if (!cards.length) return 0;

    const viewportCenter = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const node = cards[i];
      const center = node.offsetLeft + node.clientWidth / 2;
      const dist = Math.abs(center - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }

    return best;
  };

  const scrollToCard = (idx, mode = "animate") => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = getCards();
    const node = cards[idx];
    if (!node) return;

    // idx 0: INÍCIO REAL (não centraliza)
    if (idx === 0) {
      if (mode === "instant") el.scrollLeft = 0;
      else animateScrollTo(0, 520);
      return;
    }

    // geral: centraliza
    const raw =
      node.offsetLeft - (el.clientWidth / 2 - node.clientWidth / 2);

    const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = clamp(raw, 0, maxLeft);

    if (mode === "instant") el.scrollLeft = target;
    else animateScrollTo(target, 520);
  };

  const step = (dir) => {
    const nextIdx = clamp(active + dir, 0, items.length - 1);
    setActive(nextIdx);
    scrollToCard(nextIdx);
  };

  // atualiza active enquanto rola
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(getActiveByNearest()));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inicialização: garante começo na esquerda (2 frames)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollLeft = 0;
      setActive(0);
      requestAnimationFrame(() => {
        el.scrollLeft = 0;
        setActive(0);
      });
    });
  }, []);

  // Drag / swipe com inércia
  const drag = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    moved: 0,
    lastX: 0,
    lastT: 0,
    vel: 0,
  });

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;

    stopAnim();

    drag.current.down = true;
    drag.current.startX = e.clientX;
    drag.current.startLeft = el.scrollLeft;
    drag.current.moved = 0;
    drag.current.lastX = e.clientX;
    drag.current.lastT = performance.now();
    drag.current.vel = 0;

    el.setPointerCapture?.(e.pointerId);
    el.classList.add("isDragging");
  };

  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!drag.current.down) return;

    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;

    const now = performance.now();
    const dt = Math.max(16, now - drag.current.lastT);
    const vx = (e.clientX - drag.current.lastX) / dt; // px/ms
    drag.current.vel = drag.current.vel * 0.7 + vx * 0.3;

    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
  };

  const snapToNearest = () => {
    const idx = getActiveByNearest();
    setActive(idx);
    scrollToCard(idx);
  };

  const onPointerUp = () => {
    const el = scrollerRef.current;
    if (!el) return;

    drag.current.down = false;
    el.classList.remove("isDragging");

    const v = drag.current.vel; // px/ms
    const impulse = clamp(v * -420, -520, 520);

    const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = clamp(el.scrollLeft + impulse, 0, maxLeft);

    animateScrollTo(target, 320);
    window.setTimeout(() => snapToNearest(), 340);
  };

  // Wheel no carrossel (premium e natural)
  const onWheel = (e) => {
    const el = scrollerRef.current;
    if (!el) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 2) return;

    e.preventDefault();
    stopAnim();
    el.scrollLeft += delta * 1.15;
  };

  const onCardClick = (idx) => {
    if (drag.current.moved > 8) return;
    setActive(idx);
    scrollToCard(idx);
  };

  // teclado só quando a seção está visível
  const compareRef = useRef(null);
  const [compareInView, setCompareInView] = useState(false);

  useEffect(() => {
    const target = compareRef.current;
    if (!target) return;

    const io = new IntersectionObserver(
      (entries) => setCompareInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.35 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!compareInView) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") step(+1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareInView, active]);

  return (
    <div className={`site ${headerVisible ? "isScrolled" : ""}`}>
      <header className={`topbar ${headerVisible ? "topbarShow" : ""}`}>
        <div className="topbarSlot" aria-hidden="true" />

        <button className="brandCenter" type="button" onClick={() => goTo("hero")}>
          <img src="/src/assets/logo.png" alt="BLACK ROCK" />
        </button>

        <div className="topbarActions">
          <button className="topbarBtn" type="button" onClick={() => goTo("hero")}>
            Início
          </button>
          <button className="topbarBtn" type="button" onClick={() => goTo("compare")}>
            Explorar
          </button>
          <a className="topbarCta" href={waHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <section className="hero" id="hero">
        <div className="heroInner">
          <img className="heroLogo" src="/src/assets/logo.png" alt="BLACK ROCK" />

          <div className="heroPhonesWrap" aria-hidden="true">
            <img className="heroPhones" src="/src/assets/phones.png" alt="" />
          </div>

          <div className="heroCtas">
            <button className="heroBtn" type="button" onClick={() => goTo("compare")}>
              EXPLORAR
            </button>
          </div>

          <div className="heroFooter">BLACK ROCK</div>
        </div>
      </section>

      <section className="compare" id="compare" ref={compareRef}>
        <div className="compareInner">
          <div className="compareTop">
            <h1 className="compareTitle">Encontre o iPhone perfeito pra você</h1>
            <p className="compareSubtitle">
              Navegue pelas opções e escolha o seu favorito.
            </p>
          </div>

          {/* FULL-BLEED: garante início na esquerda da TELA */}
          <div className="carouselFull">
            <div className="carouselShell">
              <button className="arrow arrowLeft" type="button" onClick={() => step(-1)} aria-label="Anterior">
                ‹
              </button>

              <div
                className="carousel"
                ref={scrollerRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onWheel={onWheel}
                role="region"
                aria-label="Carrossel de iPhones"
              >
                {items.map((p, idx) => (
                  <article
                    key={p.id}
                    data-card
                    className={[
                      "card",
                      idx === active ? "isActive" : "",
                      p.highlight ? "cardHighlight" : "",
                    ].join(" ")}
                    onClick={() => onCardClick(idx)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(idx);
                        scrollToCard(idx);
                      }
                    }}
                    aria-label={`${p.title}. ${p.descTop} ${p.descBottom}`}
                  >
                    <div className="cardGlow" aria-hidden="true" />
                    <div className="cardMedia">
                      <img className="cardImg" src={p.img} alt={p.title} draggable={false} />
                    </div>

                    <div className="cardBody">
                      <h3 className="cardTitle">{p.title}</h3>
                      <p className="cardDesc">
                        {p.descTop}
                        <br />
                        {p.descBottom}
                      </p>

                      <button className="cardCta" type="button" onClick={(e) => e.preventDefault()}>
                        Saiba mais
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <button className="arrow arrowRight" type="button" onClick={() => step(+1)} aria-label="Próximo">
                ›
              </button>
            </div>
          </div>

          <div className="compareCtas">
            <a className="whatsBtn" href={waHref} target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
          </div>

          <div className="compareFooter">BLACK ROCK</div>
        </div>
      </section>
    </div>
  );
}
