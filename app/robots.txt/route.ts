import { siteConfig } from "@/lib/site";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    `LLMS: ${siteConfig.url}/llms.txt`,
    ""
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
