// Module-level singleton — persists across client-side navigations.
// Tracks which listing ID triggered a view transition so the matching
// card can apply `view-transition-name: listing-hero` on back navigation.

let activeListingId: string | null = null;

export const getActiveListingId = () => activeListingId;
export const setActiveListingId = (id: string | null) => {
  activeListingId = id;
};
