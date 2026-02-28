<script setup lang="ts">
import { ref } from "vue";
import type { NavItem } from "~/types/home";

const props = withDefaults(
  defineProps<{
    menuItems: NavItem[];
    cartCount?: number;
  }>(),
  {
    cartCount: 0,
  },
);

const isMobileMenuOpen = ref(false);
const { isDark, toggleTheme } = useTheme();

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <header class="site-header">
    <div class="header-shell">
      <div class="header-top">
        <AppLogo class="brand" />

        <nav class="main-nav" aria-label="Menu principal">
          <a
            v-for="item in props.menuItems"
            :key="item.label"
            :href="item.href"
            :class="{ active: item.label === 'Inicio' }"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="header-actions">
          <button
            class="icon-btn"
            type="button"
            :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
            @click="toggleTheme"
          >
            <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.8 5.8 4 4M20 20l-1.8-1.8M18.2 5.8 20 4M4 20l1.8-1.8" />
            </svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
            </svg>
          </button>

          <button class="login-btn" type="button" aria-label="Entrar ou cadastrar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20a8 8 0 0 1 16 0" />
            </svg>
            <span class="login-label">Entrar</span>
          </button>

          <button class="cart-btn" type="button" aria-label="Meu carrinho">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6h15l-1.5 8.5H9L7 4H3" />
              <circle cx="10" cy="19" r="1.5" />
              <circle cx="18" cy="19" r="1.5" />
            </svg>
            <span class="badge">{{ props.cartCount }}</span>
          </button>

          <a
            class="whatsapp-btn"
            href="https://wa.me/5582999999999"
            target="_blank"
            rel="noreferrer"
          >
            Pedir no WhatsApp
          </a>
        </div>

        <button
          class="menu-toggle"
          type="button"
          aria-label="Abrir menu"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <nav class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }" aria-label="Menu mobile">
        <a
          v-for="item in props.menuItems"
          :key="`mobile-${item.label}`"
          :href="item.href"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </a>

        <a
          class="mobile-whatsapp"
          href="https://wa.me/5582999999999"
          target="_blank"
          rel="noreferrer"
          @click="closeMobileMenu"
        >
          Pedir no WhatsApp
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 14px 16px 0;
  backdrop-filter: blur(6px);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--bg-page) 94%, transparent) 0%,
    color-mix(in srgb, var(--bg-page) 80%, transparent) 60%,
    transparent 100%
  );
}

.header-shell {
  max-width: 1280px;
  margin: 0 auto;
  border: 1px solid var(--border-1);
  border-radius: 20px;
  background: var(--surface-glass);
  box-shadow: var(--shadow-2);
  padding: 10px 14px;
  position: relative;
}

.header-top {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
}

.main-nav {
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.main-nav a {
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--text-1);
  font-weight: 700;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.main-nav a:hover,
.main-nav a.active {
  background: var(--cta-gradient);
  color: #fff;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn,
.login-btn,
.cart-btn,
.menu-toggle {
  height: 44px;
  border-radius: 13px;
  border: 1px solid var(--border-1);
  background: var(--surface-1);
  color: var(--text-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.icon-btn:hover,
.login-btn:hover,
.cart-btn:hover,
.menu-toggle:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--accent-600) 45%, var(--border-1));
}

.icon-btn,
.cart-btn,
.menu-toggle {
  width: 44px;
  padding: 0;
}

.login-btn svg,
.cart-btn svg,
.menu-toggle svg,
.icon-btn svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.cart-btn {
  position: relative;
}

.badge {
  position: absolute;
  right: -5px;
  top: -7px;
  min-width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 2px solid var(--surface-1);
  background: var(--accent-600);
  color: #fff;
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  font-weight: 800;
}

.whatsapp-btn,
.mobile-whatsapp {
  height: 44px;
  border-radius: 12px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  background: var(--cta-gradient);
  color: #fff;
  font-weight: 700;
  white-space: nowrap;
}

.menu-toggle {
  display: none;
}

.mobile-nav {
  position: absolute;
  left: 12px;
  right: 12px;
  top: calc(100% + 8px);
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-1);
  background: var(--surface-1);
  box-shadow: var(--shadow-2);
  display: grid;
  gap: 6px;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.mobile-nav a {
  background: var(--surface-2);
  border-radius: 10px;
  text-align: center;
  padding: 11px;
  font-weight: 700;
}

.mobile-whatsapp {
  justify-content: center;
}

.mobile-nav.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

@media (max-width: 1180px) {
  .main-nav,
  .whatsapp-btn {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .header-top {
    grid-template-columns: auto 1fr auto auto;
  }
}

@media (max-width: 820px) {
  .login-label {
    display: none;
  }

  .login-btn {
    width: 44px;
    padding: 0;
  }
}

@media (max-width: 640px) {
  .site-header {
    padding: 10px 10px 0;
  }

  .header-shell {
    border-radius: 16px;
    padding: 8px 10px;
  }

  .header-top {
    gap: 7px;
  }
}
</style>
