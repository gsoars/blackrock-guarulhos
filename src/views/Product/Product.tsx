import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import BackgroundFx from "../../components/BackgroundFx/BackgroundFx";
import {
  getFamily,
  type AppleFamily,
  type AppleModel,
  type AppleColor,
} from "../../data/appleCatalog";

import "./Product.css";

/** Normaliza strings para matching robusto */
function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\s-]+/g, " ")
    .trim();
}

/** Determina “grupo” de cores por modelo */
function modelGroup(modelKey: string) {
  const k = norm(modelKey).replace(/\s/g, "");
  if (k.includes("iphone13")) return "iphone13";
  if (k.includes("iphone14pro")) return "iphone14pro";
  if (k.includes("iphone14plus")) return "iphone14";
  if (k.includes("iphone14")) return "iphone14";
  if (k.includes("iphone15pro")) return "iphone15pro";
  if (k.includes("iphone15plus")) return "iphone15";
  if (k.includes("iphone15")) return "iphone15";
  if (k.includes("iphone16pro")) return "iphone16pro";
  if (k.includes("iphone16plus")) return "iphone16";
  if (k.includes("iphone16")) return "iphone16";
  if (k.includes("iphone17pro")) return "iphone17pro";
  if (k.includes("iphone17air")) return "iphone17air";
  if (k.includes("iphone17")) return "iphone17";
  return "default";
}

/** Mapa base (HEX que você passou) */
const COLOR_MAP: Record<string, Record<string, string>> = {
  iphone13: {
    [norm("azul")]: "#043959",
    [norm("branco")]: "#F2F1F0",
    [norm("roxo")]: "#ABA9D9",
    [norm("preto")]: "#212025",
    [norm("verde")]: "#DDF2DC",
  },

  iphone14: {
    [norm("meia noite")]: "#0D0D0D",
    [norm("amarelo")]: "#FCE56D",
    [norm("roxo")]: "#EADDEC",
    [norm("azul")]: "#A0B4C4",
    [norm("estelar")]: "#F7F4ED",
  },

  iphone14pro: {
    [norm("preto espacial")]: "#434240",
    [norm("prateado")]: "#F1F3F2",
    [norm("dourado")]: "#F9E6CF",
    [norm("roxo")]: "#5F5567",
  },

  iphone15: {
    [norm("preto")]: "#4D4F4E",
    [norm("rosa")]: "#FFE6E6",
    [norm("verde")]: "#F2F6E9",
    [norm("azul")]: "#F3F6F9",
    [norm("amarelo")]: "#FFFAE5",
  },

  iphone15pro: {
    [norm("titanio azul")]: "#3F424D",
    [norm("titanio branco")]: "#E1DFD4",
    [norm("titanio natural")]: "#98958D",
    [norm("titanio preto")]: "#353532",
  },

  iphone16: {
    [norm("branco")]: "#F2F4F0",
    [norm("preto")]: "#0D0D0D",
    [norm("rosa")]: "#EEACD7",
    [norm("ultra marino")]: "#95A9E8",
    [norm("verde acinzentado")]: "#ABD0CF",
  },

  iphone16pro: {
    [norm("titanio branco")]: "#F8F8F6",
    [norm("titanio deserto")]: "#D2C0B2",
    [norm("titanio preto")]: "#303130",
    [norm("titanio natural")]: "#E3DFD5",
  },

  iphone17: {
    [norm("azul nevoa")]: "#B7C6DD",
    [norm("branco")]: "#F8F8F6",
    [norm("lavanda")]: "#EAE3F1",
    [norm("salvia")]: "#C5D1AB",
    [norm("preto")]: "#363938",
  },

  iphone17air: {
    [norm("azul ceu")]: "#F5FAFF",
    [norm("branco nuvem")]: "#FDFCFE",
    [norm("dourado claro")]: "#F1ECE4",
    [norm("preto espacial")]: "#363938",
  },

  iphone17pro: {
    [norm("azul intenso")]: "#415575",
    [norm("laranja cosmico")]: "#FF7A2B",
    [norm("prateado")]: "#D5D4D3",
  },

  default: {},
};

