# svelte-before-after

[![npm](https://img.shields.io/npm/v/svelte-before-after)](https://www.npmjs.com/package/svelte-before-after)
[![license](https://img.shields.io/npm/l/svelte-before-after)](LICENSE)
![svelte-5](https://img.shields.io/badge/svelte-5-ff3e00)

A lightweight, accessible before/after image comparison slider for **Svelte 5**.

## Features

- 🎚️ Draggable slider with mouse, touch, and pointer support
- ⌨️ Full keyboard accessibility (arrow keys)
- ♿ ARIA slider role with proper attributes
- 🔄 Horizontal and vertical modes
- 📐 `ResizeObserver`-based sizing — no stale layout bugs
- 🏷️ Customizable labels via Svelte 5 snippets
- 🔗 Two-way bindable `offset` prop
- 🎨 CSS custom properties for easy theming
- 📦 Typed with TypeScript
- 🖥️ SSR-safe (all browser APIs inside `$effect`)

## Installation

```bash
npm i svelte-before-after
```

## Quick Start

```svelte
<script>
  import { BeforeAfter } from 'svelte-before-after';
</script>

<BeforeAfter before="/before.jpg" after="/after.jpg" />
```

## Props

| Prop          | Type      | Default    | Description                        |
| ------------- | --------- | ---------- | ---------------------------------- |
| `before`      | `string`  | _required_ | URL of the "before" image          |
| `after`       | `string`  | _required_ | URL of the "after" image           |
| `offset`      | `number`  | `0.5`      | Split position (0–1). Bindable.    |
| `contain`     | `boolean` | `false`    | If true, fills parent width/height |
| `overlay`     | `boolean` | `true`     | Dark overlay on hover              |
| `hideOnSlide` | `boolean` | `true`     | Fade labels/overlay while dragging |
| `beforeLabel` | `Snippet` | —          | Snippet for the before label       |
| `afterLabel`  | `Snippet` | —          | Snippet for the after label        |
| `vertical`    | `boolean` | `false`    | Top-to-bottom slider mode          |
| `handleSize`  | `number`  | `40`       | Drag handle diameter in px         |
| `class`       | `string`  | `""`       | Additional CSS class on container  |

## Snippets (Labels)

Use Svelte 5 snippets to add custom label content:

```svelte
<BeforeAfter before="/before.jpg" after="/after.jpg">
  {#snippet beforeLabel()}
    <span class="badge">Before</span>
  {/snippet}
  {#snippet afterLabel()}
    <span class="badge">After</span>
  {/snippet}
</BeforeAfter>
```

## Two-Way Binding

The `offset` prop supports `bind:`:

```svelte
<script>
  import { BeforeAfter } from 'svelte-before-after';
  let offset = $state(0.5);
</script>

<BeforeAfter before="/before.jpg" after="/after.jpg" bind:offset />
<input type="range" min="0" max="1" step="0.01" bind:value={offset} />
```

## Vertical Mode

```svelte
<BeforeAfter before="/before.jpg" after="/after.jpg" vertical={true} />
```

## CSS Custom Properties

Style the component using CSS custom properties on a parent or the component itself:

| Property                | Default           | Description                         |
| ----------------------- | ----------------- | ----------------------------------- |
| `--handle-color`        | `white`           | Handle border & divider color       |
| `--handle-size`         | `40px`            | Handle diameter                     |
| `--overlay-color`       | `rgba(0,0,0,0.5)` | Hover overlay color                 |
| `--transition-duration` | `0.35s`           | Transition speed for overlay/labels |

```svelte
<div style="--handle-color: yellow; --overlay-color: rgba(0,0,0,0.3);">
  <BeforeAfter before="/before.jpg" after="/after.jpg" />
</div>
```

## Keyboard Support

When the component is focused:

| Key                        | Action                |
| -------------------------- | --------------------- |
| `ArrowLeft` / `ArrowUp`    | Decrease offset by 1% |
| `ArrowRight` / `ArrowDown` | Increase offset by 1% |

## Accessibility

The component renders with the following ARIA attributes:

- `role="slider"` — identifies it as a slider control
- `aria-valuemin="0"` / `aria-valuemax="100"` — range boundaries
- `aria-valuenow` — current percentage (0–100)
- `aria-label` — descriptive label
- `tabindex="0"` — keyboard focusable

## SvelteKit Compatibility

This component is fully SSR-safe. All browser APIs (`ResizeObserver`, `getBoundingClientRect`, `window` event listeners) are used inside `$effect` blocks, which only execute client-side.

## License

[MIT](LICENSE)
