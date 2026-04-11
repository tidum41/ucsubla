'use client';

interface WizardProgressBarProps {
  currentStep: number; // 0-indexed
  totalSteps?: number;
}

export default function WizardProgressBar({ currentStep, totalSteps = 5 }: WizardProgressBarProps) {
  return (
    <div className="flex items-center gap-1 flex-1 max-w-[180px]">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
            i <= currentStep ? 'bg-uclaBlue' : 'bg-[#E2E8F0]'
          }`}
        />
      ))}
    </div>
  );
}
