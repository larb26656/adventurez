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
    mermaid({
      theme: "forest",
      autoTheme: true,
    }),
    starlight({
      title: "Adventurez",
      logo: {
        light: "/public/logo.svg",
        dark: "/public/dark-logo.svg",
        replacesTitle: true,
      },
      customCss: ["./src/styles/starlight-theme.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/larb26656",
        },
      ],
      plugins: [
        starlightSidebarTopics([
          {
            label: "React Adventure",
            link: "/react-adventure/",
            items: [
              {
                label: "Tea shop quest",
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
          {
            label: "Opencode adventure",
            link: "/opencode-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "opencode-adventure" },
              },
            ],
          },
          {
            label: "Docker adventure",
            link: "/docker-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "docker-adventure" },
              },
            ],
          },
          {
            label: "GH Action Adventure",
            link: "/gh-action-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "gh-action-adventure" },
              },
            ],
          },
          {
            label: "Jenkins Adventure",
            link: "/jenkins-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "jenkins-adventure" },
              },
            ],
          },
          {
            label: "K8s Adventure",
            link: "/k8s-adventure/",
            items: [
              {
                label: "Start Here",
                autogenerate: { directory: "k8s-adventure" },
              },
            ],
          },
        ]),
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
