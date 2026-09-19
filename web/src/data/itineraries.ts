import type { Itinerary } from "./types";

// Dummy/sample itineraries for demo purposes — real user-created itineraries
// need auth (see AuthGate elsewhere) and aren't built yet. Stops are real
// pandals from pandals.ts, hand-picked to actually sit near each other
// (mostly within one Area from areas.ts), not random.
export const itineraries: Itinerary[] = [
  {
    id: "itin-north-heritage",
    title: "North Kolkata Heritage Walk",
    description:
      "A compact walking loop through some of North Kolkata's oldest, most traditional pujas — Jorasanko/Shyambazar side.",
    mode: "walk",
    stops: [
      { pandalId: "north-kolkata-65", scheduledTime: "5:00 PM" }, // Sovabazar Sarbojanin
      { pandalId: "north-kolkata-39", scheduledTime: "6:00 PM" }, // Kashi Bose Lane
      { pandalId: "north-kolkata-48", scheduledTime: "7:00 PM" }, // Nalin Sarkar Street
      { pandalId: "north-kolkata-45", scheduledTime: "8:00 PM" }, // Mohan Bagan Barwari
    ],
  },
  {
    id: "itin-ballygunge-elegance",
    title: "Ballygunge Elegance Loop",
    description:
      "South Kolkata's most decorated cluster — big-budget, big-crowd pujas all within a short walk of each other.",
    mode: "walk",
    stops: [
      { pandalId: "south-kolkata-94", scheduledTime: "6:00 PM" }, // Ballygunge Cultural
      { pandalId: "south-kolkata-122", scheduledTime: "7:00 PM" }, // Ekdalia Evergreen
      { pandalId: "south-kolkata-178", scheduledTime: "8:00 PM" }, // Singhi Park
      { pandalId: "south-kolkata-182", scheduledTime: "9:00 PM" }, // Tridhara Sammilani
      { pandalId: "south-kolkata-119", scheduledTime: "10:00 PM" }, // Deshapriya Park
    ],
  },
  {
    id: "itin-college-street",
    title: "College Street & Central Classics",
    description: "Books, sweets, and three of Central Kolkata's headline pujas in one evening.",
    mode: "walk",
    stops: [
      { pandalId: "central-kolkata-192", scheduledTime: "4:30 PM" }, // College Square
      { pandalId: "central-kolkata-198", scheduledTime: "5:30 PM" }, // Md. Ali Park
      { pandalId: "central-kolkata-201", scheduledTime: "6:30 PM" }, // Santosh Mitra Square
    ],
  },
  {
    id: "itin-greatest-hits",
    title: "Kolkata Greatest Hits",
    description:
      "The city's most famous pujas, spread across regions — needs a car or metro between stops, not a walking route.",
    mode: "transit",
    stops: [
      { pandalId: "north-kolkata-34", scheduledTime: "3:00 PM" }, // Hatibagan Nabinpally
      { pandalId: "north-kolkata-40", scheduledTime: "4:30 PM" }, // Kumartuli Park
      { pandalId: "north-kolkata-66", scheduledTime: "6:00 PM" }, // Sreebhumi Sporting Club
      { pandalId: "south-kolkata-154", scheduledTime: "9:00 PM" }, // New Alipore Suruchi Sangha
    ],
  },
];
