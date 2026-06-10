export const SITE = {
  name: 'Jamilly Karla Centro de Estética e Saúde',
  doctorName: 'Dra. Jamilly Karla',
  specialty: 'Especialista em Harmonização Facial',
  method: 'Método FullFaceJK®',
  whatsapp: '5583993548045',
  whatsappMessage: 'Olá, Dra. Jamilly. Vim pelo site e gostaria de agendar uma avaliação.',
  instagram: 'https://www.instagram.com/dra.jamillykarla_/',
  instagramHandle: '@dra.jamillykarla_',
  googleReviews: 'https://share.google/4UP5DkWNe9wqUc1mk',
  canonicalUrl: 'https://jamilly.arckosia.com.br',
} as const;

export const LOCATIONS = [
  {
    city: 'Santa Rita',
    state: 'PB',
    address: 'R. Sen. Adalberto Ribeiro, 2 - Tibiri',
    fullAddress: 'R. Sen. Adalberto Ribeiro, 2 - Tibiri, Santa Rita - PB, 58304-500',
    postalCode: '58304-500',
    mapsUrl: 'https://maps.google.com/?q=R.+Sen.+Adalberto+Ribeiro,+2,+Tibiri,+Santa+Rita,+PB',
  },
  {
    city: 'João Pessoa',
    state: 'PB',
    address: 'João Pessoa, PB',
    fullAddress: 'João Pessoa, PB',
    postalCode: '',
    mapsUrl: 'https://maps.google.com/?q=João+Pessoa,+PB',
  },
] as const;

export const SEO = {
  // Título da aba e indexação Google — rico em keywords
  title: 'Dra. Jamilly Karla | Harmonização Facial em João Pessoa e Santa Rita',
  // Meta description para SERPs
  description:
    'Método FullFaceJK®: planejamento facial personalizado com a Dra. Jamilly Karla. Harmonização facial, rejuvenescimento e estética avançada em João Pessoa e Santa Rita, PB.',
  // og:title — copy de impacto para WhatsApp, Instagram, LinkedIn, iMessage
  ogTitle: 'Dra. Jamilly Karla | Um rosto que parece descansado, não alterado.',
  // og:description — complementa a imagem no preview social
  ogDescription:
    'Planejamento facial personalizado com o Método FullFaceJK®. Resultado discreto que valoriza seus traços — João Pessoa e Santa Rita, PB.',
  keywords:
    'harmonização facial João Pessoa, harmonização facial Santa Rita, preenchimento labial João Pessoa, bioestimulador de colágeno João Pessoa, rinomodelação João Pessoa, Dra Jamilly Karla, FullFaceJK, toxina botulínica João Pessoa, skinbooster João Pessoa, estética avançada PB',
  ogImage: '/images/og-image.jpg',
} as const;

export const PROCEDURES = [
  {
    name: 'Harmonização Facial',
    description: 'Planejamento completo para equilíbrio e proporção dos traços faciais.',
  },
  {
    name: 'Toxina Botulínica',
    description: 'Suavização de rugas e linhas de expressão com resultado natural.',
  },
  {
    name: 'Preenchimento Labial',
    description: 'Definição e volume labial com técnicas de alta precisão.',
  },
  {
    name: 'Bioestimuladores de Colágeno',
    description: 'Rejuvenescimento profundo com estimulação natural de colágeno.',
  },
  {
    name: 'Rinomodelação',
    description: 'Correção e refinamento do nariz sem cirurgia.',
  },
  {
    name: 'Skinbooster',
    description: 'Hidratação profunda e melhora da textura e luminosidade da pele.',
  },
  {
    name: 'Contorno Facial',
    description: 'Definição e remodelação do contorno do rosto com precisão.',
  },
  {
    name: 'Rejuvenescimento Facial',
    description: 'Protocolo combinado para restaurar leveza e vitalidade ao rosto.',
  },
] as const;

export const METHOD_STEPS = [
  {
    number: '01',
    title: 'Diagnóstico Facial',
    description:
      'Análise completa da estrutura, proporção e envelhecimento individuais antes de qualquer decisão.',
  },
  {
    number: '02',
    title: 'Planejamento Individual',
    description:
      'Construção de um plano personalizado, considerando identidade, harmonia e objetivos da paciente.',
  },
  {
    number: '03',
    title: 'Execução com Precisão',
    description:
      'Aplicação técnica com foco em naturalidade, segurança e resultados compatíveis com cada rosto.',
  },
  {
    number: '04',
    title: 'Acompanhamento',
    description:
      'Acompanhamento contínuo dos resultados para garantir evolução e durabilidade do planejamento.',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Ana Carolina M.',
    text: 'Resultado incrível. A Jamilly tem um olhar artístico único. Me sinto mais bonita e natural do que nunca.',
    stars: 5,
  },
  {
    name: 'Fernanda S.',
    text: 'Profissional excepcional. Avaliou cada detalhe antes de qualquer procedimento. Confiança total.',
    stars: 5,
  },
  {
    name: 'Renata L.',
    text: 'O planejamento facial foi a melhor decisão que tomei. Resultados naturais e duradouros.',
    stars: 5,
  },
] as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

/**
 * Agendamento via Cal.com + Google Calendar + n8n
 *
 * Preencher quando a cliente configurar:
 *   1. Criar conta gratuita em cal.com
 *   2. Conectar Google Calendar da Jamilly
 *   3. Criar event type "avaliacao-facial" (30 min, disponibilidade real)
 *   4. Ativar webhook: Settings → Developer → Webhooks → POST para URL do n8n
 *   5. Preencher calComUsername e n8nWebhookUrl abaixo
 *
 * Enquanto vazio → botões de agendamento redirecionam ao WhatsApp (comportamento atual)
 */
export const BOOKING = {
  calComUsername: '',          // ex: 'jamillykarla'
  calComEventSlug: 'avaliacao-facial',
  n8nWebhookUrl: '',           // ex: 'https://n8n.seudominio.com/webhook/agendamento'
  calBrandColor: '#b08a3c',
} as const;
