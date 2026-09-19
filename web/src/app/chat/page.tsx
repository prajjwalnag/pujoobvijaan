import { MessageCircle } from "lucide-react";
import { AuthGate } from "@/components/AuthGate";

export default function ChatPage() {
  return (
    <AuthGate
      icon={MessageCircle}
      title="Chat with Tithi"
      description="Sign in to access personalized assistance and chat with Tithi for your Durga Puja planning needs."
    />
  );
}
