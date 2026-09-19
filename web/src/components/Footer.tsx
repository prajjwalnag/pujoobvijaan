function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-main)] py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Made with ❤️ by <span className="font-semibold text-[var(--color-red)]">MWR Agency</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-red)]"
          >
            <FacebookIcon />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-red)]"
          >
            <InstagramIcon />
          </a>
        </div>
        <p className="text-sm text-[var(--color-text-light)]">
          Copyright © 2026 Pujo Obhijaan
        </p>
      </div>
    </footer>
  );
}
