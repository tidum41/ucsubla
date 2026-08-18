'use client';

import Link from 'next/link';

const C = {
  blue: '#2d68c4',
  blueSoft: 'rgba(45, 104, 196, 0.08)',
  blueBorder: 'rgba(45, 104, 196, 0.22)',
  dark: '#0f172a',
  slate: '#64748b',
  light: '#94a3b8',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  tag: '#f8fafc',
  bg: '#efefef',
  white: '#ffffff',
};

export default function InformationArchitecturePage() {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: C.white,
        color: C.dark,
        padding: '48px 48px 96px',
        maxWidth: '980px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                background: C.blue,
                borderRadius: '10px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              BL
            </div>
            <span style={{ fontSize: '24px', fontWeight: 600, color: C.blue }}>BruinLease</span>
          </div>
          <Link
            href="/design-system"
            style={{
              fontSize: '13px',
              color: C.blue,
              textDecoration: 'none',
              fontWeight: 500,
              border: `1.5px solid ${C.blue}`,
              borderRadius: '18px',
              padding: '7px 14px',
            }}
          >
            Design System →
          </Link>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 8px' }}>Information Architecture</h1>
        <p style={{ fontSize: '14px', color: C.slate, margin: 0, maxWidth: '560px', lineHeight: 1.5 }}>
          How screens, navigation, and content are organized across the UCLA subleasing app.
        </p>
      </div>

      {/* 01 Overview */}
      <Section title="01  Product map">
        <p style={{ margin: '0 0 24px', fontSize: '14px', color: C.slate, lineHeight: 1.55, maxWidth: '640px' }}>
          Four primary destinations in the bottom nav, plus a global List action and a Login entry point.
          Discovery lives on Home; ownership and account live under Profile.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
          }}
        >
          <Pillar
            label="Home"
            path="/"
            role="Discover"
            items={['Search streets', 'Filter listings', 'Browse feed', 'Open listing']}
          />
          <Pillar
            label="Saved"
            path="/bookmarks"
            role="Shortlist"
            items={['Bookmarked listings', 'Jump to detail']}
          />
          <Pillar
            label="Chat"
            path="/messages"
            role="Coordinate"
            items={['Conversation list', 'Thread view', 'Link to listing']}
          />
          <Pillar
            label="Profile"
            path="/profile"
            role="Account"
            items={['My listings', 'Settings', 'Edit profile', 'Verification']}
          />
        </div>
      </Section>

      {/* 02 Primary nav */}
      <Section title="02  Primary navigation">
        <div
          style={{
            background: C.tag,
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            padding: '28px 32px',
          }}
        >
          <p style={{ margin: '0 0 20px', fontSize: '12px', color: C.light, fontWeight: 500 }}>
            Bottom tab bar · always present on main screens
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
            {[
              { label: 'Home', path: '/', active: true },
              { label: 'Saved', path: '/bookmarks' },
              { label: 'Chat', path: '/messages', badge: true },
              { label: 'Profile', path: '/profile' },
            ].map((item) => (
              <div key={item.path} style={{ textAlign: 'center', minWidth: '72px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    margin: '0 auto 8px',
                    borderRadius: '12px',
                    background: item.active ? C.blueSoft : C.white,
                    border: `1.5px solid ${item.active ? C.blueBorder : C.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: item.active ? C.blue : C.slate,
                  }}
                >
                  {item.label.slice(0, 1)}
                  {item.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: C.blue,
                      }}
                    />
                  )}
                </div>
                <div style={{ fontSize: '13px', fontWeight: item.active ? 600 : 500, color: item.active ? C.blue : C.dark }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '11px', color: C.light, marginTop: '2px', fontFamily: 'ui-monospace, monospace' }}>
                  {item.path}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: `1px solid ${C.border}`,
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            <GlobalAction label="List" path="/listing/new" note="Header CTA · create listing wizard" />
            <GlobalAction label="Search" path="/" note="Home header · street / location query" />
            <GlobalAction label="Filters" path="/" note="Modal over Home · refine results" />
            <GlobalAction label="Login" path="/login" note="Auth entry · @ucla.edu email" />
          </div>
        </div>
      </Section>

      {/* 03 Sitemap */}
      <Section title="03  Sitemap">
        <div
          style={{
            background: C.tag,
            border: `1px solid ${C.border}`,
            borderRadius: '16px',
            padding: '28px',
          }}
        >
          <SitemapNode label="BruinLease" path="App root" root>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px', marginTop: '16px' }}>
              <div>
                <SitemapGroup title="Discover">
                  <SitemapLeaf label="Home / Feed" path="/" />
                  <SitemapLeaf label="Listing detail" path="/listing/[id]" />
                  <SitemapLeaf label="Filter modal" path="overlay on Home" muted />
                </SitemapGroup>
                <SitemapGroup title="Create listing">
                  <SitemapLeaf label="List wizard" path="/listing/new" />
                  <SitemapLeaf label="1 · Photos" path="step" muted />
                  <SitemapLeaf label="2 · Location" path="step" muted />
                  <SitemapLeaf label="3 · Details" path="step" muted />
                  <SitemapLeaf label="4 · Amenities" path="step" muted />
                  <SitemapLeaf label="5 · Review & publish" path="step" muted />
                  <SitemapLeaf label="Classic form (legacy)" path="/listing/new-classic" muted />
                </SitemapGroup>
              </div>
              <div>
                <SitemapGroup title="Engage">
                  <SitemapLeaf label="Saved / Bookmarks" path="/bookmarks" />
                  <SitemapLeaf label="Messages" path="/messages" />
                  <SitemapLeaf label="Conversation thread" path="inline on /messages" muted />
                </SitemapGroup>
                <SitemapGroup title="Account">
                  <SitemapLeaf label="Profile" path="/profile" />
                  <SitemapLeaf label="Edit profile" path="/profile/edit" />
                  <SitemapLeaf label="My listings" path="/my-listings" />
                  <SitemapLeaf label="Settings" path="/settings" />
                  <SitemapLeaf label="Login" path="/login" />
                  <SitemapLeaf label="Verification" path="toast / coming soon" muted />
                </SitemapGroup>
                <SitemapGroup title="Internal">
                  <SitemapLeaf label="Design system" path="/design-system" muted />
                  <SitemapLeaf label="Information architecture" path="/information-architecture" muted />
                </SitemapGroup>
              </div>
            </div>
          </SitemapNode>
        </div>
      </Section>

      {/* 04 Flows */}
      <Section title="04  Core user flows">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Flow
            name="Find a place"
            steps={['Home', 'Search / Filter', 'Listing detail', 'Save or Message']}
          />
          <Flow
            name="List a place"
            steps={['List CTA', 'Photos', 'Location', 'Details', 'Amenities', 'Review', 'Published listing']}
          />
          <Flow
            name="Message a lister"
            steps={['Listing detail', 'Compose modal', 'Messages thread']}
          />
          <Flow
            name="Manage account"
            steps={['Profile', 'My listings / Settings / Edit', 'Optional login']}
          />
        </div>
      </Section>

      {/* 05 Content model */}
      <Section title="05  Content model · Listing">
        <p style={{ margin: '0 0 20px', fontSize: '14px', color: C.slate, lineHeight: 1.55 }}>
          The listing is the central object. Cards, detail, filters, chat, and bookmarks all hang off it.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}
        >
          <ContentBlock
            title="Basics"
            items={['Title', 'Price / month', 'Address', 'Distance to campus', 'Photos', 'Description']}
          />
          <ContentBlock
            title="Stay details"
            items={['Room type', 'Bathroom', 'Roommate preference', 'Move-in / move-out', 'Quarters']}
          />
          <ContentBlock
            title="Trust & extras"
            items={['UCLA verified', 'Amenities', 'Lister', 'Created date', 'Reviews (detail)']}
          />
        </div>
      </Section>

      {/* 06 Filters */}
      <Section title="06  Discovery filters">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
          }}
        >
          {[
            { title: 'Trust', items: ['Verified UCLA only'] },
            { title: 'Dates', items: ['Move-in', 'Move-out', 'Quarter chips'] },
            { title: 'Budget & location', items: ['Max rent', 'Max distance from campus'] },
            { title: 'Room', items: ['Single / Double / Triple+', 'Private / Shared bath', 'Roommate preference'] },
            { title: 'Amenities', items: ['Essentials', 'Kitchen', 'Building', 'Parking', 'Accessibility'] },
            { title: 'Search', items: ['Street / address text query on Home'] },
          ].map((block) => (
            <div
              key={block.title}
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: '12px',
                padding: '16px 18px',
                background: C.white,
              }}
            >
              <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600, color: C.blue }}>{block.title}</p>
              <ul style={{ margin: 0, padding: '0 0 0 16px', color: C.slate, fontSize: '13px', lineHeight: 1.7 }}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 Hierarchy diagram */}
      <Section title="07  Screen hierarchy">
        <div
          style={{
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          <div style={{ minWidth: '820px' }}>
            {/* Root */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <NodeChip label="BruinLease" emphasis />
            </div>
            <Connector />
            {/* Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '12px' }}>
              <NodeChip label="Home" />
              <NodeChip label="Saved" />
              <NodeChip label="Chat" />
              <NodeChip label="Profile" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <ChildStack items={['Filters', 'Listing detail', '→ Message / Save', '→ List wizard']} />
              <ChildStack items={['Listing detail']} />
              <ChildStack items={['Thread', '← Listing link']} />
              <ChildStack items={['My listings', 'Edit profile', 'Settings', 'Verification']} />
            </div>
          </div>
        </div>
      </Section>

      <footer style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${C.border}` }}>
        <p style={{ margin: 0, fontSize: '12px', color: C.light }}>
          BruinLease · Information Architecture · mirrors live routes in <code style={{ color: C.slate }}>/app</code>
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2
          style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: 600,
            color: C.slate,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h2>
        <div style={{ flex: 1, height: '1px', background: C.border }} />
      </div>
      {children}
    </div>
  );
}

function Pillar({
  label,
  path,
  role,
  items,
}: {
  label: string;
  path: string;
  role: string;
  items: string[];
}) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: '14px',
        padding: '18px 16px',
        background: C.white,
        minHeight: '180px',
      }}
    >
      <div style={{ fontSize: '11px', fontWeight: 600, color: C.blue, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
        {role}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '11px', color: C.light, fontFamily: 'ui-monospace, monospace', marginBottom: '14px' }}>{path}</div>
      <ul style={{ margin: 0, padding: '0 0 0 14px', fontSize: '12px', color: C.slate, lineHeight: 1.65 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function GlobalAction({ label, path, note }: { label: string; path: string; note: string }) {
  return (
    <div style={{ minWidth: '160px' }}>
      <div style={{ fontSize: '13px', fontWeight: 600, color: C.dark }}>{label}</div>
      <div style={{ fontSize: '11px', color: C.blue, fontFamily: 'ui-monospace, monospace' }}>{path}</div>
      <div style={{ fontSize: '11px', color: C.light, marginTop: '2px' }}>{note}</div>
    </div>
  );
}

function SitemapNode({
  label,
  path,
  root,
  children,
}: {
  label: string;
  path: string;
  root?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span style={{ fontSize: root ? '16px' : '14px', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '11px', color: C.light, fontFamily: 'ui-monospace, monospace' }}>{path}</span>
      </div>
      {children}
    </div>
  );
}

function SitemapGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: C.blue,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: `2px solid ${C.border}`, paddingLeft: '12px' }}>
        {children}
      </div>
    </div>
  );
}

