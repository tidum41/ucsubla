'use client';

import DatePickerField from '@/components/common/DatePickerField';
import ChipGroup from '@/components/filters/ChipGroup';
import type { Quarter } from '@/lib/types';

const quarterOptions = [
  { value: 'spring', label: 'Spring 2026' },
  { value: 'summer', label: 'Summer 2026' },
  { value: 'fall', label: 'Fall 2026' },
  { value: 'winter', label: 'Winter 2027' },
];

interface Step2Props {
  address: string;
  moveInDate: string;
  moveOutDate: string;
  quarters: Quarter[];
  errors: Record<string, string>;
  onAddressChange: (v: string) => void;
  onMoveInChange: (v: string) => void;
  onMoveOutChange: (v: string) => void;
  onQuarterChange: (selected: string[]) => void;
}

export default function Step2Location({
  address,
  moveInDate,
  moveOutDate,
  quarters,
  errors,
  onAddressChange,
  onMoveInChange,
  onMoveOutChange,
  onQuarterChange,
}: Step2Props) {
  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Step heading */}
      <div>
        <h2 className="text-h2 text-darkSlate font-medium">Where & when</h2>
        <p className="text-small text-slateGray mt-0.5">Help renters understand availability.</p>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <label className="text-body text-darkSlate font-medium">
          Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          placeholder="e.g., 625 Kelton Ave, Los Angeles, CA"
          className={`w-full bg-white border rounded-xl px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue transition-colors ${
            errors.address ? 'border-red-400' : 'border-[#E2E8F0]'
          }`}
        />
        {errors.address && <p className="text-small text-red-500">{errors.address}</p>}
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-2">
        <p className="text-body text-darkSlate font-medium">
          Availability dates <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          <DatePickerField
            label="Move In"
            value={moveInDate}
            onChange={onMoveInChange}
            required
            error={errors.moveInDate}
          />
          <DatePickerField
            label="Move Out"
            value={moveOutDate}
            onChange={onMoveOutChange}
            required
            error={errors.moveOutDate}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-small text-slateGray">or select by quarter</span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>

      {/* Quarters */}
      <div className="flex flex-col gap-1.5">
        <ChipGroup
          label="Quarters *"
          options={quarterOptions}
          selected={quarters}
          onChange={onQuarterChange}
          multiSelect={true}
          pill
        />
        {errors.quarters && <p className="text-small text-red-500">{errors.quarters}</p>}
      </div>
    </div>
  );
}
