import { type Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";

export default {
  darkMode: "media",
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [
    tailwindForms,
  ],
} satisfies Config;
