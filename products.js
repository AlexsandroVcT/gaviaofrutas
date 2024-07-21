const products = [
  // Ofertas Especiais
  // {
  //   id: 1,
  //   title: "Primor 3kg",
  //   price: 35.99,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },
  // {
  //   id: 2,
  //   title: "Primor 1kg",
  //   price: 11.99,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },
  // {
  //   id: 3,
  //   title: "Primor 500g",
  //   price: 6.99,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },
  // {
  //   id: 4,
  //   title: "Primor 250g",
  //   price: 2.99,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },

  // Frutas Frescas
  {
    id: 5,
    title: "Melancia",
    price: 2.5,
    imageSrc: "../assets/imgs_products/frutas/melancia.webp",
    category: "salad-type",
  },
  {
    id: 6,
    title: "Maça",
    price: 3.49,
    imageSrc: "../assets/imgs_products/frutas/maca.webp",
    category: "salad-type",
  },
  {
    id: 7,
    title: "Maça pequena",
    price: 0.8,
    imageSrc: "../assets/imgs_products/frutas/macapequena.webp",
    category: "salad-type",
  },
  {
    id: 8,
    title: "Maracujá",
    price: 1.99,
    imageSrc: "../assets/imgs_products/frutas/maracuja.webp",
    category: "salad-type",
  },
  {
    id: 9,
    title: "Pêra",
    price: 3.49,
    imageSrc: "../assets/imgs_products/frutas/pera.webp",
    category: "salad-type",
  },
  {
    id: 10,
    title: "Kiwi",
    price: 29.99,
    imageSrc: "../assets/imgs_products/frutas/kiwi.webp",
    category: "salad-type",
  },
  {
    id: 11,
    title: "Mamão Formoza",
    price: 3.49,
    imageSrc: "../assets/imgs_products/frutas/mamaopapaia.webp",
    category: "salad-type",
  },
  {
    id: 12,
    title: "Manga",
    price: 4.99,
    imageSrc: "../assets/imgs_products/frutas/mangatommy.webp",
    category: "salad-type",
  },
  {
    id: 13,
    title: "Limão",
    price: 0.5,
    imageSrc: "../assets/imgs_products/frutas/limao.webp",
    category: "salad-type",
  },
  {
    id: 14,
    title: "Abacate",
    price: 7.99,
    imageSrc: "../assets/imgs_products/frutas/abacate.webp",
    category: "salad-type",
  },
  {
    id: 15,
    title: "Laranja lima",
    price: 1.25,
    imageSrc: "../assets/imgs_products/frutas/laranjalima.webp",
    category: "salad-type",
  },
  {
    id: 16,
    title: "Banana",
    price: 7.99,
    imageSrc: "../assets/imgs_products/frutas/banana.webp",
    category: "salad-type",
  },
  {
    id: 17,
    title: "Melão",
    price: 3.99,
    imageSrc: "../assets/imgs_products/frutas/melao.webp",
    category: "salad-type",
  },
  {
    id: 18,
    title: "Abacaxi",
    price: 9.99,
    imageSrc: "../assets/imgs_products/frutas/abacaxi.webp",
    category: "salad-type",
  },
  {
    id: 19,
    title: "Tomate",
    price: 2.49,
    imageSrc: "../assets/imgs_products/frutas/tomate.webp",
    category: "salad-type",
  },
  {
    id: 20,
    title: "Laranja-Cravo",
    price: 1.99,
    imageSrc: "../assets/imgs_products/frutas/laranjacravo.webp",
    category: "salad-type",
  },

  // Verduras Nutritivas
  {
    id: 21,
    title: "Alface",
    price: 2.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/alface.webp",
    category: "lorem-type",
  },
  {
    id: 22,
    title: "Cenoura",
    price: 3.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/cenoura.webp",
    category: "lorem-type",
  },
  {
    id: 23,
    title: "Cebola",
    price: 6.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/cebola.webp",
    category: "lorem-type",
  },
  {
    id: 24,
    title: "Repolho",
    price: 5.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/repolho.webp",
    category: "lorem-type",
  },
  {
    id: 25,
    title: "Beterraba",
    price: 7.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/beterraba.webp",
    category: "lorem-type",
  },
  {
    id: 26,
    title: "Batatinha",
    price: 7.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/batatinha.webp",
    category: "lorem-type",
  },
  {
    id: 27,
    title: "Pepino",
    price: 2.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/pepino.webp",
    category: "lorem-type",
  },
  {
    id: 28,
    title: "Pimentão",
    price: 0.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/pimentao.webp",
    category: "lorem-type",
  },
  {
    id: 29,
    title: "Gengibre",
    price: 29.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/gengibre.webp",
    category: "lorem-type",
  },
  {
    id: 30,
    title: "Chuchu",
    price: 1.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/chuchu.webp",
    category: "lorem-type",
  },
  {
    id: 31,
    title: "Alho",
    price: 1.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/alho.webp",
    category: "lorem-type",
  },
  {
    id: 32,
    title: "Abóbora",
    price: 3.99,
    imageSrc: "../assets/imgs_products/verduras_Nutritivas/abobora.webp",
    category: "lorem-type",
  },

  // Bebidas
  // Bebidas
  {
    id: 33,
    title: "Redbull",
    price: 9.99,
    imageSrc: "../assets/imgs_products/bebidas/redbull.webp",
    category: "beverages-type",
  },
  {
    id: 34,
    title: "Monster",
    price: 9.99,
    imageSrc: "../assets/imgs_products/bebidas/monster.webp",
    category: "beverages-type",
  },
  {
    id: 35,
    title: "Nordoff Ice",
    price: 3.99,
    imageSrc: "../assets/imgs_products/bebidas/nordoffice.webp",
    category: "beverages-type",
  },
  {
    id: 36,
    title: "Cabaré Ice",
    price: 6.99,
    imageSrc: "../assets/imgs_products/bebidas/cabareice.webp",
    category: "beverages-type",
  },
  {
    id: 37,
    title: "Cabaré Puro malte",
    price: 4.49,
    imageSrc: "../assets/imgs_products/bebidas/cabarepuromalte.webp",
    category: "beverages-type",
  },
  {
    id: 38,
    title: "Heineken",
    price: 7.0,
    imageSrc: "../assets/imgs_products/bebidas/heineken.webp",
    category: "beverages-type",
  },
  {
    id: 39,
    title: "Heineken lata",
    price: 5.49,
    imageSrc: "../assets/imgs_products/bebidas/heinekenlata.webp",
    category: "beverages-type",
  },
  {
    id: 40,
    title: "Amstel lata",
    price: 4.99,
    imageSrc: "../assets/imgs_products/bebidas/amstellata.webp",
    category: "beverages-type",
  },
  {
    id: 41,
    title: "Itaipava lata",
    price: 3.99,
    imageSrc: "../assets/imgs_products/bebidas/itaipava.webp",
    category: "beverages-type",
  },
  {
    id: 42,
    title: "Schin lata",
    price: 3.99,
    imageSrc: "../assets/imgs_products/bebidas/schinlata.webp",
    category: "beverages-type",
  },
  {
    id: 43,
    title: "Coca-cola lata",
    price: 3.49,
    imageSrc: "../assets/imgs_products/bebidas/cocacolalata.webp",
    category: "beverages-type",
  },
  {
    id: 44,
    title: "Fanta lata",
    price: 2.99,
    imageSrc: "../assets/imgs_products/bebidas/fantalata.webp",
    category: "beverages-type",
  },
  {
    id: 45,
    title: "Pérgola",
    price: 19.99,
    imageSrc: "../assets/imgs_products/bebidas/pergola.webp",
    category: "beverages-type",
  },
  {
    id: 46,
    title: "Água cristal",
    price: 1.49,
    imageSrc: "../assets/imgs_products/bebidas/aguacristal.webp",
    category: "beverages-type",
  },

  // Ofertas Especiais (Produtos que não estão nas categorias anteriores)
  // {
  //   id: 40,
  //   title: "Mortadela Sadia",
  //   price: 8.99,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },
  // {
  //   id: 41,
  //   title: "Queijo Manteiga",
  //   price: 41.99,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },
  // {
  //   id: 42,
  //   title: "Farinha",
  //   price: 6.49,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // },
  // {
  //   id: 43,
  //   title: "Óleo Soya Uni",
  //   price: 7.49,
  //   imageSrc: "../assets/imgs_products",
  //   category: "dolor-type",
  // }
];

