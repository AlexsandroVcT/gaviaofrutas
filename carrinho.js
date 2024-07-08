// Adiciona um evento de clique nos botões de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll(".cart-btn");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCartClicked);
});

// Função para abrir o menu do carrinho
function openCartMenu(event) {
  if (event) {
    event.stopPropagation(); // Impede a propagação do evento para evitar o fechamento imediato do menu
  }
  const cartMenu = document.querySelector(".cart-menu");
  cartMenu.classList.add("open"); // Adiciona a classe 'open' para exibir o menu
  // Adiciona um event listener para fechar o menu quando o usuário clicar fora dele
  document.addEventListener("click", closeCartMenuOnClickOutside);
}

// Função para fechar o menu do carrinho
function closeCartMenu() {
  const cartMenu = document.querySelector(".cart-menu");
  cartMenu.classList.remove("open"); // Remove a classe 'open' para ocultar o menu
  // Remove o event listener para fechar o menu quando o usuário clicar fora dele
  document.removeEventListener("click", closeCartMenuOnClickOutside);
}

// Função para fechar o menu do carrinho quando o usuário clicar fora dele
function closeCartMenuOnClickOutside(event) {
  const cartMenu = document.querySelector(".cart-menu");
  if (!cartMenu.contains(event.target)) {
    closeCartMenu();
  }
}

// Adiciona um event listener para abrir o menu quando o usuário clicar no ícone
const cartIcon = document.querySelector(".btnCart");
cartIcon.addEventListener("click", openCartMenu);

function createCartItem({ id, title, imageSrc, price }, quantity = 1) {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.dataset.id = id;
  cartItem.dataset.title = title;
  cartItem.innerHTML = `
        <div class="cart-item-details">
            <img class="cart-item-image" src="${imageSrc}" alt="${title}">
            <div class="nameProducts">
              <span class="cart-item-title">${title}</span>
              <span class="cart-item-price">R$ ${price.toFixed(2)}
                <div class="item-actions">
                  <button class="quantity-btn" onclick="decreaseQuantity(this)">-</button>
                  <span class="item-quantity">${quantity}</span>
                  <button class="quantity-btn" onclick="increaseQuantity(this)">+</button>
                </div>
              </span>
            </div>
          
        </div>
        <button class="remove-btn" onclick="removeCartItem(event)">
          <i class="fal fa-trash-alt"></i>
        </button>
    `;

  return cartItem;
}

// Função para adicionar um item ao carrinho quando o botão "Adicionar ao carrinho" é clicado
function addToCartClicked(event) {
  const button = event.target;
  const foodItem = button.closest(".food-item");
  const _id = foodItem.dataset.id;
  const product = products.find((e) => e.id == _id);
  addToCart(product);
}

// Função para adicionar um item ao carrinho
function addToCart(product) {
  const { id, title, price } = product;
  const existingProduct = getProducts().find((e) => e.id == id);
  const cartList = document.querySelector(".cart-list");

  if (existingProduct) {
    alert("Este produto já está no carrinho.");
    return;
  }

  console.log("Produto adicionado ao carrinho:", title, price);

  const cartItem = createCartItem(product);
  cartList.appendChild(cartItem);

  const result = addProduct(id);
  updateCart(result);
}

// Função para remover um item do carrinho quando o botão "Remover" é clicado
function removeCartItem(event) {
  event.stopPropagation(); // Impede a propagação do evento para evitar o fechamento do menu
  const button = event.target;
  const item = button.closest(".cart-item");
  const updatedProduct = deleteProduct(item.dataset.id);
  if (updatedProduct == null) {
    item.remove();
  }
  updateCart()
}

// Função para aumentar a quantidade de um item no carrinho
function increaseQuantity(button) {
  const item = button.closest(".cart-item");
  const quantityElement = button.parentElement.querySelector(".item-quantity");
  const id = item.dataset.id;
  const updatedProduct = addProduct(id);
  quantityElement.innerText = updatedProduct.quantity;
  updateCart();
}

// Função para diminuir a quantidade de um item no carrinho
function decreaseQuantity(button) {
  const item = button.closest(".cart-item");
  const quantityElement = button.parentElement.querySelector(".item-quantity");
  const id = item.dataset.id;
  const updatedProduct = removeProduct(id);
  if (updatedProduct == null) {
    item.remove();
  } else {
    quantityElement.innerText = updatedProduct.quantity;
  }
  updateCart();
}

// Função para atualizar o contador do carrinho
function updateCartCount(count) {
  const cartCount = document.querySelector(".cart-count");
  cartCount.innerText = count;
}

// Função para calcular e atualizar o total do carrinho
function updateCartTotal(cartItems) {
  let subtotal = 0;
  cartItems.forEach((item) => {
    const { price } = products.find((e) => e.id == item.id);
    subtotal += item.quantity * price;
  });

  const discount = subtotal * 0.1; // Exemplo de desconto de 10%
  const total = subtotal - discount;

  // Verifica se o elemento de subtotal existe antes de atualizá-lo
  const subtotalElement = document.querySelector(".subtotal-value");
  if (subtotalElement) {
    subtotalElement.innerText = `R$ ${subtotal.toFixed(2)}`;
  }

  // Atualiza o desconto e o total apenas se os elementos existirem
  const discountElement = document.querySelector(".discount-value");
  const totalElement = document.querySelector(".total-value");
  if (discountElement && totalElement) {
    discountElement.innerText = `-$${discount.toFixed(2)}`;
    totalElement.innerText = `$${total.toFixed(2)}`;
  }
}

function updateCart() {
  const cartItems = getProducts();
  updateCartCount(cartItems.length);
  updateCartTotal(cartItems);
}

const cartItems = getProducts();
const cartList = document.querySelector(".cart-list");
cartItems.forEach(function ({ id, quantity }) {
  const product = products.find((e) => e.id == id);
  if (product) {
    const cartItem = createCartItem(product, quantity);
    cartList.appendChild(cartItem);
  }
});

updateCart();
