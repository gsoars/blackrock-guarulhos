import React from "react";
import "./Topbar.css";
import logo from "../../assets/logo_lume.png";


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
        <img className="heroLogoTopBar" src={logo} alt="LUME" />
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
