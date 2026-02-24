'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import BottomNav from '@/components/layout/BottomNav';
import { mockUser } from '@/lib/mockData';
import { getInitials } from '@/lib/utils';

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState(mockUser.name);
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user-profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name) setName(parsed.name);
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 400));
    localStorage.setItem('user-profile', JSON.stringify({ name: name.trim() }));
    setIsSaving(false);
    showToast('Profile updated');
    setTimeout(() => router.back(), 800);
  };

  return (
    <div className="min-h-screen bg-background app-container">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-darkSlate text-white text-small font-medium px-4 py-2 rounded-full shadow-elevated whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="blurHeaderCentered app-container">
        <div className="blurHeaderCenteredContent">
          <button
            onClick={() => router.back()}
            className="text-body text-uclaBlue font-medium"
          >
            Cancel
          </button>
          <h1 className="text-darkSlate" style={{ fontSize: '17px', fontWeight: 600, lineHeight: '22px' }}>
            Edit Profile
          </h1>
          <button
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="text-body text-uclaBlue font-semibold disabled:opacity-40"
          >
            {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[44px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      <div className="px-5 pt-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => showToast('Photo upload coming soon')}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full bg-uclaBlue flex items-center justify-center">
              <span className="text-white font-medium text-2xl">
                {getInitials(name || mockUser.name)}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-uclaBlue rounded-full flex items-center justify-center border-2 border-white">
              <Icon name="plus" size={12} className="text-white" />
            </div>
          </button>
          <p className="text-small text-slateGray">Tap to change photo</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-small text-slateGray font-medium mb-1.5 uppercase tracking-wide">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className="w-full bg-white border border-border rounded-xl px-4 py-3 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-2 focus:ring-uclaBlue"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-small text-slateGray font-medium mb-1.5 uppercase tracking-wide">
              UCLA Email
            </label>
            <input
              type="email"
              value={mockUser.email}
              readOnly
              className="w-full bg-gray-50 border border-border rounded-xl px-4 py-3 text-body text-slateGray cursor-not-allowed"
            />
            <p className="text-small text-lightSlate mt-1.5">UCLA email cannot be changed</p>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving || !name.trim()}
          className={`w-full rounded-[18px] px-4 py-2 text-body font-medium transition-colors flex items-center justify-center shadow-elevated ${
            isSaving || !name.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-uclaBlue text-white'
          }`}
        >
          {isSaving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
