# Marubeni.com/jp/ Site Analysis & Block Identification Plan

## 1. Site Overview

**Site:** https://www.marubeni.com/jp/ (Marubeni Corporation — Japanese corporate website)
**Language:** Japanese (JP)
**Nature:** Large-scale Japanese trading company (総合商社) corporate site covering company info, business divisions, investor relations, news, sustainability, and brand media.

---

## 2. Page Pattern Analysis

### 2.1 Identified Page Templates

After analyzing 12+ pages across the site, **5 distinct page templates** emerge:

| # | Template Name | Pattern | Example Pages |
|---|--------------|---------|---------------|
| **T1** | **Homepage** | Hero + news feed + card grids + banners | `/jp/` |
| **T2** | **Hub/Index Page** | Hero banner + card grid navigation to child pages | `/jp/company/`, `/jp/business/`, `/jp/brand_media/history/`, `/jp/sustainability/contribution/` |
| **T3** | **Article/Message Page** | Hero image + long-form text content + sign-off | `/jp/company/message/`, `/jp/company/governance/` |
| **T4** | **News Listing Page** | Filters (category, year, keyword) + date-grouped news items | `/jp/news/` |
| **T5** | **Feature/Case Study Page** | Video hero + narrative text + case studies with images | `/jp/brand_media/scope/it-digitalsolutions/` |

**Additional sub-patterns observed:**
- **Document download pages** (e.g., `/jp/company/plan/`) — strategy documents with PDF links and image slideshows
- **Data/infographic pages** (e.g., `/jp/company/data/`) — statistics and visual data
- **Organization chart pages** (e.g., `/jp/company/organization/`) — single large image
- **Research institute pages** (e.g., `/jp/research/`) — mission statement + report listing + navigation tiles

---

### 2.2 Selected Pages for Migration (Representative Set)

To capture all unique patterns, the following **8 pages** are recommended:

| # | Page URL | Template | Why Selected |
|---|----------|----------|--------------|
| 1 | `/jp/` | T1 — Homepage | Unique: hero carousel, news feed, multi-grid layouts, banners |
| 2 | `/jp/company/` | T2 — Hub | Representative hub with 10-card navigation grid + related info banners |
| 3 | `/jp/business/` | T2 — Hub (variant) | Hub with numbered image tiles (01–11) for business divisions |
| 4 | `/jp/ir/` | T2 — Hub (complex) | Most complex hub: quick-access cards, news feed, rankings, calendar, multiple link sections |
| 5 | `/jp/news/` | T4 — News Listing | Unique: category/year filters, keyword search, month anchors, tabbed content |
| 6 | `/jp/company/message/` | T3 — Article | Text-heavy CEO message with hero image and author sign-off |
| 7 | `/jp/company/plan/` | T3 — Article (variant) | Document-focused with PDF downloads and image slideshow |
| 8 | `/jp/brand_media/scope/it-digitalsolutions/` | T5 — Feature Story | Narrative case study with embedded video, multiple images, quotes |

---

## 3. Block Identification

### 3.1 Block Discovery Method

Blocks were identified by:
1. **Cross-page component analysis** — Identifying recurring UI patterns across all analyzed pages
2. **Structural decomposition** — Breaking each page into discrete, reusable content sections
3. **EDS authoring alignment** — Mapping components to patterns suitable for Edge Delivery Services block authoring (table-based content modeling)

### 3.2 Identified Blocks (14 Blocks)

| # | Block Name | Description | Found On Pages |
|---|-----------|-------------|----------------|
| **1** | **Hero** | Full-width hero banner with title image (mobile/desktop variants) | All pages (T1–T5) |
| **2** | **Cards** | Grid of linked image+text cards for navigation to child pages; multiple variants (2-col, 3-col, 4-col) | Homepage, Company, Business, History, Sustainability |
| **3** | **News List** | Date-stamped news items with category tags and links; chronological display | Homepage, IR |
| **4** | **News Filter** | Category dropdown, year selector, and keyword search for news filtering | News page |
| **5** | **Carousel / Image Gallery** | Sequential image slideshow (used for strategy document pages with numbered images) | Company Plan |
| **6** | **Video Embed** | YouTube/MP4 embedded video with fallback | Feature/Scope pages |
| **7** | **Breadcrumb** | Hierarchical navigation trail (Home > Section > Page) | All interior pages |
| **8** | **Banner** | Horizontal promotional banner with image + text overlay link (used in "Related Information" sections) | Homepage, Company, Business, IR |
| **9** | **Columns** | Multi-column content layout for side-by-side sections | IR (quick access cards), Sustainability (pillar layout) |
| **10** | **Accordion / Tab** | Collapsible or tabbed content sections for organized display | IR (library sections), News (category tabs) |
| **11** | **Download** | PDF document links with file size, date, and download icon | Governance, Company Plan |
| **12** | **Table** | Data table for structured company information (profile, financials) | Company Outline, IR financial data |
| **13** | **Quote / Callout** | Highlighted text block for executive quotes or important notices (fraud alerts, disclaimers) | Homepage (notice), Feature pages (exec quotes) |
| **14** | **Author Sign-off** | Author name, title, date, and portrait photo at end of articles | CEO Message |

