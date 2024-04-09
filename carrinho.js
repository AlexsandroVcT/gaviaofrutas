// Adiciona um evento de clique nos botões de adicionar ao carrinho
const addToCartButtons = document.querySelectorAll('.cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCartClicked);
});

// Adiciona um event listener para fechar o menu quando o usuário clicar fora dele
document.addEventListener('click', closeCartMenuOnClickOutside);

// Função para abrir o menu do carrinho
function openCartMenu(event) {
    if (event) {
        event.stopPropagation(); // Impede a propagação do evento para evitar o fechamento imediato do menu
    }
    const cartMenu = document.querySelector('.cart-menu');
    cartMenu.classList.add('open'); // Adiciona a classe 'open' para exibir o menu
    // Adiciona um event listener para fechar o menu quando o usuário clicar fora dele
    document.addEventListener('click', closeCartMenuOnClickOutside);
}

// Função para fechar o menu do carrinho
function closeCartMenu() {
    const cartMenu = document.querySelector('.cart-menu');
    cartMenu.classList.remove('open'); // Remove a classe 'open' para ocultar o menu
    // Remove o event listener para fechar o menu quando o usuário clicar fora dele
    document.removeEventListener('click', closeCartMenuOnClickOutside);
}

// Função para fechar o menu do carrinho quando o usuário clicar fora dele
function closeCartMenuOnClickOutside(event) {
    const cartMenu = document.querySelector('.cart-menu');
    if (!cartMenu.contains(event.target)) {
        closeCartMenu();
    }
}

// Adiciona um event listener para abrir o menu quando o usuário clicar no ícone
const cartIcon = document.getElementById('cart-icon');
cartIcon.addEventListener('click', openCartMenu);


// Função para adicionar um item ao carrinho quando o botão "Adicionar ao carrinho" é clicado
function addToCartClicked(event) {
    const button = event.target;
    const foodItem = button.closest('.food-item');
    const title = foodItem.querySelector('h3').innerText;
    const price = parseFloat(foodItem.querySelector('span').innerText.replace('$', ''));
    const imageSrc = foodItem.querySelector('.img-holder').style.backgroundImage.slice(5, -2);

    addToCart(title, price, imageSrc);
}

// Função para adicionar um item ao carrinho
function addToCart(title, price, imageSrc) {
    const cartList = document.querySelector('.cart-list');
    const existingCartItem = cartList.querySelector(`.cart-item[data-title="${title}"]`);
    
    if (existingCartItem) {
        const quantityElement = existingCartItem.querySelector('.item-quantity');
        let quantity = parseInt(quantityElement.innerText);
        
        if (quantity >= 1) {
            alert('Este produto já está no carrinho.');
            return;
        } else {
            quantity++;
            quantityElement.innerText = quantity;
            updateCartTotal();
            return;
        }
    }

    console.log('Produto adicionado ao carrinho:', title, price);

    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.dataset.title = title;
    cartItem.innerHTML = `
        <div class="cart-item-details">
            <img class="cart-item-image" src="${imageSrc}" alt="${title}">
            <span class="cart-item-title">${title}</span>
            <span class="cart-item-price">$${price.toFixed(2)}</span>
            <div class="item-actions">
    <button class="quantity-btn" onclick="decreaseQuantity(this)">-</button>
    <span class="item-quantity">1</span>
    <button class="quantity-btn" onclick="increaseQuantity(this)">+</button>
</div>
        </div>
        <button class="remove-btn" onclick="removeCartItem(event)">
        <i class='bx bx-trash cor-secundaria'></i>
    </button>
    
    `;
    cartList.appendChild(cartItem);

    // Atualiza o contador do carrinho
    updateCartCount();
    // Atualiza o total do carrinho
    updateCartTotal();
}

// Função para remover um item do carrinho quando o botão "Remover" é clicado
function removeCartItem(event) {
    event.stopPropagation(); // Impede a propagação do evento para evitar o fechamento do menu
    const button = event.target;
    const item = button.closest('.cart-item');
    item.remove();
    updateCartCount();
    updateCartTotal();
}

// Função para aumentar a quantidade de um item no carrinho
function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.item-quantity');
    let quantity = parseInt(quantityElement.innerText);
    quantity++;
    quantityElement.innerText = quantity;
    updateCartTotal();
}

// Função para diminuir a quantidade de um item no carrinho
function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.item-quantity');
    let quantity = parseInt(quantityElement.innerText);
    if (quantity > 1) {
        quantity--;
        quantityElement.innerText = quantity;
        updateCartTotal();
    }
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const itemCount = document.querySelectorAll('.cart-list .cart-item').length;
    cartCount.innerText = itemCount;
}

// Função para calcular e atualizar o total do carrinho
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-list .cart-item');
    let subtotal = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-price').innerText.replace('$', ''));
        const quantity = parseInt(item.querySelector('.item-quantity').innerText);
        subtotal += price * quantity;
    });

    const discount = subtotal * 0.1; // Exemplo de desconto de 10%
    const total = subtotal - discount;

    // Verifica se o elemento de subtotal existe antes de atualizá-lo
    const subtotalElement = document.querySelector('.subtotal-value');
    if (subtotalElement) {
        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
    }

    // Atualiza o desconto e o total apenas se os elementos existirem
    const discountElement = document.querySelector('.discount-value');
    const totalElement = document.querySelector('.total-value');
    if (discountElement && totalElement) {
        discountElement.innerText = `-$${discount.toFixed(2)}`;
        totalElement.innerText = `$${total.toFixed(2)}`;
    }
}

