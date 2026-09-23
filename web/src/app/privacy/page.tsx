import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "How Pujo Obhijaan collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-[var(--color-red)]" size={26} />
        <h1 className="text-[28px] font-bold text-[var(--color-text-primary)]">Privacy Policy</h1>
      </div>
      <p className="mt-1 text-sm text-[var(--color-text-light)]">Last updated: September 2026</p>

      <div className="prose-sections mt-6 space-y-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">1. What this covers</h2>
          <p>
            This policy explains what Pujo Obhijaan (&quot;we&quot;, &quot;the app&quot;) collects
            when you use the site at pujoobhijaan.vercel.app, and how it&apos;s used. Pujo Obhijaan
            is a pandal-hopping companion for Kolkata&apos;s Durga Puja — a map, itinerary planner,
            and a points/leaderboard game layered on top.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">2. What we collect</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Account info:</strong> your email address, and a display name — either one you
              type at sign-up, or your name from your Google account if you sign in with Google.
            </li>
            <li>
              <strong>Activity you generate:</strong> pandals you check into, star ratings you leave
              (location, decoration, crowd, food &amp; vibe), itineraries you build, and referral
              links you share or use. This is what powers your points and leaderboard rank.
            </li>
            <li>
              <strong>Location, only when you ask for it:</strong> if you tap &quot;Find My
              Location&quot; or check in on the map, your device&apos;s GPS coordinates at that
              moment are stored against that check-in. We don&apos;t track your location
              continuously or in the background.
            </li>
            <li>
              <strong>Basic technical data:</strong> standard server logs (via our hosting and
              database providers) that any web app generates — things like request timestamps and
              error logs, used only for keeping the site running.
            </li>
          </ul>
          <p className="mt-2">
            We don&apos;t run third-party ad networks or analytics trackers on this site. No data is
            sold to anyone.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">3. How we use it</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>To create and secure your account, and remember you&apos;re signed in.</li>
            <li>To calculate your points, rank you on the leaderboard, and credit referrals.</li>
            <li>To show your check-ins, ratings, and saved itineraries back to you.</li>
            <li>To suggest nearby pandals when you share your location on the map.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            4. Who else sees it
          </h2>
          <p>Your data passes through a small number of service providers that run the app:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
              <strong>Supabase</strong> — hosts our database and handles sign-in (email links and
              Google OAuth). Your account data and activity live here.
            </li>
            <li>
              <strong>Google</strong> — if you choose &quot;Sign in with Google&quot;, Google
              authenticates you and shares your name/email with us, per Google&apos;s own privacy
              policy.
            </li>
            <li>
              <strong>Vercel</strong> — hosts the website itself.
            </li>
          </ul>
          <p className="mt-2">
            Some activity is visible to other users by design: your display name, username, points,
            rank, and check-in count appear on the public leaderboard. Star ratings you leave on
            pandals are visible to everyone browsing that pandal (as an aggregate, not attributed to
            your name).
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            5. Your choices
          </h2>
          <p>
            You can sign out at any time. Location sharing is opt-in per action — declining it just
            means the map can&apos;t suggest nearby pandals for you. To have your account and data
            deleted, contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            6. Children
          </h2>
          <p>Pujo Obhijaan isn&apos;t directed at children under 13, and we don&apos;t knowingly collect data from them.</p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            7. Changes to this policy
          </h2>
          <p>
            If this policy changes in a meaningful way, we&apos;ll update the date at the top of this
            page.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">8. Contact</h2>
          <p>
            Questions about your data, or want it deleted? Reach out via the{" "}
            <Link href="/" className="text-[var(--color-red)] underline">
              contact channels listed on the site
            </Link>
            , or through our Instagram/Facebook linked in the footer.
          </p>
        </section>
      </div>
    </div>
  );
}
