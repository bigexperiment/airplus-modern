import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const host = "https://airplusnepal.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${host}/sitemap.xml`,
  };
}


