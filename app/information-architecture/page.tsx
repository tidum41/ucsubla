'use client';

import Link from 'next/link';
import BruinLeaseIAMap from '@/components/BruinLeaseIAMap';

const C = {
  textPrimary: '#2E2E2E',
  textSecondary: '#575757',
  textTertiary: '#6C6C6C',
  textMuted: '#727272',
  bg: '#FBFBFB',
};

/**
 * Preview of the IA section intended for muditm.com/ucla-sublease.
 * Same narrative + visual map the portfolio case study should use.
 */
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
      <div style={{ maxWidth: 750, margin: '0 auto', padding: '64px 24px 96px' }}>
        <p style={{ margin: '0 0 40px', fontSize: 13, color: C.textMuted }}>
          <Link href="/" style={{ color: C.textMuted, textDecoration: 'none' }}>
            BruinLease
          </Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <span>Portfolio section preview for /ucla-sublease</span>
        </p>

        <section id="information-architecture">
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: C.textTertiary,
              margin: '0 0 16px',
            }}
          >
            Information Architecture
          </p>
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
            Structure the app around how students already hunt for housing—not around a generic marketplace.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.72,
              letterSpacing: '0.1px',
              color: C.textSecondary,
              margin: '0 0 28px',
            }}
          >
            Research made the problem clear: seekers jumped across at least three platforms, posts rarely shared the same basics, and trust was always in question. I organized BruinLease around a small set of jobs students already do—browse, shortlist, message, manage—so the product replaces fragmented channels instead of adding another one.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid #E8E4F0',
              borderRadius: 12,
              marginBottom: 12,
              color: '#4D4D4D',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            interactive
          </div>

          <BruinLeaseIAMap />
        </section>
      </div>
    </div>
  );
}
