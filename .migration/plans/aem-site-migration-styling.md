# Single Page Migration Plan — Match Original Site Styling

## Overview
Migrate a single page from its original source to AEM Edge Delivery Services, replicating the original site's design as closely as possible.

> **Note:** The specific page URL is required before execution can begin. Please provide the full URL (e.g., `https://example.com/about`) when switching to Execute mode.

## Approach
- **Content migration** with full design system extraction
- **1:1 styling match** — extract colors, fonts, spacing, and layout from the original page
- **Block variant tracking** — identify and create appropriate EDS block variants

---

## Checklist

### Phase 1: Site & Page Analysis
- [ ] Collect the target page URL from user
- [ ] Run site analysis to identify page template and structure
- [ ] Run page analysis to identify sections, blocks, and content sequences
- [ ] Review analysis results and confirm block mapping with user

### Phase 2: Design System Extraction
- [ ] Extract design tokens from original site (colors, typography, spacing)
- [ ] Map design tokens to CSS custom properties in `styles/styles.css`
- [ ] Set up font definitions in `styles/fonts.css`

### Phase 3: Block Mapping & Import Infrastructure
- [ ] Map page content to EDS blocks (hero, columns, cards, etc.)
- [ ] Create block variant definitions where needed
- [ ] Generate import parsers and page transformers
- [ ] Generate the import script

### Phase 4: Content Import
- [ ] Execute the import script to generate HTML content
- [ ] Validate generated HTML structure

### Phase 5: Block Development & Styling
- [ ] Implement block JavaScript (decoration logic) for any custom variants
- [ ] Implement block CSS to match original site appearance
- [ ] Apply global styles (sections, buttons, links, default content)

### Phase 6: Preview & Validation
- [ ] Preview the migrated page locally
- [ ] Compare visual output against the original page
- [ ] Critique and fix any styling differences
- [ ] Final visual QA pass

---

## Prerequisites
- **Page URL** — must be provided before execution
- **Local dev server** — `localhost:3000` must be running
- **Git repo** — clean working state recommended

## Execution
To begin, switch to **Execute mode** and provide the page URL. The migration will be orchestrated using the site migration workflow, which coordinates all phases automatically.
