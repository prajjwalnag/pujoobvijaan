import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern using Pujo Obhijaan.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2">
        <FileText className="text-[var(--color-red)]" size={26} />
        <h1 className="text-[28px] font-bold text-[var(--color-text-primary)]">Terms of Service</h1>
      </div>
      <p className="mt-1 text-sm text-[var(--color-text-light)]">Last updated: September 2026</p>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">1. Using Pujo Obhijaan</h2>
          <p>
            By creating an account or using pujoobhijaan.vercel.app (&quot;the app&quot;), you agree
            to these terms. The app is a free companion for exploring Kolkata&apos;s Durga Puja
            pandals — a map, an itinerary planner, and a points/leaderboard game. It&apos;s a
            personal/independent project, not affiliated with any puja committee, government body,
            or the pandals it lists.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">2. Accounts</h2>
          <p>
            You can sign up with an email magic link or with Google. You&apos;re responsible for
            whatever happens under your account, and for keeping access to the email or Google
            account it&apos;s tied to. One account per person — creating multiple accounts to farm
            points, check-ins, or referral bonuses isn&apos;t allowed and may get those accounts
            reset or removed.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            3. Points, ranks, and referrals
          </h2>
          <p>
            Points, leaderboard rank, and badges exist purely for fun inside the app — they have no
            cash value, can&apos;t be transferred, exchanged, or redeemed for anything, and we can
            adjust the scoring rules or reset balances at any time (for example, to fix a bug or
            close an exploit). Referral bonuses are only paid out for a genuinely new person signing
            up through your link; gaming that system voids the bonus.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            4. Ratings and content you submit
          </h2>
          <p>
            When you rate a pandal, submit a referral, or otherwise add content, you&apos;re
            confirming it&apos;s honest and your own. We can remove content that&apos;s abusive,
            fake, or spam, and restrict accounts that repeatedly post it.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            5. Location, safety, and the SOS numbers
          </h2>
          <p>
            Map data, pandal locations, crowd-size tiers, and directions are best-effort and may be
            inaccurate, outdated, or approximate — don&apos;t rely on them as your only source when
            planning around safety, road closures, or crowd control during the festival. The SOS
            shortcut in the app links to public emergency numbers (police, fire, women&apos;s
            helpline) for convenience only; it does not contact us, and we&apos;re not an emergency
            service.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            6. No warranty
          </h2>
          <p>
            The app is provided &quot;as is&quot;, without warranties of any kind. We don&apos;t
            guarantee it&apos;ll be error-free, always available, or that pandal information is
            complete or current.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">
            7. Changes
          </h2>
          <p>
            We may update these terms or the app&apos;s features over time. Continuing to use the
            app after a change means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-base font-bold text-[var(--color-text-primary)]">8. Contact</h2>
          <p>Questions about these terms? Reach out through Instagram or Facebook, linked in the footer.</p>
        </section>
      </div>
    </div>
  );
}