### 3.3 Block Variants Summary

| Block | Variants | Rationale |
|-------|----------|-----------|
| **Hero** | `hero` (standard), `hero-video` (with embedded video) | Homepage/hub pages use image hero; feature pages use video hero |
| **Cards** | `cards` (3-col default), `cards-numbered` (numbered tiles for business divisions), `cards-topics` (date-stamped topic cards) | Business page uses numbered 01–11 tiles; Sustainability uses dated topic cards |
| **News List** | `news-list` (simple), `news-list-ranked` (with access ranking numbers) | IR page shows "Access Rankings" as numbered list |
| **Banner** | `banner` (single), `banner-group` (row of 3–4 banners) | Related info sections show grouped banners |
| **Columns** | `columns` (2-col), `columns-3` (3-col) | Different pages use different column counts |

---

## 4. Block Classification: Reusable vs Custom

### 4.1 Blocks Available from EDS Block Collection (Reusable)

These blocks exist in the standard AEM Block Collection / boilerplate and can be reused or lightly adapted:

| # | Block Name | Source | Customization Needed |
|---|-----------|--------|---------------------|
| 1 | **Hero** | Boilerplate default | CSS styling only — Marubeni colors, fonts, spacing |
| 2 | **Cards** | Block Collection `cards` | CSS + minor JS for grid variants |
| 3 | **Columns** | Boilerplate `columns` | CSS styling only |
| 4 | **Video Embed** | Block Collection `embed` | Minor CSS, YouTube/MP4 handling already exists |
| 5 | **Table** | Block Collection `table` | CSS styling for Marubeni design |
| 6 | **Accordion / Tab** | Block Collection `accordion` / `tabs` | CSS + minor JS wiring for Marubeni tab style |

### 4.2 Custom Blocks (Must Be Built from Scratch)

These blocks have no standard equivalent and require full custom development:

| # | Block Name | Why Custom |
|---|-----------|-----------|
| 7 | **News List** | Marubeni-specific date format, category tags, chronological grouping — no standard equivalent |
| 8 | **News Filter** | Complex JS: multi-faceted filtering (category dropdown, year selector, keyword search) with dynamic content update |
| 9 | **Carousel / Image Gallery** | Sequential image slideshow with numbered slides, specific navigation UX |
| 10 | **Breadcrumb** | Auto-generated from page hierarchy, Marubeni-specific separator and styling |
| 11 | **Banner** | Promotional banner with image + overlay text link, distinct from cards; group variant for rows of 3–4 |
| 12 | **Download** | PDF link display with file size, date metadata, download icon — structured document listing |
| 13 | **Quote / Callout** | Styled callout box for notices/disclaimers and executive quotes with distinct visual treatment |
| 14 | **Author Sign-off** | Structured author attribution: portrait photo, name, title, date — article-specific |

---

## 5. Block Complexity Classification & Effort Estimation

### 5.1 Complexity Criteria

| Complexity | Definition |
|------------|-----------|
| **Simple** | Minimal JS (< 50 lines), mostly CSS styling, single variant, no external data or interactivity |
| **Medium** | Moderate JS (50–150 lines), DOM transformation, 2+ variants, responsive behavior, some interactivity |
| **Complex** | Significant JS (150+ lines), dynamic data fetching/filtering, multiple interactive states, complex UX patterns |

### 5.2 Block Estimation Table

