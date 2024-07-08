const products = [
  {
    id: 1,
    title: "Maçã",
    price: 5.99,
    imageSrc: "../assets/imgs_products/frutas/maça.webp",
    category: "salad-type",
  },
  {
    id: 2,
    title: "Abacaxi",
    price: 12.99,
    imageSrc: "../assets/imgs_products/frutas/abacaxi.webp",
    category: "salad-type",
  },
  {
    id: 3,
    title: "Pera",
    price: 12.99,
    imageSrc: "../assets/imgs_products/frutas/pera.webp",
    category: "salad-type",
  },
  {
    id: 4,
    title: "Melancia",
    price: 10.99,
    imageSrc: "../assets/imgs_products/frutas/melancia.webp",
    category: "salad-type",
  },
  {
    id: 5,
    title: "Banana",
    price: 3.99,
    imageSrc: "../assets/imgs_products/frutas/banana.webp",
    category: "salad-type",
  },
  {
    id: 6,
    title: "Uva",
    price: 7.99,
    imageSrc: "../assets/imgs_products/frutas/uva.webp",
    category: "salad-type",
  },
  {
    id: 7,
    title: "Abacate",
    price: 20.99,
    imageSrc: "../assets/imgs_products/frutas/abacate.webp",
    category: "salad-type",
  },
  {
    id: 8,
    title: "Morango",
    price: 22.99,
    imageSrc: "../assets/imgs_products/frutas/morango.webp",
    category: "salad-type",
  },

  {
    id: 9,
    title: "Brócolis",
    price: 14.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/brocolis.webp",
    category: "lorem-type",
  },
  {
    id: 10,
    title: "Alface",
    price: 5.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/alface.webp",
    category: "lorem-type",
  },
  {
    id: 11,
    title: "Pepino",
    price: 17.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/pepino.webp",
    category: "lorem-type",
  },
  {
    id: 12,
    title: "Couve-Flor",
    price: 3.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/couve-flor.webp",
    category: "lorem-type",
  },
  {
    id: 13,
    title: "Abobora",
    price: 17.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/abobora.webp",
    category: "lorem-type",
  },
  {
    id: 14,
    title: "Pimentão",
    price: 12.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/pimentao.webp",
    category: "lorem-type",
  },
  {
    id: 15,
    title: "Berinjela",
    price: 20.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/berinjela.webp",
    category: "lorem-type",
  },
  {
    id: 16,
    title: "Cenoura",
    price: 6.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/cenoura.webp",
    category: "lorem-type",
  },

  {
    id: 17,
    title: "Cereja",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/cereja.webp",
    category: "dolor-type",
  },
  {
    id: 18,
    title: "Maça Verde",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/macaverde.webp",
    category: "dolor-type",
  },
  {
    id: 19,
    title: "Tomate",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/tomate.webp",
    category: "dolor-type",
  },
  {
    id: 20,
    title: "Pêssego",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/pessego.webp",
    category: "dolor-type",
  },
  {
    id: 21,
    title: "Limão",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/limao.webp",
    category: "dolor-type",
  },
  {
    id: 22,
    title: "Manga",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/manga.webp",
    category: "dolor-type",
  },
  {
    id: 23,
    title: "Melão",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/melao.webp",
    category: "dolor-type",
  },
  {
    id: 24,
    title: "Mamão",
    price: 3.99,
    imageSrc: "../assets/imgs_products/ofertas_especiais/mamao.webp",
    category: "dolor-type",
  },

  {
    id: 25,
    title: "Skol",
    price: 6.99,
    imageSrc: "../assets/imgs_products/bebidas/skol.webp",
    category: "beverages-type",
  },
  {
    id: 26,
    title: "Monster",
    price: 19.99,
    imageSrc: "../assets/imgs_products/bebidas/monster.webp",
    category: "beverages-type",
  },
  {
    id: 27,
    title: "Sprite",
    price: 8.99,
    imageSrc: "../assets/imgs_products/bebidas/sprite.webp",
    category: "beverages-type",
  },
  {
    id: 28,
    title: "Heineken",
    price: 12.99,
    imageSrc: "../assets/imgs_products/bebidas/heineken.webp",
    category: "beverages-type",
  },
  {
    id: 29,
    title: "Whisky",
    price: 29.99,
    imageSrc: "../assets/imgs_products/bebidas/whisky.webp",
    category: "beverages-type",
  },
  {
    id: 30,
    title: "Brahma",
    price: 14.99,
    imageSrc: "../assets/imgs_products/bebidas/brahma.webp",
    category: "beverages-type",
  },
  {
    id: 31,
    title: "Coca-Cola",
    price: 9.99,
    imageSrc: "../assets/imgs_products/bebidas/cocacola.webp",
    category: "beverages-type",
  },
  {
    id: 32,
    title: "Red Bull",
    price: 39.99,
    imageSrc: "../assets/imgs_products/bebidas/redbull.webp",
    category: "beverages-type",
  },
];

$(document).ready(function () {
  const $foods = $(".food-item-wrap");

  products.forEach((product) => {
    $foods.append(`
      <div class="food-item ${product.category}" data-id=${product.id}>
        <div class="item-wrap">
          <div class="item-img">
            <div class="img-holder">
              <img src="${product.imageSrc}" alt="${
      product.title
    }" loading="lazy">
            </div>
          </div>
          <div class="item-info">
            <div>
              <h3>${product.title}</h3>
              <span> R$ ${product.price.toFixed(2)} </span>
            </div>
            <div class="cart-btn">
              <h4>+</h4>
              <i class="fal fa-shopping-cart"></i>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  const addToCartButtons = document.querySelectorAll(".cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCartClicked);
  });
});

const swiperWrapperFood = document.getElementById("swiper-wrapper-food");
const swiperWrapperDrinks = document.getElementById("swiper-wrapper-drinks");

products.forEach((product) => {
  if (product.category === "dolor-type") {
    swiperWrapperFood.innerHTML += `
      <div class="swiper-slide ${product.category}" data-id=${product.id}>
        <div class="item-wrap">
          <div class="item-img">
            <div class="img-holder">
              <img src="${product.imageSrc}" alt="${
      product.title
    }" loading="lazy">
            </div>
          </div>
          <div class="item-info">
            <div>
              <h3>${product.title}</h3>
              <span> R$ ${product.price.toFixed(2)} </span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (product.category === "beverages-type") {
    swiperWrapperDrinks.innerHTML += `
      <div class="swiper-slide ${product.category}" data-id=${product.id}>
        <div class="item-wrap">
          <div class="item-img">
            <div class="img-holder">
              <img src="${product.imageSrc}" alt="Produto - ${
      product.title
    }" loading="lazy">
            </div>
          </div>
          <div class="item-info">
            <div>
              <h3>${product.title}</h3>
              <span> R$ ${product.price.toFixed(2)} </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
});
