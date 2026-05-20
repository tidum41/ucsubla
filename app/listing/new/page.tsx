'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import WizardProgressBar from '@/components/listing-wizard/WizardProgressBar';
import WizardStepShell from '@/components/listing-wizard/WizardStepShell';
import Step1Photos from '@/components/listing-wizard/steps/Step1Photos';
import Step2Location from '@/components/listing-wizard/steps/Step2Location';
import Step3Details from '@/components/listing-wizard/steps/Step3Details';
import Step4Amenities from '@/components/listing-wizard/steps/Step4Amenities';
import Step5Review from '@/components/listing-wizard/steps/Step5Review';
import { mockUser } from '@/lib/mockData';
import type { Listing, Quarter, RoomType, BathroomType, RoommatePreference, ParkingType, Amenities } from '@/lib/types';

const TOTAL_STEPS = 5;

// Demo autofill values
const initialFormData = {
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
  images: [''] as string[],
  description: "Super chill double room in a 4-person apartment on Gayley — 3 min walk to In-N-Out and about 10 mins to campus on foot. The unit has AC, in-unit laundry, and a parking spot included. My roommates are all UCLA students (mix of grad and undergrad), pretty easygoing and quiet during the week. Looking for someone low-key who's around the same vibe. Dates are flexible so just message me and we can figure something out!",
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
};

