
import "./IphoneCompare.css";

import { useMemo, useState } from "react";
import iphone11 from "../../assets/apple-iphone-11.png";
import iphone11pm from "../../assets/apple-iphone-11-pro-max.png";
import iphone12 from "../../assets/apple-iphone-12.png";
import iphone12pm from "../../assets/apple-iphone-12-pro-max.png";
import iphone13 from "../../assets/apple-iphone-13.png";
import iphone13pro from "../../assets/apple-iphone-13-pro.png";
import iphone13pm from "../../assets/apple-iphone-13-pro-max.png";
import iphone14 from "../../assets/apple-iphone-14.png";
import iphone14pro from "../../assets/apple-iphone-14-pro.png";
import iphone14pm from "../../assets/apple-iphone-14-pro-max.png";
import iphone15 from "../../assets/apple-iphone-15.png";
import iphone15pro from "../../assets/apple-iphone-15-pro.png";
import iphone15pm from "../../assets/apple-iphone-15-pro-max.png";
import iphone16 from "../../assets/apple-iphone-16-new.png";
import iphone16pro from "../../assets/apple-iphone-16-pro.png";
import iphone16pm from "../../assets/apple-iphone-16-pro-max.png";
import iphone17 from "../../assets/apple-iphone-17.png";
import iphone17pro from "../../assets/apple-iphone-17-pro.png";
import iphone17pm from "../../assets/apple-iphone-17-pro-max 1.png";
import iphoneair from "../../assets/apple-iphone-air.png";

type IphoneKey =
  | "iphone-11"
  | "iphone-11-pro-max"
  | "iphone-12"
  | "iphone-12-pro-max"
  | "iphone-13"
  | "iphone-13-pro"
  | "iphone-13-pro-max"
  | "iphone-14"
  | "iphone-14-pro"
  | "iphone-14-pro-max"
  | "iphone-15"
  | "iphone-15-pro"
  | "iphone-15-pro-max"
  | "iphone-16"
  | "iphone-16-pro"
  | "iphone-16-pro-max"
  | "iphone-17"
  | "iphone-17-pro"
  | "iphone-17-pro-max"
  | "iphone-air";

