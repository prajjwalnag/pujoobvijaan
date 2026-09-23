import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat with Tithi",
  description: "Sign in to chat with Tithi, your Durga Puja planning assistant.",
  robots: { index: false, follow: true },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
