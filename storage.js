/** @returns {Array<{id:number, quantity: number}>} */
function getProducts() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

/** @returns {{id: number, quantity: 1} | null} */
function getProduct(id) {
  const storage = JSON.parse(localStorage.getItem('cart'));
  return storage.find(e => e.id == id);
}

/**
* @param {number} id
* @returns {{id: number, quantity: number} | null} updateProduct
*/
function addProduct(id) {
  let storage = JSON.parse(localStorage.getItem('cart'));
  const _product = { id, quantity: 1 };
  if (storage) {
    const existingProduct = storage.find(e => e.id == id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storage.push(_product);
    }
  } else {
    storage = [_product];
  }
  localStorage.setItem('cart', JSON.stringify(storage));
  return getProduct(id);
}

/** 
* @param {number} id
* @returns {{id: number, quantity: number} | null} updateProduct
*/
function removeProduct(id) {
  let storage = JSON.parse(localStorage.getItem('cart'));
  if (storage) {
    const existingProduct = storage.find(e => e.id == id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity == 0) {
        storage = storage.filter(e => e.id != id)
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(storage));
  return getProduct(id);
}

/** 
* @param {number} id
* @returns {{id: number, quantity: number} | null} updateProduct
*/
function deleteProduct(id) {
  let storage = JSON.parse(localStorage.getItem('cart'));
  if (storage) {
    const existingProduct = storage.find(e => e.id == id);
    if (existingProduct) {
      storage = storage.filter(e => e.id != id)
    }
  }
  localStorage.setItem('cart', JSON.stringify(storage));
  return getProduct(id);
}