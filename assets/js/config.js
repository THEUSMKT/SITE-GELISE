// Confirmed business data. No keys, trackers or credentials belong in this file.
export const site = {
  brand: 'Cantinho VIP — Estética e Beleza',
  professional: 'Gelise Beck Ferreira',
  whatsapp: '5551986552232',
  telephone: '+5551986552232',
  address: 'Avenida Mariluz, 630 — Imbé/RS',
  services: {
    cabelos: 'cabelos',
    unhas: 'unhas',
    olhar: 'design de sobrancelhas e extensão de cílios',
    beleza: 'maquiagem e penteados',
    depilacao: 'depilação',
  },
  courses: {
    depilacao: 'depilação',
    cilios: 'extensão de cílios / lash design',
    nail: 'nail design',
    manicure: 'manicure e pedicure',
    maquiagem: 'maquiagem',
  },
  portfolioCategories: ['Cabelos', 'Unhas', 'Olhar', 'Maquiagens e penteados'],
  // Add only real, authorized photographs of finished work. See README.
  // { image: 'assets/images/trabalho.webp', alt: 'Descrição da foto',
  //   category: 'Unhas', caption: 'Legenda factual', width: 800, height: 1000 }
  portfolio: [],
};

export function whatsappUrl(kind = 'general', topic) {
  const messages = {
    general: 'Olá, Gelise! Vim pelo seu site e gostaria de informações sobre os atendimentos.',
    service: `Olá, Gelise! Vim pelo seu site e gostaria de saber mais sobre ${site.services[topic]} e consultar a disponibilidade.`,
    course: `Olá, Gelise! Tenho interesse no curso de ${site.courses[topic]}. Pode me passar mais informações?`,
    princess: 'Olá, Gelise! Gostaria de conhecer os detalhes do Dia de Princesa completo.',
  };
  if (!(kind in messages) || (kind === 'service' && !(topic in site.services)) || (kind === 'course' && !(topic in site.courses))) {
    throw new Error(`Unknown WhatsApp context: ${kind}/${topic}`);
  }
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(messages[kind])}`;
}
