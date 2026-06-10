import React from 'react';
import { User, Syringe, Smile, Sparkles, Activity, Droplet, Focus, Sun } from 'lucide-react';

// Gold project token: #b08a3c (matches global CSS --color-gold)
const GOLD = '#b08a3c';
const GOLD_30 = 'rgba(176,138,60,0.3)';
const GOLD_40 = 'rgba(176,138,60,0.4)';
const GOLD_10 = 'rgba(176,138,60,0.1)';
const GOLD_15 = 'rgba(176,138,60,0.15)';
const GOLD_05 = 'rgba(176,138,60,0.05)';
const GOLD_80 = 'rgba(176,138,60,0.8)';

const ProcedureCard = ({ name, description, icon: Icon }) => (
  <div className="
    relative w-80 h-64 mx-4
    group/card cursor-pointer
    rounded-sm overflow-hidden
    border border-white/5 bg-white/[0.02] backdrop-blur-md
    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
    hover:bg-white/[0.04] hover:shadow-[0_15px_40px_-10px_rgba(176,138,60,0.15)]
  "
  style={{ '--hover-border': GOLD_30 }}
  onMouseEnter={e => e.currentTarget.style.borderColor = GOLD_30}
  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
  >
    {/* Feixe de luz dourado no topo — aparece no hover */}
    <div
      className="absolute top-0 left-0 w-full h-[1px] scale-x-0 opacity-0 group-hover/card:scale-x-100 group-hover/card:opacity-100 transition-all duration-1000 ease-out"
      style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }}
    />

    {/* Glow interno sutil */}
    <div
      className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition duration-700 pointer-events-none"
      style={{ background: `linear-gradient(to bottom, transparent, ${GOLD_05})` }}
    />

    {/* Ícone + título — desliza para cima no hover */}
    <div className="
      absolute inset-0 p-8 flex flex-col items-center justify-center
      transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      group-hover/card:-translate-y-8
    ">
      <div
        className="mb-6 p-4 rounded-full border border-white/10 bg-white/5 transition-all duration-700 group-hover/card:bg-[rgba(176,138,60,0.1)]"
        style={{ '--hover-border-icon': GOLD_40 }}
        onMouseEnter={e => e.currentTarget.style.borderColor = GOLD_40}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
      >
        <Icon
          strokeWidth={1}
          size={28}
          className="transition-all duration-700 group-hover/card:scale-110"
          style={{ color: GOLD_80 }}
        />
      </div>
      <h3
        className="text-xl text-center tracking-wide transition-colors duration-500"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'rgba(255,255,255,0.9)' }}
      >
        {name}
      </h3>
    </div>

    {/* Descrição — revela deslizando de baixo */}
    <div className="
      absolute bottom-0 left-0 w-full p-8 pt-0
      flex justify-center text-center
      translate-y-12 opacity-0
      transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75
      group-hover/card:translate-y-0 group-hover/card:opacity-100
    ">
      <p className="text-sm font-light text-slate-300 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
        {description}
      </p>
    </div>
  </div>
);

const MarqueeRibbon = ({ items, speed = '160s' }) => {
  const baseGroup = [...items, ...items, ...items, ...items];

  return (
    <div className="relative flex overflow-hidden w-full items-center py-12">
      <div
        className="flex items-center w-max"
        style={{ animation: `scrollLeft ${speed} linear infinite` }}
      >
        <div className="flex items-center">
          {baseGroup.map((proc, index) => (
            <ProcedureCard
              key={`block1-${proc.name}-${index}`}
              name={proc.name}
              description={proc.description}
              icon={proc.icon}
            />
          ))}
        </div>
        <div className="flex items-center">
          {baseGroup.map((proc, index) => (
            <ProcedureCard
              key={`block2-${proc.name}-${index}`}
              name={proc.name}
              description={proc.description}
              icon={proc.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ProceduresCarousel() {
  const procedures = [
    {
      name: 'Harmonização Facial',
      description: 'Planejamento completo para equilíbrio e proporção dos traços faciais.',
      icon: User,
    },
    {
      name: 'Toxina Botulínica',
      description: 'Suavização de rugas e linhas de expressão com resultado natural.',
      icon: Syringe,
    },
    {
      name: 'Preenchimento Labial',
      description: 'Definição e volume labial com técnicas de alta precisão.',
      icon: Smile,
    },
    {
      name: 'Bioestimuladores',
      description: 'Rejuvenescimento profundo com estimulação natural de colágeno.',
      icon: Sparkles,
    },
    {
      name: 'Rinomodelação',
      description: 'Correção e refinamento do nariz sem cirurgia com alta precisão.',
      icon: Activity,
    },
    {
      name: 'Skinbooster',
      description: 'Hidratação profunda e melhora da textura e luminosidade da pele.',
      icon: Droplet,
    },
    {
      name: 'Contorno Facial',
      description: 'Definição e remodelação do contorno do rosto para harmonia.',
      icon: Focus,
    },
    {
      name: 'Rejuvenescimento',
      description: 'Protocolo combinado para restaurar leveza e vitalidade ao rosto.',
      icon: Sun,
    },
  ];

  return (
    <section
      id="procedimentos"
      data-theme="dark"
      aria-label="Procedimentos realizados pela Dra. Jamilly Karla"
      className="relative overflow-x-hidden"
      style={{ background: '#050505' }}
    >
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Background sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(20,16,10,0.6) 0%, #050505 70%)' }}
      />

      <div className="relative z-10 w-full py-24 space-y-16">

        {/* Header */}
        <div className="text-center space-y-4 px-6">
          <p
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-semibold"
            style={{ fontFamily: "'Inter', sans-serif", color: GOLD }}
          >
            Especialidades
          </p>
          <h2
            className="text-3xl md:text-5xl font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'rgba(255,255,255,0.9)' }}
          >
            Procedimentos realizados
          </h2>
          {/* CFM disclaimer */}
          <p
            className="text-xs leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}
          >
            A indicação de cada procedimento depende de avaliação profissional individual.
          </p>
        </div>

        {/* Carrossel marquee */}
        <div className="group relative w-full flex items-center">
          {/* Máscaras laterais */}
          <div className="absolute top-0 left-0 w-32 md:w-64 h-full z-40 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
          <div className="absolute top-0 right-0 w-32 md:w-64 h-full z-40 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

          <MarqueeRibbon items={procedures} speed="160s" />
        </div>

      </div>
    </section>
  );
}
