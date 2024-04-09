const products = [
  {
    id: 1,
    title: "1.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 2,
    title: "2.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 3,
    title: "3.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 4,
    title: "4.Maça",
    price: 120,
    imageSrc: "assets/anh-nguyen-kcA-c3f_3FE-unsplash.jpg",
    category: "salad-type"
  },
  {
    id: 5,
    title: "5.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 6,
    title: "6.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 7,
    title: "7.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 8,
    title: "8.Uva",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto1.jpg",
    category: "salad-type"
  },
  {
    id: 9,
    title: "1.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 10,
    title: "2.Pera",
    price: 120,
    imageSrc: "assets/imgs_vdd/produto2.jpg",
    category: "lorem-type"
  },
  {
    id: 11,
    title: "3.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 12,
    title: "4.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 13,
    title: "5.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 14,
    title: "6.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 15,
    title: "7.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 16,
    title: "8.Pera",
    price: 120,
    imageSrc: "assets/sina-piryae-bBzjWthTqb8-unsplash.jpg",
    category: "lorem-type"
  },
  {
    id: 17,
    title: "1.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  },
  {
    id: 18,
    title: "2. Ofertas",
    price: 120,
    imageSrc: "assets/imgs_vdd/frescos/abacaxiFresca.jpg",
    category: "dolor-type"
  },
  {
    id: 19,
    title: "3.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  },
  {
    id: 20,
    title: "4.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  },
  {
    id: 21,
    title: "5.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  },
  {
    id: 22,
    title: "6.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  },
  {
    id: 23,
    title: "7.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  },
  {
    id: 24,
    title: "8.Ofertas",
    price: 120,
    imageSrc: "assets/carly-jayne-Lv174o7fn7Y-unsplash.jpg",
    category: "dolor-type"
  }
];

const foods = document.querySelector('.food-item-wrap');

// render products
products.forEach(product => {
  foods.innerHTML += `
    <div class="food-item ${product.category}" data-id=${product.id}>
      <div class="item-wrap bottom-up play-on-scroll">
        <div class="item-img">
          <div class="img-holder bg-img" style="
                background-image: url(${product.imageSrc});
              "></div>
        </div>
        <div class="item-info">
          <div>
            <h3>${product.title}</h3>
            <span> ${product.price}$ </span>
          </div>
          <div class="cart-btn">
            <i class="bx bx-cart-alt"></i>
          </div>
        </div>
      </div>
    </div>
    `;
})