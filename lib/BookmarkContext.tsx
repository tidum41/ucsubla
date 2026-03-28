'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface BookmarkContextValue {
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);
const STORAGE_KEY = 'bruinlease-bookmarks';

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarkedIds(JSON.parse(stored));
    } catch {}
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkContextValue {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider');
  return ctx;
}
