import type { Snippet } from "svelte";

/**
 * Props for the BeforeAfter image comparison slider component.
 */
export interface BeforeAfterProps {
  /** URL of the "before" image (required) */
  before: string;

  /** URL of the "after" image (required) */
  after: string;

  /** Split position from 0 to 1. Bindable, defaults to 0.5 */
  offset?: number;

  /** If true, the component fills its parent 100% width/height */
  contain?: boolean;

  /** If true, shows a dark overlay on hover. Defaults to true */
  overlay?: boolean;

  /** If true, fades labels and overlay while dragging. Defaults to true */
  hideOnSlide?: boolean;

  /** Optional snippet for the before label content */
  beforeLabel?: Snippet;

  /** Optional snippet for the after label content */
  afterLabel?: Snippet;

  /** If true, the slider works top-to-bottom instead of left-to-right */
  vertical?: boolean;

  /** Size of the circular drag handle in pixels. Defaults to 40 */
  handleSize?: number;

  /** Additional CSS class on the container for consumer styling */
  class?: string;
}
