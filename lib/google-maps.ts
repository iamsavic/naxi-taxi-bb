export type MapPin = {
  lat: number;
  lng: number;
  label?: string;
  zoom?: number;
};

/** Embed URL with a visible red pin (label@coordinates). */
export function buildPinnedMapEmbedUrl(pin: MapPin): string {
  const label = pin.label?.trim();
  const q = label ? `${label}@${pin.lat},${pin.lng}` : `${pin.lat},${pin.lng}`;
  const z = pin.zoom ?? 17;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&hl=sr&z=${z}&output=embed`;
}

/** Share/short links cannot be used in iframes — build a proper embed URL instead. */
export function getGoogleMapsEmbedUrl(
  mapsUrl?: string | null,
  address?: string | null,
  pin?: MapPin | null
): string | null {
  if (pin) {
    return buildPinnedMapEmbedUrl(pin);
  }

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
