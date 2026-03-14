import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { ProductItem } from '~/types/home';

type CartLine = {
  id: string;
  name: string;
  unit: string;
  price: number;
  qty: number;
  image: string;
};

const STORAGE_KEY = 'gaviao:cart';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartLine[]>([]);

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0));
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0),
  );

  function add(product: ProductItem, qty = 1) {
    if (!product?.id) return;
    const existing = items.value.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += qty;
      return;
    }

    items.value.push({
      id: product.id,
      name: product.name,
      unit: product.unit,
      price: product.price,
      qty,
      image: product.image,
    });
  }

  function increment(id: string) {
    const item = items.value.find((line) => line.id === id);
    if (item) item.qty += 1;
  }

  function decrement(id: string) {
    const item = items.value.find((line) => line.id === id);
    if (!item) return;
    item.qty -= 1;
    if (item.qty <= 0) remove(id);
  }

  function remove(id: string) {
    items.value = items.value.filter((line) => line.id !== id);
  }

  function clear() {
    items.value = [];
  }

  const whatsappMessage = computed(() => {
    if (!items.value.length) {
      return 'Ola! Quero fazer um pedido e retirar na loja.';
    }

    const lines = items.value.map(
      (item) =>
        `- ${item.name} (${item.unit}) x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}`,
    );

    return `Ola! Quero pedir:\n${lines.join('\n')}\nTotal: R$ ${totalPrice.value.toFixed(2)}`;
  });

  function buildWhatsappUrl(phone = '5582998763021') {
    return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage.value)}`;
  }

  if (process.client) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CartLine[];
        if (Array.isArray(parsed)) items.value = parsed;
      } catch {
        // ignore corrupted storage
      }
    }

    watch(
      items,
      (val) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
      },
      { deep: true },
    );
  }

  return {
    items,
    totalItems,
    totalPrice,
    add,
    increment,
    decrement,
    remove,
    clear,
    buildWhatsappUrl,
  };
});
