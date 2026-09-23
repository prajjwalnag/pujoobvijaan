import { Coins, MapPin, Star, Compass, CalendarDays, UserPlus } from "lucide-react";
import type { EarnWay } from "@/components/EarnSlider";

export const WAYS_TO_EARN: EarnWay[] = [
  {
    icon: <Coins size={16} />,
    title: "Sign up",
    points: "+50",
    description: "One-time bonus the moment you create your account — email or Google, either works.",
  },
  {
    icon: <MapPin size={16} />,
    title: "Check in to a pandal",
    points: "+10–20",
    description:
      "+10 base, plus a hidden-gem bonus: +5 for Medium pandals, +10 for Small ones. Big, famous pandals pay the base only — exploring beyond the obvious ones pays off more.",
  },
  {
    icon: <Star size={16} />,
    title: "Rate a pandal",
    points: "+5",
    description:
      "Flat, once per pandal. Rate Location, Decoration, Crowd, and Food & Vibe all at once — you don't have to check in first.",
  },
  {
    icon: <Compass size={16} />,
    title: "Check in to a new Area",
    points: "+15",
    description:
      "Bonus the first time you check in anywhere within an Area you haven't visited yet — rewards spreading out across the city instead of clustering in one neighbourhood.",
  },
  {
    icon: <CalendarDays size={16} />,
    title: "Build an itinerary",
    points: "+20",
    description: "Flat, per itinerary you create and save — on the map's Route Builder or the Itinerary page.",
  },
  {
    icon: <UserPlus size={16} />,
    title: "Invite a friend",
    points: "+15",
    description:
      "Paid to you the moment someone actually signs up through your personal referral link below — verified against a real new account, not self-reported.",
  },
];
