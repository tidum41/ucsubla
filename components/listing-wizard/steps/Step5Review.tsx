'use client';

import type { Quarter, RoomType, BathroomType, RoommatePreference, ParkingType, Amenities } from '@/lib/types';

const QUARTER_LABELS: Record<Quarter, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
};

const ROOM_LABELS: Record<string, string> = {
  single: 'Single',
  double: 'Double',
  'triple+': 'Triple+',
};

const BATHROOM_LABELS: Record<string, string> = {
  private: 'Private Bath',
  shared: 'Shared Bath',
};

const ROOMMATE_LABELS: Record<string, string> = {
  male: 'Male',
  female: 'Female',
  coed: 'Co-Ed',
};

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

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function Step5Review({ formData, imageFiles, errors, isSubmitting, onDescriptionChange }: Step5Props) {
  const thumbnailUrl = formData.images.filter(img => img)[0];
  const activeAmenities = (Object.entries(formData.amenities) as [keyof Amenities, boolean | ParkingType | null][])
    .filter(([, v]) => !!v && v !== null)
    .map(([k]) => k);

  const amenityLabels: Partial<Record<keyof Amenities, string>> = {
    furnished: 'Furnished',
    internet: 'WiFi',
    ac: 'AC',
    fridge: 'Fridge',
    microwave: 'Microwave',
    dishwasher: 'Dishwasher',
    laundryInUnit: 'In-Unit Laundry',
    laundryOnSite: 'On-Site Laundry',
    balcony: 'Balcony',
    fitnessCenter: 'Gym',
    pool: 'Pool',
    hotTub: 'Hot Tub',
    accessible: 'Accessible',
    groundFloor: 'Ground Floor',
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Step heading */}
      <div>
        <h2 className="text-h2 text-darkSlate font-medium">Describe your listing</h2>
        <p className="text-small text-slateGray mt-0.5">Give renters a feel for the space and neighborhood.</p>
      </div>

      {/* Description textarea */}
      <div className="flex flex-col gap-1.5">
        <textarea
          value={formData.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Tell renters about the space, the vibe, nearby spots, what makes it special..."
          rows={4}
          maxLength={1000}
          className={`w-full bg-white border rounded-xl px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue resize-none transition-colors ${
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

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-card">
        <div className="flex gap-3 p-3">
          {/* Thumbnail */}
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="Listing thumbnail"
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0" />
          )}

          {/* Details */}
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <p className="text-body font-medium text-darkSlate truncate">{formData.title || '—'}</p>
            <p className="text-small text-slateGray truncate">{formData.address || '—'}</p>
            <p className="text-small text-slateGray">
              {[formData.roomType && ROOM_LABELS[formData.roomType],
                formData.bathroomType && BATHROOM_LABELS[formData.bathroomType],
                formData.roommatePreference && ROOMMATE_LABELS[formData.roommatePreference]
              ].filter(Boolean).join(' · ')}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              {formData.price && (
                <span className="text-small font-medium text-uclaBlue">${Number(formData.price).toLocaleString()}/mo</span>
              )}
              {formData.moveInDate && formData.moveOutDate && (
                <span className="text-small text-slateGray">
                  {formatDate(formData.moveInDate)} – {formatDate(formData.moveOutDate)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Amenity chips */}
        {activeAmenities.length > 0 && (
          <div className="border-t border-[#F1F5F9] px-3 py-2">
            <div className="flex flex-wrap gap-1.5">
              {/* Parking first if set */}
              {formData.amenities.parking && (
                <span className="text-[11px] font-medium bg-slate-50 border border-[#E2E8F0] text-slateGray px-2 py-0.5 rounded-full capitalize">
                  {formData.amenities.parking} parking
                </span>
              )}
              {activeAmenities
                .filter(k => k !== 'parking')
                .slice(0, 6)
                .map(k => (
                  <span key={k} className="text-[11px] font-medium bg-slate-50 border border-[#E2E8F0] text-slateGray px-2 py-0.5 rounded-full">
                    {amenityLabels[k] || k}
                  </span>
                ))}
              {activeAmenities.filter(k => k !== 'parking').length > 6 && (
                <span className="text-[11px] text-slateGray px-1">+{activeAmenities.filter(k => k !== 'parking').length - 6} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
