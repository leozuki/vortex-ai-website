import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "_next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".netlify/**",
      ".vercel/**",
      "out_publish/**",
      "scripts/**"
    ]
  }
];

export default eslintConfig;
