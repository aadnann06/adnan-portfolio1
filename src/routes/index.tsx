import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/components/portfolio-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adnan Qureshi | DevOps & Cloud Engineer" },
      { name: "description", content: "Portfolio of Adnan Qureshi, a 2025 Computer Science graduate pursuing entry-level DevOps and Cloud Engineering roles." },
      { property: "og:title", content: "Adnan Qureshi | DevOps & Cloud Engineer" },
      { property: "og:description", content: "Explore Adnan Qureshi’s DevOps, cloud, Linux, Docker, networking, and automation learning journey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});
