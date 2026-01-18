import React from "react";
import "./Topbar.css";

type Props = {
  visible: boolean;
  assetsBase: string; // ex: `${BASE_URL}assets/`
  waHref: string;
  onGoTo: (id: string) => void;
};

export default function Topbar({ visible, assetsBase, waHref, onGoTo }: Props) {
  return (
    <header className={`topbar ${visible ? "topbarShow" : ""}`}>
      <div className="topbarSlot" aria-hidden="true" />

      <button className="brandCenter" type="button" onClick={() => onGoTo("hero")}>
        <img src={`${assetsBase}logo.png`} alt="BLACK ROCK" />
      </button>

      <div className="topbarActions">
        <button className="topbarBtn" type="button" onClick={() => onGoTo("hero")}>
          Início
        </button>
        <button
          className="topbarBtn"
          type="button"
          onClick={() => onGoTo("compare")}
        >
          Explorar
        </button>
        <a className="topbarCta" href={waHref} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
    </header>
  );
}
