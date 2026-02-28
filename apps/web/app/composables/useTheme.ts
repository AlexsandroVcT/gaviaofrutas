import { computed, watch } from "vue";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "gaviao:theme";

function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.style.colorScheme = mode;
}

export function useTheme() {
  const mode = useState<ThemeMode>("theme-mode", () => "light");
  const isInitialized = useState<boolean>("theme-mode:init", () => false);

  if (process.client && !isInitialized.value) {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const preferredTheme: ThemeMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (storedTheme === "light" || storedTheme === "dark") {
      mode.value = storedTheme;
    } else {
      mode.value = preferredTheme;
    }

    watch(
      mode,
      (value) => {
        applyTheme(value);
        localStorage.setItem(THEME_STORAGE_KEY, value);
      },
      { immediate: true },
    );

    isInitialized.value = true;
  }

  const isDark = computed(() => mode.value === "dark");

  function toggleTheme() {
    mode.value = mode.value === "dark" ? "light" : "dark";
  }

  function setTheme(value: ThemeMode) {
    mode.value = value;
  }

  return {
    mode,
    isDark,
    toggleTheme,
    setTheme,
  };
}
