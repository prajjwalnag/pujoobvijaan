import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Durga Puja Guide & Pandal Hopping Tips",
  description:
    "Complete guide to Durga Puja celebrations in Kolkata, best pandals to visit, practical tips for pandal hopping, and how to make the most of Pujo Obhijaan app.",
  alternates: { canonical: "/guide" },
};

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-[var(--color-red)] mb-4">
        The Complete Durga Puja Guide for Kolkata
      </h1>

      <div className="mb-8 rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
        <p className="text-[var(--color-text-secondary)]">
          Last updated: October 2026 | Learn about Durga Puja celebrations and master the art of pandal hopping with Pujo Obhijaan
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          What is Durga Puja?
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          Durga Puja is the most significant festival celebrated in Bengal, particularly in Kolkata. Observed in the month of October (or Kartik according to the Bengali calendar), it commemorates the victory of the Goddess Durga over the buffalo demon Mahishasura, symbolizing the triumph of good over evil.
        </p>
        <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          The festival spans five days, from Maha Shashthi through Vijaya Dashami, attracting millions of visitors to Kolkata. During this time, elaborate temporary structures called pandals are erected throughout the city, each showcasing unique themes and artistic excellence.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          The Dates of Durga Puja 2026
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">Maha Shashthi</h3>
            <p className="text-[var(--color-text-secondary)]">October 16 • Preparation day</p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">Maha Saptami</h3>
            <p className="text-[var(--color-text-secondary)]">October 17 • Major day of worship</p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">Maha Ashtami & Navami</h3>
            <p className="text-[var(--color-text-secondary)]">October 18-19 • Peak celebration days</p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">Bijaya Dashami</h3>
            <p className="text-[var(--color-text-secondary)]">October 20 • Conclusion & victory day</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Pandal Hopping Tips
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">🕐 Plan Your Timing</h3>
            <p className="text-[var(--color-text-secondary)]">
              Visit pandals in the evening (6 PM - 11 PM) for the best experience and to avoid daytime crowds. Early mornings are quieter if you prefer less crowded pandals.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">📍 Use the Interactive Map</h3>
            <p className="text-[var(--color-text-secondary)]">
              Open <Link href="/map" className="text-[var(--color-red)] hover:underline font-semibold">Pujo Obhijaan's interactive map</Link> to discover all 1900+ pandals across Kolkata. Filter by region, crowd level, and theme to find pandals that interest you.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">⚡ Optimize Your Route</h3>
            <p className="text-[var(--color-text-secondary)]">
              Select multiple pandals and let Pujo Obhijaan's AI route optimizer plan your journey. Save hours by visiting pandals in the most efficient order.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">🅿️ Find Parking & Toilets</h3>
            <p className="text-[var(--color-text-secondary)]">
              Locate parking spaces and public toilets near pandals before you visit. Check hours, fees, and facility details on the map.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">🎫 Browse Pandals First</h3>
            <p className="text-[var(--color-text-secondary)]">
              Start by <Link href="/pandals" className="text-[var(--color-red)] hover:underline font-semibold">browsing all pandals</Link> to get a sense of what's available. Read descriptions, check crowd levels, and save your favorites.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">👕 Wear Comfortable Clothes</h3>
            <p className="text-[var(--color-text-secondary)]">
              Pandals can get crowded. Wear comfortable shoes and light clothing. Carry water and a small backpack for essentials.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">📸 Respect Photography Rules</h3>
            <p className="text-[var(--color-text-secondary)]">
              Some pandals may restrict photography or have specific rules. Always respect these guidelines and ask organizers for permission before clicking photos.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Top Regions to Explore
        </h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">🏛️ Central Kolkata</h3>
            <p className="text-[var(--color-text-secondary)]">
              Home to iconic pandals at Rabindra Sarovar, Victoria Memorial, and Park Street areas. These are often high-budget productions with themed displays.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">🌆 South Kolkata</h3>
            <p className="text-[var(--color-text-secondary)]">
              Premium pandals in Alipore, Kalighat, and Ballygunj. Known for elaborate designs and significant artistic contributions.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">📍 North Kolkata</h3>
            <p className="text-[var(--color-text-secondary)]">
              Traditional and heritage pandals. Explore areas like Shobhabazaar, Balusters, and Belgachia for authentic cultural experiences.
            </p>
          </div>
          <div className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <h3 className="font-bold text-[var(--color-red)] mb-2">🌳 East Kolkata</h3>
            <p className="text-[var(--color-text-secondary)]">
              Dakshineswar, Salt Lake, and surrounding areas with a mix of traditional and modern pandals. Perfect for experiencing Puja in residential neighborhoods.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          How to Use Pujo Obhijaan
        </h2>
        <ol className="space-y-4">
          <li className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <span className="font-bold text-[var(--color-red)]">1. Browse Pandals</span>
            <p className="text-[var(--color-text-secondary)] mt-2">
              Start by exploring all 1900+ pandals on our platform. Filter by region, crowd level, and theme to narrow down your preferences.
            </p>
          </li>
          <li className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <span className="font-bold text-[var(--color-red)]">2. Plan Your Route</span>
            <p className="text-[var(--color-text-secondary)] mt-2">
              Open the interactive map and select multiple pandals you want to visit. Our AI route optimizer will automatically create the most efficient path.
            </p>
          </li>
          <li className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <span className="font-bold text-[var(--color-red)]">3. Find Facilities</span>
            <p className="text-[var(--color-text-secondary)] mt-2">
              Toggle parking and toilet overlays on the map to locate nearby facilities. Check hours, fees, and availability information.
            </p>
          </li>
          <li className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <span className="font-bold text-[var(--color-red)]">4. Check In & Earn Points</span>
            <p className="text-[var(--color-text-secondary)] mt-2">
              Visit each pandal and check in using GPS verification. <Link href="/earn" className="text-[var(--color-red)] hover:underline font-semibold">Earn points</Link> for every pandal you visit and unlock achievements.
            </p>
          </li>
          <li className="rounded-lg bg-[var(--color-bg-secondary)] p-6 border border-[var(--color-border)]">
            <span className="font-bold text-[var(--color-red)]">5. Compete & Share</span>
            <p className="text-[var(--color-text-secondary)] mt-2">
              Climb the <Link href="/leaderboard" className="text-[var(--color-red)] hover:underline font-semibold">leaderboard</Link> and compete with other Puja explorers. Share your itineraries and challenge friends to beat your records.
            </p>
          </li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Best Practices for Pandal Visits
        </h2>
        <ul className="space-y-3 text-[var(--color-text-secondary)]">
          <li className="flex gap-2">
            <span className="font-bold text-[var(--color-red)]">•</span>
            <span>Respect the sanctity of the worship space while exploring pandals</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-[var(--color-red)]">•</span>
            <span>Keep your belongings secure in crowded areas</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-[var(--color-red)]">•</span>
            <span>Support local vendors and artisans by purchasing prasad and handicrafts</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-[var(--color-red)]">•</span>
            <span>Use public transportation or arrange shared rides to reduce traffic congestion</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-[var(--color-red)]">•</span>
            <span>Stay hydrated and take breaks during your pandal hopping journey</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-[var(--color-red)]">•</span>
            <span>Follow COVID-19 safety guidelines if applicable</span>
          </li>
        </ul>
      </section>

      <section className="rounded-lg bg-gradient-to-r from-[var(--color-red)]/10 to-[var(--color-gold)]/10 p-8 border-2 border-[var(--color-red)]">
        <h2 className="text-2xl font-bold text-[var(--color-red)] mb-4">
          🎮 Ready to Start Your Pandal Hopping Adventure?
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Download Pujo Obhijaan today and turn your pandal hopping into an exciting game. Explore 1900+ pandals, optimize your routes, find parking and toilets, earn points, and compete with other Puja explorers!
        </p>
        <a
          href="/pandals"
          className="inline-block rounded-lg bg-[var(--color-red)] text-white px-6 py-3 font-semibold hover:bg-[var(--color-red)]/90 transition-colors"
        >
          Explore Pandals Now
        </a>
      </section>
    </article>
  );
}
