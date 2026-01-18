import React from "react";
import "./Hero.css";

type Props = {
  assetsBase: string; // ex: `${BASE_URL}assets/`
  waHref: string;
  onGoTo: (id: string) => void;
};

export default function Hero({ assetsBase, waHref, onGoTo }: Props) {
  return (
    <section className="hero" id="hero">
      <div className="heroInner">
        <img className="heroLogo" src={`${assetsBase}logo.png`} alt="BLACK ROCK" />

        <h1 className="heroHeadline">iPhones Selecionados. Experiência Elevada.</h1>

        <div className="heroPhonesWrap" aria-hidden="true">
          <img className="heroPhones" src={`${assetsBase}phones.png`} alt="" />
        </div>

        <div className="heroCtas">
          <button className="heroBtn" type="button" onClick={() => onGoTo("compare")}>
            VER NOSSA SELEÇÃO
          </button>

          <a className="heroBtnGhost" href={waHref} target="_blank" rel="noreferrer">
            FALAR NO WHATSAPP
          </a>
        </div>

        <div className="heroValue" aria-label="Diferenciais Black Rock">
          <div className="heroValueInner">
            <article className="valueCard">
              <div className="valueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 7.2c1.6-1.3 3.6-2.2 5-2.2s3.4.9 5 2.2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 9.5h11l-1 11H7.5l-1-11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9.5V8.2c0-1.7 1.4-3.2 3-3.2s3 1.5 3 3.2V9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="valueText">
                <strong>Modelos selecionados</strong>
                <span>Curadoria premium.</span>
              </div>
            </article>

            <article className="valueCard valueCardHighlight">
              <div className="valueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.5 12.2l1.7 1.7 3.6-4.1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="valueText">
                <strong>Garantia & qualidade</strong>
                <span>Padrão elevado.</span>
              </div>
            </article>

            <article className="valueCard">
              <div className="valueIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 7h11v10H3V7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 10h4l3 3v4h-7v-7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="valueText">
                <strong>Envio seguro</strong>
                <span>Atendimento rápido.</span>
              </div>
            </article>
          </div>
        </div>

        <div className="heroFooter">BLACK ROCK</div>
      </div>
    </section>
  );
}
