'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/common/Icon';
import BottomNav from '@/components/layout/BottomNav';

interface Settings {
  notifyMessages: boolean;
  notifyListingAlerts: boolean;
  notifyVerification: boolean;
  showEmail: boolean;
}

const defaultSettings: Settings = {
  notifyMessages: true,
  notifyListingAlerts: true,
  notifyVerification: false,
  showEmail: false,
};

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user-settings');
    if (saved) setSettings({ ...defaultSettings, ...JSON.parse(saved) });
  }, []);

  const updateSetting = (key: keyof Settings, value: boolean) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem('user-settings', JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const Toggle = ({ label, description, settingKey }: { label: string; description?: string; settingKey: keyof Settings }) => (
    <div className="flex items-center justify-between py-3.5 px-4">
      <div className="flex-1 pr-4">
        <p className="text-body text-darkSlate font-medium">{label}</p>
        {description && <p className="text-small text-slateGray mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={settings[settingKey]}
        onClick={() => updateSetting(settingKey, !settings[settingKey])}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${
          settings[settingKey] ? 'bg-uclaBlue' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            settings[settingKey] ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );

  const Row = ({ label, onTap }: { label: string; onTap: () => void }) => (
    <button
      onClick={onTap}
      className="flex items-center justify-between w-full py-3.5 px-4 hover:bg-gray-50 transition-colors"
    >
      <span className="text-body text-darkSlate">{label}</span>
      <Icon name="chevron.right" size={18} className="text-lightSlate" />
    </button>
  );

  return (
    <div className="min-h-screen pb-24 bg-background app-container">
      {/* Toast */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-darkSlate text-white text-small font-medium px-4 py-2 rounded-full shadow-elevated whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="blurHeaderWithNav app-container">
        <div className="blurHeaderWithNavContent">
          <button
            onClick={() => router.back()}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors -ml-1.5"
          >
            <Icon name="chevron.left" size={24} className="text-darkSlate" />
          </button>
          <h1 className="text-h2 text-darkSlate font-semibold">Settings</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[60px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      <div className="px-5 pt-4 space-y-4">
        {/* Notifications */}
        <div>
          <p className="text-small text-slateGray font-medium uppercase tracking-wide px-1 mb-2">Notifications</p>
          <div className="card divide-y divide-borderLight overflow-hidden">
            <Toggle label="New Messages" description="Get notified when someone messages you" settingKey="notifyMessages" />
            <Toggle label="Listing Alerts" description="New listings matching your filters" settingKey="notifyListingAlerts" />
            <Toggle label="UCLA Verification Updates" settingKey="notifyVerification" />
          </div>
        </div>

        {/* Privacy */}
        <div>
          <p className="text-small text-slateGray font-medium uppercase tracking-wide px-1 mb-2">Privacy</p>
          <div className="card divide-y divide-borderLight overflow-hidden">
            <Toggle label="Show my email to other users" settingKey="showEmail" />
          </div>
        </div>

        {/* About */}
        <div>
          <p className="text-small text-slateGray font-medium uppercase tracking-wide px-1 mb-2">About</p>
          <div className="card divide-y divide-borderLight overflow-hidden">
            <div className="flex items-center justify-between py-3.5 px-4">
              <span className="text-body text-darkSlate">Version</span>
              <span className="text-body text-slateGray">1.0.0</span>
            </div>
            <Row label="Terms of Service" onTap={() => showToast('Coming soon')} />
            <Row label="Privacy Policy" onTap={() => showToast('Coming soon')} />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
