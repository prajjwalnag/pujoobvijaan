import type { Pandal, Region } from "./types";

const themes = [
  "Traditional",
  "Contemporary",
  "Eco-Friendly",
  "Heritage Revival",
  "Modern Art",
];

const regionCenters: Record<Region, { lat: number; lng: number }> = {
  "North Kolkata": { lat: 22.597, lng: 88.37 },
  "South Kolkata": { lat: 22.5, lng: 88.35 },
  "Central Kolkata": { lat: 22.565, lng: 88.35 },
  "East Kolkata": { lat: 22.57, lng: 88.42 },
  "West Kolkata": { lat: 22.585, lng: 88.31 },
};

function jitter(base: number, spread = 0.02) {
  return +(base + (Math.random() - 0.5) * spread).toFixed(4);
}

interface Seed {
  name: string;
  region: Region;
  metro: { station: string; line: string } | null;
  crowdLevel: "high" | "medium" | "low";
  rating: number;
}

const seeds: Seed[] = [
  { name: "Hatibagan Sarbojanin", region: "North Kolkata", metro: { station: "Shyambazar", line: "Blue" }, crowdLevel: "high", rating: 4.5 },
  { name: "Bagbazar Sarbojanin", region: "North Kolkata", metro: { station: "Shyambazar", line: "Blue" }, crowdLevel: "medium", rating: 4.3 },
  { name: "Kumartuli Park", region: "North Kolkata", metro: { station: "Shobhabazar Sutanuti", line: "Blue" }, crowdLevel: "medium", rating: 4.2 },
  { name: "Shyambazar Sporting Club", region: "North Kolkata", metro: { station: "Shyambazar", line: "Blue" }, crowdLevel: "medium", rating: 4.0 },
  { name: "Ahiritola Sarbojanin", region: "North Kolkata", metro: { station: "Girish Park", line: "Blue" }, crowdLevel: "low", rating: 3.9 },
  { name: "College Square", region: "Central Kolkata", metro: { station: "Central", line: "Blue" }, crowdLevel: "high", rating: 4.6 },
  { name: "Maddox Square", region: "Central Kolkata", metro: { station: "Rabindra Sadan", line: "Blue" }, crowdLevel: "high", rating: 4.4 },
  { name: "Park Circus Maidan", region: "Central Kolkata", metro: { station: "Park Circus", line: "Orange" }, crowdLevel: "medium", rating: 4.1 },
  { name: "Kalighat Milan Sangha", region: "South Kolkata", metro: { station: "Kalighat", line: "Blue" }, crowdLevel: "medium", rating: 4.2 },
  { name: "Ekdalia Evergreen", region: "South Kolkata", metro: { station: "Kalighat", line: "Blue" }, crowdLevel: "high", rating: 4.5 },
  { name: "Mudiali Club", region: "South Kolkata", metro: { station: "Jatin Das Park", line: "Blue" }, crowdLevel: "medium", rating: 4.0 },
  { name: "Ballygunge Cultural", region: "South Kolkata", metro: { station: "Ballygunge", line: "Orange" }, crowdLevel: "low", rating: 3.8 },
  { name: "Tridhara Sammilani", region: "South Kolkata", metro: { station: "Netaji Bhavan", line: "Blue" }, crowdLevel: "medium", rating: 4.3 },
  { name: "Singhi Park", region: "South Kolkata", metro: { station: "Rabindra Sarobar", line: "Blue" }, crowdLevel: "medium", rating: 4.1 },
  { name: "Jodhpur Park", region: "South Kolkata", metro: { station: "Jodhpur Park", line: "Orange" }, crowdLevel: "low", rating: 3.9 },
  { name: "Salt Lake FD Block", region: "East Kolkata", metro: { station: "Central Park", line: "Green" }, crowdLevel: "medium", rating: 4.0 },
  { name: "Salt Lake AK Block", region: "East Kolkata", metro: { station: "City Centre", line: "Green" }, crowdLevel: "low", rating: 3.7 },
  { name: "Krishnapur Sarbojanin", region: "East Kolkata", metro: null, crowdLevel: "low", rating: 3.6 },
  { name: "Dum Dum Park Bharat Chakra", region: "East Kolkata", metro: { station: "Dum Dum", line: "Blue" }, crowdLevel: "medium", rating: 4.1 },
  { name: "Behala Nutan Dal", region: "West Kolkata", metro: { station: "Behala Chowrasta", line: "Purple" }, crowdLevel: "medium", rating: 4.0 },
  { name: "Barisha Club", region: "West Kolkata", metro: { station: "Barisha", line: "Purple" }, crowdLevel: "low", rating: 3.8 },
  { name: "Alipore Sarbojanin", region: "West Kolkata", metro: { station: "Netaji Bhavan", line: "Blue" }, crowdLevel: "medium", rating: 4.2 },
  { name: "New Alipore Suruchi Sangha", region: "West Kolkata", metro: { station: "Majerhat", line: "Purple" }, crowdLevel: "high", rating: 4.4 },
  { name: "Chetla Agrani", region: "West Kolkata", metro: { station: "Netaji Bhavan", line: "Blue" }, crowdLevel: "medium", rating: 4.1 },
];

export const pandals: Pandal[] = seeds.map((seed, i) => {
  const center = regionCenters[seed.region];
  const theme = themes[i % themes.length];
  return {
    id: `pandal-${i + 1}`,
    name: seed.name,
    region: seed.region,
    coordinates: { lat: jitter(center.lat), lng: jitter(center.lng) },
    rating: seed.rating,
    theme,
    crowdLevel: seed.crowdLevel,
    visitingHours: { open: "12:00 AM", close: "12:00 PM" },
    nearestMetro: seed.metro,
    accessPoints: seed.metro ? [`${seed.metro.station} Station`] : ["Nearest bus stand"],
    description: `${seed.name} is a ${theme.toLowerCase()} themed pandal in ${seed.region}, known for its ${seed.crowdLevel} footfall and vibrant celebrations during Durga Puja.`,
    tags: [theme.toLowerCase(), seed.crowdLevel === "high" ? "popular" : "hidden-gem"],
  };
});

export const pandalStats = {
  total: pandals.length,
  highCrowd: pandals.filter((p) => p.crowdLevel === "high").length,
  mediumCrowd: pandals.filter((p) => p.crowdLevel === "medium").length,
  lowCrowd: pandals.filter((p) => p.crowdLevel === "low").length,
  metroConnected: pandals.filter((p) => p.nearestMetro !== null).length,
};

export const regions: Region[] = [
  "North Kolkata",
  "South Kolkata",
  "Central Kolkata",
  "East Kolkata",
  "West Kolkata",
];
