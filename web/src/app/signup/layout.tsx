import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Pujo Obhijaan account to check in to pandals, build itineraries, and earn points.",
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
