import type {
  AnnouncementItem,
  BenefitItem,
  CategoryItem,
  NavItem,
  OfferItem,
  ProductItem,
  StoreInfo,
} from "~/types/home";

export const menuItems: NavItem[] = [
  { label: "Inicio", href: "#" },
  { label: "Produtos", href: "#produtos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Frigorifico", href: "#frigorifico" },
  { label: "Contatos", href: "#contatos" },
];

export const heroHighlights: string[] = [
  "Produtos frescos",
  "Alimentos diversos",
  "Retirada rapida",
];

export const categories: CategoryItem[] = [
  { id: "frutas", name: "Frutas", image: "/imgs/products/maca.webp" },
  { id: "verduras", name: "Verduras", image: "/imgs/products/alface.webp" },
  { id: "alimentos", name: "Alimentos", image: "/imgs/products/tomate.webp" },
  { id: "bebidas", name: "Bebidas", image: "/imgs/products/maracuja.webp" },
];

export const products: ProductItem[] = [
  {
    id: "banana-prata",
    name: "Banana Prata",
    unit: "kg",
    price: 4.99,
    image: "/imgs/products/banana.webp",
    rating: 5,
  },
  {
    id: "maca-fuji",
    name: "Maca Fuji",
    unit: "kg",
    price: 8.9,
    image: "/imgs/products/maca.webp",
    rating: 5,
  },
  {
    id: "alface",
    name: "Alface",
    unit: "un",
    price: 2.99,
    image: "/imgs/products/alface.webp",
    rating: 5,
  },
  {
    id: "tomate",
    name: "Tomate",
    unit: "kg",
    price: 5.49,
    image: "/imgs/products/tomate.webp",
    rating: 5,
  },
  {
    id: "abacaxi",
    name: "Abacaxi",
    unit: "un",
    price: 7.5,
    image: "/imgs/products/abacaxi.webp",
    rating: 5,
  },
  {
    id: "maracuja",
    name: "Maracuja",
    unit: "kg",
    price: 6.49,
    image: "/imgs/products/maracuja.webp",
    rating: 4,
  },
];

export const benefits: BenefitItem[] = [
  {
    id: "frete",
    title: "Frete gratis",
    description: "Pedidos acima de R$ 50 com retirada agendada.",
  },
  {
    id: "frescos",
    title: "Produtos frescos",
    description: "Selecionados diariamente para qualidade maxima.",
  },
  {
    id: "pagamento",
    title: "Pagamento seguro",
    description: "PIX, cartao ou dinheiro na retirada.",
  },
  {
    id: "suporte",
    title: "Suporte rapido",
    description: "Atendimento ativo no Instagram e WhatsApp.",
  },
];

export const offers: OfferItem[] = [
  {
    id: "oferta-dia",
    title: "Ofertas do dia",
    description: "Promocoes relampago para retirada hoje.",
    cta: "Ver ofertas",
    image: "/imgs/products/banana.webp",
  },
  {
    id: "oferta-frigorifico",
    title: "Frigorifico",
    description: "Cortes selecionados com preco especial.",
    cta: "Conferir",
    image: "/imgs/products/tomate.webp",
  },
  {
    id: "oferta-bebidas",
    title: "Bebidas geladas",
    description: "Linhas populares para seu fim de semana.",
    cta: "Ver bebidas",
    image: "/imgs/products/maracuja.webp",
  },
];

export const announcements: AnnouncementItem[] = [
  {
    id: "retirada-rapida",
    tag: "Anuncio",
    title: "Retire hoje na loja",
    description: "Peça no WhatsApp e retire rapido com Gaviao Frutas.",
    image: "/imgs/products/abacaxi.webp",
    ctaLabel: "Tracar rota",
    ctaType: "maps",
    isActive: true,
    priority: 100,
    weight: 3,
    durationMs: 7000,
    closedVariant: {
      tag: "Retirada agendada",
      title: "Agende agora e retire na abertura",
      description: "Loja fechada no momento. Chame no WhatsApp e deixe seu pedido reservado.",
      ctaLabel: "Agendar no WhatsApp",
      ctaType: "whatsapp",
    },
  },
  {
    id: "hortifruti-fresco",
    tag: "Selecao fresca",
    title: "Frutas e verduras frescas todos os dias",
    description: "Atendimento local com selecao diaria para sua semana.",
    image: "/imgs/products/alface.webp",
    ctaLabel: "Chamar no WhatsApp",
    ctaType: "whatsapp",
    isActive: true,
    priority: 90,
    weight: 2,
    durationMs: 6500,
  },
  {
    id: "google-maps",
    tag: "Google Maps",
    title: "Chegue facil ate Gaviao Frutas",
    description: "Abra o mapa e veja a rota mais rapida ate a loja.",
    image: "/imgs/products/maca.webp",
    ctaLabel: "Abrir mapa",
    ctaType: "maps",
    isActive: true,
    priority: 85,
    weight: 2,
    durationMs: 6000,
  },
  {
    id: "catalogo-social",
    tag: "Redes sociais",
    title: "Confira novidades no catalogo",
    description: "Veja os produtos e combine sua retirada pelo WhatsApp.",
    image: "/imgs/products/banana.webp",
    ctaLabel: "Ver produtos",
    ctaType: "catalog",
    isActive: true,
    priority: 80,
    weight: 1,
    durationMs: 6500,
  },
];

export const store: StoreInfo = {
  name: "Gaviao Frutas",
  cityState: "Santa Luzia do Norte - AL",
  address: "R. Benedito Mascarenhas, 62 - Santa Luzia do Norte - AL",
  phone: "5582998763021",
  mapQuery: "Gaviao Frutas Santa Luzia do Norte AL",
  latitude: -9.601911,
  longitude: -35.823743,
  timeZone: "America/Maceio",
  hours: [
    { day: 0, open: "07:00", close: "13:00" },
    { day: 1, open: "07:00", close: "19:00" },
    { day: 2, open: "07:00", close: "19:00" },
    { day: 3, open: "07:00", close: "19:00" },
    { day: 4, open: "07:00", close: "19:00" },
    { day: 5, open: "07:00", close: "19:00" },
    { day: 6, open: "07:00", close: "16:00" },
  ],
};
