/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Catppuccin Mocha inspired colors
        base: "#1e1e2e",
        surface: "#313244",
        overlay: "#45475a",
        text: "#cdd6f4",
        subtext: "#bac2de",
        mauve: "#cba6f7",
        blue: "#89b4fa",
        sapphire: "#74c7ec",
        teal: "#94e2d5",
        green: "#a6e3a1",
        yellow: "#f9e2af",
        peach: "#fab387",
        maroon: "#eba0ac",
        red: "#f38ba8",
      },
    },
  },
  plugins: [],
}
