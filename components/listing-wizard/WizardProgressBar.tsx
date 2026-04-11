'use client';

const STEP_LABELS = ['Photos', 'Location', 'Details', 'Amenities', 'Review'];

interface WizardProgressBarProps {
  currentStep: number; // 0-indexed
  totalSteps?: number;
}

export default function WizardProgressBar({ currentStep, totalSteps = 5 }: WizardProgressBarProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      {/* Segmented bar */}
      <div className="flex items-center gap-1 w-full max-w-[200px]">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
              i <= currentStep ? 'bg-uclaBlue' : 'bg-[#E2E8F0]'
            }`}
          />
        ))}
      </div>
      {/* Current step label */}
      <p className="text-[11px] leading-none font-medium text-slateGray">
        {STEP_LABELS[currentStep]}
      </p>
    </div>
  );
}
