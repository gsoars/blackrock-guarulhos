#  Black Rock — Premium iPhone Experience

**Black Rock** é um projeto front-end focado em entregar uma **experiência de compra premium**, inspirada no padrão visual e de interação da Apple, aplicada à exploração de iPhones.

O projeto simula um **e-commerce de alto padrão**, combinando design sofisticado, micro-interações refinadas e navegação fluida — com atenção obsessiva aos detalhes.

---

## 🚀 Visão do Produto

Mais do que uma vitrine de produtos, o Black Rock foi pensado como uma **experiência digital**.

O usuário não apenas “vê” um iPhone — ele:
- explora modelos de forma intuitiva,
- escolhe cores com feedback visual preciso,
- visualiza o produto em detalhe com **zoom realista**,
- navega sem fricção, com animações suaves e respostas imediatas.

Tudo isso mantendo **performance, acessibilidade e escalabilidade**.

---

## ✨ Principais Diferenciais

### 🎠 Carrossel Premium
- Scroll horizontal fluido
- Drag com inércia natural
- Snap automático para o item mais próximo
- Navegação por mouse, touch e teclado
- Destaque visual para modelos em evidência

### 📱 Página de Produto Apple-like
- Layout inspirado em produtos de alto padrão
- Hierarquia visual clara
- Foco total no produto
- Retorno direto ao carrossel principal

### 🔍 Zoom Interativo (Lupa de E-commerce)
- Zoom real (não é apenas ampliação da imagem)
- Respeita `object-fit: contain`
- Mantém proporção e centralização corretas
- Cursor oculto durante a interação
- Desativado automaticamente em dispositivos touch

### 🎨 Sistema de Cores Inteligente
- Mapeamento de cores por modelo
- Detecção automática de cores muito claras
- Fallback para tons mais “vivos” quando necessário
- Swatches compactos, elegantes e consistentes

### 🧠 Catálogo Escalável
- Modelos e cores carregados dinamicamente
- Estrutura pensada para crescer sem refatoração
- Inclusão de novos iPhones apenas adicionando assets

---

## 🧱 Stack Tecnológica

- **React 18**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **CSS moderno**
  - Grid & Flexbox
  - `clamp()`
  - `backdrop-filter`
  - animações leves e performáticas

---

## 🗂 Estrutura do Projeto

src/
├─ assets/
│ └─ apple/
│ └─ {family}/{model}/*.png
│
├─ components/
│ ├─ BackgroundFx
│ ├─ Topbar
│ └─ BootLoader
│
├─ views/
│ ├─ Hero
│ ├─ Explore ← carrossel principal
│ ├─ Product ← página Apple-like
│ └─ Contact
│
├─ data/
│ └─ appleCatalog.ts
│
└─ pages/
└─ HomePage.tsx



---

## 🧭 Navegação do Usuário

- **Home (`/`)**
  - Hero
  - Carrossel de iPhones
  - Comparação de modelos
- **Produto (`/produto/:family`)**
  - Seleção de modelo
  - Seleção de cor
  - Visualização detalhada com zoom
- Botão **Voltar** retorna diretamente ao carrossel principal

---

## 📦 Organização de Assets

Os produtos seguem o padrão:


Esse formato permite:
- Escalar o catálogo com facilidade
- Adicionar novos modelos sem alterar código
- Manter o projeto organizado e previsível

---

## ⚡ Performance & UX

- Animações leves e otimizadas
- Estados visuais claros (hover, active, focus)
- Fallbacks para mobile e touch
- Suporte a `prefers-reduced-motion`
- Navegação por teclado no carrossel

---

## 🚀 Como rodar localmente

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# preview do build
npm run preview


📌 Status do Projeto

✅ Funcional
🎨 Visual refinado
🛠 Evolução contínua

O projeto foi pensado como uma base sólida para:

landing pages premium

estudos avançados de UX/UI

portfólio profissional

👨‍💻 Sobre

Projeto desenvolvido por Nexum Tecnologia, com foco em:

Experiência premium

Design moderno

Interação fluida

Código limpo e escalável
