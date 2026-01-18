import React from "react";
import "./Explore.css";

export type ExploreItem = {
  id: string;
  title: string;
  descTop: string;
  descBottom: string;
  img: string;
  highlight: boolean;
};

type Props = {
  sectionRef: React.RefObject<HTMLElement | null>;
  items: ExploreItem[];
  active: number;
  waHref: string;

  onStep: (dir: number) => void;
  onCardClick: (idx: number) => void;
  onCardKeySelect: (idx: number) => void;

  scrollerRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => void;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
};

export default function Explore({
  sectionRef,
  items,
  active,
  waHref,
  onStep,
  onCardClick,
  onCardKeySelect,
  scrollerRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onWheel,
}: Props) {
  return (
    <section className="compare" id="compare" ref={sectionRef}>
      <div className="compareInner">
        <div className="compareTop">
          <h1 className="compareTitle">Encontre o iPhone perfeito pra você</h1>
          <p className="compareSubtitle">
            Navegue pelas opções e escolha o seu favorito.
          </p>
        </div>

        <div className="carouselFull">
          <div className="carouselShell">
            <button
              className="arrow arrowLeft"
              type="button"
              onClick={() => onStep(-1)}
              aria-label="Anterior"
            >
              ‹
            </button>

            <div
              className="carousel"
              ref={scrollerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
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
                      onCardKeySelect(idx);
                    }
                  }}
                  aria-label={`${p.title}. ${p.descTop} ${p.descBottom}`}
                >
                  <div className="cardGlow" aria-hidden="true" />
                  <div className="cardMedia">
                    <img
                      className="cardImg"
                      src={p.img}
                      alt={p.title}
                      draggable={false}
                    />
                  </div>

                  <div className="cardBody">
                    <h3 className="cardTitle">{p.title}</h3>
                    <p className="cardDesc">
                      {p.descTop}
                      <br />
                      {p.descBottom}
                    </p>

                    <button
                      className="cardCta"
                      type="button"
                      onClick={(e) => e.preventDefault()}
                    >
                      Saiba mais
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              className="arrow arrowRight"
              type="button"
              onClick={() => onStep(+1)}
              aria-label="Próximo"
            >
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
  );
}
