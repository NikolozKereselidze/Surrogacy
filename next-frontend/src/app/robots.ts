import { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/admin/",
                "/admin-login/",
                "/find-egg-donor/",
                "/find-sperm-donor/",
                "/find-surrogate-donor/",
                "/egg-donors/",
                "/sperm-donors/",
                "/surrogate-donors/",
            ],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
