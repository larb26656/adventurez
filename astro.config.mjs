// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";
import starlightThemeRapide from "starlight-theme-rapide";
import mermaid from "astro-mermaid";
import starlightSidebarTopics from "starlight-sidebar-topics";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.luckytime1996.dev",
  integrations: [
    starlight({
      title: "Adventurez",
      logo: {
        src: "/public/favicon.png",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/larb26656",
        },
      ],
      // sidebar: [
      //   {
      //     label: "React Adventure",
      //     autogenerate: { directory: "react-adventure" },
      //   },
      //   {
      //     label: "n8n Adventure",
      //     autogenerate: { directory: "n8n-adventure" },
      //   },
      //   {
      //     label: "Cheatsheet",
      //     autogenerate: { directory: "cheatsheet" },
      //   },
      // ],
      customCss: ["./src/styles/global.css"],
      plugins: [
        starlightThemeRapide(),
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
