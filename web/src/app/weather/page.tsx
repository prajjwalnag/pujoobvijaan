import { CloudSun } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

export default function WeatherPage() {
  return (
    <AuthGate
      icon={CloudSun}
      title="Weather & Crowd Insights"
      description="Sign in to access real-time weather conditions and crowd insights for optimal pandal hopping during Durga Puja 2026."
    />
  );
}
