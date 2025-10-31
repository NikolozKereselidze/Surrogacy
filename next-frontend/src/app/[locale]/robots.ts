import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/admin-login/",
        "/find-egg-donor/",
        "/surrogates/",
        "/sperm-donors/",
        "/donor/",
      ],
    },
    sitemap: "https://www.ivftourgeorgia.com/sitemap.xml",
  };
}