type Specs = {
  year: string; // ✅ NOVO
  os: string;
  chip: string;
  weight: string;
  rearCamera: string;
  frontCamera: string;
  videoResolution: string;
  videoFps: string;
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
          year: "2019",
          os: "iOS 13",
          chip: "A13 Bionic",
          weight: "194 g",
          rearCamera: "12 MP + 12 MP (ultra-wide)",
          frontCamera: "12 MP",
          videoResolution: "4K",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3110 mAh",
        },
      },
      {
        key: "iphone-11-pro-max",
        label: "iPhone 11 Pro Max",
        img: iphone11pm,
        colors: "Space Gray, Silver, Gold, Midnight Green",
        specs: {
          year: "2019",
          os: "iOS 13",
          chip: "A13 Bionic",
          weight: "226 g",
          rearCamera: "12 MP + 12 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3969 mAh",
        },
      },

      {
        key: "iphone-12",
        label: "iPhone 12",
        img: iphone12,
        colors: "Preto, Branco, Verde, Azul, Roxo, Vermelho",
        specs: {
          year: "2020",
          os: "iOS 14",
          chip: "A14 Bionic",
          weight: "164 g",
          rearCamera: "12 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "2815 mAh",
        },
      },
      {
        key: "iphone-12-pro-max",
        label: "iPhone 12 Pro Max",
        img: iphone12pm,
        colors: "Graphite, Silver, Gold, Pacific Blue",
        specs: {
          year: "2020",
          os: "iOS 14",
          chip: "A14 Bionic",
          weight: "228 g",
          rearCamera: "12 MP + 12 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K HDR Dolby Vision",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3687 mAh",
        },
      },

      {
        key: "iphone-13",
        label: "iPhone 13",
        img: iphone13,
        colors: "Preto, Branco, Azul, Rosa, Verde",
        specs: {
          year: "2021",
          os: "iOS 15",
          chip: "A15 Bionic",
          weight: "174 g",
          rearCamera: "12 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3227 mAh",
        },
      },
      {
        key: "iphone-13-pro",
        label: "iPhone 13 Pro",
        img: iphone13pro,
        colors: "Graphite, Gold, Silver, Sierra Blue",
        specs: {
          year: "2021",
          os: "iOS 15",
          chip: "A15 Bionic",
          weight: "204 g",
          rearCamera: "12 MP + 12 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3095 mAh",
        },
      },
      {
        key: "iphone-13-pro-max",
        label: "iPhone 13 Pro Max",
        img: iphone13pm,
        colors: "Graphite, Gold, Silver, Sierra Blue",
        specs: {
          year: "2021",
          os: "iOS 15",
          chip: "A15 Bionic",
          weight: "240 g",
          rearCamera: "12 MP + 12 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "4352 mAh",
        },
      },

      {
        key: "iphone-14",
        label: "iPhone 14",
        img: iphone14,
        colors: "Preto, Branco, Azul, Roxo, Vermelho",
        specs: {
          year: "2022",
          os: "iOS 16",
          chip: "A15 Bionic",
          weight: "172 g",
          rearCamera: "12 MP + 12 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3279 mAh",
        },
      },
      {
        key: "iphone-14-pro",
        label: "iPhone 14 Pro",
        img: iphone14pro,
        colors: "Space Black, Silver, Gold, Deep Purple",
        specs: {
          year: "2022",
          os: "iOS 16",
          chip: "A16 Bionic",
          weight: "206 g",
          rearCamera: "48 MP + 12 MP + 12 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3200 mAh",
        },
      },
      {
        key: "iphone-14-pro-max",
        label: "iPhone 14 Pro Max",
        img: iphone14pm,
        colors: "Space Black, Silver, Gold, Deep Purple",
        specs: {
          year: "2022",
          os: "iOS 16",
          chip: "A16 Bionic",
          weight: "240 g",
          rearCamera: "48 MP + 12 MP + 12 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "4323 mAh",
        },
      },

      {
        key: "iphone-15",
        label: "iPhone 15",
        img: iphone15,
        colors: "Rosa, Amarelo, Verde, Azul, Preto",
        specs: {
          year: "2023",
          os: "iOS 17",
          chip: "A16 Bionic",
          weight: "171 g",
          rearCamera: "48 MP + 12 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3349 mAh",
        },
      },
      {
        key: "iphone-15-pro",
        label: "iPhone 15 Pro",
        img: iphone15pro,
        colors: "Titânio Preto, Branco, Natural, Azul",
        specs: {
          year: "2023",
          os: "iOS 17",
          chip: "A17 Pro",
          weight: "187 g",
          rearCamera: "48 MP + 12 MP + 12 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3274 mAh",
        },
      },
      {
        key: "iphone-15-pro-max",
        label: "iPhone 15 Pro Max",
        img: iphone15pm,
        colors: "Titânio Preto, Branco, Natural, Azul",
        specs: {
          year: "2023",
          os: "iOS 17",
          chip: "A17 Pro",
          weight: "221 g",
          rearCamera: "48 MP + 12 MP + 12 MP (5×)",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "4422 mAh",
        },
      },

      {
        key: "iphone-16",
        label: "iPhone 16",
        img: iphone16,
        colors: "Preto, Branco, Azul",
        specs: {
          year: "2024",
          os: "iOS 18",
          chip: "A18",
          weight: "172 g",
          rearCamera: "48 MP + ultra-wide",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3400 mAh",
        },
      },
      {
        key: "iphone-16-pro",
        label: "iPhone 16 Pro",
        img: iphone16pro,
        colors: "Titânio Preto, Branco, Natural, Deserto",
        specs: {
          year: "2024",
          os: "iOS 18",
          chip: "A18 Pro",
          weight: "199 g",
          rearCamera: "48 MP + 48 MP + 12 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3582 mAh",
        },
      },
      {
        key: "iphone-16-pro-max",
        label: "iPhone 16 Pro Max",
        img: iphone16pm,
        colors: "Titânio Preto, Branco, Natural, Deserto",
        specs: {
          year: "2024",
          os: "iOS 18",
          chip: "A18 Pro",
          weight: "227 g",
          rearCamera: "48 MP + 48 MP + 12 MP (5×)",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "4685 mAh",
        },
      },

      {
        key: "iphone-17",
        label: "iPhone 17",
        img: iphone17,
        colors: "Preto, Branco, Natural",
        specs: {
          year: "2025",
          os: "iOS 19",
          chip: "A19",
          weight: "180 g",
          rearCamera: "48 MP",
          frontCamera: "12 MP com autofocus",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3600 mAh",
        },
      },
      {
        key: "iphone-17-pro",
        label: "iPhone 17 Pro",
        img: iphone17pro,
        colors: "Preto, Branco, Natural, Azul",
        specs: {
          year: "2025",
          os: "iOS 19",
          chip: "A19 Pro",
          weight: "195 g",
          rearCamera: "48 MP + 48 MP + 12 MP",
          frontCamera: "12 MP",
          videoResolution: "4K ProRes",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "4100 mAh",
        },
      },
      {
        key: "iphone-17-pro-max",
        label: "iPhone 17 Pro Max",
        img: iphone17pm,
        colors: "Cosmic Orange, Deep Blue, Silver",
        specs: {
          year: "2025",
          os: "iOS 19",
          chip: "A19 Pro",
          weight: "231 g",
          rearCamera: "48 MP + 48 MP + 48 MP",
          frontCamera: "18 MP",
          videoResolution: "4K ProRes / HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "5088 mAh",
        },
      },

      {
        key: "iphone-air",
        label: "iPhone Air",
        img: iphoneair,
        colors: "Preto, Prata, Azul",
        specs: {
          year: "2025",
          os: "iOS 19",
          chip: "A19 (eficiência)",
          weight: "165 g",
          rearCamera: "48 MP",
          frontCamera: "12 MP",
          videoResolution: "4K HDR",
          videoFps: "Até 60 fps",
          batteryType: "Li-Ion",
          batteryMah: "3200 mAh",
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
    { label: "Ano de fabricação", value: s.year },
    { label: "Sistema Operacional", value: s.os },
    { label: "Chip", value: s.chip },
    { label: "Peso", value: s.weight },
    { label: "Câmera", value: s.rearCamera },
    { label: "Câmera Frontal", value: s.frontCamera },
    { label: "Resolução da gravação", value: s.videoResolution },
    { label: "FPS da gravação", value: s.videoFps },
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
        <article className="phoneCol phoneColLeft">
          <div className="phoneMedia">
            <img className="phoneImg" src={L.img} alt={L.label} />
          </div>

          <div className="phoneMeta">
            <div className="phoneName">{L.label}</div>
            <div className="phoneBadge">{L.specs.year}</div>
            <div className="phoneColors">{L.colors}</div>
          </div>

          <div className="phoneSpecs">
            {specRows(L.specs).map((row) => (
              <SpecRow key={row.label} label={row.label} value={row.value} />
            ))}
          </div>
        </article>

        <article className="phoneCol phoneColRight">
          <div className="phoneMedia">
            <img className="phoneImg" src={R.img} alt={R.label} />
          </div>

          <div className="phoneMeta">
            <div className="phoneName">{R.label}</div>
            <div className="phoneBadge">{R.specs.year}</div>
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