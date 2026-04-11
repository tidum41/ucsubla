'use client';

import Icon from '@/components/common/Icon';
import ChipGroup from '@/components/filters/ChipGroup';
import RangeSlider from '@/components/filters/RangeSlider';
import type { RoomType, BathroomType, RoommatePreference } from '@/lib/types';

const roomTypeOptions = [
  { value: 'single', label: 'Single', icon: <Icon name="person" size={16} /> },
  { value: 'double', label: 'Double', icon: <Icon name="person.2" size={16} /> },
  { value: 'triple+', label: 'Triple+', icon: <Icon name="person.3" size={16} /> },
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

interface Step3Props {
  roomType: RoomType | '';
  bathroomType: BathroomType | '';
  roommatePreference: RoommatePreference | '';
  price: string;
  distanceFromCampus: number;
  errors: Record<string, string>;
  onRoomTypeChange: (v: RoomType) => void;
  onBathroomTypeChange: (v: BathroomType) => void;
  onRoommateChange: (v: RoommatePreference) => void;
  onPriceChange: (v: string) => void;
  onDistanceChange: (v: number) => void;
}

export default function Step3Details({
  roomType,
  bathroomType,
  roommatePreference,
  price,
  distanceFromCampus,
  errors,
  onRoomTypeChange,
  onBathroomTypeChange,
  onRoommateChange,
  onPriceChange,
  onDistanceChange,
}: Step3Props) {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Step heading */}
      <div>
        <h2 className="text-h2 text-darkSlate font-medium">Room details</h2>
        <p className="text-small text-slateGray mt-0.5">The specifics renters filter by most.</p>
      </div>

      {/* Room type */}
      <div>
        <ChipGroup
          label="Room Type *"
          options={roomTypeOptions}
          selected={roomType ? [roomType] : []}
          onChange={(selected) => onRoomTypeChange(selected[0] as RoomType)}
          multiSelect={false}
        />
        {errors.roomType && <p className="text-small text-red-500 mt-1">{errors.roomType}</p>}
      </div>

      {/* Bathroom */}
      <div>
        <ChipGroup
          label="Bathroom *"
          options={bathroomOptions}
          selected={bathroomType ? [bathroomType] : []}
          onChange={(selected) => onBathroomTypeChange(selected[0] as BathroomType)}
          multiSelect={false}
        />
        {errors.bathroomType && <p className="text-small text-red-500 mt-1">{errors.bathroomType}</p>}
      </div>

      {/* Roommate preference */}
      <div>
        <ChipGroup
          label="Roommate Preference *"
          options={roommateOptions}
          selected={roommatePreference ? [roommatePreference] : []}
          onChange={(selected) => onRoommateChange(selected[0] as RoommatePreference)}
          multiSelect={false}
        />
        {errors.roommatePreference && <p className="text-small text-red-500 mt-1">{errors.roommatePreference}</p>}
      </div>

      {/* Monthly rent */}
      <div className="flex flex-col gap-1.5">
        <label className="text-body text-darkSlate font-medium">
          Monthly Rent <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body text-slateGray">$</span>
          <input
            type="number"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="1,500"
            min={100}
            max={10000}
            className={`w-full bg-white border rounded-xl pl-8 pr-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue transition-colors ${
              errors.price ? 'border-red-400' : 'border-[#E2E8F0]'
            }`}
          />
        </div>
        {errors.price && <p className="text-small text-red-500">{errors.price}</p>}
      </div>

      {/* Distance */}
      <RangeSlider
        min={0.1}
        max={4}
        step={0.1}
        value={distanceFromCampus}
        onChange={onDistanceChange}
        formatValue={(v) => `${v.toFixed(1)} mi`}
        label="Distance from UCLA"
        minLabel="0.1 mi"
        maxLabel="4 mi"
      />
    </div>
  );
}
