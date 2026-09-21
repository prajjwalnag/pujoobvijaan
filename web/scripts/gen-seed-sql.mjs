import { pandals } from "../src/data/pandals.ts";
import { areas } from "../src/data/areas.ts";
import { writeFileSync } from "node:fs";

function sqlStr(v) {
  if (v === undefined || v === null) return "null";
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function sqlArr(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  return "ARRAY[" + arr.map((s) => sqlStr(s)).join(",") + "]::text[]";
}
function sqlNum(v) {
  return v === undefined || v === null ? "null" : String(v);
}
function sqlBool(v) {
  return v ? "true" : "false";
}
function sqlJsonb(v) {
  return "'" + JSON.stringify(v ?? []).replace(/'/g, "''") + "'::jsonb";
}

const areaRows = areas.map((a) => {
  return `(${sqlStr(a.id)}, ${sqlStr(a.name)}, ${sqlStr(a.region)}, ${sqlNum(a.center.lat)}, ${sqlNum(a.center.lng)}, ${sqlNum(a.pandalCount)}, ${sqlArr(a.thingsToDo)}, ${sqlJsonb(a.cafes)}, ${sqlJsonb(a.restaurants)})`;
});

const pandalRows = pandals.map((p) => {
  return `(${sqlStr(p.id)}, ${sqlStr(p.name)}, ${sqlStr(p.region)}, ${sqlNum(p.coordinates.lat)}, ${sqlNum(p.coordinates.lng)}, ${sqlStr(p.crowdLevel)}, ${sqlStr(p.areaId)}, ${sqlBool(p.geocoded)}, ${sqlNum(p.rating)}, ${sqlStr(p.theme)}, ${sqlStr(p.visitingHours?.open)}, ${sqlStr(p.visitingHours?.close)}, ${sqlStr(p.nearestMetro?.station)}, ${sqlStr(p.nearestMetro?.line)}, ${sqlArr(p.accessPoints)}, ${sqlStr(p.description)}, ${sqlArr(p.tags)})`;
});

let out = "";
out += `insert into public.areas (id, name, region, center_lat, center_lng, pandal_count, things_to_do, cafes, restaurants) values\n`;
out += areaRows.join(",\n") + "\non conflict (id) do nothing;\n\n";

out += `insert into public.pandals (id, name, region, lat, lng, crowd_level, area_id, geocoded, rating, theme, visiting_open, visiting_close, nearest_metro_station, nearest_metro_line, access_points, description, tags) values\n`;
out += pandalRows.join(",\n") + "\non conflict (id) do nothing;\n";

writeFileSync(new URL("./seed.sql", import.meta.url), out);
console.log("areas:", areas.length, "pandals:", pandals.length);
