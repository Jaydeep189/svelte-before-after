<script lang="ts">
  import { BeforeAfter } from "$lib/index.js";

  // Inline SVG data URIs as placeholder images
  const beforeImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2c3e50"/><stop offset="100%" stop-color="#3498db"/></linearGradient></defs><rect width="800" height="500" fill="url(#a)"/><text x="400" y="250" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="48" fill="white" font-weight="bold">Before</text></svg>`)}`;

  const afterImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e74c3c"/><stop offset="100%" stop-color="#f39c12"/></linearGradient></defs><rect width="800" height="500" fill="url(#b)"/><text x="400" y="250" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-size="48" fill="white" font-weight="bold">After</text></svg>`)}`;

  let boundOffset = $state(0.5);
</script>

<div class="page">
  <!-- Hero -->
  <header class="hero">
    <h1>svelte-before-after</h1>
    <p>
      A lightweight, accessible before/after image comparison slider for Svelte
      5
    </p>
    <p class="author">
      Built by <a href="https://github.com/Jaydeep189" target="_blank" rel="noopener noreferrer">Jaydeep189</a>
      &middot;
      <a href="https://github.com/Jaydeep189/svelte-before-after" target="_blank" rel="noopener noreferrer">View on GitHub</a>
    </p>
  </header>

  <!-- Section 1: Basic usage -->
  <section>
    <h2>Basic Usage</h2>
    <p>Default configuration with minimal props.</p>
    <div class="demo">
      <BeforeAfter before={beforeImg} after={afterImg} />
    </div>
  </section>

  <!-- Section 2: With labels -->
  <section>
    <h2>With Labels</h2>
    <p>
      Using <code>beforeLabel</code> and <code>afterLabel</code> snippets to show
      text badges.
    </p>
    <div class="demo">
      <BeforeAfter before={beforeImg} after={afterImg}>
        {#snippet beforeLabel()}
          <span class="badge">Before</span>
        {/snippet}
        {#snippet afterLabel()}
          <span class="badge">After</span>
        {/snippet}
      </BeforeAfter>
    </div>
  </section>

  <!-- Section 3: Vertical mode -->
  <section>
    <h2>Vertical Mode</h2>
    <p>
      Set <code>vertical=&#123;true&#125;</code> for top-to-bottom comparison.
    </p>
    <div class="demo">
      <BeforeAfter before={beforeImg} after={afterImg} vertical={true}>
        {#snippet beforeLabel()}
          <span class="badge">Before</span>
        {/snippet}
        {#snippet afterLabel()}
          <span class="badge">After</span>
        {/snippet}
      </BeforeAfter>
    </div>
  </section>

  <!-- Section 4: Contained mode -->
  <section>
    <h2>Contained Mode</h2>
    <p>
      With <code>contain=&#123;true&#125;</code> inside a fixed-size container.
    </p>
    <div class="demo contained-wrapper">
      <BeforeAfter before={beforeImg} after={afterImg} contain={true}>
        {#snippet beforeLabel()}
          <span class="badge">Before</span>
        {/snippet}
        {#snippet afterLabel()}
          <span class="badge">After</span>
        {/snippet}
      </BeforeAfter>
    </div>
  </section>

  <!-- Section 5: Bindable offset -->
  <section>
    <h2>Two-Way Binding</h2>
    <p>
      The <code>offset</code> prop is bindable. Drag the slider or move the range
      input below.
    </p>
    <div class="demo">
      <BeforeAfter
        before={beforeImg}
        after={afterImg}
        bind:offset={boundOffset}
      >
        {#snippet beforeLabel()}
          <span class="badge">Before</span>
        {/snippet}
        {#snippet afterLabel()}
          <span class="badge">After</span>
        {/snippet}
      </BeforeAfter>
    </div>
    <div class="controls">
      <label>
        Offset: <strong>{Math.round(boundOffset * 100)}%</strong>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          bind:value={boundOffset}
        />
      </label>
    </div>
  </section>

  <!-- Section 6: Custom handle size -->
  <section>
    <h2>Custom Handle Size</h2>
    <p>The <code>handleSize</code> prop lets you adjust the drag handle.</p>
    <div class="demo">
      <BeforeAfter before={beforeImg} after={afterImg} handleSize={60}>
        {#snippet beforeLabel()}
          <span class="badge">Before</span>
        {/snippet}
        {#snippet afterLabel()}
          <span class="badge">After</span>
        {/snippet}
      </BeforeAfter>
    </div>
  </section>
</div>

<style>
  .page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem 4rem;
  }

  .hero {
    text-align: center;
    margin-bottom: 3rem;
  }

  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .hero p {
    font-size: 1.15rem;
    color: #555;
  }

  .hero .author {
    font-size: 0.95rem;
    margin-top: 0.25rem;
  }

  .hero .author a {
    color: #3498db;
    text-decoration: none;
    font-weight: 600;
  }

  .hero .author a:hover {
    text-decoration: underline;
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  section > p {
    color: #555;
    margin-bottom: 1rem;
  }

  code {
    background: #e8e8e8;
    padding: 0.15em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .demo {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .contained-wrapper {
    width: 100%;
    height: 300px;
  }

  .badge {
    display: inline-block;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.3em 0.8em;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .controls {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .controls label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.95rem;
  }

  .controls input[type="range"] {
    width: 200px;
  }
</style>