/** Paleta “viva” por nome (evita pastel apagado no fundo escuro) */
const VIVID_BY_NAME: Array<[RegExp, string]> = [
  [/laranja/i, "#FF6A1F"],
  [/amarelo/i, "#FFD84A"],
  [/rosa/i, "#FF6FC3"],
  [/lavanda/i, "#B59CFF"],
  [/roxo/i, "#9A7BFF"],
  [/azul intenso/i, "#3F6BFF"],
  [/ultra marino/i, "#5C7CFF"],
  [/azul nevoa|azul nuvem|azul ceu|azul/i, "#4E86FF"],
  [/salvia/i, "#89E06E"],
  [/verde/i, "#62E98A"],
  [/dourado/i, "#FFC98A"],
  [/prateado/i, "#DDE3EA"],
  [/preto espacial|preto|meia noite/i, "#202225"],
  [/branco nuvem|branco|estelar/i, "#F7F8FA"],
  [/titanio/i, "#9FA3A8"],
  [/deserto/i, "#D9BCA2"],
  [/natural/i, "#B6B2A8"],
];

function hexToRgb(hex: string) {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}
function luminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
}

function getBaseHex(modelKey: string, c: AppleColor) {
  const group = modelGroup(modelKey);
  const map = COLOR_MAP[group] || COLOR_MAP.default;

  const k1 = norm(c.key);
  const k2 = norm(c.label);
  const k2NoTitanio = norm(c.label.replace(/tit[aâ]nio/gi, "").trim());

  return map[k1] || map[k2] || map[k2NoTitanio] || "";
}

function pickVividHex(label: string) {
  const l = label || "";
  for (const [re, hex] of VIVID_BY_NAME) {
    if (re.test(l)) return hex;
  }
  return "";
}

