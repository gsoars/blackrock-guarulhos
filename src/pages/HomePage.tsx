import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundFx from "../components/BackgroundFx/BackgroundFx";
import Topbar from "../components/Topbar/Topbar";
import Hero from "../views/Hero/Hero";
import Explore from "../views/Explore/Explore";
import type { ExploreItem } from "../views/Explore/Explore";
import IphoneCompare from "../features/IphoneCompare/IphoneCompare";
import Contact from "../views/Contact/Contact";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_TEXT = "Olá! Quero saber mais sobre os iPhones da Black Rock.";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function HomePage() {
  const navigate = useNavigate();

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

  // Início: garante que sempre começa do primeiro card
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const forceLeft = () => {
      el.scrollLeft = 0;
      setActive(0);
    };

    requestAnimationFrame(() => {
      forceLeft();
      requestAnimationFrame(forceLeft);
    });
  }, []);

  // Atualiza active por scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => setActive(getActiveByNearest());
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const step = (dir: number) => {
    const next = clamp(active + dir, 0, items.length - 1);
    setActive(next);
    scrollToCard(next, "animate");
  };

  const onCardClick = (idx: number) => {
    setActive(idx);
    scrollToCard(idx, "animate");
  };

  const onCardKeySelect = (idx: number) => {
    onCardClick(idx);
  };

  // Drag
  const drag = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    pointerId: 0,
    moved: false,
    lastX: 0,
    lastT: 0,
    vel: 0,
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // ✅ Correção: se clicou em elemento interativo (botão/link/etc), não iniciar drag
    const target = e.target as HTMLElement | null;
    if (target?.closest("button, a, input, textarea, select, [role='button']")) {
      return;
    }

    const el = scrollerRef.current;
    if (!el) return;
    stopAnim();

    el.setPointerCapture(e.pointerId);
    drag.current.down = true;
    drag.current.pointerId = e.pointerId;
    drag.current.startX = e.clientX;
    drag.current.lastX = e.clientX;
    drag.current.lastT = performance.now();
    drag.current.startLeft = el.scrollLeft;
    drag.current.moved = false;
    drag.current.vel = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!drag.current.down || drag.current.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;

    const now = performance.now();
    const dt = now - drag.current.lastT;
    if (dt > 0) {
      const vx = (e.clientX - drag.current.lastX) / dt; // px/ms
      drag.current.vel = vx;
      drag.current.lastX = e.clientX;
      drag.current.lastT = now;
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if (!drag.current.down || drag.current.pointerId !== e.pointerId) return;

    drag.current.down = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Snap para o card mais próximo
    const nearest = getActiveByNearest();
    setActive(nearest);
    scrollToCard(nearest, "animate");
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => endDrag(e);
  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => endDrag(e);

  // Wheel (horizontal inteligente)
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;

    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    const wantsHorizontal = e.shiftKey || absX > absY;
    if (!wantsHorizontal) return;

    e.preventDefault();
    stopAnim();
    el.scrollLeft += e.shiftKey ? e.deltaY : e.deltaX;
  };

  const compareRef = useRef<HTMLElement | null>(null);

  const onLearnMore = (item: ExploreItem) => {
    // Abre a página Apple-like da família (pasta src/assets/apple/{id})
    // model default: iphone{ID} (ex.: iphone17, iphone16, ...)
    navigate(`/produto/${item.id}?model=iphone${item.id}`);
  };

  return (
    <div className="site">
      <BackgroundFx />

      <Topbar
        visible={headerVisible}
        assetsBase={ASSETS}
        waHref={waHref}
        onGoTo={goTo}
      />

      <Hero assetsBase={ASSETS} waHref={waHref} onGoTo={goTo} />

      <Explore
        sectionRef={compareRef}
        items={items}
        active={active}
        waHref={waHref}
        onLearnMore={onLearnMore}
        onStep={step}
        onCardClick={onCardClick}
        onCardKeySelect={onCardKeySelect}
        scrollerRef={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onWheel={onWheel}
      />

      <IphoneCompare />

      <Contact waHref={waHref} />
    </div>
  );
}
