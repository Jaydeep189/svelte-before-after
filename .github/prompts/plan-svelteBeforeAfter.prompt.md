# Svelte 5 Before/After Image Comparison Slider Library

**TL;DR**: Build a polished, accessible, Svelte 5 component library (`svelte-before-after`) that renders a draggable before/after image comparison slider. The component will use Svelte 5 runes (`$props`, `$state`, `$derived`, `$bindable`, `$effect`), snippets for label slots, `ResizeObserver` for robust sizing, keyboard accessibility, and full TypeScript types. A demo route will showcase multiple configurations. The existing packaging infrastructure (`@sveltejs/package`, `publint`, `exports` map) is already correctly configured — no changes needed there.

---

## Steps

### 1. Create the core component: `src/lib/BeforeAfter.svelte`

- **Props** (all via `$props()` with defaults):
  - `before: string` — URL of the "before" image (required)
  - `after: string` — URL of the "after" image (required)
  - `offset: number` — `$bindable(0.5)`, the split position (0–1)
  - `contain: boolean` — `false`, if true fills parent 100% width/height
  - `overlay: boolean` — `true`, dark overlay on hover
  - `hideOnSlide: boolean` — `true`, fade labels/overlay while dragging
  - `beforeLabel: Snippet` — optional snippet for before label content
  - `afterLabel: Snippet` — optional snippet for after label content
  - `vertical: boolean` — `false`, if true the slider works top-to-bottom instead of left-to-right
  - `handleSize: number` — `40`, size of the circular drag handle in px
  - `class: string` — `""`, additional CSS class on the container for consumer styling

- **Internal state** (via `$state` / `$derived`):
  - `sliding: boolean` — whether user is actively dragging
  - `containerEl: HTMLDivElement` — `bind:this` on the container
  - `w` / `h` — tracked via `ResizeObserver` inside an `$effect` (replaces the fragile `onload` + `window.resize` approach from the reference code)
  - `x` — derived pixel offset (`w * offset` or `h * offset` depending on `vertical`)
  - `opacity` — derived from `hideOnSlide && sliding`
  - `style` — derived container sizing string

- **Interaction handlers**:
  - `onmousedown` / `ontouchstart` → start sliding, compute offset
  - Window-level `onmousemove` / `ontouchmove` → update offset while sliding
  - Window-level `onmouseup` / `ontouchend` → stop sliding
  - Use `containerEl.getBoundingClientRect()` in `move()` for accurate position (called live, not cached — avoids stale rect bugs on scroll/resize)

- **Keyboard accessibility**:
  - `role="slider"`, `aria-valuemin={0}`, `aria-valuemax={100}`, `aria-valuenow`, `aria-label`, `tabindex="0"`
  - `onkeydown` handler: ArrowLeft/ArrowDown decreases offset by 0.01, ArrowRight/ArrowUp increases by 0.01 (clamped 0–1)

- **ResizeObserver** (inside `$effect`):
  - Observe `containerEl`, update `w` and `h` on resize
  - Disconnect in the effect cleanup — eliminates need for `onload` / `window.onresize`

- **Rendering** (horizontal mode):
  - Container `<div>` with `overflow:hidden; position:relative`
  - "After" image: absolutely positioned, full size, acts as background layer
  - "Before" image: absolutely positioned, clipped via `clip-path: inset(0 {100 - offset*100}% 0 0)` (modern CSS, replaces deprecated `clip: rect(...)`)
  - Optional overlay `<div>` with `opacity` transition on container hover
  - Before/after label `<div>`s rendering `{@render beforeLabel?.()}` / `{@render afterLabel?.()}`
  - Handle `<div>`: circular border, centered vertically, positioned at offset, with divider line via `::before` / `::after` pseudo-elements and arrow indicators

- **Vertical mode**: same structure but rotated — `clip-path: inset(0 0 {100 - offset*100}% 0)`, handle centered horizontally at vertical offset, arrows point up/down

- **Scoped styles**: All CSS scoped to the component. Use CSS custom properties for theming overrides:
  - `--handle-color: white`
  - `--handle-size: 40px`
  - `--overlay-color: rgba(0,0,0,0.5)`
  - `--transition-duration: 0.35s`

