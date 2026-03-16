# Gaviao Frutas - Front-end Nuxt

Este front-end esta em `apps/web` usando **Nuxt 4 + Vue 3**.

## Como rodar local

```bash
cd apps/web
yarn install
yarn dev --host 0.0.0.0 --port 3000
```

Abrir: `http://localhost:3000`

## Variaveis de ambiente

```bash
NUXT_PUBLIC_SITE_URL=https://gaviaofrutas.com.br
NUXT_CATALOG_API_BASE=http://localhost:3001
```

O browser fala apenas com `/api/*` do proprio Nuxt. O Nuxt server faz o proxy para o backend/catalogo usando `NUXT_CATALOG_API_BASE`.

## Estrutura (padrao atual)

```txt
app/
  app.vue                    # entrada principal (NuxtLayout + NuxtPage)
  layouts/
    default.vue              # layout base global
  pages/
    index.vue                # pagina Home (compoe os blocos)
  components/
    common/
      AppLogo.vue            # logo responsiva
    layout/
      SiteHeader.vue         # cabecalho/menu/busca
    home/
      HeroSection.vue        # secao principal
      CategoriesSection.vue  # cards de categorias
      ProductShowcase.vue    # vitrine + carrinho lateral
      BenefitsSection.vue    # blocos de beneficios
      OffersSection.vue      # cards de ofertas
  data/
    site.ts                  # conteudo institucional fixo (menu, highlights, beneficios)
  types/
    home.ts                  # tipagem dos dados
  composables/
    useTheme.ts              # alternancia de tema light/dark com persistencia
  utils/
    format.ts                # funcoes utilitarias (ex: moeda)
  assets/
    css/main.css             # estilos globais e variaveis

public/
  imgs/                      # imagens legadas da interface
  images/                    # imagens referenciadas pelo catalogo vindo do banco
```

## Regras praticas para editar

- Trocar menu/highlights/beneficios fixos: `app/data/site.ts`
- Trocar catalogo/ofertas/anuncios: PostgreSQL + seed inicial em `src/data/public-catalog-seed.ts`
- Ajustar visual de uma secao: componente da secao em `app/components/...`
- Ajustar regra global (fonte, reset, variaveis): `app/assets/css/main.css`
- Paleta light/dark: `app/assets/css/main.css` e `app/composables/useTheme.ts`
- Adicionar nova pagina: `app/pages/nome.vue`

## Build

```bash
yarn build
yarn preview
```

Observacao: nao precisa buildar a cada alteracao local; use `yarn dev` para iterar rapido.