function SitemapLeaf({ label, path, muted }: { label: string; path: string; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', opacity: muted ? 0.72 : 1 }}>
      <span style={{ fontSize: '13px', color: C.dark }}>{label}</span>
      <span style={{ fontSize: '11px', color: C.light, fontFamily: 'ui-monospace, monospace', whiteSpace: 'nowrap' }}>{path}</span>
    </div>
  );
}

function Flow({ name, steps }: { name: string; steps: string[] }) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: '14px',
        padding: '18px 20px',
        background: C.white,
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '14px' }}>{name}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        {steps.map((step, i) => (
          <div key={`${step}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: i === 0 ? C.blueSoft : C.tag,
                border: `1px solid ${i === 0 ? C.blueBorder : C.border}`,
                color: i === 0 ? C.blue : C.dark,
                borderRadius: '999px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <span style={{ color: C.light, fontSize: '14px' }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      style={{
        background: C.tag,
        border: `1px solid ${C.border}`,
        borderRadius: '12px',
        padding: '16px 18px',
      }}
    >
      <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: 600 }}>{title}</p>
      <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '13px', color: C.slate, lineHeight: 1.7 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function NodeChip({ label, emphasis }: { label: string; emphasis?: boolean }) {
  return (
    <div
      style={{
        textAlign: 'center',
        background: emphasis ? C.blue : C.white,
        color: emphasis ? C.white : C.dark,
        border: emphasis ? 'none' : `1.5px solid ${C.border}`,
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '13px',
        fontWeight: 600,
        boxShadow: emphasis ? '0 2px 8px rgba(45,104,196,0.25)' : 'none',
      }}
    >
      {label}
    </div>
  );
}

function Connector() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '20px' }}>
      <div style={{ width: '1.5px', background: C.border }} />
    </div>
  );
}

function ChildStack({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'stretch' }}>
      <div style={{ height: '12px', borderLeft: `1.5px solid ${C.border}`, marginLeft: '50%', marginBottom: '-8px' }} />
      {items.map((item) => (
        <div
          key={item}
          style={{
            background: C.tag,
            border: `1px solid ${C.border}`,
            borderRadius: '10px',
            padding: '10px 12px',
            fontSize: '12px',
            color: C.slate,
            textAlign: 'center',
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
