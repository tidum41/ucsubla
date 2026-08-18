# Handoff — BruinLease Information Architecture section

Ship this on **https://www.muditm.com/ucla-sublease** (repo: `tidum41/portfolio`).

The Cloud Agent on `ucsubla` cannot push to `portfolio` (403). Re-run against the portfolio repo, or apply these files manually.

## Files to add / edit

1. **Add** [`components/BruinLeaseIAMap.tsx`](./BruinLeaseIAMap.tsx)  
   Interactive visual: fragmented channels → phone shell with clickable tabs, detail panel, listing schema grid.

2. **Edit** `app/ucla-sublease/page.tsx`
   - Dynamic-import `BruinLeaseIAMap` + `InteractiveBadge`
   - TOC item after Process: `{ id: "information-architecture", label: "Information Architecture" }`
   - FB copy: `iaLabel`, `iaHeading`, `iaBody`
   - New `<Section id="information-architecture">` between Process and Design Decision 1

A fully patched working tree already exists in this agent’s local clone at `/tmp/portfolio-write` (branch `cursor/bruinlease-ia-section-1593`) — push that if you grant write access.

## Sanity note

If CMS `tocItems` are set for `ucla-sublease`, add the same TOC entry in Sanity Studio so it isn’t overwritten by the empty-array merge.

## Preview in this repo

`ucsubla` serves the same section at `/information-architecture`.
