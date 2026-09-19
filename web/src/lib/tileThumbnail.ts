// Turns a real lat/lng into the single OSM/Esri XYZ tile that contains it —
// used as a lightweight <img> map-thumbnail instead of a real event photo
// (none exist for these 335 local puja committees) or 335 live Leaflet
// instances (too heavy to render at once). Standard Web Mercator tile math.
export function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x: Math.min(Math.max(x, 0), n - 1), y: Math.min(Math.max(y, 0), n - 1), z: zoom };
}

export function tileThumbnailUrl(lat: number, lng: number, zoom = 15, theme: "light" | "dark" = "light") {
  const { x, y, z } = latLngToTile(lat, lng, zoom);
  return theme === "dark"
    ? `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/${z}/${y}/${x}`
    : `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
}
