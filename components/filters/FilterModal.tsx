'use client';

import { useState, useEffect, useRef } from 'react';
import Icon from '../common/Icon';
import RangeSlider from './RangeSlider';
import ToggleSwitch from './ToggleSwitch';
import ChipGroup from './ChipGroup';
import { formatPrice, countActiveFilters, filterListings } from '@/lib/utils';
import DatePickerField from '../common/DatePickerField';
import type { FilterState, Quarter, RoomType, BathroomType, RoommatePreference, Listing } from '@/lib/types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  listings: Listing[];
}

export default function FilterModal({
  isOpen,
  onClose,
  filters: initialFilters,
  onApply,
  listings,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [saveForNext, setSaveForNext] = useState(() => {
    try { return !!localStorage.getItem('ucsubla-saved-filters'); } catch { return false; }
  });

  const liveCount = filterListings(listings, filters).length;

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const [dragY, setDragY] = useState(0);
  const dragStartRef = useRef<number | null>(null);

  const handleDragStart = (e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientY;
  };
  const handleDragMove = (e: React.TouchEvent) => {
    if (dragStartRef.current === null) return;
    const delta = e.touches[0].clientY - dragStartRef.current;
    if (delta > 0) setDragY(delta);
  };
  const handleDragEnd = () => {
    if (dragY > 100) {
      setDragY(0);
      dragStartRef.current = null;
      onClose();
    } else {
      setDragY(0);
      dragStartRef.current = null;
    }
  };

  if (!isOpen) return null;

  const handleReset = () => {
    const resetFilters: FilterState = {
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
    };
    setFilters(resetFilters);
  };

  const handleApply = () => {
    if (saveForNext) {
      localStorage.setItem('ucsubla-saved-filters', JSON.stringify(filters));
    } else {
      localStorage.removeItem('ucsubla-saved-filters');
    }
    onApply(filters);
    onClose();
  };

  const QUARTER_DATES: Record<string, { moveIn: string; moveOut: string }> = {
    spring: { moveIn: '2026-03-25', moveOut: '2026-06-12' },
    summer: { moveIn: '2026-06-22', moveOut: '2026-09-11' },
    fall:   { moveIn: '2026-09-21', moveOut: '2026-12-11' },
    winter: { moveIn: '2027-01-04', moveOut: '2027-03-19' },
  };

  const handleQuarterChange = (quarters: string[]) => {
    const updated: FilterState = { ...filters, quarters: quarters as Quarter[] };
    if (quarters.length > 0) {
      const dates = quarters.map((q) => QUARTER_DATES[q]).filter(Boolean);
      updated.moveInDate  = dates.reduce((min, d) => d.moveIn  < min ? d.moveIn  : min, dates[0].moveIn);
      updated.moveOutDate = dates.reduce((max, d) => d.moveOut > max ? d.moveOut : max, dates[0].moveOut);
    } else {
      updated.moveInDate  = null;
      updated.moveOutDate = null;
    }
    setFilters(updated);
  };

  const quarterOptions = [
    { value: 'spring', label: 'Spring 2026' },
    { value: 'summer', label: 'Summer 2026' },
    { value: 'fall', label: 'Fall 2026' },
    { value: 'winter', label: 'Winter 2027' },
  ];

  const roomTypeOptions = [
    { value: 'single', label: 'Single', icon: <Icon name="person" size={18} /> },
    { value: 'double', label: 'Double', icon: <Icon name="person.2" size={18} /> },
    { value: 'triple+', label: 'Triple+', icon: <Icon name="person.3" size={18} /> },
  ];

  const bathroomOptions = [
    { value: 'private', label: 'Private' },
    { value: 'shared', label: 'Shared' },
  ];

  const roommateOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'coed', label: 'Co-Ed' },
  ];

  const essentialOptions = [
    { key: 'furnished', label: 'Furnished' },
    { key: 'internet', label: 'Internet' },
    { key: 'ac', label: 'AC' },
  ];

  const applianceOptions = [
    { key: 'fridge', label: 'Fridge' },
    { key: 'microwave', label: 'Microwave' },
    { key: 'dishwasher', label: 'Dishwasher' },
    { key: 'laundryInUnit', label: 'In-Unit Laundry' },
    { key: 'laundryOnSite', label: 'On-Site Laundry' },
  ];

  const amenityOptions = [
    { key: 'fitnessCenter', label: 'Fitness Center' },
    { key: 'pool', label: 'Pool' },
    { key: 'hotTub', label: 'Hot Tub/Spa' },
  ];

  const parkingOptions = [
    { key: 'covered', label: 'Covered' },
    { key: 'garage', label: 'Garage' },
  ];

  const accessibilityOptions = [
    { key: 'accessible', label: 'Wheelchair Accessible' },
    { key: 'groundFloor', label: 'Ground Floor' },
  ];

  const toggleAmenity = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [key]: !prev.amenities[key as keyof typeof prev.amenities],
      },
    }));
  };

  return (
    /* Backdrop — tap outside to close */
    <div
      className="fixed inset-0 z-[1001]"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={onClose}
    >
      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl overflow-hidden flex flex-col animate-slideUp app-container"
        style={{
          height: '92vh',
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? 'transform 0.25s cubic-bezier(0.16,1,0.3,1)' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header + drag handle */}
        <div
          className="bg-[#F8FAFC] border-b-[1.5px] border-[#E2E8F0] flex-shrink-0 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Drag handle pill */}
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="w-9 h-[3px] bg-gray-300 rounded-full" />
          </div>
          <div className="flex items-center justify-between px-5 py-2">
            <button
              onClick={handleReset}
              className="text-h3 text-uclaBlue font-medium min-h-[44px] flex items-center"
            >
              Reset
            </button>
            <h1 className="text-h1 text-darkSlate">Filters</h1>
            <button
              onClick={onClose}
              className="p-3"
              aria-label="Close filters"
            >
              <Icon name="xmark" size={20} className="text-slateGray" />
            </button>
          </div>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-28">
          {/* Verified UCLA Toggle */}
          <ToggleSwitch
            checked={filters.verifiedOnly}
            onChange={(checked) => setFilters({ ...filters, verifiedOnly: checked })}
            label="Verified Listings Only"
            description="Only show student-verified posts"
            icon={<Icon name="checkmark.seal.fill" size={24} className="text-uclaBlue" />}
          />

          {/* Availability Section */}
          <div className="space-y-4">
            <h2 className="text-h2 text-darkSlate">Availability</h2>

            {/* Date inputs */}
            <div className="grid grid-cols-2 gap-3">
              <DatePickerField
                label="Move In"
                value={filters.moveInDate || ''}
                onChange={(v) => setFilters({ ...filters, moveInDate: v || null })}
              />
              <DatePickerField
                label="Move Out"
                value={filters.moveOutDate || ''}
                onChange={(v) => setFilters({ ...filters, moveOutDate: v || null })}
              />
            </div>

            {/* Quarter chips */}
            <ChipGroup
              options={quarterOptions}
              selected={filters.quarters}
              onChange={handleQuarterChange}
              pill
            />
          </div>

          {/* Budget */}
          <RangeSlider
            min={600}
            max={4000}
            step={50}
            value={filters.maxRent}
            onChange={(maxRent) => setFilters({ ...filters, maxRent })}
            formatValue={(v) => `${formatPrice(v)}/mo max`}
            label="Maximum Rent"
            minLabel="$600"
            maxLabel="$4,000+"
          />

          {/* Distance */}
          <RangeSlider
            min={0.1}
            max={4}
            step={0.1}
            value={filters.maxDistance}
            onChange={(maxDistance) => setFilters({ ...filters, maxDistance })}
            formatValue={(v) => `Within ${v.toFixed(1)} miles`}
            label="Distance from Campus"
            minLabel="0.1 miles"
            maxLabel="4 miles"
          />

          {/* Room Details */}
          <div className="space-y-6">
            <ChipGroup
              label="Room Type"
              options={roomTypeOptions}
              selected={filters.roomTypes}
              onChange={(roomTypes) => setFilters({ ...filters, roomTypes: roomTypes as RoomType[] })}
            />

            <ChipGroup
              label="Bathroom"
              options={bathroomOptions}
              selected={filters.bathroomTypes}
              onChange={(bathroomTypes) => setFilters({ ...filters, bathroomTypes: bathroomTypes as BathroomType[] })}
            />
          </div>

          {/* Roommate Preference */}
          <ChipGroup
            label="Roommate Preference"
            options={roommateOptions}
            selected={filters.roommatePreferences}
            onChange={(roommatePreferences) => setFilters({ ...filters, roommatePreferences: roommatePreferences as RoommatePreference[] })}
          />

          {/* Essentials */}
          <div className="space-y-4">
            <h3 className="text-h2 text-darkSlate">Essentials</h3>
            <div className="flex flex-wrap gap-2">
              {essentialOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => toggleAmenity(option.key)}
                  className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
                    filters.amenities[option.key as keyof typeof filters.amenities]
                      ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
                      : 'bg-white border-[#E2E8F0] text-slateGray font-medium'
                  }`}
                >
                  <span className="text-body">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Appliances */}
          <div className="space-y-4">
            <h3 className="text-h2 text-darkSlate">Appliances</h3>
            <div className="flex flex-wrap gap-2">
              {applianceOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => toggleAmenity(option.key)}
                  className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
                    filters.amenities[option.key as keyof typeof filters.amenities]
                      ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
                      : 'bg-white border-[#E2E8F0] text-slateGray font-medium'
                  }`}
                >
                  <span className="text-body">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="text-h2 text-darkSlate">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => toggleAmenity(option.key)}
                  className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
                    filters.amenities[option.key as keyof typeof filters.amenities]
                      ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
                      : 'bg-white border-[#E2E8F0] text-slateGray font-medium'
                  }`}
                >
                  <span className="text-body">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Parking */}
          <div className="space-y-4">
            <h3 className="text-h2 text-darkSlate">Parking</h3>
            <div className="flex flex-wrap gap-2">
              {parkingOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => toggleAmenity(option.key)}
                  className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
                    filters.amenities[option.key as keyof typeof filters.amenities]
                      ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
                      : 'bg-white border-[#E2E8F0] text-slateGray font-medium'
                  }`}
                >
                  <span className="text-body">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div className="space-y-4">
            <h3 className="text-h2 text-darkSlate">Accessibility</h3>
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-4">
              {accessibilityOptions.map((option) => (
                <label key={option.key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-body text-slateGray">{option.label}</span>
                  <input
                    type="checkbox"
                    checked={!!filters.amenities[option.key as keyof typeof filters.amenities]}
                    onChange={() => toggleAmenity(option.key)}
                    className="w-5 h-5 rounded border-gray-300 text-uclaBlue focus:ring-uclaBlue"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Save for future searches toggle */}
          <label className="flex items-center justify-between py-4 cursor-pointer select-none">
            <span className="text-body text-slateGray">Save filters for future searches</span>
            <button
              type="button"
              role="switch"
              aria-checked={saveForNext}
              onClick={() => setSaveForNext(v => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors ${saveForNext ? 'bg-uclaBlue' : 'bg-gray-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${saveForNext ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </label>
        </div>

        {/* Apply — pinned to bottom of sheet */}
        <div className="flex-shrink-0 px-6 py-4 pb-safe bg-background border-t border-borderLight">
          <button
            onClick={handleApply}
            disabled={liveCount === 0}
            className="w-full btn-primary py-4 rounded-xl text-h3 shadow-elevated active:scale-[0.98] transition-transform duration-100 disabled:opacity-50"
          >
            {liveCount === 0 ? 'No Listings Found' : `Show ${liveCount} Listing${liveCount === 1 ? '' : 's'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
