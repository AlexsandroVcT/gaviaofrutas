import type {
  BenefitItem,
  CategoryItem,
  NavItem,
  OfferItem,
  ProductItem,
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
