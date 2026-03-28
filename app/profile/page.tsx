'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Icon from '@/components/common/Icon';
import BottomNav from '@/components/layout/BottomNav';
import { mockUser, mockListings } from '@/lib/mockData';
import { getInitials } from '@/lib/utils';
import { useBookmarks } from '@/lib/BookmarkContext';

export default function ProfilePage() {
  const router = useRouter();
  const { bookmarkedIds } = useBookmarks();
  const [displayName, setDisplayName] = useState(mockUser.name);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user-profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name) setDisplayName(parsed.name);
    }
    const t = setTimeout(() => setIsLoaded(true), 350);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const userListings = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user-listings') || '[]')
    : [];
  const myListingsCount = mockListings.filter((l) => l.listerId === mockUser.id).length + userListings.length;

  const menuItems = [
    {
      icon: 'house',
      label: 'My Listings',
      count: myListingsCount,
      onClick: () => router.push('/my-listings'),
    },
    {
      icon: 'bookmark',
      label: 'Saved',
      count: bookmarkedIds.length,
      onClick: () => router.push('/bookmarks'),
    },
    {
      icon: 'person',
      label: 'Account Settings',
      onClick: () => router.push('/settings'),
    },
    {
      icon: 'checkmark.seal.fill',
      label: 'Verification',
      badge: mockUser.verifiedUCLA ? 'Verified' : 'Not Verified',
      onClick: () => showToast('UCLA verification coming soon'),
    },
  ];

  return (
    <>
    {/* Header — static, outside animated content */}
    <div className="blurHeader app-container">
      <div className="blurHeaderContent">
        <h1 className="text-h1 text-darkSlate">Profile</h1>
      </div>
    </div>

    <div className="min-h-screen pb-20 bg-background app-container">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-darkSlate text-white text-small font-medium px-4 py-2 rounded-full shadow-elevated whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="h-[52px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      {!isLoaded ? (
        <div className="px-5 pt-4">
          {/* Avatar + name skeleton */}
          <div className="card p-5 mb-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="skeleton-shimmer w-16 h-16 rounded-full flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="skeleton-shimmer h-5 w-32 rounded-md" />
                <div className="skeleton-shimmer h-3 w-44 rounded-md" />
              </div>
            </div>
          </div>
          {/* Menu item skeletons */}
          <div className="space-y-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="skeleton-shimmer h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Profile Info */}
          <div className="px-5 pt-4 mb-6">
            <div className="card p-5">
              <button
                onClick={() => router.push('/profile/edit')}
                className="flex items-center gap-3 mb-3 w-full text-left hover:opacity-80 transition-opacity"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-uclaBlue flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-xl">
                    {getInitials(displayName)}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h2 className="text-h2 text-darkSlate">{displayName}</h2>
                  <p className="text-body text-slateGray">{mockUser.email}</p>
                </div>

                <Icon name="chevron.right" size={18} className="text-lightSlate" />
              </button>

              {/* Verification Badge */}
              {mockUser.verifiedUCLA && (
                <div className="bg-uclaBlue/10 border border-uclaBlue/20 rounded-lg px-3 py-2 flex items-center gap-2">
                  <Icon name="checkmark.seal.fill" size={16} className="text-uclaBlue" />
                  <span className="text-small text-uclaBlue font-medium">
                    Verified UCLA Student
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="px-5 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full card p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon name={item.icon} size={20} className="text-uclaBlue" />
                  </div>
                  <span className="text-body text-darkSlate font-medium">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.count !== undefined && (
                    <span className="text-small text-slateGray">{item.count}</span>
                  )}
                  {item.badge && (
                    <span className="text-small text-uclaBlue font-medium">
                      {item.badge}
                    </span>
                  )}
                  <Icon name="chevron.right" size={20} className="text-slateGray" />
                </div>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-5 mt-6">
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-body text-red-500 font-medium hover:bg-red-50 transition-colors"
            >
              Log Out
            </button>
          </div>
        </>
      )}

    </div>
    <BottomNav />
    </>
  );
}
