'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import DatePickerField from '@/components/common/DatePickerField';
import ChipGroup from '@/components/filters/ChipGroup';
import RangeSlider from '@/components/filters/RangeSlider';
import BottomNav from '@/components/layout/BottomNav';
import { mockUser } from '@/lib/mockData';
import type { Listing, Quarter, RoomType, BathroomType, RoommatePreference, ParkingType, Amenities } from '@/lib/types';

// Demo pre-fills — same as wizard
const DEMO_DESCRIPTION = "Super chill double room in a 4-person apartment on Gayley — 3 min walk to In-N-Out and about 10 mins to campus on foot. The unit has AC, in-unit laundry, and a parking spot included. My roommates are all UCLA students (mix of grad and undergrad), pretty easygoing and quiet during the week. Looking for someone low-key who's around the same vibe. Dates are flexible so just message me and we can figure something out!";

export default function CreateListingClassicPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [publishedListingId, setPublishedListingId] = useState<string | null>(null);
  const hasAutoFilledQuarters = useRef(false);

  const [formData, setFormData] = useState({
    title: 'Flexible dates male double near In-N-Out',
    address: '919 Gayley Ave',
    distanceFromCampus: 0.5,
    roomType: '' as RoomType | '',
    bathroomType: '' as BathroomType | '',
    roommatePreference: '' as RoommatePreference | '',
    moveInDate: '',
    moveOutDate: '',
    quarters: [] as Quarter[],
    price: '1100',
    images: [''],
    description: DEMO_DESCRIPTION,
    amenities: {
      furnished: false,
      internet: false,
      ac: false,
      fridge: false,
      microwave: false,
      dishwasher: false,
      laundryInUnit: false,
      laundryOnSite: false,
      balcony: false,
      parking: null as ParkingType | null,
      fitnessCenter: false,
      pool: false,
      hotTub: false,
      accessible: false,
      groundFloor: false,
    },
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Clear previously demo-created listings on mount
  useEffect(() => {
    const version = localStorage.getItem('user-listings-demo-version');
    if (version !== '2') {
      localStorage.removeItem('user-listings');
      localStorage.setItem('user-listings-demo-version', '2');
    }
  }, []);

  // Clear image error when user adds images
  useEffect(() => {
    if (imageFiles.length > 0 && errors.images) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.images;
        return next;
      });
    }
  }, [imageFiles.length, errors.images]);

  // Clear description error when user types
  useEffect(() => {
    if (formData.description.trim() && errors.description) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.description;
        return next;
      });
    }
  }, [formData.description, errors.description]);

  // Auto-calculate quarters from dates
  useEffect(() => {
    if (
      formData.moveInDate &&
      formData.moveOutDate &&
      formData.quarters.length === 0 &&
      !hasAutoFilledQuarters.current
    ) {
      const suggestedQuarters: Quarter[] = [];
      const startMonth = new Date(formData.moveInDate).getMonth();
      const endMonth = new Date(formData.moveOutDate).getMonth();

      const monthRanges = {
        spring: [2, 3, 4, 5],
        summer: [5, 6, 7, 8],
        fall: [8, 9, 10, 11],
        winter: [0, 1, 2],
      };

      Object.entries(monthRanges).forEach(([quarter, months]) => {
        if (months.includes(startMonth) || months.includes(endMonth)) {
          suggestedQuarters.push(quarter as Quarter);
        }
      });

      if (suggestedQuarters.length > 0) {
        setFormData(prev => ({ ...prev, quarters: suggestedQuarters }));
        hasAutoFilledQuarters.current = true;
      }
    }

    if (formData.quarters.length === 0) {
      hasAutoFilledQuarters.current = false;
    }
  }, [formData.moveInDate, formData.moveOutDate, formData.quarters.length]);

  const handleQuarterChange = (selectedQuarters: string[]) => {
    const isValidQuarter = (q: string): q is Quarter =>
      ['fall', 'winter', 'spring', 'summer'].includes(q);
    const quarters = selectedQuarters.filter(isValidQuarter);
    const newlyAdded = quarters.find(q => !formData.quarters.includes(q));
    let moveIn = formData.moveInDate;
    let moveOut = formData.moveOutDate;

    if (newlyAdded && (!formData.moveInDate || !formData.moveOutDate)) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      switch (newlyAdded) {
        case 'spring': {
          const yr = currentMonth >= 2 && currentMonth < 6 ? currentYear : currentYear + 1;
          moveIn = `${yr}-03-25`; moveOut = `${yr}-06-12`; break;
        }
        case 'summer': {
          const yr = currentMonth >= 5 && currentMonth < 9 ? currentYear : currentYear + 1;
          moveIn = `${yr}-06-22`; moveOut = `${yr}-09-11`; break;
        }
        case 'fall': {
          const yr = currentMonth >= 8 ? currentYear : currentYear + 1;
          moveIn = `${yr}-09-21`; moveOut = `${yr}-12-11`; break;
        }
        case 'winter': {
          const yr = currentMonth >= 0 && currentMonth < 3 ? currentYear : currentYear + 1;
          moveIn = `${yr}-01-04`; moveOut = `${yr}-03-19`; break;
        }
      }
    }
    setFormData(prev => ({ ...prev, quarters, moveInDate: moveIn, moveOutDate: moveOut }));
  };

  // Demo: load sample image directly (no file picker)
  const handleImageUpload = async () => {
    if (imageFiles.length >= 8) return;
    try {
      const response = await fetch('/newlistingsample.jpg');
      const blob = await response.blob();
      const file = new File([blob], 'listing-photo.jpg', { type: 'image/jpeg' });
      setImageFiles(prev => [...prev, file]);
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter(img => img), imageUrl],
      }));
    } catch {
      // no-op
    }
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
  };

  const toggleAmenity = (key: keyof Amenities) => {
    setFormData({
      ...formData,
      amenities: { ...formData.amenities, [key]: !formData.amenities[key] },
    });
  };

  const isFormValid = (): boolean => {
    return !!(
      formData.title.trim() &&
      formData.address.trim() &&
      formData.roomType &&
      formData.bathroomType &&
      formData.roommatePreference &&
      formData.moveInDate &&
      formData.moveOutDate &&
      formData.quarters.length > 0 &&
      formData.price &&
      Number(formData.price) >= 100 &&
      Number(formData.price) <= 10000 &&
      (imageFiles.length > 0 || formData.images.filter(img => img.trim()).length > 0) &&
      formData.description.trim()
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.roomType) newErrors.roomType = 'Room type is required';
    if (!formData.bathroomType) newErrors.bathroomType = 'Bathroom type is required';
    if (!formData.roommatePreference) newErrors.roommatePreference = 'Roommate preference is required';
    if (!formData.moveInDate) newErrors.moveInDate = 'Move-in date is required';
    if (!formData.moveOutDate) newErrors.moveOutDate = 'Move-out date is required';
    if (formData.quarters.length === 0) newErrors.quarters = 'Select at least one quarter';
    if (!formData.price || Number(formData.price) < 100 || Number(formData.price) > 10000)
      newErrors.price = 'Price must be between $100 and $10,000';
    if (imageFiles.length === 0 && formData.images.filter(img => img.trim()).length === 0)
      newErrors.images = 'At least one image is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.moveInDate && formData.moveOutDate && formData.moveOutDate <= formData.moveInDate)
      newErrors.moveOutDate = 'Move-out date must be after move-in date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsSubmitting(true);

    const newListing: Listing = {
      id: `listing-${Date.now()}`,
      title: formData.title,
      price: Number(formData.price),
      address: formData.address,
      distanceFromCampus: formData.distanceFromCampus,
      images: formData.images.filter(img => img.trim()),
      roomType: formData.roomType as RoomType,
      bathroomType: formData.bathroomType as BathroomType,
      moveInDate: formData.moveInDate,
      moveOutDate: formData.moveOutDate,
      quarter: formData.quarters,
      roommatePreference: formData.roommatePreference as RoommatePreference,
      verifiedUCLA: mockUser.verifiedUCLA,
      amenities: formData.amenities,
      description: formData.description,
      listerId: mockUser.id,
      createdAt: new Date().toISOString(),
    };

    const savedListings = JSON.parse(localStorage.getItem('user-listings') || '[]');
    savedListings.push(newListing);
    localStorage.setItem('user-listings', JSON.stringify(savedListings));

    await new Promise(resolve => setTimeout(resolve, 600));
    setPublishedListingId(newListing.id);
    setIsSubmitting(false);
    setShowSharePrompt(true);
  };

  const handleShareListing = async () => {
    if (!publishedListingId) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: formData.title,
          text: `Check out my sublease: ${formData.title} — $${Number(formData.price).toLocaleString()}/mo near UCLA`,
          url: `${window.location.origin}/listing/${publishedListingId}`,
        });
      } catch { /* user cancelled */ }
    }
    router.push(`/listing/${publishedListingId}`);
  };

  const handleViewListing = () => {
    if (publishedListingId) router.push(`/listing/${publishedListingId}`);
  };

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
  const quarterOptions = [
    { value: 'spring', label: 'Spring 2026' },
    { value: 'summer', label: 'Summer 2026' },
    { value: 'fall', label: 'Fall 2026' },
    { value: 'winter', label: 'Winter 2027' },
  ];
  const parkingOptions = [
    { value: 'covered', label: 'Covered' },
    { value: 'garage', label: 'Garage' },
  ];

  return (
    <div className="min-h-screen pb-32 bg-background app-container">
      {/* Header */}
      <div className="blurHeaderCentered app-container">
        <div className="blurHeaderCenteredContent">
          <button onClick={() => router.back()} className="text-h3 text-uclaBlue font-medium">
            Cancel
          </button>
          <h1 className="text-h1 text-darkSlate">Create Listing</h1>
          <div className="w-[60px]" />
        </div>
      </div>

      <div className="h-[52px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-6">

        {/* Title */}
        <div id="title">
          <label htmlFor="title-input" className="block text-h2 text-darkSlate mb-2">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title-input"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Male roommate summer 2026 single"
            maxLength={80}
            className="w-full bg-white border border-border rounded-lg px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue"
          />
          {errors.title && <p className="text-small text-red-600 mt-1">{errors.title}</p>}
          <p className="text-small text-slateGray mt-1">Be specific about what you're offering</p>
        </div>

        {/* Address + Distance */}
        <div className="space-y-4">
          <div id="address">
            <label htmlFor="address-input" className="block text-h2 text-darkSlate mb-2">
              Address <span className="text-red-600">*</span>
            </label>
            <input
              id="address-input"
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street address (e.g., 625 Kelton Ave)"
              className="w-full bg-white border border-border rounded-lg px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue"
            />
            {errors.address && <p className="text-small text-red-600 mt-1">{errors.address}</p>}
          </div>

          <RangeSlider
            min={0.1} max={4} step={0.1}
            value={formData.distanceFromCampus}
            onChange={(value) => setFormData({ ...formData, distanceFromCampus: value })}
            formatValue={(v) => `${v.toFixed(1)} miles from campus`}
            label="Distance from UCLA"
            minLabel="0.1 miles"
            maxLabel="4 miles"
          />
        </div>

        {/* Room Details */}
        <div className="space-y-6">
          <div id="roomType">
            <ChipGroup
              label="Room Type *"
              options={roomTypeOptions}
              selected={formData.roomType ? [formData.roomType] : []}
              onChange={(selected) => setFormData({ ...formData, roomType: selected[0] as RoomType })}
              multiSelect={false}
            />
            {errors.roomType && <p className="text-small text-red-600 mt-1">{errors.roomType}</p>}
          </div>

          <div id="bathroomType">
            <ChipGroup
              label="Bathroom *"
              options={bathroomOptions}
              selected={formData.bathroomType ? [formData.bathroomType] : []}
              onChange={(selected) => setFormData({ ...formData, bathroomType: selected[0] as BathroomType })}
              multiSelect={false}
            />
            {errors.bathroomType && <p className="text-small text-red-600 mt-1">{errors.bathroomType}</p>}
          </div>

          <div id="roommatePreference">
            <ChipGroup
              label="Roommate Preference *"
              options={roommateOptions}
              selected={formData.roommatePreference ? [formData.roommatePreference] : []}
              onChange={(selected) => setFormData({ ...formData, roommatePreference: selected[0] as RoommatePreference })}
              multiSelect={false}
            />
            {errors.roommatePreference && <p className="text-small text-red-600 mt-1">{errors.roommatePreference}</p>}
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-4">
          <h2 className="text-h2 text-darkSlate">Availability</h2>
          <div className="grid grid-cols-2 gap-3">
            <DatePickerField
              label="Move In" value={formData.moveInDate}
              onChange={(v) => setFormData({ ...formData, moveInDate: v })}
              required error={errors.moveInDate}
            />
            <DatePickerField
              label="Move Out" value={formData.moveOutDate}
              onChange={(v) => setFormData({ ...formData, moveOutDate: v })}
              required error={errors.moveOutDate}
            />
          </div>
          <div id="quarters">
            <ChipGroup
              label="Quarters *"
              options={quarterOptions}
              selected={formData.quarters}
              onChange={handleQuarterChange}
              multiSelect={true} pill
            />
            {errors.quarters && <p className="text-small text-red-600 mt-1">{errors.quarters}</p>}
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4" id="price">
          <h2 className="text-h2 text-darkSlate">Pricing</h2>
          <div>
            <label htmlFor="price-input" className="block text-body text-darkSlate font-medium mb-2">
              Monthly Rent <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-body text-slateGray">$</span>
              <input
                id="price-input"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1,500"
                min={100} max={10000}
                className="w-full bg-white border border-border rounded-lg pl-8 pr-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue"
              />
            </div>
            {errors.price && <p className="text-small text-red-600 mt-1">{errors.price}</p>}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-6">
          <h2 className="text-h2 text-darkSlate">Amenities</h2>

          {[
            { title: 'Essentials', items: [{ key: 'furnished', label: 'Furnished' }, { key: 'internet', label: 'Internet' }, { key: 'ac', label: 'AC' }] },
            { title: 'Appliances', items: [{ key: 'fridge', label: 'Fridge' }, { key: 'microwave', label: 'Microwave' }, { key: 'dishwasher', label: 'Dishwasher' }, { key: 'laundryInUnit', label: 'In-Unit Laundry' }, { key: 'laundryOnSite', label: 'On-Site Laundry' }] },
            { title: 'Amenities', items: [{ key: 'fitnessCenter', label: 'Fitness Center' }, { key: 'pool', label: 'Pool' }, { key: 'hotTub', label: 'Hot Tub/Spa' }, { key: 'balcony', label: 'Balcony/Patio' }] },
          ].map(({ title, items }) => (
            <div key={title}>
              <h3 className="text-body text-darkSlate font-medium mb-3">{title}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleAmenity(item.key as keyof Amenities)}
                    className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
                      formData.amenities[item.key as keyof Amenities]
                        ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
                        : 'bg-white border-gray-200 text-slateGray font-medium'
                    }`}
                  >
                    <span className="text-body">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Parking */}
          <div>
            <h3 className="text-body text-darkSlate font-medium mb-3">Parking</h3>
            <div className="flex flex-wrap gap-2">
              {parkingOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    const parking = formData.amenities.parking === option.value ? null : option.value as ParkingType;
                    setFormData({ ...formData, amenities: { ...formData.amenities, parking } });
                  }}
                  className={`px-4 py-2 rounded-xl border transition-colors duration-75 ${
                    formData.amenities.parking === option.value
                      ? 'bg-uclaBlue/10 border-uclaBlue text-uclaBlue font-medium'
                      : 'bg-white border-gray-200 text-slateGray font-medium'
                  }`}
                >
                  <span className="text-body">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="text-body text-darkSlate font-medium mb-3">Accessibility</h3>
            <div className="bg-white border border-gray-100 rounded-lg p-4 space-y-4">
              {[{ key: 'accessible', label: 'Wheelchair Accessible' }, { key: 'groundFloor', label: 'Ground Floor' }].map(item => (
                <label key={item.key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-body text-slateGray">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={!!formData.amenities[item.key as keyof Amenities]}
                    onChange={() => toggleAmenity(item.key as keyof Amenities)}
                    className="w-5 h-5 rounded border-gray-300 text-uclaBlue focus:ring-uclaBlue"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4" id="images">
          <h2 className="text-h2 text-darkSlate">Images</h2>
          <p className="text-small text-slateGray">Upload photos from your device (max 8)</p>

          {imageFiles.length < 8 && (
            <div onClick={handleImageUpload} className="cursor-pointer">
              <div className="bg-white border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="plus" size={32} className="text-slateGray mx-auto mb-2" />
                <p className="text-body text-darkSlate font-medium mb-1">Upload Photos</p>
                <p className="text-small text-slateGray">{imageFiles.length} of 8 photos uploaded</p>
              </div>
            </div>
          )}

          {imageFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {formData.images.filter(img => img).map((url, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full"
                  >
                    <Icon name="xmark" size={16} className="text-darkSlate" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {errors.images && <p className="text-small text-red-600">{errors.images}</p>}
        </div>

        {/* Description */}
        <div className="space-y-4" id="description">
          <h2 className="text-h2 text-darkSlate">Description</h2>
          <div>
            <label htmlFor="description-input" className="block text-body text-darkSlate font-medium mb-2">
              About this listing <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description-input"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your space, the neighborhood, ideal roommate..."
              rows={6}
              maxLength={1000}
              className="w-full bg-white border border-border rounded-lg px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue resize-none"
            />
            <div className="flex items-center justify-between mt-1">
              {errors.description && <p className="text-small text-red-600">{errors.description}</p>}
              <p className="text-small text-slateGray ml-auto">{formData.description.length}/1000</p>
            </div>
          </div>
        </div>
      </form>

      {/* Fixed Publish Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 app-container">
        <button
          onClick={() => handleSubmit()}
          disabled={isSubmitting || !isFormValid()}
          className={`w-full rounded-[18px] px-4 py-4 text-h3 font-medium transition-colors flex items-center justify-center gap-2 shadow-elevated ${
            isSubmitting || !isFormValid()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-uclaBlue text-white active:scale-[0.98] transition-transform'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-500 rounded-full animate-spin" />
              <span>Publishing...</span>
            </>
          ) : 'Publish Listing'}
        </button>
      </div>

      <BottomNav />

      {/* Share prompt — same as wizard */}
      {showSharePrompt && publishedListingId && (
        <div
          className="fixed inset-0 bg-black/50 z-[2000] flex items-end app-container"
          onClick={handleViewListing}
        >
          <div
            className="animate-slideUp w-full bg-white rounded-t-3xl px-6 pt-6"
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 28px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-celebrationBounce">
                <Icon name="checkmark.seal.fill" size={36} className="text-green-500" />
              </div>
            </div>
            <h2 className="text-h1 text-darkSlate text-center font-medium mb-2">Your listing is live!</h2>
            <p className="text-body text-slateGray text-center mb-7 leading-relaxed">
              Share it to get the ball rolling — even a single post to your group chat could be the difference between zero traction and your first inquiry today.
            </p>
            <button
              onClick={handleShareListing}
              className="w-full bg-uclaBlue text-white py-4 rounded-xl text-h3 font-medium shadow-elevated active:scale-[0.98] transition-transform duration-100 flex items-center justify-center gap-2 mb-3"
            >
              <Icon name="square.and.arrow.up" size={18} className="text-white" strokeWidth={1.5} />
              Share Listing
            </button>
            <button
              onClick={handleViewListing}
              className="w-full border border-[#E2E8F0] bg-white text-darkSlate py-4 rounded-xl text-h3 font-medium active:scale-[0.98] transition-transform duration-100"
            >
              View Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
