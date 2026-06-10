/**
 * Gera public/og-image.jpg (1200×630) automaticamente durante o build.
 * Composição: fundo escuro + foto da Jamilly + gradiente fade + texto SVG + logo
 * Executado via "prebuild" no package.json.
 */

import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, '..');

const W = 1200;
const H = 630;
const PHOTO_X = 480;   // foto começa aqui (x)
const PHOTO_W = W - PHOTO_X; // 720px

async function main() {
  const photoPath = resolve(ROOT, 'public/images/JAMILLY1.webp');
  const logoPath  = resolve(ROOT, 'public/images/logo-jamilly.png');

  if (!existsSync(photoPath)) {
    console.warn('⚠  JAMILLY1.webp não encontrado — og-image.jpg não gerada');
    return;
  }

  // ── 1. Foto: redimensiona para preencher painel direito ───────────────────
  const photo = await sharp(photoPath)
    .resize({ width: PHOTO_W, height: H, fit: 'cover', position: 'top' })
    .toBuffer();

  // ── 2. Gradiente de fade (sobre a esquerda da foto) ───────────────────────
  const fadeSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#0b0906" stop-opacity="1"/>
          <stop offset="55%"  stop-color="#0b0906" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${PHOTO_W}" height="${H}" fill="url(#g)"/>
    </svg>`
  );

  // ── 3. Logo (redimensiona para 185px de largura) ──────────────────────────
  let logoComposite = null;
  if (existsSync(logoPath)) {
    const logoBuffer = await sharp(logoPath)
      .resize({ width: 185, fit: 'inside' })
      .toBuffer({ resolveWithObject: true });
    logoComposite = { input: logoBuffer.data, left: 58, top: 38 };
  }

  // ── 4. SVG de texto (camada sobre tudo) ──────────────────────────────────
  const textSvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">

      <!-- Linha dourada vertical esquerda -->
      <rect x="58" y="178" width="2" height="72" fill="#b08a3c" opacity="0.75"/>

      <!-- Overline dourada -->
      <text x="76" y="202"
        font-family="Georgia,'Times New Roman',serif"
        font-size="11.5" letter-spacing="3.8"
        fill="#b08a3c" opacity="0.85">HARMONIZAÇÃO FACIAL</text>
      <text x="76" y="224"
        font-family="Georgia,'Times New Roman',serif"
        font-size="11.5" letter-spacing="3.8"
        fill="#b08a3c" opacity="0.75">JOÃO PESSOA · SANTA RITA, PB</text>

      <!-- Nome principal — 2 linhas -->
      <text x="58" y="316"
        font-family="Georgia,'Times New Roman',serif"
        font-size="58" font-weight="300"
        fill="rgba(255,255,255,0.94)">Dra. Jamilly</text>
      <text x="58" y="382"
        font-family="Georgia,'Times New Roman',serif"
        font-size="58" font-weight="300"
        fill="rgba(255,255,255,0.94)">Karla</text>

      <!-- Subtítulo em itálico -->
      <text x="60" y="432"
        font-family="Georgia,'Times New Roman',serif"
        font-size="22" font-style="italic"
        fill="rgba(255,255,255,0.38)">Método FullFaceJK®</text>

      <!-- Linha separadora dourada -->
      <rect x="58" y="462" width="72" height="1" fill="#b08a3c" opacity="0.5"/>

      <!-- Domínio no rodapé -->
      <text x="58" y="578"
        font-family="Georgia,serif"
        font-size="12" letter-spacing="1.5"
        fill="rgba(255,255,255,0.20)">jamilly.arckosia.com.br</text>

    </svg>`
  );

  // ── 5. Composição final ───────────────────────────────────────────────────
  const composites = [
    { input: photo,   left: PHOTO_X, top: 0 },
    { input: fadeSvg, left: PHOTO_X, top: 0 },
    { input: textSvg, left: 0,       top: 0 },
  ];
  if (logoComposite) composites.push(logoComposite);

  const result = await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 11, g: 9, b: 6 } }
  })
  .composite(composites)
  .jpeg({ quality: 90 })
  .toFile(resolve(ROOT, 'public/og-image.jpg'));

  const sizeKB = Math.round(result.size / 1024);
  console.log(`✓ og-image.jpg gerada: ${W}×${H}px — ${sizeKB}KB`);
}

main().catch(e => {
  console.error('✗ Erro ao gerar og-image.jpg:', e.message);
  process.exit(1);
});
