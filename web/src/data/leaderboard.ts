import type { LeaderboardEntry } from "./types";

const names = [
  "Anwesha Roy",
  "Sourav Dutta",
  "Priya Banerjee",
  "Rahul Sen",
  "Ishita Chatterjee",
  "Arnab Ghosh",
  "Debolina Mitra",
  "Kaustav Das",
  "Riya Bose",
  "Sayan Chakraborty",
  "Trina Saha",
  "Abhirup Nandi",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const badgePool = [
  "North Kolkata Complete",
  "Night Owl",
  "Early Bird",
  "10 in a Day",
  "Low-Crowd Explorer",
  "Streak x5",
];

export const leaderboard: LeaderboardEntry[] = names
  .map((name, i) => {
    const points = 620 - i * 47 + Math.round(Math.random() * 20);
    return {
      userId: `user-${i + 1}`,
      name,
      avatarInitials: initials(name),
      points: Math.max(points, 15),
      pandalsVisited: Math.max(Math.round(points / 40), 1),
      region: "All" as const,
      rank: 0,
      badges: badgePool.filter(() => Math.random() > 0.6).slice(0, 2),
    };
  })
  .sort((a, b) => b.points - a.points)
  .map((entry, i) => ({ ...entry, rank: i + 1 }));

export const currentUser: LeaderboardEntry = {
  userId: "current-user",
  name: "You",
  avatarInitials: "Y",
  points: 240,
  pandalsVisited: 6,
  region: "All",
  rank: 9,
  badges: ["Early Bird"],
};