| # | Block Name | Type | Complexity | Variants | Manual Effort (hrs) | AI-Assisted Effort (hrs) | Savings |
|---|-----------|------|-----------|----------|--------------------:|-------------------------:|--------:|
| 1 | **Hero** | Reusable | 🟢 Simple | 2 | 4 | 1 | 75% |
| 2 | **Cards** | Reusable | 🟡 Medium | 3 | 10 | 2.5 | 75% |
| 3 | **Columns** | Reusable | 🟢 Simple | 2 | 3 | 0.5 | 83% |
| 4 | **Video Embed** | Reusable | 🟢 Simple | 1 | 3 | 0.5 | 83% |
| 5 | **Table** | Reusable | 🟢 Simple | 1 | 3 | 0.5 | 83% |
| 6 | **Accordion / Tab** | Reusable | 🟡 Medium | 2 | 8 | 2 | 75% |
| 7 | **News List** | Custom | 🟡 Medium | 2 | 10 | 3 | 70% |
| 8 | **News Filter** | Custom | 🔴 Complex | 1 | 20 | 6 | 70% |
| 9 | **Carousel / Image Gallery** | Custom | 🔴 Complex | 1 | 16 | 5 | 69% |
| 10 | **Breadcrumb** | Custom | 🟢 Simple | 1 | 4 | 1 | 75% |
| 11 | **Banner** | Custom | 🟡 Medium | 2 | 8 | 2 | 75% |
| 12 | **Download** | Custom | 🟢 Simple | 1 | 4 | 1 | 75% |
| 13 | **Quote / Callout** | Custom | 🟢 Simple | 2 | 4 | 1 | 75% |
| 14 | **Author Sign-off** | Custom | 🟢 Simple | 1 | 3 | 0.5 | 83% |

### 5.3 Effort Summary by Complexity

| Complexity | Count | Manual Total (hrs) | AI-Assisted Total (hrs) | Avg Savings |
|------------|------:|--------------------:|------------------------:|------------:|
| 🟢 **Simple** | 7 blocks | **25** | **6** | **76%** |
| 🟡 **Medium** | 5 blocks | **44** | **12.5** | **72%** |
| 🔴 **Complex** | 2 blocks | **36** | **11** | **69%** |
| | **14 total** | **105 hrs** | **29.5 hrs** | **72%** |

### 5.4 Estimation Assumptions

**Manual effort includes:**
- Content model design & authoring documentation
- JavaScript block decoration logic
- CSS styling (mobile-first + responsive breakpoints at 600px/900px/1200px)
- Cross-browser testing & accessibility validation
- Variant handling (each variant adds ~30% to base effort)

**AI-assisted effort includes:**
- AI generates initial JS/CSS scaffolding from block analysis
- Human review, refinement, and design polish
- AI handles variant CSS class replacement automatically
- Visual QA still requires human verification

**Key notes:**
- Reusable blocks save ~2–4 hrs each by starting from existing Block Collection code
- Complex blocks (News Filter, Carousel) retain the highest absolute effort even with AI due to interactive UX logic
- Simple blocks benefit most from AI (80%+ savings) as they are mostly CSS-driven

---

## 6. Overall Project Effort Estimate

| Phase | Scope | Manual (hrs) | AI-Assisted (hrs) |
|-------|-------|-------------:|-------------------:|
| **Phase 1: Foundation** | Global styles, nav, footer, Hero, Breadcrumb | 20 | 5 |
| **Phase 2: Core Blocks** | Cards, Banner, Columns, News List | 31 | 8 |
| **Phase 3: Specialized Blocks** | News Filter, Accordion/Tab, Download, Video, Table, Quote, Author Sign-off | 54 | 16.5 |
| **Phase 4: Page Migration** | 8 pages content import + assembly | 32 | 8 |
| **Phase 5: QA & Polish** | Visual comparison, responsive, a11y, perf | 24 | 10 |
| | **TOTAL** | **161 hrs (~4 weeks)** | **47.5 hrs (~1.2 weeks)** |

> **AI-assisted tooling delivers approximately 70% time savings across the full project, reducing a ~4-week manual effort to ~1.2 weeks.**

---

## 7. Shared Components (Default Content / Sections)

These elements are handled as **default content** (not blocks) in EDS:

| Component | Treatment |
|-----------|-----------|
| **Header / Global Navigation** | `nav.html` — global navigation with mega-menu |
| **Footer** | `footer.html` — global footer with link groups and legal text |
| **Section dividers** | `<hr>` or section styling via metadata |
| **Body text / paragraphs** | Default content within sections |
| **Headings (h1–h4)** | Default content |
| **Images (inline)** | Default content |
| **Links / Buttons** | Default content with button styling |

