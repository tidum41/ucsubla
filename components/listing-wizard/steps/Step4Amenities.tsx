'use client';

import { useState } from 'react';
import Icon from '@/components/common/Icon';
import type { Amenities, ParkingType } from '@/lib/types';

// ─── Section definitions matching FilterModal hierarchy exactly ───────────────

const ESSENTIALS = [
  { key: 'furnished' as keyof Amenities, label: 'Furnished' },
  { key: 'internet' as keyof Amenities, label: 'Internet' },
  { key: 'ac' as keyof Amenities, label: 'AC' },
];

const APPLIANCES = [
  { key: 'fridge' as keyof Amenities, label: 'Fridge' },
  { key: 'microwave' as keyof Amenities, label: 'Microwave' },
  { key: 'dishwasher' as keyof Amenities, label: 'Dishwasher' },
  { key: 'laundryInUnit' as keyof Amenities, label: 'In-Unit Laundry' },
  { key: 'laundryOnSite' as keyof Amenities, label: 'On-Site Laundry' },
];

const AMENITIES = [
  { key: 'fitnessCenter' as keyof Amenities, label: 'Fitness Center' },
  { key: 'pool' as keyof Amenities, label: 'Pool' },
  { key: 'hotTub' as keyof Amenities, label: 'Hot Tub/Spa' },
  { key: 'balcony' as keyof Amenities, label: 'Balcony/Patio' },
];

const PARKING_OPTIONS: { value: ParkingType; label: string }[] = [
  { value: 'covered', label: 'Covered' },
  { value: 'garage', label: 'Garage' },
];

const ACCESSIBILITY = [
  { key: 'accessible' as keyof Amenities, label: 'Wheelchair Accessible' },
  { key: 'groundFloor' as keyof Amenities, label: 'Ground Floor' },
];

// ─── Shared chip button ────────────────────────────────────────────────────────

function AmenityChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
        active
          ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
          : 'bg-white border-[#E2E8F0] text-slateGray font-medium'
      }`}
    >
      <span className="text-body">{label}</span>
    </button>
  );
}

// ─── Collapsible accordion section ────────────────────────────────────────────

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white">
      {/* Header row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 active:bg-slate-50 transition-colors"
      >
        <span className="text-h2 text-darkSlate">{title}</span>
        {/* Chevron rotates smoothly on open/close */}
        <div
          style={{
            transform: `rotate(${isOpen ? '-90deg' : '90deg'})`,
            transition: 'transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Icon name="chevron.left" size={18} className="text-slateGray" />
        </div>
      </button>

      {/* Animated content — grid-template-rows trick for smooth height animation */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.26s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-4 pb-4 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Step4Props {
  amenities: Amenities;
  onToggleAmenity: (key: keyof Amenities) => void;
  onParkingChange: (v: ParkingType | null) => void;
}

export default function Step4Amenities({ amenities, onToggleAmenity, onParkingChange }: Step4Props) {
  const [open, setOpen] = useState({
    essentials: true,
    appliances: false,
    amenities: false,
    parking: false,
    accessibility: false,
  });

  const toggle = (key: keyof typeof open) =>
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex flex-col gap-2 pb-4">
      <p className="text-small text-lightSlate -mt-1 mb-1">All fields optional — add what applies</p>

      <AccordionSection title="Essentials" isOpen={open.essentials} onToggle={() => toggle('essentials')}>
        <div className="flex flex-wrap gap-2">
          {ESSENTIALS.map(({ key, label }) => (
            <AmenityChip key={key} label={label} active={!!amenities[key]} onClick={() => onToggleAmenity(key)} />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Appliances" isOpen={open.appliances} onToggle={() => toggle('appliances')}>
        <div className="flex flex-wrap gap-2">
          {APPLIANCES.map(({ key, label }) => (
            <AmenityChip key={key} label={label} active={!!amenities[key]} onClick={() => onToggleAmenity(key)} />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Amenities" isOpen={open.amenities} onToggle={() => toggle('amenities')}>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map(({ key, label }) => (
            <AmenityChip key={key} label={label} active={!!amenities[key]} onClick={() => onToggleAmenity(key)} />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Parking" isOpen={open.parking} onToggle={() => toggle('parking')}>
        <div className="flex flex-wrap gap-2">
          {PARKING_OPTIONS.map(({ value, label }) => (
            <AmenityChip
              key={value}
              label={label}
              active={amenities.parking === value}
              onClick={() => onParkingChange(amenities.parking === value ? null : value)}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Accessibility" isOpen={open.accessibility} onToggle={() => toggle('accessibility')}>
        <div className="space-y-4">
          {ACCESSIBILITY.map(({ key, label }) => (
            <label key={key} className="flex items-center justify-between cursor-pointer">
              <span className="text-body text-slateGray">{label}</span>
              <input
                type="checkbox"
                checked={!!amenities[key]}
                onChange={() => onToggleAmenity(key)}
                className="w-5 h-5 rounded border-gray-300 text-uclaBlue focus:ring-uclaBlue"
              />
            </label>
          ))}
        </div>
      </AccordionSection>

    </div>
  );
}
