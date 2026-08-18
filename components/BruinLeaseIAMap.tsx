'use client';

import { useState } from 'react';

/**
 * Interactive IA map for the BruinLease case study.
 * Uses portfolio CSS variables with hard fallbacks so it also previews in ucsubla.
 */

const TABS = [
  {
    id: 'home',
    label: 'Home',
    job: 'Browse',
    why: 'One feed of standardized listings replaces hopping Facebook groups and Reddit threads.',
    connects: ['Search + filters', 'Listing detail', 'Save / Message'],
    preview: 'feed' as const,
  },
  {
    id: 'saved',
    label: 'Saved',
    job: 'Shortlist',
    why: 'Housing search is multi-session. Students compare options over days, not in one scroll.',
    connects: ['Bookmarked listings', 'Back to detail'],
    preview: 'saved' as const,
  },
  {
    id: 'chat',
    label: 'Chat',
    job: 'Coordinate',
    why: 'Keep outreach in-app so seekers stop juggling DMs just to ask for basics.',
    connects: ['Conversation list', 'Thread', 'Listing link'],
    preview: 'chat' as const,
  },
  {
    id: 'profile',
    label: 'Profile',
    job: 'Account',
    why: 'Lister and settings live here—without crowding the seeker jobs that drive most sessions.',
    connects: ['My listings', 'Edit profile', 'Settings'],
    preview: 'profile' as const,
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

const BEFORE = ['Facebook', 'Reddit', 'Instagram', 'Texts'];

export default function BruinLeaseIAMap() {
  const [active, setActive] = useState<TabId>('home');
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div className="bl-ia" style={{ marginTop: 8 }}>
      <style>{CSS}</style>

      {/* Before → after strip */}
      <div className="bl-ia-flow" aria-label="From fragmented channels to one app">
        <div className="bl-ia-before">
          {BEFORE.map((name) => (
            <span key={name} className="bl-ia-chip bl-ia-chip-muted">
              {name}
            </span>
          ))}
        </div>
        <span className="bl-ia-arrow" aria-hidden>
          →
        </span>
        <div className="bl-ia-after">
          <span className="bl-ia-chip bl-ia-chip-focus">BruinLease</span>
          <span className="bl-ia-flow-note">one place, clear jobs</span>
        </div>
      </div>

      {/* Interactive shell + detail */}
      <div className="bl-ia-stage">
        <div className="bl-ia-phone" role="img" aria-label={`App structure preview, ${tab.label} selected`}>
          <div className="bl-ia-phone-header">
            <span className="bl-ia-brand">BruinLease</span>
            <div className="bl-ia-list-wrap">
              <button type="button" className="bl-ia-list-cta" tabIndex={-1} aria-hidden>
                + List
              </button>
              <span className="bl-ia-annot">not a tab</span>
            </div>
          </div>

          <div className="bl-ia-screen">
            <ScreenPreview kind={tab.preview} />
          </div>

          <nav className="bl-ia-tabbar" aria-label="Primary destinations">
            {TABS.map((t) => {
              const isActive = t.id === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`bl-ia-tab${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(t.id)}
                >
                  <TabGlyph id={t.id} active={isActive} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="bl-ia-detail" aria-live="polite">
          <p className="bl-ia-job">{tab.job}</p>
          <h3 className="bl-ia-detail-title">{tab.label}</h3>
          <p className="bl-ia-detail-why">{tab.why}</p>
          <p className="bl-ia-connects-label">Connects to</p>
          <ul className="bl-ia-connects">
            {tab.connects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Listing schema — compact visual */}
      <div className="bl-ia-schema">
        <p className="bl-ia-schema-label">What every listing has to capture</p>
        <p className="bl-ia-schema-body">
          Informal posts force back-and-forth for basics. A shared schema lets seekers compare apples to apples—and a stepped create flow divides the work so listing doesn’t feel like a wall of fields.
        </p>
        <div className="bl-ia-schema-grid">
          {[
            ['Price + room', 'Scan first'],
            ['Distance', 'Think in walk time'],
            ['Quarters', 'Academic calendar'],
            ['Verified', 'Trust on-card'],
            ['Bath / roommates', 'Fewer DMs'],
            ['Amenities', 'Serious filters'],
          ].map(([title, note]) => (
            <div key={title} className="bl-ia-schema-card">
              <span className="bl-ia-schema-title">{title}</span>
              <span className="bl-ia-schema-note">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScreenPreview({ kind }: { kind: (typeof TABS)[number]['preview'] }) {
  if (kind === 'feed') {
    return (
      <div className="bl-ia-preview">
        <div className="bl-ia-search" />
        {[0, 1].map((i) => (
          <div key={i} className="bl-ia-card">
            <div className="bl-ia-card-img" />
            <div className="bl-ia-card-lines">
              <span className="bl-ia-line bl-ia-line-sm" />
              <span className="bl-ia-line" />
              <span className="bl-ia-line bl-ia-line-mid" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'saved') {
    return (
      <div className="bl-ia-preview">
        <p className="bl-ia-preview-title">Saved</p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="bl-ia-row">
            <div className="bl-ia-row-thumb" />
            <div className="bl-ia-card-lines" style={{ flex: 1 }}>
              <span className="bl-ia-line" />
              <span className="bl-ia-line bl-ia-line-mid" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'chat') {
    return (
      <div className="bl-ia-preview">
        <p className="bl-ia-preview-title">Messages</p>
        {[0, 1, 2].map((i) => (
          <div key={i} className="bl-ia-row">
            <div className="bl-ia-avatar" />
            <div className="bl-ia-card-lines" style={{ flex: 1 }}>
              <span className="bl-ia-line bl-ia-line-sm" />
              <span className="bl-ia-line" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="bl-ia-preview">
      <div className="bl-ia-profile-head">
        <div className="bl-ia-avatar bl-ia-avatar-lg" />
        <div className="bl-ia-card-lines" style={{ flex: 1 }}>
          <span className="bl-ia-line bl-ia-line-sm" />
          <span className="bl-ia-line bl-ia-line-mid" />
        </div>
      </div>
      {['My listings', 'Settings', 'Verification'].map((label) => (
        <div key={label} className="bl-ia-menu-row">
          {label}
        </div>
      ))}
    </div>
  );
}

function TabGlyph({ id, active }: { id: TabId; active: boolean }) {
  const stroke = active ? 'var(--bl-ia-ink, #2E2E2E)' : 'var(--bl-ia-muted, #8A8A8A)';
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };
  if (id === 'home') {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    );
  }
  if (id === 'saved') {
    return (
      <svg {...common}>
        <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.5L6 20V5a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  if (id === 'chat') {
    return (
      <svg {...common}>
        <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3v-3.2A2.5 2.5 0 0 1 5 13.5v-7Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19c1.6-3 4-4.5 6.5-4.5S17 16 18.5 19" />
    </svg>
  );
}

const CSS = `
.bl-ia {
  --bl-ia-ink: var(--color-text-primary, #2E2E2E);
  --bl-ia-sec: var(--color-text-secondary, #575757);
  --bl-ia-ter: var(--color-text-tertiary, #6C6C6C);
  --bl-ia-muted: var(--color-text-muted, #727272);
  --bl-ia-bg: var(--color-bg-secondary, #F3F3F3);
  --bl-ia-surface: var(--color-bg, #FBFBFB);
  --bl-ia-white: #fff;
  --bl-ia-border: var(--color-border-subtle, #E8E4F0);
  --bl-ia-accent: var(--color-accent-subtle, rgba(149,144,194,0.10));
  --bl-ia-blue: #2d68c4;
  font-family: var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif);
  color: var(--bl-ia-ink);
}

.bl-ia-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  margin: 0 0 28px;
}

.bl-ia-before, .bl-ia-after {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.bl-ia-chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.1px;
}

.bl-ia-chip-muted {
  background: var(--bl-ia-bg);
  color: var(--bl-ia-muted);
  text-decoration: line-through;
  text-decoration-color: rgba(0,0,0,0.25);
}

.bl-ia-chip-focus {
  background: var(--bl-ia-accent);
  color: var(--bl-ia-ink);
}

.bl-ia-arrow {
  color: var(--bl-ia-muted);
  font-size: 14px;
}

.bl-ia-flow-note {
  font-size: 12px;
  color: var(--bl-ia-muted);
}

.bl-ia-stage {
  display: grid;
  grid-template-columns: minmax(220px, 260px) 1fr;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 36px;
}

.bl-ia-phone {
  background: var(--bl-ia-white);
  border: 1px solid var(--bl-ia-border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  min-height: 340px;
}

.bl-ia-phone-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 12px 10px;
  border-bottom: 1px solid var(--bl-ia-border);
}

.bl-ia-brand {
  font-size: 13px;
  font-weight: 600;
  color: var(--bl-ia-blue);
}

.bl-ia-list-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.bl-ia-list-cta {
  appearance: none;
  border: none;
  background: var(--bl-ia-blue);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  border-radius: 999px;
  padding: 5px 10px;
  pointer-events: none;
}

.bl-ia-annot {
  font-size: 10px;
  color: var(--bl-ia-ter);
  background: var(--bl-ia-accent);
  border-radius: 4px;
  padding: 2px 6px;
  white-space: nowrap;
}

.bl-ia-screen {
  flex: 1;
  background: var(--bl-ia-bg);
  padding: 10px;
  min-height: 200px;
}

.bl-ia-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bl-ia-preview-title {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--bl-ia-ink);
}

.bl-ia-search {
  height: 28px;
  border-radius: 999px;
  background: var(--bl-ia-white);
  border: 1px solid var(--bl-ia-border);
  margin-bottom: 4px;
}

.bl-ia-card {
  display: flex;
  gap: 8px;
  background: var(--bl-ia-white);
  border-radius: 8px;
  padding: 8px;
  border: 1px solid var(--bl-ia-border);
}

.bl-ia-card-img {
  width: 52px;
  height: 40px;
  border-radius: 4px;
  background: linear-gradient(135deg, #d7e4f5, #e8e4f0);
  flex-shrink: 0;
}

.bl-ia-card-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  min-width: 0;
}

.bl-ia-line {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: #d9d9d9;
  width: 100%;
}

.bl-ia-line-sm { width: 40%; }
.bl-ia-line-mid { width: 70%; }

.bl-ia-row, .bl-ia-profile-head {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bl-ia-white);
  border: 1px solid var(--bl-ia-border);
  border-radius: 8px;
  padding: 8px;
}

.bl-ia-row-thumb {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(135deg, #d7e4f5, #e8e4f0);
  flex-shrink: 0;
}

.bl-ia-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #cfcfcf;
  flex-shrink: 0;
}

.bl-ia-avatar-lg {
  width: 40px;
  height: 40px;
}

.bl-ia-menu-row {
  background: var(--bl-ia-white);
  border: 1px solid var(--bl-ia-border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 11px;
  color: var(--bl-ia-sec);
}

.bl-ia-tabbar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--bl-ia-border);
  background: var(--bl-ia-white);
  padding: 6px 4px 8px;
}

.bl-ia-tab {
  appearance: none;
  border: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 2px;
  font-size: 10px;
  font-weight: 500;
  color: var(--bl-ia-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s ease, color 0.15s ease;
}

.bl-ia-tab:hover { background: var(--bl-ia-bg); }
.bl-ia-tab:focus-visible {
  outline: 2px solid var(--bl-ia-blue);
  outline-offset: 1px;
}
.bl-ia-tab.is-active { color: var(--bl-ia-ink); }

.bl-ia-detail {
  background: var(--bl-ia-accent);
  border-radius: 8px;
  padding: 20px 20px 18px;
  min-height: 100%;
  box-sizing: border-box;
}

.bl-ia-job {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--bl-ia-ter);
}

.bl-ia-detail-title {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: var(--bl-ia-ink);
  font-family: var(--font-sans-medium, var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif));
}

.bl-ia-detail-why {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.65;
  color: var(--bl-ia-sec);
}

.bl-ia-connects-label {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--bl-ia-ter);
}

.bl-ia-connects {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bl-ia-connects li {
  font-size: 13px;
  color: var(--bl-ia-sec);
  padding: 8px 10px;
  background: rgba(255,255,255,0.55);
  border-radius: 6px;
}

.bl-ia-schema-label {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--bl-ia-ter);
  letter-spacing: -0.1px;
}

.bl-ia-schema-body {
  margin: 0 0 16px;
  font-size: 15px;
  line-height: 1.72;
  letter-spacing: 0.1px;
  color: var(--bl-ia-sec);
}

.bl-ia-schema-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.bl-ia-schema-card {
  background: var(--bl-ia-accent);
  border-radius: 8px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 64px;
}

.bl-ia-schema-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--bl-ia-ink);
}

.bl-ia-schema-note {
  font-size: 12px;
  color: var(--bl-ia-sec);
  line-height: 1.4;
}

@media (max-width: 700px) {
  .bl-ia-stage {
    grid-template-columns: 1fr;
  }
  .bl-ia-phone {
    max-width: 320px;
    margin: 0 auto;
    width: 100%;
  }
  .bl-ia-schema-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
`;
