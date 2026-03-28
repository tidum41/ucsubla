'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ListingCard from '@/components/listings/ListingCard';
import FilterModal from '@/components/filters/FilterModal';
import { mockListings } from '@/lib/mockData';
import { useBookmarks } from '@/lib/BookmarkContext';
import { searchListings, filterListings } from '@/lib/utils';
import type { FilterState } from '@/lib/types';

export default function Home() {
  const { bookmarkedIds, toggleBookmark } = useBookmarks();
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [allListings, setAllListings] = useState(mockListings);
  const [filters, setFilters] = useState<FilterState>({
    verifiedOnly: false,
    moveInDate: null,
    moveOutDate: null,
    quarters: [],
    maxRent: 4000,
    maxDistance: 4,
    roomTypes: [],
    bathroomTypes: [],
    roommatePreferences: [],
    amenities: {},
  });

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 350);
    return () => clearTimeout(t);
  }, []);

  // Load filters and user listings from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('ucsubla-filters');
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch (e) {
        console.error('Failed to parse saved filters:', e);
      }
    }

    // Load user-created listings
    const userListings = JSON.parse(localStorage.getItem('user-listings') || '[]');
    setAllListings([...mockListings, ...userListings]);
  }, []);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Save to localStorage
    localStorage.setItem('ucsubla-filters', JSON.stringify(newFilters));
  };

  // Apply search and filters
  let displayedListings = allListings;
  if (searchQuery) {
    displayedListings = searchListings(displayedListings, searchQuery);
  }
  displayedListings = filterListings(displayedListings, filters);

  // Sort by most recent
  displayedListings = [...displayedListings].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const ListingSkeleton = () => (
    <div className="card overflow-hidden">
      <div className="skeleton-shimmer h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="skeleton-shimmer h-5 w-24 rounded-md" />
          <div className="skeleton-shimmer h-4 w-10 rounded-md" />
        </div>
        <div className="skeleton-shimmer h-4 w-2/3 rounded-md" />
        <div className="skeleton-shimmer h-3 w-1/2 rounded-md" />
        <div className="flex gap-2">
          <div className="skeleton-shimmer h-6 w-16 rounded-full" />
          <div className="skeleton-shimmer h-6 w-20 rounded-full" />
          <div className="skeleton-shimmer h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <>
    <Header
      onFilterClick={handleFilterClick}
      onSearchChange={handleSearchChange}
    />
    <div className="min-h-screen pb-28 bg-background app-container">
      {/* Spacer for fixed header */}
      <div className="h-[108px] safe-area-top" />

      <main className="px-5 pt-3">
        {/* Section heading */}
        <h2 className="text-h2 text-darkSlate mb-4">
          Newest listings near campus
        </h2>

        {/* Listings grid */}
        <div className="space-y-4">
          {!isLoaded ? (
            [0, 1, 2].map(i => <ListingSkeleton key={i} />)
          ) : displayedListings.length > 0 ? (
            displayedListings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isBookmarked={bookmarkedIds.includes(listing.id)}
                onBookmarkToggle={toggleBookmark}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-body text-slateGray">
                No listings found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={handleApplyFilters}
        resultCount={displayedListings.length}
      />
    </div>
    <BottomNav />
    </>
  );
}
