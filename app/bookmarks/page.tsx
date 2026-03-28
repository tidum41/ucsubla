'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/common/Icon';
import BottomNav from '@/components/layout/BottomNav';
import ListingCard from '@/components/listings/ListingCard';
import { mockListings } from '@/lib/mockData';
import { useBookmarks } from '@/lib/BookmarkContext';

export default function BookmarksPage() {
  const { bookmarkedIds, toggleBookmark } = useBookmarks();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 350);
    return () => clearTimeout(t);
  }, []);

  const bookmarkedListings = mockListings.filter((listing) =>
    bookmarkedIds.includes(listing.id)
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
    {/* Header — static, outside animated content */}
    <div className="blurHeader app-container">
      <div className="blurHeaderContent">
        <h1 className="text-h1 text-darkSlate">Saved Listings</h1>
      </div>
    </div>

    <div className="min-h-screen pb-28 bg-background app-container">
      {/* Spacer for fixed nav */}
      <div className="h-[52px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      {/* Content */}
      <main className="px-5 pt-4">
        {!isLoaded ? (
          <div className="space-y-4">
            {[0, 1, 2].map(i => <ListingSkeleton key={i} />)}
          </div>
        ) : bookmarkedListings.length > 0 ? (
          <div className="space-y-4">
            {bookmarkedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isBookmarked={bookmarkedIds.includes(listing.id)}
                onBookmarkToggle={toggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon name="bookmark" size={64} className="text-lightSlate mx-auto mb-4" />
            <h2 className="text-h2 text-darkSlate mb-2">No saved listings</h2>
            <p className="text-body text-slateGray">
              Bookmark listings to save them for later
            </p>
          </div>
        )}
      </main>

    </div>
    <BottomNav />
    </>
  );
}
