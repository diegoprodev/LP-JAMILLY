# Pendências — LP Jamilly Karla

Itens a implementar quando a cliente adquirir domínio/serviços.

---

## 0. Sistema de Agendamento Online (Cal.com + Google Calendar + n8n + WhatsApp)

A estrutura já está implementada no código. Os botões "Agendar Avaliação" já estão preparados
para abrir o modal do Cal.com assim que `BOOKING.calComUsername` for preenchido em `src/config.ts`.
Enquanto vazio → redirecionam ao WhatsApp (comportamento atual, sem regressão).

### Arquitetura

```
Usuária clica "Agendar Avaliação"
        ↓
  Modal Cal.com (embed)
  mostra disponibilidade real do Google Calendar da Jamilly
        ↓
  Usuária escolhe horário e preenche nome + telefone
        ↓
  Cal.com cria evento no Google Calendar da Jamilly
        ↓
  Cal.com dispara webhook → n8n (Hostinger)
        ↓
  n8n envia mensagem WhatsApp de confirmação para a paciente
  (via Evolution API ou WAHA — já rodando ou a configurar)
        ↓
  Jamilly recebe notificação no Google Calendar + WhatsApp próprio
```

### Passos de ativação

**1. Cal.com (gratuito)**
- [ ] Criar conta em [cal.com](https://cal.com) com email da Jamilly
- [ ] Conectar Google Calendar: `Settings → Calendars → Google Calendar`
  → Cal.com lerá a disponibilidade real e criará eventos direto na agenda dela
- [ ] Criar event type: nome `Avaliação Facial`, slug `avaliacao-facial`, duração 30 min
  → Configurar horários disponíveis, buffer entre consultas, limite por dia
- [ ] Ativar webhook: `Settings → Developer → Webhooks → New Webhook`
  → URL: `https://SEU-N8N.hostinger.com/webhook/agendamento-calcom`
  → Eventos: `BOOKING_CREATED`, `BOOKING_CANCELLED`, `BOOKING_RESCHEDULED`
- [ ] Preencher `BOOKING.calComUsername` em `src/config.ts` (ex: `'jamillykarla'`)
- [ ] Fazer build e deploy → botões já funcionam como modal

**2. n8n (Hostinger) — Fluxo 1: Confirmação imediata**

Importar o workflow abaixo (arquivo `n8n-flows/agendamento-confirmacao.json` — ver seção N8N_FLOWS):
```
Webhook (POST /agendamento-calcom)
  → IF: payload.triggerEvent === "BOOKING_CREATED"
      → Set: montar mensagem de confirmação com nome, data, hora
      → HTTP Request (Evolution API ou WAHA): enviar WhatsApp para payload.attendees[0].phone
  → IF: payload.triggerEvent === "BOOKING_CANCELLED"
      → HTTP Request: enviar WhatsApp "Seu agendamento foi cancelado..."
  → IF: payload.triggerEvent === "BOOKING_RESCHEDULED"
      → HTTP Request: enviar WhatsApp "Seu agendamento foi remarcado para..."
```

**3. n8n — Fluxo 2: Lembrete 24h antes**
```
Cron (todo dia às 10h)
  → Google Calendar: listar eventos de amanhã
  → Loop: para cada evento
      → HTTP Request (WhatsApp): "Olá {nome}! Lembrando que sua avaliação..."
```

**4. Preencher config final**
```ts
// src/config.ts — BOOKING object
calComUsername: 'jamillykarla',        // slug da URL do Cal.com
n8nWebhookUrl: 'https://n8n.xxx.com/webhook/agendamento-calcom',
```

### WhatsApp — opções (escolher uma)

| Opção | Custo | Complexidade | Risco de ban |
|---|---|---|---|
| **Evolution API** (self-hosted) | Grátis | Média | Médio (WhatsApp não-oficial) |
| **WAHA** (Docker Hostinger) | Grátis | Média | Médio |
| **WhatsApp Business Cloud API** (Meta oficial) | Grátis até 1k msgs/mês | Alta (verificação Meta) | Nenhum |
| **Z-API / WPPConnect** (SaaS BR) | ~R$30/mês | Baixa | Baixo |

Recomendação: **Evolution API** se já tiver instalado no Hostinger; **Z-API** se quiser zero infraestrutura.

---

## 1. Domínio e DNS

- [ ] Registrar `jamillykarla.com.br` (ou similar) no Registro.br
- [ ] No Cloudflare Pages: adicionar domínio customizado em **Settings → Custom domains**
- [ ] Criar registro CNAME no DNS: `@` → `jamilly.arckosia.com.br` (ou o CNAME gerado pelo CF Pages)
- [ ] Aguardar propagação DNS (até 24–48h)
- [ ] Após propagação: atualizar `canonicalUrl` em `src/config.ts` para o novo domínio
- [ ] Atualizar `site` em `astro.config.mjs`
- [ ] Atualizar `<loc>` no `public/sitemap.xml`
- [ ] Atualizar URL do canonical e OG tags (já automático via `config.ts`)
- [ ] SSL automático pelo Cloudflare — apenas confirmar após DNS estar ativo

---

## 2. Google Search Console

- [ ] Acessar [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Adicionar propriedade do novo domínio
- [ ] Verificar propriedade via DNS TXT (recomendado) ou HTML tag
- [ ] Submeter sitemap: `https://seudominio.com.br/sitemap.xml`
- [ ] Aguardar indexação (3–7 dias normalmente)

---

## 3. Rastreamento e Analytics

- [ ] Criar conta no Google Analytics 4 (GA4) e obter **Measurement ID** (`G-XXXXXXXX`)
- [ ] Criar conta no Meta Ads e obter **Pixel ID** (para campanhas Instagram/Facebook)
- [ ] Inserir GA4 no `BaseLayout.astro`:
  ```html
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXX');
  </script>
  ```
- [ ] Inserir Meta Pixel no `BaseLayout.astro` (snippet padrão da Meta)
- [ ] Configurar evento de conversão: clique no botão WhatsApp

---

## 4. Imagem OG Real (Open Graph)

- [ ] Criar imagem `og-image.jpg` (1200×630 px) com:
  - Logo da clínica centralizada
  - Nome "Dra. Jamilly Karla" em tipografia da marca
  - Fundo escuro ou dourado com textura sutil
  - Subtítulo: "Harmonização Facial · João Pessoa e Santa Rita"
- [ ] Salvar em `public/images/og-image.jpg`
- [ ] Atualizar `BaseLayout.astro`: trocar `og-image.svg` → `og-image.jpg`
- [ ] Testar em [opengraph.xyz](https://opengraph.xyz) ou Facebook Debugger

---

## 5. Depoimentos Reais de Pacientes

- [ ] Coletar 3–6 depoimentos reais de pacientes (autorização por escrito)
- [ ] Substituir depoimentos fictícios em `src/config.ts` → array `TESTIMONIALS`
- [ ] Opcionalmente: adicionar foto da paciente (com permissão)
- [ ] Considerar embed do Google Reviews em vez de depoimentos estáticos

---

## 6. Endereço Completo João Pessoa

- [ ] Obter endereço completo da unidade de João Pessoa (rua, número, bairro, CEP)
- [ ] Atualizar em `src/config.ts` → `LOCATIONS[1]`:
  ```ts
  {
    city: 'João Pessoa',
    address: 'Rua XXXXX, NNN - Bairro',
    fullAddress: 'Rua XXXXX, NNN - Bairro, João Pessoa - PB, XXXXX-XXX',
    postalCode: 'XXXXX-XXX',
    mapsUrl: 'https://maps.google.com/?q=...',
  }
  ```
- [ ] Atualizar Schema.org `address` em `BaseLayout.astro` (segundo endereço)
- [ ] Atualizar mapa/link no componente `Localizacao.astro` (se houver)

---

## 7. Mini-site de Links (Link Tree)

- [ ] Criar `src/pages/links.astro` com mesma identidade visual da LP
- [ ] Links a incluir:
  - WhatsApp (agendamento)
  - Site principal (LP)
  - Localização Santa Rita (Google Maps)
  - Localização João Pessoa (Google Maps)
  - Google Reviews (avaliar / ver avaliações)
  - Instagram `@dra.jamillykarla_`
- [ ] Deploy automático junto com a LP no mesmo CF Pages
- [ ] URL: `jamillykarla.com.br/links` (ou subdomínio `links.jamillykarla.com.br`)

---

## 8. Cloudflare Pages — Configurações de Build

| Campo | Valor |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 20.x |
| Environment variable | `NODE_VERSION = 20` |

---

## 9. Outros

- [ ] Criar `public/robots.txt` apontando para o sitemap do domínio definitivo
- [ ] Adicionar `apple-touch-icon.png` (180×180 px) para iOS — atualmente ausente
- [ ] Revisar copy de depoimentos e CTAs com a cliente após ela ver a página ao vivo
- [ ] Verificar Google My Business: garantir que URL do site está apontando para o novo domínio