---

## 8. Site Structure Map

```
/jp/ (Homepage — T1)
├── /jp/company/ (Hub — T2)
│   ├── /jp/company/message/ (Article — T3)
│   ├── /jp/company/outline/ (Article + Table — T3)
│   ├── /jp/company/governance/ (Article + Downloads — T3)
│   ├── /jp/company/officers/ (Profile Grid)
│   ├── /jp/company/organization/ (Single Image)
│   ├── /jp/company/plan/ (Image Gallery + Downloads — T3 variant)
│   └── ... (domestic/international offices, subsidiaries)
├── /jp/business/ (Hub — T2 variant)
│   └── ... (11 division detail pages)
├── /jp/ir/ (Complex Hub — T2)
│   └── ... (earnings, reports, stock, shareholder pages)
├── /jp/news/ (News Listing — T4)
├── /jp/brand_media/
│   ├── /jp/brand_media/history/ (Hub — T2)
│   └── /jp/brand_media/scope/... (Feature Stories — T5)
├── /jp/sustainability/contribution/ (Hub — T2)
└── /jp/research/ (Research Institute — T2 variant)
```

---

## 9. Implementation Checklist

### Phase 1: Foundation
- [ ] Set up project structure and global styles (fonts, colors, spacing from Marubeni design system)
- [ ] Create `nav.html` and `footer.html` from global navigation
- [ ] Implement **Hero** block — 🟢 Simple, Reusable (standard + video variants)
- [ ] Implement **Breadcrumb** block — 🟢 Simple, Custom

### Phase 2: Core Blocks
- [ ] Implement **Cards** block — 🟡 Medium, Reusable (3 variants: default, numbered, topics)
- [ ] Implement **Banner** block — 🟡 Medium, Custom (single + group variants)
- [ ] Implement **Columns** block — 🟢 Simple, Reusable (2-col + 3-col)
- [ ] Implement **News List** block — 🟡 Medium, Custom (simple + ranked)

### Phase 3: Specialized Blocks
- [ ] Implement **News Filter** block — 🔴 Complex, Custom
- [ ] Implement **Accordion / Tab** block — 🟡 Medium, Reusable
- [ ] Implement **Download** block — 🟢 Simple, Custom
- [ ] Implement **Video Embed** block — 🟢 Simple, Reusable
- [ ] Implement **Table** block — 🟢 Simple, Reusable
- [ ] Implement **Quote / Callout** block — 🟢 Simple, Custom
- [ ] Implement **Author Sign-off** block — 🟢 Simple, Custom
- [ ] Implement **Carousel / Image Gallery** block — 🔴 Complex, Custom

### Phase 4: Page Migration
- [ ] Migrate Homepage (`/jp/`)
- [ ] Migrate Hub pages (`/jp/company/`, `/jp/business/`, `/jp/ir/`)
- [ ] Migrate Article pages (`/jp/company/message/`, `/jp/company/plan/`)
- [ ] Migrate News page (`/jp/news/`)
- [ ] Migrate Feature page (`/jp/brand_media/scope/it-digitalsolutions/`)

### Phase 5: QA & Design Polish
- [ ] Visual comparison against original site for each migrated page
- [ ] Responsive design verification (mobile, tablet, desktop)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance validation (Lighthouse 100 target)

---

## 10. Key Observations & Risks

| Observation | Impact |
|-------------|--------|
| **Heavy use of image-based content** (org charts, strategy slides displayed as image sequences) | Need carousel/gallery block; some content may not be easily editable in CMS |
| **Complex IR section** with rankings, calendars, multi-section layouts | IR hub is the most complex page — may need dedicated variants |
| **Research Institute** appears to be a semi-independent sub-site | May warrant its own template treatment |
| **External links** to Bloomberg, Reuters, disclosure.site, recruit site | These remain as links — no migration needed |
| **Japanese-only content** | All text is Japanese; ensure proper font support and character rendering |
| **News filtering is JavaScript-heavy** | Category/year/keyword filters require custom JS block implementation |
| **Two 🔴 Complex blocks** (News Filter, Carousel) account for 34% of manual block effort | These are the highest-risk items — prioritize early prototyping |
