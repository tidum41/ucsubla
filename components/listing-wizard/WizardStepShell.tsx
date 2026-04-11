'use client';

interface WizardStepShellProps {
  stepKey: string;
  direction: 'forward' | 'back';
  children: React.ReactNode;
}

export default function WizardStepShell({ stepKey, direction, children }: WizardStepShellProps) {
  const animClass = direction === 'forward'
    ? 'animate-slideInFromRight'
    : 'animate-slideInFromLeft';

  return (
    <div key={stepKey} className={`${animClass} h-full w-full`}>
      {children}
    </div>
  );
}