export default function CreateListingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ ...initialFormData });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Share prompt after publishing
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [publishedListingId, setPublishedListingId] = useState<string | null>(null);

  const hasAutoFilledQuarters = useRef(false);

  // Warn before navigating away mid-wizard
  useEffect(() => {
    const hasProgress = currentStep > 0 || formData.title !== initialFormData.title;
    if (!hasProgress || showSharePrompt) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentStep, formData.title, showSharePrompt]);

  // Clear previously demo-created listings on mount
  useEffect(() => {
    const version = localStorage.getItem('user-listings-demo-version');
    if (version !== '2') {
      localStorage.removeItem('user-listings');
      localStorage.setItem('user-listings-demo-version', '2');
    }
  }, []);

  // Clear image error when images added
  useEffect(() => {
    if (imageFiles.length > 0 && stepErrors.images) {
      setStepErrors(prev => {
        const next = { ...prev };
        delete next.images;
        return next;
      });
    }
  }, [imageFiles.length, stepErrors.images]);

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

  // ─── Handlers ─────────────────────────────────────────────────────────────

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

  // Demo: always loads newlistingsample.jpg from public folder
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

  const handleParkingChange = (parking: ParkingType | null) => {
    setFormData({ ...formData, amenities: { ...formData.amenities, parking } });
  };

  // ─── Per-step validation ───────────────────────────────────────────────────

  const validateStep = (step: number): Record<string, string> => {
    const e: Record<string, string> = {};

    if (step === 0) {
      if (imageFiles.length === 0 && formData.images.filter(i => i.trim()).length === 0)
        e.images = 'Add at least one photo';
      if (!formData.title.trim()) e.title = 'Title is required';
    }

    if (step === 1) {
      if (!formData.address.trim()) e.address = 'Address is required';
      if (!formData.moveInDate) e.moveInDate = 'Move-in date is required';
      if (!formData.moveOutDate) e.moveOutDate = 'Move-out date is required';
      if (formData.moveInDate && formData.moveOutDate && formData.moveOutDate <= formData.moveInDate)
        e.moveOutDate = 'Move-out must be after move-in';
      if (formData.quarters.length === 0) e.quarters = 'Select at least one quarter';
    }

    if (step === 2) {
      if (!formData.roomType) e.roomType = 'Room type is required';
      if (!formData.bathroomType) e.bathroomType = 'Bathroom type is required';
      if (!formData.roommatePreference) e.roommatePreference = 'Roommate preference is required';
      if (!formData.price || Number(formData.price) < 100 || Number(formData.price) > 10000)
        e.price = 'Rent must be between $100 and $10,000';
    }

    // Step 3: amenities — all optional

    if (step === 4) {
      if (!formData.description.trim()) e.description = 'Description is required';
    }

    return e;
  };

  // ─── Navigation ────────────────────────────────────────────────────────────

  const navigate = (dir: 'forward' | 'back') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 340);
    if (dir === 'forward') setCurrentStep(s => s + 1);
    else setCurrentStep(s => s - 1);
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors({});
    navigate('forward');
  };

  const handleBack = () => {
    setStepErrors({});
    navigate('back');
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    const errors = validateStep(4);
    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
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

  // ─── Share prompt handlers ──────────────────────────────────────────────────

  const handleShareListing = async () => {
    if (!publishedListingId) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: formData.title,
          text: `Check out my sublease: ${formData.title} — $${Number(formData.price).toLocaleString()}/mo near UCLA`,
          url: `${window.location.origin}/listing/${publishedListingId}`,
        });
      } catch {
        // user cancelled
      }
    }
    router.push(`/listing/${publishedListingId}`);
  };

  const handleViewListing = () => {
    if (publishedListingId) router.push(`/listing/${publishedListingId}`);
  };

  // ─── Step renderer ─────────────────────────────────────────────────────────

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Photos
            title={formData.title}
            images={formData.images}
            imageFiles={imageFiles}
            errors={stepErrors}
            onTitleChange={(v) => setFormData({ ...formData, title: v })}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />
        );
      case 1:
        return (
          <Step2Location
            address={formData.address}
            distanceFromCampus={formData.distanceFromCampus}
            moveInDate={formData.moveInDate}
            moveOutDate={formData.moveOutDate}
            quarters={formData.quarters}
            errors={stepErrors}
            onAddressChange={(v) => setFormData({ ...formData, address: v })}
            onDistanceChange={(v) => setFormData({ ...formData, distanceFromCampus: v })}
            onMoveInChange={(v) => setFormData({ ...formData, moveInDate: v })}
            onMoveOutChange={(v) => setFormData({ ...formData, moveOutDate: v })}
            onQuarterChange={handleQuarterChange}
          />
        );
      case 2:
        return (
          <Step3Details
            roomType={formData.roomType}
            bathroomType={formData.bathroomType}
            roommatePreference={formData.roommatePreference}
            price={formData.price}
            errors={stepErrors}
            onRoomTypeChange={(v) => setFormData({ ...formData, roomType: v })}
            onBathroomTypeChange={(v) => setFormData({ ...formData, bathroomType: v })}
            onRoommateChange={(v) => setFormData({ ...formData, roommatePreference: v })}
            onPriceChange={(v) => setFormData({ ...formData, price: v })}
          />
        );
      case 3:
        return (
          <Step4Amenities
            amenities={formData.amenities}
            onToggleAmenity={toggleAmenity}
            onParkingChange={handleParkingChange}
          />
        );
      case 4:
        return (
          <Step5Review
            formData={formData}
            imageFiles={imageFiles}
            errors={stepErrors}
            isSubmitting={isSubmitting}
            onDescriptionChange={(v) => setFormData({ ...formData, description: v })}
          />
        );
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background app-container flex flex-col">

      {/* Fixed header */}
      <div className="blurHeaderCentered app-container">
        <div className="blurHeaderCenteredContent">
          <button
            onClick={() => router.back()}
            className="text-h3 text-uclaBlue font-medium w-[60px] min-h-[44px] flex items-center"
          >
            Cancel
          </button>
          <WizardProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          <div className="w-[60px]" />
        </div>
      </div>

      {/* Header spacer */}
      <div className="h-[44px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      {/* Step content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto px-5 pt-5 pb-36">
        <WizardStepShell stepKey={`step-${currentStep}`} direction={direction}>
          {renderStep()}
        </WizardStepShell>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-0 left-0 right-0 app-container px-5 pt-3 pb-safe bg-white/90 backdrop-blur-sm border-t border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isAnimating}
              className="flex-1 border border-[#E2E8F0] bg-white text-darkSlate py-4 rounded-xl text-h3 font-medium active:scale-[0.98] transition-transform duration-100 disabled:opacity-50"
            >
              Back
            </button>
          ) : (
            <div className="flex-1" />
          )}

          <button
            type="button"
            onClick={currentStep === TOTAL_STEPS - 1 ? handleSubmit : handleNext}
            disabled={isAnimating || isSubmitting}
            className="flex-1 bg-uclaBlue text-white py-4 rounded-xl text-h3 font-medium shadow-elevated active:scale-[0.98] transition-transform duration-100 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {currentStep === TOTAL_STEPS - 1 ? (
              isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Publishing…</span>
                </>
              ) : 'Publish Listing'
            ) : (
              'Next'
            )}
          </button>
        </div>
      </div>

      {/* ─── Share prompt — slides up after publish ─────────────────────────── */}
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
            {/* Animated celebration icon */}
            <div className="flex justify-center mb-5">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-celebrationBounce">
                <Icon name="checkmark.seal.fill" size={36} className="text-green-500" />
              </div>
            </div>

            <h2 className="text-h1 text-darkSlate text-center font-medium mb-2">
              Your listing is live!
            </h2>
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
