'use client';

import Link from 'next/link';

/**
 * Portfolio-ready IA section for BruinLease.
 * Mirrors the /ucla-sublease case-study rhythm so it can drop into the portfolio TOC.
 */

const C = {
  textPrimary: '#2E2E2E',
  textSecondary: '#575757',
  textTertiary: '#6C6C6C',
  textMuted: '#727272',
  accentSubtle: 'rgba(149, 144, 194, 0.10)',
  bg: '#FBFBFB',
  white: '#FFFFFF',
  borderSubtle: '#E8E4F0',
};

const NAV_ITEMS = [
  {
    label: 'Home',
    why: 'Scan standardized listings in one feed instead of hopping Facebook groups and Reddit threads.',
  },
  {
    label: 'Saved',
    why: 'Housing search is multi-session. Students compare options over days, not in a single scroll.',
  },
  {
    label: 'Chat',
    why: 'Keep outreach in-app so seekers stop juggling DMs across platforms just to ask basics.',
  },
  {
    label: 'Profile',
    why: 'Lister and account tools live here—without crowding the seeker jobs that drive most sessions.',
  },
];

const LISTING_FIELDS = [
  { label: 'Price & room type', why: 'The first things eyes need when scanning dozens of posts.' },
  { label: 'Distance + address', why: 'Students think in walk time to campus, not street names alone.' },
  { label: 'Dates / quarters', why: 'Demand follows UCLA’s academic calendar, not arbitrary date pickers.' },
  { label: 'Verified student', why: 'Trust was a top research priority—visibility without leaving the card.' },
  { label: 'Bathroom & roommates', why: 'Basics that otherwise trigger back-and-forth before anyone replies.' },
  { label: 'Amenities', why: 'Enough detail to filter seriously without reading a wall of text.' },
];

export default function InformationArchitecturePage() {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        background: C.bg,
        color: C.textPrimary,
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: 750,
          margin: '0 auto',
          padding: '64px 24px 96px',
        }}
      >
        <p style={{ margin: '0 0 40px', fontSize: 13, color: C.textMuted }}>
          <Link href="/" style={{ color: C.textMuted, textDecoration: 'none' }}>
            BruinLease
          </Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link href="/design-system" style={{ color: C.textMuted, textDecoration: 'none' }}>
            Design system
          </Link>
        </p>

        <section id="information-architecture" style={{ marginBottom: 80 }}>
          <SectionLabel>Information Architecture</SectionLabel>
          <H2>Structure the app around how students already hunt for housing—not around a generic marketplace.</H2>
          <Body>
            Research made the problem clear: seekers jumped across at least three platforms, posts rarely shared the same basics, and trust was always in question. I organized BruinLease around a small set of jobs students already do—browse, shortlist, message, manage—so the product replaces fragmented channels instead of adding another one.
          </Body>

          {/* Primary nav */}
          <div style={{ marginTop: 40, marginBottom: 48 }}>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: C.textTertiary,
                margin: '0 0 16px',
                letterSpacing: '-0.1px',
              }}
            >
              Primary navigation
            </p>

            <div
              style={{
                background: C.white,
                borderRadius: 4,
                border: `1px solid ${C.borderSubtle}`,
                padding: '20px 20px 8px',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                  marginBottom: 16,
                  paddingBottom: 16,
                  borderBottom: `1px solid ${C.borderSubtle}`,
                }}
              >
                {NAV_ITEMS.map((item, i) => (
                  <div key={item.label} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: i === 0 ? 500 : 400,
                        color: i === 0 ? C.textPrimary : C.textSecondary,
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ margin: '0 0 12px', fontSize: 12, color: C.textMuted, textAlign: 'center' }}>
                Four tabs. Seeker jobs first.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 64,
                      fontSize: 14,
                      fontWeight: 500,
                      color: C.textPrimary,
                      lineHeight: 1.55,
                    }}
                  >
                    {item.label}
                  </span>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: C.textSecondary }}>
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* List CTA */}
          <div
            style={{
              background: C.accentSubtle,
              borderRadius: 8,
              padding: '16px 20px',
              marginBottom: 48,
            }}
          >
            <p
              style={{
                margin: '0 0 6px',
                fontSize: 14,
                fontWeight: 500,
                color: C.textPrimary,
              }}
            >
              List stays a header action—not a fifth tab
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: C.textSecondary }}>
              Most sessions are seeking, not listing. Putting create in the header keeps it always available without competing with Home, Saved, and Chat for attention. Lister tools (My Listings, settings) stay under Profile.
            </p>
          </div>

          {/* Listing model */}
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: C.textTertiary,
                margin: '0 0 8px',
                letterSpacing: '-0.1px',
              }}
            >
              What every listing has to capture
            </p>
            <Body style={{ marginBottom: 20 }}>
              Informal posts force constant back-and-forth for price, dates, and room details. A shared schema means seekers can compare apples to apples—and listers get a stepped create flow that reduces cognitive load by dividing the work into sections.
            </Body>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {LISTING_FIELDS.map((field) => (
                <div
                  key={field.label}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px 16px',
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: C.textPrimary,
                      minWidth: 140,
                      flex: '0 0 auto',
                    }}
                  >
                    {field.label}
                  </span>
                  <span style={{ fontSize: 14, lineHeight: 1.55, color: C.textSecondary, flex: '1 1 220px' }}>
                    {field.why}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p style={{ margin: 0, fontSize: 12, color: C.textMuted }}>
          Drop-in for portfolio /ucla-sublease · mirrors live app structure
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 15,
        fontWeight: 400,
        letterSpacing: '0.02em',
        color: C.textTertiary,
        margin: '0 0 16px',
      }}
    >
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 30,
        fontWeight: 500,
        lineHeight: 1.1,
        letterSpacing: '-0.3px',
        color: C.textPrimary,
        margin: '0 0 24px',
      }}
    >
      {children}
    </h2>
  );
}

function Body({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      style={{
        fontSize: 15,
        lineHeight: 1.72,
        letterSpacing: '0.1px',
        color: C.textSecondary,
        margin: '0 0 16px',
        ...style,
      }}
    >
      {children}
    </p>
  );
}
