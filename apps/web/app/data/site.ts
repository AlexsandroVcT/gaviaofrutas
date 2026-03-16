import type { BenefitItem, NavItem } from '~/types/home';

export const menuItems: NavItem[] = [
  { label: 'Inicio', href: '#' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Ofertas', href: '#ofertas' },
  { label: 'Frigorifico', href: '#frigorifico' },
  { label: 'Contatos', href: '#contatos' },
];

export const heroHighlights = [
  'Produtos frescos',
  'Alimentos diversos',
  'Retirada rapida',
];

export const benefits: BenefitItem[] = [
  {
    id: 'frete',
    title: 'Frete gratis',
    description: 'Pedidos via WhatsApp com retirada agendada na loja.',
  },
  {
    id: 'frescos',
    title: 'Produtos frescos',
    description: 'Selecao constante para qualidade maxima na vitrine.',
  },
  {
    id: 'pagamento',
    title: 'Atendimento local',
    description: 'Catalogo publico automatizado com retirada rapida na loja.',
  },
  {
    id: 'suporte',
    title: 'Suporte rapido',
    description: 'Atendimento ativo no Instagram e WhatsApp.',
  },
];
