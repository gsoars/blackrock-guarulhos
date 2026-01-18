import { useEffect, useMemo, useRef, useState } from "react";
import BackgroundFx from "./components/BackgroundFx/BackgroundFx";
import Topbar from "./components/Topbar/Topbar";
import Hero from "./views/Hero/Hero";
import Explore from "./views/Explore/Explore";
import type { ExploreItem } from "./views/Explore/Explore";
import IphoneCompare from "./features/IphoneCompare/IphoneCompare";
import Contact from "./views/Contact/Contact";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_TEXT = "Olá! Quero saber mais sobre os iPhones da Black Rock.";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function App() {
  const BASE = import.meta.env.BASE_URL;
  const ASSETS = `${BASE}assets/`;

  const items = useMemo<ExploreItem[]>(
    () => [
      {
        id: "17",
        title: "iPhone 17",
        descTop: "O futuro na sua mão.",
        descBottom: "Experiência premium total.",
        img: `${ASSETS}iphone-17.png`,
        highlight: true,
      },
      {
        id: "16",
        title: "iPhone 16",
        descTop: "Velocidade e eficiência.",
        descBottom: "Câmera que impressiona.",
        img: `${ASSETS}iphone-16.png`,
        highlight: false,
      },
      {
        id: "15",
        title: "iPhone 15",
        descTop: "Arrasa cores novas.",
        descBottom: "Câmera que faz mágica.",
        img: `${ASSETS}iphone-15.png`,
        highlight: false,
      },
      {
        id: "14",
        title: "iPhone 14",
        descTop: "Tão colorido.",
        descBottom: "E tão poderoso.",
        img: `${ASSETS}iphone-14.png`,
        highlight: false,
      },
      {
        id: "13",
        title: "iPhone 13",
        descTop: "Rápido e eficiente.",
        descBottom: "Perfeito para o dia a dia.",
        img: `${ASSETS}iphone-13.png`,
        highlight: false,
      },
      {
        id: "12",
        title: "iPhone 12",
        descTop: "Design clássico e leve.",
        descBottom: "Performance consistente.",
        img: `${ASSETS}iphone-12.png`,
        highlight: false,
      },
      {
        id: "11",
        title: "iPhone 11",
        descTop: "Excelente custo-benefício.",
        descBottom: "Ótimo para começar.",
        img: `${ASSETS}iphone-11.png`,
        highlight: false,
      },
    ],
    [ASSETS]
  );

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_TEXT
  )}`;

  const goTo = (id: string) => {
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

  // ===== Carrossel =====
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const animRef = useRef({
    raf: 0 as number,
    running: false,
    from: 0,
    to: 0,
    start: 0,
    dur: 0,
  });
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

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const animateScrollTo = (targetLeft: number, durationMs = 520) => {
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

    const tick = (now: number) => {
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
    return Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
  };

  const getActiveByNearest = () => {
    const el = scrollerRef.current;
    if (!el) return 0;

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

  const scrollToCard = (idx: number, mode: "animate" | "instant" = "animate") => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = getCards();
    const node = cards[idx];
    if (!node) return;

    if (idx === 0) {
      if (mode === "instant") el.scrollLeft = 0;
      else animateScrollTo(0, 520);
      return;
    }

    const raw = node.offsetLeft - (el.clientWidth / 2 - node.clientWidth / 2);
    const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = clamp(raw, 0, maxLeft);

    if (mode === "instant") el.scrollLeft = target;
    else animateScrollTo(target, 520);
  };

  const step = (dir: number) => {
    const nextIdx = clamp(active + dir, 0, items.length - 1);
    setActive(nextIdx);
    scrollToCard(nextIdx, "animate");
  };

  // ===== Scroll listener: atualiza active + snap ao parar de rolar =====
  const scrollEndTimer = useRef<number>(0);
  const isSnapping = useRef(false);

  const snapToNearest = () => {
    if (isSnapping.current) return;
    const idx = getActiveByNearest();
    setActive(idx);
    isSnapping.current = true;
    scrollToCard(idx, "animate");
    window.setTimeout(() => (isSnapping.current = false), 380);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(getActiveByNearest()));

      // snap leve quando parar de rolar (não durante drag)
      window.clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = window.setTimeout(() => {
        if (!drag.current.down) snapToNearest();
      }, 140);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scrollEndTimer.current);
      el.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Garantir start no início =====
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

  // ===== Drag (pointer) =====
  const drag = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    moved: 0,
    lastX: 0,
    lastT: 0,
    vel: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
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

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!drag.current.down) return;

    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    el.scrollLeft = drag.current.startLeft - dx;

    const now = performance.now();
    const dt = Math.max(16, now - drag.current.lastT);
    const vx = (e.clientX - drag.current.lastX) / dt;
    drag.current.vel = drag.current.vel * 0.7 + vx * 0.3;

    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;

    drag.current.down = false;
    el.classList.remove("isDragging");

    // impulso menor (menos “pulo” e menos travamento)
    const v = drag.current.vel;
    const impulse = clamp(v * -320, -360, 360);

    const maxLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = clamp(el.scrollLeft + impulse, 0, maxLeft);

    animateScrollTo(target, 260);
    window.setTimeout(() => snapToNearest(), 280);

    el.releasePointerCapture?.(e.pointerId);
  };

  // ===== Wheel: NÃO travar scroll vertical da página =====
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;

    const dx = e.deltaX;
    const dy = e.deltaY;

    // Só intercepta wheel quando realmente é gesto horizontal:
    // - trackpad horizontal (|dx| > |dy|)
    // - ou usuário segurando Shift (wheel vertical vira horizontal)
    const horizontalIntent = Math.abs(dx) > Math.abs(dy) || e.shiftKey;

    if (!horizontalIntent) {
      // deixa a página rolar normalmente
      return;
    }

    e.preventDefault();
    stopAnim();

    const delta = Math.abs(dx) > 0 ? dx : dy;
    el.scrollLeft += delta * 1.15;
  };

  const onCardClick = (idx: number) => {
    // evita “clique fantasma” ao arrastar
    if (drag.current.moved > 8) return;
    setActive(idx);
    scrollToCard(idx, "animate");
  };

  const onCardKeySelect = (idx: number) => {
    setActive(idx);
    scrollToCard(idx, "animate");
  };

  // teclado só quando a seção está visível
  const compareRef = useRef<HTMLElement | null>(null);
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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(+1);
      if (e.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareInView, active]);

  return (
    <div className={`site ${headerVisible ? "isScrolled" : ""}`}>
      <Topbar visible={headerVisible} assetsBase={ASSETS} waHref={waHref} onGoTo={goTo} />

      <Hero assetsBase={ASSETS} waHref={waHref} onGoTo={goTo} />

      <Explore
        sectionRef={compareRef}
        items={items}
        active={active}
        waHref={waHref}
        onStep={step}
        onCardClick={onCardClick}
        onCardKeySelect={onCardKeySelect}
        scrollerRef={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      />

      <IphoneCompare />

      <Contact waHref={waHref} />

      <BackgroundFx />
    </div>
  );
}
