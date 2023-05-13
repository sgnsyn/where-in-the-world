const themes = {
  light: {
    "--elements_color": "hsl(0, 0%, 100%)",
    "--background_color": "hsl(0, 0%, 98%)",
    "--text_color": "hsl(200, 15%, 8%)",
    "--input_text_color": "hsl(0, 0%, 52%)",
  },
  dark: {
    "--elements_color": "hsl(209, 23%, 22%)",
    "--background_color": "hsl(207, 26%, 17%)",
    "--text_color": "hsl(0, 0%, 100%)",
    "--input_text_color": "hsl(0, 0%, 100%)",
  },
};
function applyTheme(theme) {
  for (const property in theme) {
    document.documentElement.style.setProperty(property, theme[property]);
  }
}
function saveTheme(themeName) {
  localStorage.setItem("theme", themeName);
}

function applySavedTheme() {
  const selectedTheme = localStorage.getItem("theme");
  if (selectedTheme) {
    applyTheme(themes[selectedTheme]);
  }
  if (!selectedTheme) {
    applyTheme(themes["light"]);
    saveTheme("light");
  }
}
