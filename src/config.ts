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
    description: 'Planejamento do rosto como um sistema — não como soma de procedimentos.',
  },
  {
    name: 'Toxina Botulínica',
    description: 'Relaxamento muscular preciso. O objetivo é leveza, não imobilidade.',
  },
  {
    name: 'Preenchimento Labial',
    description: 'Volume com proporção. O lábio acompanha o rosto, não o invade.',
  },
  {
    name: 'Bioestimuladores de Colágeno',
    description: 'O corpo produz o que precisa. A técnica apenas ativa o processo.',
  },
  {
    name: 'Rinomodelação',
    description: 'Refinamento sem cirurgia. Pequenas correções com impacto visual significativo.',
  },
  {
    name: 'Skinbooster',
    description: 'Hidratação profunda que muda a qualidade da pele, não apenas a aparência.',
  },
  {
    name: 'Contorno Facial',
    description: 'Definição de ângulos e estrutura. O rosto ganha presença.',
  },
  {
    name: 'Rejuvenescimento Facial',
    description: 'Protocolo combinado para restaurar leveza — sem apagar a identidade.',
  },
] as const;

export const METHOD_STEPS = [
  {
    number: '01',
    title: 'Leitura Facial',
    description:
      'Antes de qualquer decisão, o rosto é analisado como um todo: estrutura óssea, volume, proporção e o que o envelhecimento fez — ou ainda não fez.',
  },
  {
    number: '02',
    title: 'Planejamento',
    description:
      'Cada plano é construído para aquele rosto específico. Não existe protocolo padrão. Existe raciocínio.',
  },
  {
    number: '03',
    title: 'Aplicação',
    description:
      'A técnica serve ao planejamento. Não ao contrário. A execução é precisa porque o que vem antes dela é preciso.',
  },
  {
    number: '04',
    title: 'Acompanhamento',
    description:
      'O resultado evolui. O acompanhamento garante que essa evolução esteja alinhada ao que foi planejado — e ao que a paciente queria.',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Ana Carolina M.',
    text: 'Fui com medo de sair diferente. Saí parecendo eu mesma — só mais descansada. Ninguém soube dizer o que eu fiz, mas todos notaram.',
    stars: 5,
  },
  {
    name: 'Fernanda S.',
    text: 'O que me surpreendeu foi a consulta. Ela avaliou tudo antes de propor qualquer coisa. Me senti respeitada desde o início.',
    stars: 5,
  },
  {
    name: 'Renata L.',
    text: 'Já fiz harmonização em outro lugar. Não é a mesma coisa. Aqui existe um raciocínio por trás de cada decisão.',
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
