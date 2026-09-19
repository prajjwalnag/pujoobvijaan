export type CrowdLevel = "high" | "medium" | "low";

export type Region =
  | "North Kolkata"
  | "South Kolkata"
  | "Central Kolkata"
  | "East Kolkata"
  | "West Kolkata";

export interface Pandal {
  id: string;
  name: string;
  region: Region;
  coordinates: { lat: number; lng: number };
  rating: number;
  theme: string;
  crowdLevel: CrowdLevel;
  visitingHours: { open: string; close: string };
  nearestMetro: { station: string; line: string } | null;
  accessPoints: string[];
  description: string;
  tags: string[];
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
