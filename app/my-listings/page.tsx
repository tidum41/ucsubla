'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import BottomNav from '@/components/layout/BottomNav';
import { mockListings, mockUser } from '@/lib/mockData';
import { formatPrice, formatDateRange } from '@/lib/utils';
import type { Listing } from '@/lib/types';

export default function MyListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const userListings: Listing[] = JSON.parse(localStorage.getItem('user-listings') || '[]');
    const mockOwned = mockListings.filter((l) => l.listerId === mockUser.id);
    setListings([...mockOwned, ...userListings]);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleDelete = (listingId: string) => {
    // Only allow deleting user-created listings (not mock ones)
    const userListings: Listing[] = JSON.parse(localStorage.getItem('user-listings') || '[]');
    const updated = userListings.filter((l) => l.id !== listingId);
    localStorage.setItem('user-listings', JSON.stringify(updated));
    setListings(prev => prev.filter((l) => l.id !== listingId));
    showToast('Listing removed');
  };

  const isMockListing = (listingId: string) => mockListings.some((l) => l.id === listingId);

  return (
    <div className="min-h-screen pb-24 bg-background app-container">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-darkSlate text-white text-small font-medium px-4 py-2 rounded-full shadow-elevated whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="blurHeaderWithNav app-container">
        <div className="blurHeaderWithNavContent">
          <button
            onClick={() => router.back()}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors -ml-1.5"
          >
            <Icon name="chevron.left" size={24} className="text-darkSlate" />
          </button>
          <h1 className="text-h2 text-darkSlate font-semibold">My Listings</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[60px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      {listings.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-uclaBlue/10 flex items-center justify-center mb-4">
            <Icon name="house" size={28} className="text-uclaBlue" />
          </div>
          <h2 className="text-h2 text-darkSlate mb-1">No listings yet</h2>
          <p className="text-body text-slateGray mb-6">
            Post your first sublease to connect with UCLA students
          </p>
          <Link
            href="/listing/new"
            className="btn-primary shadow-elevated"
          >
            Create a Listing
          </Link>
        </div>
      ) : (
        /* Listings */
        <div className="px-5 pt-4 space-y-3">
          {listings.map((listing) => (
            <div key={listing.id} className="card overflow-hidden shadow-card border border-borderLight">
              {/* Image strip */}
              {listing.images[0] && (
                <Link href={`/listing/${listing.id}`}>
                  <div className="relative h-36 bg-gray-200 overflow-hidden">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Price pill */}
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 shadow-card">
                      <span className="text-sm font-semibold text-uclaBlue">
                        {formatPrice(listing.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Content */}
              <div className="p-4">
                <Link href={`/listing/${listing.id}`}>
                  <h3 className="text-h3 text-darkSlate line-clamp-1 mb-1">{listing.title}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="location.fill" size={14} className="text-slateGray" />
                    <span className="text-small text-slateGray truncate">{listing.address}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Icon name="calendar" size={14} className="text-slateGray" />
                    <span className="text-small text-slateGray">
                      {formatDateRange(listing.moveInDate, listing.moveOutDate)}
                    </span>
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => showToast('Editing listings coming soon')}
                    className="flex-1 border border-border rounded-[14px] py-2 text-small font-medium text-darkSlate hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </button>
                  {!isMockListing(listing.id) && (
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="flex-1 border border-red-200 rounded-[14px] py-2 text-small font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Create another */}
          <Link
            href="/listing/new"
            className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-border rounded-2xl py-4 text-body text-slateGray hover:border-uclaBlue hover:text-uclaBlue transition-colors"
          >
            <Icon name="plus" size={20} className="text-current" />
            <span>Add another listing</span>
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
