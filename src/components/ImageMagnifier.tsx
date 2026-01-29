import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ImageMagnifier.css";

type Props = {
  src: string;
  alt?: string;

  /** zoom: 2 = 200%, 2.5 = 250% */
  zoom?: number;

  /** tamanho do “quadrado” da lupa */
  lensSize?: number;

  /** class opcional pra ajustar layout */
  className?: string;

  /** desativar em mobile/touch (recomendado) */
  disableOnTouch?: boolean;
};

export default function ImageMagnifier({
  src,
  alt = "",
  zoom = 2.2,
  lensSize = 190,
  className,
  disableOnTouch = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 }); // percentual (0..1)
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (!disableOnTouch) return;

    const hasTouch =
      "ontouchstart" in window ||
      (navigator as any).maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;

    setIsTouch(Boolean(hasTouch));
  }, [disableOnTouch]);

  const lensStyle = useMemo(() => {
    const xPct = Math.max(0, Math.min(1, pos.x)) * 100;
    const yPct = Math.max(0, Math.min(1, pos.y)) * 100;

    return {
      width: `${lensSize}px`,
      height: `${lensSize}px`,
      left: `calc(${xPct}% - ${lensSize / 2}px)`,
      top: `calc(${yPct}% - ${lensSize / 2}px)`,
      backgroundImage: `url("${src}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
      backgroundPosition: `${xPct}% ${yPct}%`,
    } as React.CSSProperties;
  }, [pos.x, pos.y, lensSize, zoom, src]);

  function updatePosition(clientX: number, clientY: number) {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;

    setPos({ x, y });
  }

  function onMouseMove(e: React.MouseEvent) {
    updatePosition(e.clientX, e.clientY);
  }

  function onMouseEnter(e: React.MouseEvent) {
    updatePosition(e.clientX, e.clientY);
    setIsHover(true);
  }

  function onMouseLeave() {
    setIsHover(false);
  }

  // Em touch: não mostra lupa (padrão). Mantém só a imagem normal.
  const magnifierEnabled = !isTouch;

  return (
    <div
      ref={wrapRef}
      className={`imgMag ${className ?? ""}`}
      onMouseMove={magnifierEnabled ? onMouseMove : undefined}
      onMouseEnter={magnifierEnabled ? onMouseEnter : undefined}
      onMouseLeave={magnifierEnabled ? onMouseLeave : undefined}
    >
      <img className="imgMag__img" src={src} alt={alt} draggable={false} />

      {magnifierEnabled && (
        <div
          className={`imgMag__lens ${isHover ? "isOn" : "isOff"}`}
          style={lensStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
