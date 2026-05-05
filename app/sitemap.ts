import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/usluge", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/cenovnik", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/taxi-do-aerodroma", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/poslovni-taxi", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/galerija", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/kontakt", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
