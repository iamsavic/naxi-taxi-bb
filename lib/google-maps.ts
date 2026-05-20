/** Share/short links cannot be used in iframes — build a proper embed URL instead. */
export function getGoogleMapsEmbedUrl(
  mapsUrl?: string | null,
  address?: string | null
): string | null {
  const url = mapsUrl?.trim() ?? "";
  const addr = address?.trim() ?? "";

  if (url.includes("/maps/embed") || url.includes("output=embed")) {
    return url;
  }

  if (url.includes("google.com/maps") && !url.includes("maps.app.goo.gl") && !url.includes("goo.gl")) {
    if (url.includes("/maps/embed")) return url;
    const pbMatch = url.match(/[?&]pb=([^&]+)/);
    if (pbMatch) {
      return `https://www.google.com/maps/embed?pb=${pbMatch[1]}`;
    }
  }

  if (!addr) return null;

  return `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&hl=sr&z=16&output=embed`;
}
