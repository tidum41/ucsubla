'use client';

import Icon from '@/components/common/Icon';
import type { Amenities, ParkingType } from '@/lib/types';

const BOOLEAN_AMENITIES: { key: keyof Amenities; label: string; icon: string }[] = [
  { key: 'furnished',     label: 'Furnished',      icon: 'chair.fill' },
  { key: 'internet',      label: 'WiFi',            icon: 'wifi' },
  { key: 'ac',            label: 'AC',              icon: 'wind' },
  { key: 'fridge',        label: 'Fridge',          icon: 'refrigerator' },
  { key: 'microwave',     label: 'Microwave',       icon: 'microwave' },
  { key: 'dishwasher',    label: 'Dishwasher',      icon: 'waves' },
  { key: 'laundryInUnit', label: 'In-Unit Laundry', icon: 'washing-machine' },
  { key: 'laundryOnSite', label: 'On-Site Laundry', icon: 'building' },
  { key: 'balcony',       label: 'Balcony',         icon: 'trees' },
  { key: 'fitnessCenter', label: 'Gym',             icon: 'dumbbell' },
  { key: 'pool',          label: 'Pool',            icon: 'waves' },
  { key: 'hotTub',        label: 'Hot Tub',         icon: 'flame' },
  { key: 'accessible',    label: 'Accessible',      icon: 'accessibility' },
  { key: 'groundFloor',   label: 'Ground Floor',    icon: 'building' },
];

const PARKING_OPTIONS: { value: ParkingType; label: string }[] = [
  { value: 'covered', label: 'Covered' },
  { value: 'garage',  label: 'Garage' },
  { value: 'street',  label: 'Street' },
];

interface Step4Props {
  amenities: Amenities;
  onToggleAmenity: (key: keyof Amenities) => void;
  onParkingChange: (v: ParkingType | null) => void;
}

export default function Step4Amenities({ amenities, onToggleAmenity, onParkingChange }: Step4Props) {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Step heading */}
      <div>
        <h2 className="text-h2 text-darkSlate font-medium">Amenities</h2>
        <p className="text-small text-slateGray mt-0.5">All optional — select everything that applies.</p>
      </div>

      {/* 3-column amenity grid */}
      <div className="grid grid-cols-3 gap-2">
        {BOOLEAN_AMENITIES.map(({ key, label, icon }) => {
          const isActive = !!amenities[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleAmenity(key)}
              className={`flex flex-col items-center justify-center gap-1.5 h-[58px] rounded-xl border transition-colors duration-75 active:scale-[0.96] ${
                isActive
                  ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue'
                  : 'bg-white border-[#E2E8F0] text-slateGray'
              }`}
            >
              <Icon name={icon} size={18} />
              <span className="text-[11px] leading-[14px] font-medium text-center px-1">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Parking */}
      <div className="flex flex-col gap-2">
        <p className="text-body text-darkSlate font-medium">Parking</p>
        <div className="flex gap-2">
          {PARKING_OPTIONS.map(({ value, label }) => {
            const isActive = amenities.parking === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onParkingChange(isActive ? null : value)}
                className={`flex-1 py-2.5 rounded-xl border text-body font-medium transition-colors duration-75 active:scale-[0.96] ${
                  isActive
                    ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue'
                    : 'bg-white border-[#E2E8F0] text-slateGray'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
