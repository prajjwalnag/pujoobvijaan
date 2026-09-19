import { CalendarDays } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

export default function ItineraryPage() {
  return (
    <AuthGate
      icon={CalendarDays}
      title="Plan Your Pandal Journey"
      description="Sign in to create and save personalized itineraries for Durga Puja 2026."
    />
  );
}
