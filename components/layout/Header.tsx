'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '../common/Icon';

interface HeaderProps {
  onFilterClick?: () => void;
  onSearchChange?: (query: string) => void;
  hideSearch?: boolean;
  activeFilterCount?: number;
}

export default function Header({ onFilterClick, onSearchChange, hideSearch = false, activeFilterCount = 0 }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) onSearchChange(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearchChange) onSearchChange('');
  };

  return (
    <header className="blurHeaderLarge app-container">
      <div className="blurHeaderLargeContent">
        {/* Logo and List button */}
        <div className="flex items-center justify-between mb-1.5">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-uclaBlue rounded-lg p-1.5">
              <Icon name="graduationcap.fill" size={20} className="text-white" />
            </div>
            <h1 className="text-h1 text-uclaBlue">BruinLease</h1>
          </Link>

          <Link
            href="/listing/new"
            className="bg-uclaBlue text-white rounded-[18px] px-2.5 py-1.5 flex items-center gap-1 text-small font-medium hover:bg-[#25579e] active:scale-95 transition-all duration-150"
          >
            <Icon name="plus" size={16} className="text-white" />
            <span>List</span>
          </Link>
        </div>

        {/* Search bar and filter button */}
        {!hideSearch && (
          <div className="flex items-center bg-white border border-border rounded-full overflow-hidden">
            {/* Search input */}
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon name="search" size={16} className="text-lightSlate" strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Search streets, e.g. Kelton..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-transparent pl-8 pr-3 py-2 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none"
              />
              {searchQuery.length > 0 && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-lightSlate hover:text-slateGray transition-colors"
                  aria-label="Clear search"
                >
                  <Icon name="xmark" size={14} />
                </button>
              )}
            </div>

            {/* Filter button — divider + icon */}
            <button
              onClick={onFilterClick}
              className={`px-3 py-2 flex items-center justify-center border-l transition-colors flex-shrink-0 ${
                activeFilterCount > 0
                  ? 'border-uclaBlue text-uclaBlue'
                  : 'border-border text-slateGray hover:bg-gray-50'
              }`}
            >
              <Icon name="slider.horizontal.3" size={16} strokeWidth={2} className="text-current" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
