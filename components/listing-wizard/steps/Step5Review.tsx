'use client';

import Icon from '@/components/common/Icon';
import { formatPrice, formatDateRange } from '@/lib/utils';
import type { Quarter, RoomType, BathroomType, RoommatePreference, ParkingType, Amenities } from '@/lib/types';

interface WizardFormDataSummary {
  title: string;
  address: string;
  distanceFromCampus: number;
  roomType: RoomType | '';
  bathroomType: BathroomType | '';
  roommatePreference: RoommatePreference | '';
  moveInDate: string;
  moveOutDate: string;
  quarters: Quarter[];
  price: string;
  images: string[];
  description: string;
  amenities: Amenities;
}

interface Step5Props {
  formData: WizardFormDataSummary;
  imageFiles: File[];
  errors: Record<string, string>;
  isSubmitting: boolean;
  onDescriptionChange: (v: string) => void;
}

export default function Step5Review({ formData, errors, onDescriptionChange }: Step5Props) {
  const thumbnailUrl = formData.images.filter(img => img)[0];
  const hasValidDates = !!(formData.moveInDate && formData.moveOutDate);
  const hasValidPrice = !!(formData.price && Number(formData.price) > 0);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Description textarea — smaller font */}
      <div className="flex flex-col gap-1.5">
        <label className="text-body text-darkSlate font-medium">
          Describe your listing <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Tell renters about the space, the vibe, nearby spots, what makes it special..."
          rows={4}
          maxLength={1000}
          className={`w-full bg-white border rounded-xl px-4 py-3 text-[13px] leading-[18px] text-darkSlate placeholder:text-lightSlate placeholder:text-[13px] focus:outline-none focus:ring-2 focus:ring-uclaBlue resize-none transition-colors ${
            errors.description ? 'border-red-400' : 'border-[#E2E8F0]'
          }`}
        />
        <div className="flex justify-between items-center">
          {errors.description
            ? <p className="text-small text-red-500">{errors.description}</p>
            : <span />
          }
          <p className="text-small text-slateGray">{formData.description.length}/1000</p>
        </div>
      </div>

      {/* Listing card preview — exact match to home feed card */}
      <div>
        <p className="text-small text-slateGray mb-2">Preview on the home feed</p>

        {/* Exact replica of ListingCard — non-interactive */}
        <div className="pointer-events-none">
          <div className="card shadow-minimal">
            {/* Image */}
            <div className="relative h-56 bg-gray-200 overflow-hidden">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={formData.title || 'Listing preview'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <Icon name="house" size={48} className="text-gray-300" />
                </div>
              )}
              {/* Price badge */}
              <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 shadow-card">
                <span className="text-sm font-semibold text-uclaBlue">
                  {hasValidPrice ? formatPrice(Number(formData.price)) : '$—'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
              {/* Title and bookmark */}
              <div className="flex items-start justify-between gap-2 min-h-[25px]">
                <h3 className="text-h3 text-darkSlate line-clamp-1 flex-1">
                  {formData.title || 'Your listing title'}
                </h3>
                <Icon
                  name="bookmark"
                  size={20}
                  className="text-darkSlate flex-shrink-0"
                  strokeWidth={2}
                />
              </div>

              {/* Address */}
              <div className="flex items-center gap-0.5">
                <Icon name="location.fill" size={16} className="text-slateGray" />
                <span className="text-small text-slateGray">
                  {formData.address || '—'} • {formData.distanceFromCampus.toFixed(1)} miles from campus
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                {formData.roomType && (
                  <div className="bg-tagBg border border-borderLight rounded-md px-[11px] py-[7px] flex items-center gap-1.5">
                    <Icon name="bed.double.fill" size={18} className="text-uclaBlue" />
                    <span className="text-tiny text-darkSlate capitalize font-normal">
                      {formData.roomType === 'triple+' ? 'Triple+' : formData.roomType}
                    </span>
                  </div>
                )}
                {formData.bathroomType && (
                  <div className="bg-tagBg border border-borderLight rounded-md px-[11px] py-[7px] flex items-center gap-1.5">
                    <Icon name="shower.fill" size={18} className="text-uclaBlue" />
                    <span className="text-tiny text-darkSlate capitalize font-normal">
                      {formData.bathroomType}
                    </span>
                  </div>
                )}
                {hasValidDates && (
                  <div className="bg-tagBg border border-borderLight rounded-md px-[11px] py-[7px] flex items-center gap-1.5">
                    <Icon name="calendar" size={18} className="text-uclaBlue" />
                    <span className="text-tiny text-darkSlate font-normal">
                      {formatDateRange(formData.moveInDate, formData.moveOutDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
