import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#1f3b2c",
    icons: [{ src: "/icon", sizes: "any", type: "image/png" }],
  };
}
