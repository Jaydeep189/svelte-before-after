<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <title>svelte-before-after – Before/After Image Slider for Svelte 5</title>
  <meta
    name="description"
    content="A lightweight, accessible before/after image comparison slider component for Svelte 5. Supports horizontal & vertical modes, custom handles, two-way binding, and more."
  />
  <meta name="author" content="Jaydeep189" />
  <link rel="canonical" href="https://svelte-before-after.pages.dev" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://svelte-before-after.pages.dev" />
  <meta
    property="og:title"
    content="svelte-before-after – Before/After Image Slider for Svelte 5"
  />
  <meta
    property="og:description"
    content="A lightweight, accessible before/after image comparison slider component for Svelte 5. Supports horizontal & vertical modes, custom handles, two-way binding, and more."
  />

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="svelte-before-after – Before/After Image Slider for Svelte 5"
  />
  <meta
    name="twitter:description"
    content="A lightweight, accessible before/after image comparison slider component for Svelte 5. Supports horizontal & vertical modes, custom handles, two-way binding, and more."
  />
</svelte:head>

{@render children()}

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #1a1a1a;
    background: #f8f8f8;
    line-height: 1.6;
  }
</style>