$(document).ready(function () {
  const $foods = $(".food-item-wrap");

  products.forEach((product) => {
    $foods.append(`
      <div class="food-item ${product.category}" data-id=${product.id}>
        <div class="item-wrap">
          <div class="item-img">
            <div class="img-holder">
              <img src="${product.imageSrc}" alt="${product.title}"  >
            </div>
          </div>
          <div class="item-info">
            <div>
              <h3>${product.title}</h3>
              <span> R$ ${product.price.toFixed(2).replace(".", ",")} </span>
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
  if (product.category === "salad-type") {
    swiperWrapperFood.innerHTML += `
      <div class="swiper-slide ${product.category}" data-id=${product.id}>
        <div class="item-wrap">
          <div class="item-img">
            <div class="img-holder">
              <img src="${product.imageSrc}" alt="${product.title}"  >
            </div>
          </div>
          <div class="item-info">
            <div>
              <h3>${product.title}</h3>
              <span> R$ ${product.price.toFixed(2).replace(".", ",")} </span>
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
              <img src="${product.imageSrc}" alt="Produto - ${product.title}"  >
            </div>
          </div>
          <div class="item-info">
            <div>
              <h3>${product.title}</h3>
              <span> R$ ${product.price.toFixed(2).replace(".", ",")} </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
});
