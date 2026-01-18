import { useMemo, useState } from "react";
import "./IphoneCompare.css";

import iphone11 from "../../assets/apple-iphone-11.png";
import iphone12 from "../../assets/apple-iphone-12.png";
import iphone13 from "../../assets/apple-iphone-13.png";
import iphone14 from "../../assets/apple-iphone-14.png";
import iphone15 from "../../assets/apple-iphone-15.png";
import iphone16 from "../../assets/apple-iphone-16.png";
import iphone17 from "../../assets/apple-iphone-17.png";
import iphone17pm from "../../assets/apple-iphone-17-pro-max.png";

type IphoneKey =
  | "iphone-11"
  | "iphone-12"
  | "iphone-13"
  | "iphone-14"
  | "iphone-15"
  | "iphone-16"
  | "iphone-17"
  | "iphone-17-pro-max";

type Specs = {
  os: string;
  weight: string;
  rearCamera: string;
  frontCamera: string;
  videoResolution: string;
  videoFps: string;
  slowMotion: string;
  batteryType: string;
  batteryMah: string;
};

type Iphone = {
  key: IphoneKey;
  label: string;
  img: string;
  colors: string;
  specs: Specs;
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="specRow">
      <span className="specLabel">{label}</span>
      <span className="specValue">{value}</span>
    </div>
  );
}

export default function IphoneCompare() {
  const iphones = useMemo<Iphone[]>(
    () => [
      {
        key: "iphone-11",
        label: "iPhone 11",
        img: iphone11,
        colors: "Preto, Branco, Verde, Amarelo, Roxo, Vermelho",
        specs: {
          os: "iOS 13",
          weight: "194 g",
          rearCamera: "12 MP + 12 MP (ultra-wide)",
          frontCamera: "12 MP",
          videoResolution: "4K",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "3110 mAh",
        },
      },
      {
        key: "iphone-12",
        label: "iPhone 12",
        img: iphone12,
        colors: "Preto, Branco, Verde, Azul, Roxo, Vermelho",
        specs: {
          os: "iOS 14",
          weight: "164 g",
          rearCamera: "12 MP + 12 MP (ultra-wide)",
          frontCamera: "12 MP",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "2815 mAh",
        },
      },
      {
        key: "iphone-13",
        label: "iPhone 13",
        img: iphone13,
        colors: "Preto, Branco, Azul, Rosa, Verde",
        specs: {
          os: "iOS 15",
          weight: "174 g",
          rearCamera: "12 MP + 12 MP (ultra-wide)",
          frontCamera: "12 MP",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "3227 mAh",
        },
      },
      {
        key: "iphone-14",
        label: "iPhone 14",
        img: iphone14,
        colors: "Preto, Branco, Azul, Roxo, Vermelho",
        specs: {
          os: "iOS 16",
          weight: "172 g",
          rearCamera: "12 MP + 12 MP (ultra-wide)",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "3279 mAh",
        },
      },
      {
        key: "iphone-15",
        label: "iPhone 15",
        img: iphone15,
        colors: "Rosa, Amarelo, Verde, Azul, Preto",
        specs: {
          os: "iOS 17",
          weight: "171 g",
          rearCamera: "48 MP + 12 MP (ultra-wide)",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "3349 mAh",
        },
      },
      {
        key: "iphone-16",
        label: "iPhone 16",
        img: iphone16,
        colors: "Preto, Branco, Azul",
        specs: {
          os: "iOS 18",
          weight: "172 g",
          rearCamera: "48 MP + ultra-wide aprimorada",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "3400 mAh",
        },
      },

      /* ✅ corrigido: sem chaves sobrando */
      {
        key: "iphone-17-pro-max",
        label: "iPhone 17 Pro Max",
        img: iphone17pm,
        colors: "Cosmic Orange, Deep Blue, Silver",
        specs: {
          os: "iOS 26",
          weight: "231 g",
          rearCamera: "48 MP + 48 MP + 48 MP (Pro Fusion, 8× zoom óptico)",
          frontCamera: "18 MP Center Stage",
          videoResolution: "4K ProRes / 4K HDR",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "5088 mAh",
        },
      },

      {
        key: "iphone-17",
        label: "iPhone 17",
        img: iphone17,
        colors: "Titânio Preto, Branco, Natural",
        specs: {
          os: "iOS 19",
          weight: "180 g",
          rearCamera: "48 MP + teleobjetiva",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR Pro",
          videoFps: "Até 60 fps",
          slowMotion: "1080p até 240 fps",
          batteryType: "Li-Ion",
          batteryMah: "3600 mAh",
        },
      },
    ],
    []
  );

  const [left, setLeft] = useState<IphoneKey>("iphone-15");
  const [right, setRight] = useState<IphoneKey>("iphone-14");

  const L = iphones.find((i) => i.key === left)!;
  const R = iphones.find((i) => i.key === right)!;

  const specRows = (s: Specs) => [
    { label: "Sistema Operacional", value: s.os },
    { label: "Peso", value: s.weight },
    { label: "Câmera", value: s.rearCamera },
    { label: "Câmera Frontal", value: s.frontCamera },
    { label: "Resolução da gravação", value: s.videoResolution },
    { label: "FPS da gravação", value: s.videoFps },
    { label: "Slow Motion", value: s.slowMotion },
    { label: "Bateria (Tipo)", value: s.batteryType },
    { label: "Bateria (mAh)", value: s.batteryMah },
  ];

  return (
    <section className="iphoneCompare" id="compare-models">
      <h2 className="compareTitle">Compare os modelos de iPhone</h2>

      <div className="compareSelectors">
        <select value={left} onChange={(e) => setLeft(e.target.value as IphoneKey)}>
          {iphones.map((i) => (
            <option key={i.key} value={i.key}>
              {i.label}
            </option>
          ))}
        </select>

        <select value={right} onChange={(e) => setRight(e.target.value as IphoneKey)}>
          {iphones.map((i) => (
            <option key={i.key} value={i.key}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div className="compareTwoCols">
        {/* ESQUERDA */}
        <article className="phoneCol phoneColLeft">
          <div className="phoneMedia">
            <img className="phoneImg" src={L.img} alt={L.label} />
          </div>

          <div className="phoneMeta">
            <div className="phoneName">{L.label}</div>
            <div className="phoneBadge">Selecionado</div>
            <div className="phoneColors">{L.colors}</div>
          </div>

          <div className="phoneSpecs">
            {specRows(L.specs).map((row) => (
              <SpecRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </article>

        {/* DIREITA */}
        <article className="phoneCol phoneColRight">
          <div className="phoneMedia">
            <img className="phoneImg" src={R.img} alt={R.label} />
          </div>

          <div className="phoneMeta">
            <div className="phoneName">{R.label}</div>
            <div className="phoneBadge">Selecionado</div>
            <div className="phoneColors">{R.colors}</div>
          </div>

          <div className="phoneSpecs">
            {specRows(R.specs).map((row) => (
              <SpecRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
