<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    before,
    after,
    offset = $bindable(0.5),
    contain = false,
    overlay = true,
    hideOnSlide = true,
    beforeLabel,
    afterLabel,
    vertical = false,
    handleSize = 40,
    class: className = "",
  }: {
    before: string;
    after: string;
    offset?: number;
    contain?: boolean;
    overlay?: boolean;
    hideOnSlide?: boolean;
    beforeLabel?: Snippet;
    afterLabel?: Snippet;
    vertical?: boolean;
    handleSize?: number;
    class?: string;
  } = $props();

  let sliding = $state(false);
  let containerEl = $state<HTMLDivElement>();
  let w = $state(0);
  let h = $state(0);

  let x = $derived(vertical ? h * offset : w * offset);
  let labelOpacity = $derived(hideOnSlide && sliding ? 0 : 1);

  let containerStyle = $derived.by(() => {
    if (contain) {
      return "width:100%;height:100%;";
    }
    if (w && h) {
      return `width:${w}px;height:${h}px;`;
    }
    return "";
  });

  // Clip-path for the "before" image
  let clipPath = $derived.by(() => {
    const pct = offset * 100;
    if (vertical) {
      return `inset(0 0 ${100 - pct}% 0)`;
    }
    return `inset(0 ${100 - pct}% 0 0)`;
  });

  // Handle position
  let handleStyle = $derived.by(() => {
    if (vertical) {
      return `top:${x}px;left:50%;transform:translate(-50%,-50%);`;
    }
    return `left:${x}px;top:50%;transform:translate(-50%,-50%);`;
  });

  // Divider line style
  let dividerStyle = $derived.by(() => {
    if (vertical) {
      return `top:${x}px;left:0;right:0;height:2px;width:100%;`;
    }
    return `left:${x}px;top:0;bottom:0;width:2px;height:100%;`;
  });

  // ResizeObserver
  $effect(() => {
    if (!containerEl) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        w = entry.contentRect.width;
        h = entry.contentRect.height;
      }
    });

    ro.observe(containerEl);

    return () => ro.disconnect();
  });

  // If contain mode, we don't rely on image natural size — container dictates size.
  // For non-contain mode, we let the "after" image set the natural size.

  function move(clientX: number, clientY: number) {
    if (!containerEl) return;
    const rect = containerEl.getBoundingClientRect();

    if (vertical) {
      offset = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    } else {
      offset = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    }
  }

  function onPointerDown(e: PointerEvent) {
    e.preventDefault();
    sliding = true;
    move(e.clientX, e.clientY);

    const onPointerMove = (ev: PointerEvent) => {
      move(ev.clientX, ev.clientY);
    };

    const onPointerUp = () => {
      sliding = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onKeyDown(e: KeyboardEvent) {
    const step = 0.01;
    if (vertical) {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        offset = Math.max(0, offset - step);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        offset = Math.min(1, offset + step);
      }
    } else {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        offset = Math.max(0, offset - step);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        offset = Math.min(1, offset + step);
      }
    }
  }
</script>

<div
  bind:this={containerEl}
  class="ba-container {className}"
  class:ba-contain={contain}
  class:ba-vertical={vertical}
  style="{containerStyle}--handle-size:{handleSize}px;"
  role="slider"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={Math.round(offset * 100)}
  aria-label="Before and after image comparison slider"
  tabindex="0"
  onpointerdown={onPointerDown}
  onkeydown={onKeyDown}
>
  <!-- After image (background layer) -->
  <img class="ba-img ba-after-img" src={after} alt="After" draggable="false" />

  <!-- Before image (clipped) -->
  <img
    class="ba-img ba-before-img"
    src={before}
    alt="Before"
    draggable="false"
    style="clip-path:{clipPath};"
  />

  <!-- Overlay -->
  {#if overlay}
    <div class="ba-overlay" style="opacity:{labelOpacity};"></div>
  {/if}

  <!-- Before label -->
  {#if beforeLabel}
    <div
      class="ba-label ba-label-before"
      class:ba-label-hidden={labelOpacity === 0}
      style="opacity:{labelOpacity};"
    >
      {@render beforeLabel()}
    </div>
  {/if}

  <!-- After label -->
  {#if afterLabel}
    <div
      class="ba-label ba-label-after"
      class:ba-label-hidden={labelOpacity === 0}
      style="opacity:{labelOpacity};"
    >
      {@render afterLabel()}
    </div>
  {/if}

  <!-- Divider line -->
  <div class="ba-divider" style={dividerStyle}></div>

  <!-- Handle -->
  <div class="ba-handle" style={handleStyle}>
    {#if vertical}
      <svg
        class="ba-arrow ba-arrow-up"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <svg
        class="ba-arrow ba-arrow-down"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    {:else}
      <svg
        class="ba-arrow ba-arrow-left"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      <svg
        class="ba-arrow ba-arrow-right"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 6 15 12 9 18"></polyline>
      </svg>
    {/if}
  </div>
</div>

<style>
  .ba-container {
    --_handle-color: var(--handle-color, white);
    --_handle-size: var(--handle-size, 40px);
    --_overlay-color: var(--overlay-color, rgba(0, 0, 0, 0.5));
    --_transition-duration: var(--transition-duration, 0.35s);

    position: relative;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
    touch-action: none;
    display: inline-block;
    line-height: 0;
  }

  .ba-container.ba-vertical {
    cursor: ns-resize;
  }

  .ba-container.ba-contain {
    display: block;
  }

  .ba-container:focus-visible {
    outline: 3px solid #4f8fff;
    outline-offset: 2px;
  }

  .ba-img {
    display: block;
    pointer-events: none;
  }

  .ba-after-img {
    width: 100%;
    height: 100%;
  }

  .ba-contain .ba-after-img {
    object-fit: cover;
  }

  .ba-before-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .ba-contain .ba-before-img {
    object-fit: cover;
  }

  .ba-overlay {
    position: absolute;
    inset: 0;
    background: var(--_overlay-color);
    opacity: 0;
    transition: opacity var(--_transition-duration);
    pointer-events: none;
  }

  .ba-container:hover .ba-overlay {
    opacity: 1;
  }

  .ba-label {
    position: absolute;
    transition: opacity var(--_transition-duration);
    pointer-events: none;
    z-index: 2;
  }

  .ba-label-hidden {
    opacity: 0 !important;
  }

  .ba-label-before {
    top: 1rem;
    left: 1rem;
  }

  .ba-vertical .ba-label-before {
    top: 1rem;
    left: 1rem;
  }

  .ba-label-after {
    bottom: 1rem;
    right: 1rem;
  }

  .ba-vertical .ba-label-after {
    bottom: 1rem;
    right: 1rem;
  }

  .ba-divider {
    position: absolute;
    background: var(--_handle-color);
    pointer-events: none;
    z-index: 3;
  }

  .ba-handle {
    position: absolute;
    width: var(--_handle-size);
    height: var(--_handle-size);
    border-radius: 50%;
    border: 3px solid var(--_handle-color);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
    z-index: 4;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    color: var(--_handle-color);
  }

  .ba-arrow {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  .ba-vertical .ba-handle {
    flex-direction: column;
  }
</style>
