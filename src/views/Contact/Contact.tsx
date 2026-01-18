import React from "react";
import "./Contact.css";

type Props = {
  waHref: string;
};

export default function Contact({ waHref }: Props) {
  return (
    <section className="contact" id="contact">
      <div className="contactInner">
        <h2 className="contactTitle">Contato</h2>
        <p className="contactSubtitle">
          Fale com a <strong>Black Rock</strong>. Respondemos o mais rápido
          possível pelos canais abaixo.
        </p>

        <div className="contactChannels">
          <a
            className="contactChannel contactChannelWhats"
            href={waHref}
            target="_blank"
            rel="noreferrer"
          >
            <span className="contactIcon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
              />
            </span>

            <div className="contactChannelText">
              <strong>WhatsApp</strong>
              <span>Atendimento rápido</span>
            </div>
          </a>

          <a
            className="contactChannel contactChannelIg"
            href="https://instagram.com/blackrock.guarulhos"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contactIcon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Instagram"
              />
            </span>

            <div className="contactChannelText">
              <strong>Instagram</strong>
              <span>@BLACKROCK.GUARULHOS</span>
            </div>
          </a>
        </div>

        <div className="contactGrid">
          <div className="contactCard">
            <div className="contactInfoBlock">
              <div className="contactInfoHead">WhatsApp:</div>
              <div className="contactInfoValue">(11) 99932-2210</div>
              <div className="contactInfoHint">
                Horário: Seg–Sex, 09:00 - 18:00
              </div>
            </div>

            <div className="contactDivider" />

            <div className="contactInfoBlock">
              <div className="contactInfoHead">Instagram</div>
              <div className="contactInfoValue">@BLACKROCK.GUARULHOS</div>
              <div className="contactInfoHint">
                Conteúdos, lançamentos e novidades.
              </div>
            </div>

            <div className="contactDivider" />

            <div className="contactInfoBlock">
              <div className="contactInfoHead">E-mail</div>
              <div className="contactInfoValue">contato@seudominio.com</div>
              <div className="contactInfoHint">
                Para suporte, propostas e parcerias.
              </div>
            </div>

            <div className="contactDivider" />

            <div className="contactInfoBlock">
              <div className="contactInfoHead">Endereço</div>
              <div className="contactInfoValue">
                Shopping Internacional Guarulhos
              </div>
              <div className="contactInfoHint">
                Rod. Pres. Dutra, Saída 225 — Loja 211
              </div>
            </div>
          </div>
        </div>

        <div className="contactCtaBox">
          <p className="contactCtaTitle">Quer falar pelo WhatsApp?</p>
          <a
            className="contactCtaBtn"
            href={waHref}
            target="_blank"
            rel="noreferrer"
          >
            Fale conosco
          </a>
        </div>

        <div className="contactBottom">
          <span>© 2024 BLACK ROCK. Todos os direitos reservados.</span>
          <span>
            Desenvolvido por <strong>FTV Devs</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
