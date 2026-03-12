'use client';

export default function DesignSystem() {
  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: '#ffffff', color: '#0f172a', padding: '48px', maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ background: '#2d68c4', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: '20px' }}>🏠</span>
          </div>
          <span style={{ fontSize: '24px', fontWeight: '600', color: '#2d68c4' }}>BruinLease</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '600', margin: '0 0 8px' }}>Design System</h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>UCLA Subleasing App — Visual Language & Component Library</p>
      </div>

      {/* ── SECTION 1: COLORS ── */}
      <Section title="01  Color Palette">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <Swatch color="#2d68c4" name="UCLA Blue" hex="#2D68C4" usage="Primary / CTAs / Links" />
          <Swatch color="#0f172a" name="Dark Slate" hex="#0F172A" usage="Headings / Body text" />
          <Swatch color="#64748b" name="Slate Gray" hex="#64748B" usage="Secondary text" />
          <Swatch color="#94a3b8" name="Light Slate" hex="#94A3B8" usage="Placeholders / Icons" />
          <Swatch color="#efefef" name="Background" hex="#EFEFEF" usage="Page background" border />
          <Swatch color="#f8fafc" name="Tag BG" hex="#F8FAFC" usage="Chip / Badge fill" border />
          <Swatch color="#f1f5f9" name="Border Light" hex="#F1F5F9" usage="Subtle borders" border />
          <Swatch color="#e2e8f0" name="Border" hex="#E2E8F0" usage="Default borders" border />
        </div>
      </Section>

      {/* ── SECTION 2: TYPOGRAPHY ── */}
      <Section title="02  Typography">
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TypeRow label="H1" size="20px / 500" style={{ fontSize: '20px', fontWeight: 500, lineHeight: '28px' }} text="UCLA Sublease Listings Near Campus" />
          <TypeRow label="H2" size="18px / 500" style={{ fontSize: '18px', fontWeight: 500, lineHeight: '28px' }} text="Newest listings near campus" />
          <TypeRow label="H3" size="16px / 500" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px' }} text="Private Room in Westwood Village" />
          <TypeRow label="Body" size="14px / 400" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '20px' }} text="Spacious private room with ensuite bathroom, fully furnished near campus." />
          <TypeRow label="Small" size="12px / 400" style={{ fontSize: '12px', fontWeight: 400, lineHeight: '16px', color: '#64748b' }} text="123 Kelton Ave • 0.3 miles from campus" />
          <TypeRow label="Tiny" size="11px / 500" style={{ fontSize: '11px', fontWeight: 500, lineHeight: '16.5px' }} text="Private Bath  •  Fall Quarter  •  Sep – Dec" />
          <TypeRow label="Nav" size="10px / 500" style={{ fontSize: '10px', fontWeight: 500, lineHeight: '15px', color: '#64748b' }} text="Home   Saved   Chat   Profile" />
        </div>
        <div style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Typeface: <strong style={{ color: '#0f172a' }}>Helvetica Neue</strong> · fallback Arial, sans-serif</p>
        </div>
      </Section>

      {/* ── SECTION 3: SHADOWS & ELEVATION ── */}
      <Section title="03  Elevation">
        <div style={{ display: 'flex', gap: '24px' }}>
          <ElevationCard label="Minimal" desc="Subtle depth for inline cards" shadow="0 1px 2px rgba(0,0,0,0.05)" />
          <ElevationCard label="Card" desc="Standard listing card shadow" shadow="0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)" />
          <ElevationCard label="Elevated" desc="Modals & overlays" shadow="0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)" />
        </div>
      </Section>

      {/* ── SECTION 4: CORE COMPONENTS ── */}
      <Section title="04  Core Components">

        {/* Buttons */}
        <SubSection label="Buttons">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={{ background: '#2d68c4', color: 'white', border: 'none', borderRadius: '18px', padding: '8px 16px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              + List Your Place
            </button>
            <button style={{ background: 'transparent', color: '#2d68c4', border: '1.5px solid #2d68c4', borderRadius: '18px', padding: '7px 16px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
              View Details
            </button>
            <button style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '7px 16px', fontSize: '14px', fontWeight: 400, cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </SubSection>

        {/* Chips / Filter Chips */}
        <SubSection label="Selection Chips">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip label="Single" icon="🛏️" active />
            <Chip label="Double" icon="🛏️" />
            <Chip label="Triple+" icon="🛏️" />
            <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
            <Chip label="Private Bath" icon="🚿" active />
            <Chip label="Shared Bath" icon="🚿" />
            <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }} />
            <Chip label="Fall" />
            <Chip label="Winter" active />
            <Chip label="Spring" />
            <Chip label="Summer" />
          </div>
        </SubSection>

        {/* Tags */}
        <SubSection label="Listing Tags">
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tag label="Double" icon="🛏️" />
            <Tag label="Private" icon="🚿" />
            <Tag label="Sep 20 – Dec 15" icon="📅" />
          </div>
        </SubSection>

        {/* Toggle */}
        <SubSection label="Toggle Switch">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ToggleRow label="Verified UCLA Student" desc="Only show verified listings" on />
            <ToggleRow label="Furnished" desc="Must include furniture" on={false} />
          </div>
        </SubSection>

        {/* Badges */}
        <SubSection label="Badges">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
              <span style={{ fontSize: '14px' }}>✅</span> Verified UCLA Student
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
              <span style={{ fontSize: '14px' }}>📍</span> 0.3 mi from campus
            </div>
            <div style={{ background: '#fff7ed', color: '#ea580c', borderRadius: '12px', padding: '3px 10px', fontSize: '11px', fontWeight: 500 }}>
              Reddit
            </div>
            <div style={{ background: '#eff6ff', color: '#3b82f6', borderRadius: '12px', padding: '3px 10px', fontSize: '11px', fontWeight: 500 }}>
              Bruinwalk
            </div>
          </div>
        </SubSection>

        {/* Range Slider */}
        <SubSection label="Range Slider">
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', maxWidth: '340px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '16px', fontWeight: 500 }}>Budget</span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Up to $2,200/mo</span>
            </div>
            <div style={{ position: 'relative', height: '6px', background: '#e5e7eb', borderRadius: '3px' }}>
              <div style={{ position: 'absolute', left: 0, width: '55%', height: '100%', background: '#2d68c4', borderRadius: '3px' }} />
              <div style={{ position: 'absolute', left: '55%', transform: 'translateX(-50%) translateY(-50%)', top: '50%', width: '16px', height: '16px', background: 'white', border: '2px solid #2d68c4', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
              <span>$600</span><span>$4,000</span>
            </div>
          </div>
        </SubSection>
      </Section>

      {/* ── SECTION 5: KEY SCREENS ── */}
      <Section title="05  Key Components">

        {/* Listing Card */}
        <SubSection label="Listing Card">
          <div style={{ width: '320px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}>
            <div style={{ position: 'relative', height: '180px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '40px', opacity: 0.3 }}>🏠</span>
              <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'white', borderRadius: '999px', padding: '4px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#2d68c4' }}>$1,800/mo</span>
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', fontWeight: 500, color: '#0f172a' }}>Private Room in Westwood</span>
                <span style={{ fontSize: '18px', color: '#2d68c4' }}>🔖</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>123 Kelton Ave • 0.3 miles from campus</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px' }}>✅</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Verified UCLA Student</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <Tag label="Single" icon="🛏️" />
                <Tag label="Private" icon="🚿" />
                <Tag label="Sep – Dec" icon="📅" />
              </div>
            </div>
          </div>
        </SubSection>

        {/* Bottom Navigation */}
        <SubSection label="Bottom Navigation">
          <div style={{ width: '390px', background: 'rgba(255,255,255,0.95)', borderTop: '1px solid #f1f5f9', padding: '8px 0 24px', display: 'flex', justifyContent: 'space-around' }}>
            <NavItem icon="🏠" label="Home" active />
            <NavItem icon="🔖" label="Saved" />
            <NavItem icon="💬" label="Chat" />
            <NavItem icon="👤" label="Profile" />
          </div>
        </SubSection>

        {/* App Header */}
        <SubSection label="App Header">
          <div style={{ width: '390px', background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', padding: '12px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#2d68c4', borderRadius: '6px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🎓</div>
                <span style={{ fontSize: '18px', fontWeight: 600, color: '#2d68c4' }}>BruinLease</span>
              </div>
              <button style={{ background: '#2d68c4', color: 'white', border: 'none', borderRadius: '18px', padding: '6px 14px', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>＋</span> List
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #e2e8f0', borderRadius: '999px', padding: '8px 14px', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>🔍</span>
              <span style={{ fontSize: '14px', color: '#94a3b8' }}>Search streets (e.g. Kelton)...</span>
              <div style={{ marginLeft: 'auto', borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>⚙️</span>
              </div>
            </div>
          </div>
        </SubSection>

        {/* Review Card */}
        <SubSection label="Review Card">
          <div style={{ width: '320px', background: 'white', borderRadius: '10px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: '#f97316', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: 700 }}>r/</div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a', display: 'block' }}>r/UCLA</span>
                  <span style={{ fontSize: '11px', color: '#2d68c4' }}>reddit.com/r/ucla</span>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>2 days ago</span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '18px' }}>&ldquo;Great location, super close to campus. Landlord was responsive and the apartment was exactly as described.&rdquo;</p>
          </div>
        </SubSection>
      </Section>

      {/* ── SECTION 6: SPACING ── */}
      <Section title="06  Spacing Scale">
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
          {[4,8,12,16,20,24,32,48].map(s => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: `${s}px`, height: `${s}px`, background: '#2d68c4', borderRadius: '3px', opacity: 0.15 + (s/48)*0.85 }} />
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500 }}>{s}</span>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}

// ── SUB-COMPONENTS ──

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
      </div>
      {children}
    </div>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <p style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: 500, color: '#94a3b8' }}>{label}</p>
      {children}
    </div>
  );
}

function Swatch({ color, name, hex, usage, border }: { color: string; name: string; hex: string; usage: string; border?: boolean }) {
  return (
    <div>
      <div style={{ height: '72px', background: color, borderRadius: '10px', marginBottom: '10px', border: border ? '1px solid #e2e8f0' : 'none' }} />
      <p style={{ margin: '0 0 2px', fontSize: '13px', fontWeight: 500 }}>{name}</p>
      <p style={{ margin: '0 0 2px', fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{hex}</p>
      <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>{usage}</p>
    </div>
  );
}

function TypeRow({ label, size, style, text }: { label: string; size: string; style: React.CSSProperties; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px' }}>
      <div style={{ minWidth: '80px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block' }}>{label}</span>
        <span style={{ fontSize: '10px', color: '#c4d0dc', fontFamily: 'monospace' }}>{size}</span>
      </div>
      <span style={style}>{text}</span>
    </div>
  );
}

function ElevationCard({ label, desc, shadow }: { label: string; desc: string; shadow: string }) {
  return (
    <div style={{ flex: 1, background: 'white', borderRadius: '12px', padding: '24px', boxShadow: shadow, textAlign: 'center' }}>
      <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 500 }}>{label}</p>
      <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>{desc}</p>
    </div>
  );
}

function Chip({ label, icon, active }: { label: string; icon?: string; active?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: active ? 500 : 400,
      background: active ? 'rgba(45,104,196,0.1)' : 'white',
      border: active ? '1.5px solid #2d68c4' : '1.5px solid #d1d5db',
      color: active ? '#2d68c4' : '#64748b',
      cursor: 'pointer',
    }}>
      {icon && <span style={{ fontSize: '13px' }}>{icon}</span>}
      {label}
    </div>
  );
}

function Tag({ label, icon }: { label: string; icon?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '6px', padding: '7px 11px' }}>
      {icon && <span style={{ fontSize: '14px' }}>{icon}</span>}
      <span style={{ fontSize: '11px', fontWeight: 500, color: '#0f172a' }}>{label}</span>
    </div>
  );
}

function ToggleRow({ label, desc, on }: { label: string; desc: string; on: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', border: '1px solid #f1f5f9', borderRadius: '10px', padding: '12px 16px', maxWidth: '360px' }}>
      <div>
        <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: 500 }}>{label}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{desc}</p>
      </div>
      <div style={{ width: '44px', height: '26px', background: on ? '#2d68c4' : '#d1d5db', borderRadius: '13px', position: 'relative', flexShrink: 0, marginLeft: '16px' }}>
        <div style={{ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
      </div>
    </div>
  );
}

function NavItem({ icon, label, active }: { icon: string; label: string; active?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '4px 16px' }}>
      <span style={{ fontSize: '22px', filter: active ? 'none' : 'grayscale(1) opacity(0.4)' }}>{icon}</span>
      <span style={{ fontSize: '10px', fontWeight: 500, color: active ? '#2d68c4' : '#94a3b8' }}>{label}</span>
    </div>
  );
}
