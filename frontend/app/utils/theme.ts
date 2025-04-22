function getColorScheme() {
  var theme = "light";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme") ?? "light";
  } else if (!mediaQuery) {
    theme = "light";
  } else if (mediaQuery.matches) {
    theme = "dark";
  }
  return theme;
}

export function setColorScheme(theme: string) {
  var currTheme = theme ?? getColorScheme();
  if (currTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else if (currTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

export function toggleColorScheme() {
  var currTheme = getColorScheme();
  if (currTheme === "dark") {
    setColorScheme("light");
  } else if (currTheme === "light") {
    setColorScheme("dark");
  }
}