### 2. Create TypeScript types: `src/lib/types.ts`

- Export a `BeforeAfterProps` interface reflecting all component props with JSDoc comments
- This provides autocomplete and documentation for library consumers

### 3. Update the library entry point: `src/lib/index.ts`

- Re-export the component: `export { default as BeforeAfter } from './BeforeAfter.svelte';`
- Re-export types: `export type { BeforeAfterProps } from './types.js';`

### 4. Add demo images: `static/`

- Add two sample images to `static/` for the demo page (e.g., `before.jpg` and `after.jpg`). Use freely-licensed placeholder images or simple CSS gradient images generated in-component as a fallback. Since we can't download images, we'll use **inline SVG data URIs** in the demo page as placeholder images (a colored gradient "before" and "after") — no external files needed.

### 5. Build the demo page: `src/routes/+page.svelte`

- Import `BeforeAfter` from `$lib`
- **Section 1 — Hero**: Large before/after slider with sample images, title, and description
- **Section 2 — Basic usage**: Default configuration with minimal props
- **Section 3 — With labels**: Using `beforeLabel` and `afterLabel` snippets to show "Before" / "After" text badges
- **Section 4 — Vertical mode**: `vertical={true}` demo
- **Section 5 — Contained mode**: `contain={true}` inside a fixed-size container
- **Section 6 — Bindable offset**: Show a range `<input>` bound to the same `offset` to demonstrate two-way binding
- Each section gets a heading, brief description, and the component instance
- Light page styling (centered, max-width, spacing) — no external CSS framework needed

### 6. Add a layout for the demo: `src/routes/+layout.svelte`

- Minimal global styles: font-family, box-sizing reset, body margin/padding, dark/light friendly colors
- Render `{@render children()}`

### 7. Write `README.md`

Structure:

- **Title & badges** (npm, license, Svelte 5)
- **Features** bullet list
- **Installation**: `npm i svelte-before-after`
- **Quick Start**: minimal example with `<BeforeAfter before="..." after="..." />`
- **Props table**: name, type, default, description for every prop
- **Snippets (Labels)**: example of `beforeLabel` / `afterLabel` usage
- **Two-way binding**: example of `bind:offset`
- **Vertical mode**: example
- **CSS custom properties**: theming table
- **Keyboard support**: document arrow key behavior
- **Accessibility**: ARIA attributes explained
- **SvelteKit compatibility**: confirm it works with SSR (the component is SSR-safe since `ResizeObserver` is inside `$effect` which only runs client-side)
- **License**: MIT

### 8. Add LICENSE file

- MIT license with current year (2026) and the user's name (can use placeholder)

### 9. Update `package.json` metadata

- Add `description`: "A lightweight, accessible before/after image comparison slider for Svelte 5"
- Add `license`: "MIT"
- Add `keywords`: `["svelte", "svelte5", "before-after", "image-comparison", "slider", "sveltekit"]`
- Add `repository`, `homepage` fields (can be placeholders for now)

---

## Verification

1. Run `pnpm dev` — demo page should load at localhost, all slider instances interactive
2. Drag sliders with mouse and touch — offset updates, images clip correctly
3. Use keyboard arrows on focused slider — offset changes in 1% increments
4. Resize browser window — component adapts without breaking
5. Run `pnpm build` — `svelte-package` should output typed `.d.ts` + `.js` + `.svelte` files in `dist/`
6. Run `pnpm check` — no TypeScript errors
7. Verify vertical mode, contain mode, label snippets, and two-way offset binding all work on the demo page

---

## Key Decisions

- **`clip-path: inset()`** over deprecated `clip: rect()` — modern, works in all current browsers, simpler for vertical mode
- **`ResizeObserver`** over `window.resize` + `onload` — more robust, handles container-level resizes, no stale rect bugs
- **Live `getBoundingClientRect()`** in `move()` instead of caching — avoids offset drift on scroll/layout shift
- **CSS custom properties** for theming over prop-based style overrides — more idiomatic, cascades naturally
- **Inline SVG data URIs** for demo images instead of static files — zero external dependencies for the demo
- **Snippets** (`{@render}`) over legacy slots — Svelte 5 idiomatic approach
