import { addPropertyControls, ControlType } from "framer"
import { useState, useRef, useEffect, CSSProperties } from "react"

// ── Design tokens (mirrors tailwind.config.js) ──────────────────────────────
const C = {
    uclaBlue: "#2d68c4",
    blueBg: "rgba(45,104,196,0.1)",
    darkSlate: "#0f172a",
    slateGray: "#64748b",
    lightSlate: "#94a3b8",
    border: "#E2E8F0",
    background: "#efefef",
    white: "#ffffff",
    font: "Helvetica Neue, Arial, sans-serif",
}

// ── Quarter data (mirrors FilterModal.tsx QUARTER_DATES) ────────────────────
const QUARTERS = [
    { value: "spring", label: "Spring 2026", moveIn: "2026-03-25", moveOut: "2026-06-12" },
    { value: "summer", label: "Summer 2026", moveIn: "2026-06-22", moveOut: "2026-09-11" },
    { value: "fall",   label: "Fall 2026",   moveIn: "2026-09-21", moveOut: "2026-12-11" },
    { value: "winter", label: "Winter 2027", moveIn: "2027-01-04", moveOut: "2027-03-19" },
]

// ── Quarter date lookup ─────────────────────────────────────────────────────
const QUARTER_DATES: Record<string, { moveIn: string; moveOut: string }> = {
    spring: { moveIn: "2026-03-25", moveOut: "2026-06-12" },
    summer: { moveIn: "2026-06-22", moveOut: "2026-09-11" },
    fall:   { moveIn: "2026-09-21", moveOut: "2026-12-11" },
    winter: { moveIn: "2027-01-04", moveOut: "2027-03-19" },
}

function formatDate(iso: string): string {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}

// ── Calendar icon (matches DatePickerField.tsx) ─────────────────────────────
function CalendarIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.lightSlate}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    )
}

// ── Date display card (mirrors DatePickerField layout) ──────────────────────
function DateCard({ date }: { date: string | null }) {
    const card: CSSProperties = {
        background: C.white,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        minHeight: 44,
    }
    return (
        <div style={card}>
            <span style={{
                fontSize: 14,
                color: date ? C.darkSlate : C.lightSlate,
                fontFamily: C.font,
                fontWeight: 400,
                lineHeight: "20px",
            }}>
                {date ? formatDate(date) : "Select date"}
            </span>
            <CalendarIcon />
        </div>
    )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function QuarterFilterMockup({
    defaultQuarter = "summer",
}: {
    defaultQuarter?: string
}) {
    // Proportional scaling — observes outer container width, scales inner content
    const containerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const [naturalHeight, setNaturalHeight] = useState(0)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver(([entry]) => {
            setScale(entry.contentRect.width / 393)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    // Measure natural height once on mount (scale = 1 at this point)
    useEffect(() => {
        if (innerRef.current) {
            setNaturalHeight(innerRef.current.offsetHeight)
        }
    }, [])

    // Multi-select array — mirrors FilterModal.tsx quarters state
    const [selected, setSelected] = useState<string[]>([defaultQuarter])

    // Toggle on/off — mirrors ChipGroup.tsx handleToggle
    function handleToggle(value: string) {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        )
    }

    // Derived dates — mirrors FilterModal.tsx handleQuarterChange exactly
    const dates = selected.map(v => QUARTER_DATES[v]).filter(Boolean)
    const moveIn  = dates.length > 0
        ? dates.reduce((min, d) => d.moveIn  < min ? d.moveIn  : min, dates[0].moveIn)
        : null
    const moveOut = dates.length > 0
        ? dates.reduce((max, d) => d.moveOut > max ? d.moveOut : max, dates[0].moveOut)
        : null

    return (
        <>
            {/* Outer shell — width fills Framer frame; height tracks scaled content */}
            <div ref={containerRef} style={{ width: "100%", height: naturalHeight ? naturalHeight * scale : "auto", overflow: "hidden", borderRadius: 8 }}>
            {/* Inner content — fixed at 393px natural width, scaled uniformly */}
            <div ref={innerRef} style={{
                width: 393,
                transformOrigin: "top left",
                transform: `scale(${scale})`,
                background: C.background,
                padding: "24px 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                fontFamily: C.font,
            }}>

                {/* Move In / Move Out column labels */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 8,
                }}>
                    <span style={{ fontSize: 12, color: C.slateGray, fontFamily: C.font }}>Move In</span>
                    <span style={{ fontSize: 12, color: C.slateGray, fontFamily: C.font }}>Move Out</span>
                </div>

                {/* Date display cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                    marginBottom: 20,
                }}>
                    <DateCard date={moveIn} />
                    <DateCard date={moveOut} />
                </div>

                {/* Quarter chip pills — wraps at 3+1 matching iPhone layout */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                }}>
                    {QUARTERS.map(q => {
                        const isSelected = selected.includes(q.value)
                        const chip: CSSProperties = {
                            padding: "8px 16px",
                            borderRadius: 9999,
                            border: isSelected
                                ? `1px solid ${C.uclaBlue}`
                                : `1px solid ${C.border}`,
                            background: isSelected ? C.blueBg : C.white,
                            color: isSelected ? C.uclaBlue : C.slateGray,
                            fontWeight: 400,
                            fontSize: 14,
                            fontFamily: C.font,
                            lineHeight: "20px",
                            cursor: "pointer",
                            transition: "background 0.08s ease, border-color 0.08s ease, color 0.08s ease",
                            outline: "none",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                        }
                        return (
                            <button
                                key={q.value}
                                style={chip}
                                onClick={() => handleToggle(q.value)}
                            >
                                {q.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            </div>
        </>
    )
}

addPropertyControls(QuarterFilterMockup, {
    defaultQuarter: {
        type: ControlType.Enum,
        title: "Default Quarter",
        options: ["spring", "summer", "fall", "winter"],
        optionTitles: ["Spring 2026", "Summer 2026", "Fall 2026", "Winter 2027"],
        defaultValue: "summer",
    },
})