function hasTouchSupport() {
  return (
    "ontouchstart" in window ||
    (navigator as any).maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

type ImgBox = {
  cw: number;
  ch: number;
  iw: number;
  ih: number;
  ox: number;
  oy: number;
  nw: number;
  nh: number;
};

export default function Product() {
  const navigate = useNavigate();
  const { family: familyParam } = useParams();
  const [sp, setSp] = useSearchParams();

  const BASE = import.meta.env.BASE_URL;
  const ASSETS = `${BASE}assets/`;

  const family: AppleFamily | null = useMemo(() => {
    if (!familyParam) return null;
    return getFamily(familyParam) ?? null;
  }, [familyParam]);

  const rawModels: AppleModel[] = useMemo(() => family?.models ?? [], [family]);

  // ✅ iPhone 15 Plus (clone do iPhone 15)
  const models: AppleModel[] = useMemo(() => {
    if (familyParam !== "15") return rawModels;

    const has15Plus = rawModels.some(
      (m) => norm(m.key).replace(/\s/g, "") === "iphone15plus"
    );
    if (has15Plus) return rawModels;

    const base15 =
      rawModels.find((m) => norm(m.key).replace(/\s/g, "") === "iphone15") ||
      rawModels[0];

    if (!base15) return rawModels;

    const plusModel: AppleModel = {
      ...base15,
      key: "iphone15plus",
      label: "iPhone 15 Plus",
      colors: base15.colors.map((c) => ({ ...c })),
    };

    const out = [...rawModels];
    const idx = out.findIndex(
      (m) => norm(m.key).replace(/\s/g, "") === "iphone15"
    );
    if (idx >= 0) out.splice(idx + 1, 0, plusModel);
    else out.unshift(plusModel);

    return out;
  }, [rawModels, familyParam]);

  const modelKeyFromQuery = sp.get("model") || "";
  const colorKeyFromQuery = sp.get("color") || "";

  const selectedModel: AppleModel | null = useMemo(() => {
    if (!models.length) return null;
    return (
      models.find((m) => norm(m.key) === norm(modelKeyFromQuery)) ??
      models[0] ??
      null
    );
  }, [models, modelKeyFromQuery]);

  const colors: AppleColor[] = useMemo(
    () => selectedModel?.colors ?? [],
    [selectedModel]
  );

  const selectedColor: AppleColor | null = useMemo(() => {
    if (!colors.length) return null;
    return (
      colors.find((c) => norm(c.key) === norm(colorKeyFromQuery)) ??
      colors.find((c) => c.isDefault) ??
      colors[0] ??
      null
    );
  }, [colors, colorKeyFromQuery]);

  const heroImageUrl = selectedColor?.imageUrl || "";

  // Garantir querystring consistente
  useEffect(() => {
    if (!family || !selectedModel) return;

    const next = new URLSearchParams(sp);

    if (!sp.get("model")) next.set("model", selectedModel.key);

    if (!sp.get("color")) {
      const def =
        selectedModel.colors.find((c) => c.isDefault) ?? selectedModel.colors[0];
      if (def?.key) next.set("color", def.key);
    }

    if (next.toString() !== sp.toString()) setSp(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [family, selectedModel]);

  const pickModel = (m: AppleModel) => {
    const next = new URLSearchParams(sp);
    next.set("model", m.key);

    const def = m.colors.find((c) => c.isDefault) ?? m.colors[0];
    if (def?.key) next.set("color", def.key);

    setSp(next, { replace: false });
  };

  const pickColor = (k: string) => {
    const next = new URLSearchParams(sp);
    next.set("color", k);
    setSp(next, { replace: false });
  };

  const logoSrc = `${ASSETS}logo.png`;

  /** -------------------- LUPA CORRETA (contain-aware) -------------------- */
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [touch, setTouch] = useState(false);
  const [magOn, setMagOn] = useState(false);

  const [imgBox, setImgBox] = useState<ImgBox | null>(null);
  const [cursorInImg, setCursorInImg] = useState({ x: 0, y: 0 });

  const MAG_ZOOM = 2.35;
  const MAG_SIZE = 210;

  useEffect(() => {
    setTouch(hasTouchSupport());
  }, []);

  const computeImgBox = useCallback(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;

    const rect = frame.getBoundingClientRect();
    const cw = rect.width;
    const ch = rect.height;

    const nw = img.naturalWidth || 0;
    const nh = img.naturalHeight || 0;
    if (!nw || !nh || !cw || !ch) return;

    const scale = Math.min(cw / nw, ch / nh);
    const iw = nw * scale;
    const ih = nh * scale;
    const ox = (cw - iw) / 2;
    const oy = (ch - ih) / 2;

    setImgBox({ cw, ch, iw, ih, ox, oy, nw, nh });
  }, []);

  useEffect(() => {
    setMagOn(false);
    setCursorInImg({ x: 0, y: 0 });

    const onResize = () => computeImgBox();
    window.addEventListener("resize", onResize);
    const t = window.setTimeout(() => computeImgBox(), 0);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [heroImageUrl, computeImgBox]);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const updateCursor = (clientX: number, clientY: number) => {
    const frame = frameRef.current;
    const box = imgBox;
    if (!frame || !box) return;

    const rect = frame.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    const xInImg = clamp(cx - box.ox, 0, box.iw);
    const yInImg = clamp(cy - box.oy, 0, box.ih);

    setCursorInImg({ x: xInImg, y: yInImg });
  };

  const onEnter = (e: React.MouseEvent) => {
    if (touch || !heroImageUrl) return;
    computeImgBox();
    updateCursor(e.clientX, e.clientY);
    setMagOn(true);
  };

  const onMove = (e: React.MouseEvent) => {
    if (touch || !magOn || !heroImageUrl) return;
    updateCursor(e.clientX, e.clientY);
  };

  const onLeave = () => {
    if (touch) return;
    setMagOn(false);
  };

  const lensStyle = useMemo(() => {
    const box = imgBox;
    if (!box || !heroImageUrl) return undefined;

    const bgW = box.iw * MAG_ZOOM;
    const bgH = box.ih * MAG_ZOOM;

    const bgX = -(cursorInImg.x * MAG_ZOOM - MAG_SIZE / 2);
    const bgY = -(cursorInImg.y * MAG_ZOOM - MAG_SIZE / 2);

    const minX = -(bgW - MAG_SIZE);
    const minY = -(bgH - MAG_SIZE);

    const clampedBgX = clamp(bgX, minX, 0);
    const clampedBgY = clamp(bgY, minY, 0);

    const lensLeft = box.ox + cursorInImg.x - MAG_SIZE / 2;
    const lensTop = box.oy + cursorInImg.y - MAG_SIZE / 2;

    const left = clamp(lensLeft, 0, Math.max(0, box.cw - MAG_SIZE));
    const top = clamp(lensTop, 0, Math.max(0, box.ch - MAG_SIZE));

    return {
      width: `${MAG_SIZE}px`,
      height: `${MAG_SIZE}px`,
      left: `${left}px`,
      top: `${top}px`,
      backgroundImage: `url("${heroImageUrl}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${bgW}px ${bgH}px`,
      backgroundPosition: `${clampedBgX}px ${clampedBgY}px`,
    } as React.CSSProperties;
  }, [imgBox, heroImageUrl, cursorInImg.x, cursorInImg.y]);

  // ----------------------------------------------------------------------

  if (!family) {
    return (
      <div className="pPg">
        <BackgroundFx />
        <div className="pPg__empty">
          <h1>Família não encontrada</h1>
          <button className="pPg__btn" onClick={() => navigate("/")}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pPg" data-family={family.family}>
      <BackgroundFx />

      <header className="pPg__header">
        <button
          className="pPg__back"
          type="button"
          /* ✅ Voltar direto para o carrossel (que já tem id="compare") */
          onClick={() => navigate("/#compare")}
          aria-label="Voltar para o carrossel"
        >
          ←
        </button>

        <div
          className="pPg__brand"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/")}
        >
          <img className="pPg__logoOnly" src={logoSrc} alt="Black Rock" />
        </div>

        <div />
      </header>

      <main className="pPg__hero">
        <section className="pPg__stage">
          <div className="pPg__visual">
            <div className="pPg__frame">
              {heroImageUrl ? (
                <div
                   ref={frameRef}
                   className={`pPg__mag ${magOn ? "isMagnifying" : ""}`}
                   onMouseEnter={onEnter}
                   onMouseMove={onMove}
                   onMouseLeave={onLeave}
                >
                  <img
                    ref={imgRef}
                    className="pPg__phone pPg__phone--mega"
                    src={heroImageUrl}
                    alt="iPhone selecionado"
                    draggable={false}
                    onLoad={computeImgBox}
                  />

                  {!touch && (
                    <div
                      className={`pPg__lens ${magOn ? "isOn" : "isOff"}`}
                      style={lensStyle}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ) : (
                <div className="pPg__placeholder" />
              )}
            </div>
          </div>

          <div className="pPg__panel">
            <div className="pPg__titleWrap">
              <h1 className="pPg__title">
                {selectedModel?.label ?? `iPhone ${family.family}`}
              </h1>
              <p className="pPg__subtitle">Selecione o modelo e a cor.</p>
            </div>

            <div className="pPg__block">
              <div className="pPg__blockTop">
                <h2 className="pPg__blockTitle">Modelo</h2>
                <span className="pPg__blockHint">Qual é o melhor para você?</span>
              </div>

              <div className="pPg__models">
                {models.map((m) => {
                  const active = m.key === selectedModel?.key;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      className={`pPg__model ${active ? "isActive" : ""}`}
                      onClick={() => pickModel(m)}
                    >
                      <div className="pPg__modelName">{m.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pPg__block">
              <div className="pPg__blockTop">
                <h2 className="pPg__blockTitle">Cor</h2>
                <span className="pPg__blockHint">Escolha sua favorita.</span>
              </div>

              <div className="pPg__swatches" role="list">
                {colors.map((c) => {
                  const active = c.key === selectedColor?.key;

                  const baseHex = selectedModel ? getBaseHex(selectedModel.key, c) : "";
                  const vividHex = pickVividHex(c.label);

                  const baseLum = baseHex ? luminance(baseHex) : 0;
                  const shouldUseVivid = !baseHex || baseLum > 215;

                  const hex = shouldUseVivid ? (vividHex || baseHex) : baseHex;
                  const finalHex = hex || "#9FA3A8";

                  const lum = luminance(finalHex);
                  const isLight = lum > 220;

                  return (
                    <button
                      key={c.key}
                      type="button"
                      className={`pPg__swatch ${active ? "isActive" : ""}`}
                      onClick={() => pickColor(c.key)}
                      title={c.label}
                      aria-label={`Cor ${c.label}`}
                      role="listitem"
                    >
                      <span
                        className={`pPg__swatchDot ${isLight ? "isLight" : ""}`}
                        style={{ background: finalHex }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="pPg__colorLabel">{selectedColor?.label ?? ""}</div>
            </div>

            <div className="pPg__actions">
              <button className="pPg__btn" type="button" onClick={() => navigate("/#compare")}>
                Ver outros iPhones
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
