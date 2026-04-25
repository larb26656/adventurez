// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
import starlightSidebarTopics from "starlight-sidebar-topics";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.luckytime1996.dev",
  integrations: [
    react(),
    starlight({
      title: "Adventurez",
      logo: {
        src: "/public/favicon.png",
        replacesTitle: true,
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/larb26656",
        },
      ],
      customCss: ["./src/styles/global.css"],
      plugins: [
        // starlightThemeNova(),
        starlightSidebarTopics([
          {
            label: "React Adventure",
            link: "/react-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "react-adventure" },
              },
            ],
          },
          {
            label: "n8n Adventure",
            link: "/n8n-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "n8n-adventure" },
              },
            ],
          },
        ]),
      ],
    }),
    mermaid({
      theme: "forest",
      autoTheme: true,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
