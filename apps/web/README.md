# Gaviao Frutas - Front-end Nuxt

Este front-end esta em `apps/web` usando **Nuxt 4 + Vue 3**.

## Como rodar local

```bash
cd apps/web
yarn install
yarn dev --host 0.0.0.0 --port 3000
```

Abrir: `http://localhost:3000`

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
    home.ts                  # conteudo da home (menu, produtos, ofertas, etc)
  types/
    home.ts                  # tipagem dos dados
  composables/
    useTheme.ts              # alternancia de tema light/dark com persistencia
  utils/
    format.ts                # funcoes utilitarias (ex: moeda)
  assets/
    css/main.css             # estilos globais e variaveis

public/
  imgs/                      # imagens estaticas da interface
```

## Regras praticas para editar

- Trocar textos/produtos/categorias: `app/data/home.ts`
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
