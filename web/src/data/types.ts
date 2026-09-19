export type CrowdLevel = "high" | "medium" | "low";

export type Region =
  | "North Kolkata"
  | "South Kolkata"
  | "Central Kolkata"
  | "East Kolkata"
  | "West Kolkata"
  // Separate administrative districts, not Kolkata proper — but colloquially
  // part of the city's puja circuit (Lake Town, Patipukur, Sonarpur, etc.).
  | "North 24 Parganas"
  | "South 24 Parganas";

export interface Pandal {
  id: string;
  name: string;
  region: Region;
  /** Approximate — jittered around the region's centroid, not a geocoded address. */
  coordinates: { lat: number; lng: number };
  /** Size/prominence tier (budget & footfall), not live crowd data. */
  crowdLevel: CrowdLevel;
  /** Links to an Area (see areas.ts) when this pandal falls in a mapped geographic cluster. */
  areaId?: string;
  /** True only when `coordinates` came from a real OpenStreetMap Nominatim match, not a region-centroid placeholder. */
  geocoded?: boolean;
  rating?: number;
  theme?: string;
  visitingHours?: { open: string; close: string };
  nearestMetro?: { station: string; line: string } | null;
  accessPoints?: string[];
  description?: string;
  tags?: string[];
}

export interface AreaPlace {
  name: string;
  note?: string;
}

export interface Area {
  id: string;
  /** Real neighbourhood name, reverse-geocoded from the cluster's centroid. */
  name: string;
  region: Region;
  center: { lat: number; lng: number };
  pandalCount: number;
  thingsToDo: string[];
  cafes: AreaPlace[];
  restaurants: AreaPlace[];
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarInitials: string;
  points: number;
  pandalsVisited: number;
  region: Region | "All";
  rank: number;
  badges: string[];
}
