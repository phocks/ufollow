import { type Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";
import tailwindTypography from "@tailwindcss/typography";

export default {
  darkMode: "media",
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [
    tailwindForms,
    tailwindTypography,
  ],
} satisfies Config;
