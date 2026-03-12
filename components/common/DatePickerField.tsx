'use client';

import Icon from './Icon';

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

export default function DatePickerField({ label, value, onChange, required, error }: DatePickerFieldProps) {
  const formatted = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div>
      <p className="text-small text-slateGray mb-2">
        {label}{required && <span className="text-red-600"> *</span>}
      </p>
      <div className="relative">
        <div className="bg-white rounded-lg px-4 py-3 flex items-center justify-between shadow-minimal min-h-[44px]">
          <span className={`text-body ${value ? 'text-darkSlate' : 'text-lightSlate'}`}>
            {formatted || 'Select date'}
          </span>
          <Icon name="calendar" size={18} className="text-lightSlate flex-shrink-0" />
        </div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      </div>
      {error && <p className="text-small text-red-600 mt-1">{error}</p>}
    </div>
  );
}
