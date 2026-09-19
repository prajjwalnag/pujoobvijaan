import Link from "next/link";
import { Handshake, ChevronRight } from "lucide-react";
import { partners } from "@/data/partners";

// New admin sections belong here as more cards — Partners is the first,
// not the only one this page is built for.
const SECTIONS = [
  {
    href: "/admin/partners",
    icon: Handshake,
    title: "Partners",
    description: "Add and review brand partners shown in the site footer.",
    count: partners.length,
    countLabel: "committed",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-[700px] px-4 py-8 sm:px-6">
      <h1 className="text-[32px] font-bold text-[var(--color-text-primary)]">Admin</h1>
      <p className="mt-1 text-[var(--color-text-secondary)]">
        Manage the parts of Pujo Obhijaan that aren&apos;t self-serve for regular visitors.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors hover:border-[var(--color-red)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-red)]">
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-[var(--color-text-primary)]">{section.title}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{section.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-[var(--color-text-light)]">
                {section.count}
                <span className="hidden sm:inline">{section.countLabel}</span>
                <ChevronRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
