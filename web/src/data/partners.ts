import type { Partner } from "./types";

// No brands have actually onboarded yet — the outreach (see the "Brand
// Partnership Pitch" doc) hasn't gone out. Deliberately empty rather than
// filled with placeholder/fake logos; the Footer renders a "become a
// partner" state when this is empty and a real logo strip once it isn't.
//
// To add a real partner once one signs on:
// 1. Drop their logo file in web/public/partners/<file>.
// 2. Add an entry here: { id, name, logoUrl: "/partners/<file>", website, category }.
export const partners: Partner[] = [];
