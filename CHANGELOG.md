# Changelog — LP Jamilly Karla

Todos os commits relevantes do projeto, em ordem cronológica inversa.

---

## [Sprint 3] — 2026-06-10 · `1dda124`

### Logo & Navbar
- Logo sempre exibida na **cor original dourada** — removidos todos os filtros de inversão
- **Glass pill** (fundo branco semitransparente + backdrop-filter blur) no estado escuro da navbar — logo legível sobre qualquer seção
- Altura da logo: 44px → **64px** (dobrou), texto "Jamilly Karla / Centro de Estética e Saúde" agora visível
- `nav-cta` (botão "Agendar Avaliação" da navbar) convertido para **sólido dourado** com shimmer permanente

### Shimmer (botões)
- Opacidade do shimmer: 0.24 → **0.46** (muito mais visível)
- Duração: 3.2s → **2.4s** (mais frequente)
- Gradiente mais largo: `15%–85%` vs `0%–100%` anterior
- Shimmer adicionado ao botão da navbar (`nav-cta`) além do `btn-primary`

### Watermark Hero (logo-design.png)
- Posicionamento: `bottom-right` → **centro vertical direito** (`top: 50%; transform: translateY(-50%)`)
- Tamanho: 480px → **540px**
- Tom dourado: cadeia de filtros `sepia(0.9) saturate(3) hue-rotate(6deg) brightness(1.05)` sobre base white-inverted
- Opacidade: 0.05 → **0.09**

### Seção "Sobre" (Autoridade)
- Overline: "Quem é a Dra. Jamilly Karla" → **"Médica, mãe e apaixonada pelo que faz"**
- Copy humanizado: menciona que é mãe, aprecia vinhos, frequenta cafés e restaurantes, cuida do corpo e da mente
- Adicionado segundo parágrafo emocional: "revelar o que já existe em você"

### Watermark FAQ
- `logo-design.png` adicionado na lateral esquerda da seção FAQ
- `mix-blend-mode: multiply` — fundo branco do PNG desaparece, apenas o dourado aparece
- Opacity: 0.13 — sutil e estratégico

### SEO / BaseLayout
- Corrigidos links de favicon quebrados (`favicon-96x96.png`, `apple-touch-icon.png` não existiam)
- Criado `og-image.svg` (1200×630) com identidade da marca para previews em redes sociais
- `og:image` e `twitter:image` atualizados para path funcional

---

## [Sprint 2] — 2026-06-09 · `bd7073e`

### Carousel (Resultados)
- Grid 2×2 substituído por **carousel de fade automático** a cada 4 segundos
- Transição crossfade suave (opacity 0.85s ease)
- **Dot indicators** dourados (4 bolinhas, ativa escala 1.4×)
- Clique nos dots pausa e retoma o timer
- Hover no carousel pausa automaticamente

### Navbar Dark/Light por seção
- `IntersectionObserver` monitora seções com `data-theme="dark"` (`#hero`, `#procedimentos`, `#localizacao`, `#cta-final`)
- Quando em seção escura + scrolled → classe `on-dark` → navbar escura opaca
- Quando em seção clara + scrolled → navbar branca normal
- Elimina o problema do navbar branco sobre fundos pretos

### Números do Método (animação)
- Números 01–04 partem quase invisíveis (`rgba gold, opacity 0.08`)
- IntersectionObserver por `.step` → adiciona `.number-colored` ao entrar no viewport
- Transição suave: `color 0.9s ease` → dourado `#b08a3c`

### Watermarks decorativos
- `logo-design.png` inserido no **Hero** (canto direito, ghost sutil, opacity 0.05)
- `logo-design.png` inserido no **CTA Final** (centrado, opacity 0.06)
- Ambos com `filter: brightness(0) invert(1)` para silhueta branca sobre fundo escuro

### Fix técnico
- `astro.config.mjs`: Vite alias `'@' → path.resolve('./src')`
- `tsconfig.json`: removido `baseUrl`, paths atualizado para `"./src/*"`
- `typescript` instalado como dev dependency (v6.0.3) para o language server do VSCode

---

## [Sprint 1] — 2026-06-09 · `34ad5cc`

### Build inicial — página completa

**Estrutura & Stack**
- Astro v6 (output estático) + Tailwind CSS v4 via `@tailwindcss/vite`
- TypeScript strict mode
- Tokens de design em `@theme` no `global.css`

**Seções implementadas** (em ordem na página):
1. **Header** — fixed, transparente no hero → branco ao scroll (threshold 40px)
2. **Hero** — foto `JAMILLY1.webp` com degradê lateral premium, radial-gradient warm near-black, dois CTAs
3. **Autoridade** — foto + credenciais em grid 2×2
4. **Método** — 4 passos do FullFaceJK® em grid 2×2
5. **Procedimentos** — 8 cards com ícones SVG únicos por procedimento
6. **Resultados** — galeria com disclaimer CFM 2336/2023
7. **Depoimentos** — 3 cards com avaliações reais
8. **Localização** — 2 consultórios (Santa Rita + João Pessoa)
9. **CTA Final** — dark, borda dourada, call to action principal
10. **Footer** — links, logo, redes sociais
11. **WhatsApp** — botão fixo (sempre mobile, desktop após hero sair do viewport)
12. **Cookie Banner** — LGPD com localStorage

**SEO**
- Schema.org JSON-LD: `LocalBusiness + HealthAndBeautyBusiness`
- Meta title, description, keywords, canonical
- Open Graph + Twitter Card
- `robots.txt` + `sitemap.xml`
- `_headers` Cloudflare: security headers + cache imutável em assets

**Performance**
- Hero image: `loading="eager" fetchpriority="high"`
- Todas demais imagens: `loading="lazy"`
- Fontes: Google Fonts com `preconnect` + `display=swap`
- IntersectionObserver para scroll animations (zero scroll event listeners)
- CSS animations em `transform + opacity` (GPU-composited)
- Bundle final: CSS 38KB, HTML 54KB, zero JS externo

**Acessibilidade**
- Skip link para conteúdo principal
- `role`, `aria-label`, `aria-expanded` em todos os interativos
- FAQ accordion com `aria-controls` e `aria-expanded`
- Contraste dourado WCAG AA em textos

---

## Pendências conhecidas (pós-deploy)

| Item | Status |
|---|---|
| Endereço completo João Pessoa | Aguardando informação da Dra. Jamilly |
| og-image.jpg definitivo (fotográfico) | SVG funcional criado; JPG premium é upgrade futuro |
| Conectar Cloudflare Pages ao repo | Fazer no dashboard pages.cloudflare.com |
| Domínio jamillykarla.com.br | Adquirir + apontar DNS para Cloudflare Pages |
| Google Search Console | Verificar após domínio conectado |
| Fotos de resultados adicionais | Inserir em `public/images/` quando disponíveis |
