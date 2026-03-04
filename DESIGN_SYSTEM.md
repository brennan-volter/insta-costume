# Spooky Costume App - Design System

**Design Philosophy**: Dark, nostalgic, and magical. A sophisticated Halloween aesthetic that feels modern and premium, not kitschy or childish.

**Inspiration**: Light influence from Kinetiq template (clean sections, generous spacing, modern layout) but with our unique dark Halloween vibe.

---

## Color Palette

### Primary Colors

#### Nostalgic Orange
```css
--orange-900: #1a0f0a  /* Darkest - backgrounds */
--orange-800: #2d1810  /* Dark backgrounds */
--orange-700: #4a2615  /* Borders, dividers */
--orange-600: #6b3719  /* Secondary elements */
--orange-500: #8f4e2a  /* Muted base orange */
--orange-400: #b8744d  /* Interactive states */
--orange-300: #d49a7b  /* Hover states */
--orange-200: #e6bfa5  /* Highlights */
--orange-100: #f5e5d9  /* Text on dark */
```

#### Nostalgic Purple
```css
--purple-900: #120a1a  /* Darkest - backgrounds */
--purple-800: #1e1029  /* Dark backgrounds */
--purple-700: #2f1a42  /* Borders, dividers */
--purple-600: #432a5c  /* Secondary elements */
--purple-500: #5a3d76  /* Muted base purple */
--purple-400: #7a5a96  /* Interactive states */
--purple-300: #9d7fb5  /* Hover states */
--purple-200: #c0acd4  /* Highlights */
--purple-100: #e3daea  /* Text on dark */
```

### Neutral Colors (Dark Mode)
```css
--neutral-950: #0a0a0b  /* Deepest black */
--neutral-900: #121214  /* Main background */
--neutral-800: #1a1a1d  /* Elevated surfaces */
--neutral-700: #242428  /* Card backgrounds */
--neutral-600: #35353a  /* Borders */
--neutral-500: #52525b  /* Disabled elements */
--neutral-400: #a1a1aa  /* Subtle text */
--neutral-300: #d4d4d8  /* Body text */
--neutral-200: #e4e4e7  /* Headings */
--neutral-100: #f4f4f5  /* Brightest text */
```

### Accent Colors
```css
/* Success */
--success-dark: #065f46   /* Dark green for dark mode */
--success-base: #10b981   /* Success states */
--success-light: #6ee7b7  /* Hover/highlight */

/* Error */
--error-dark: #991b1b     /* Dark red */
--error-base: #ef4444     /* Error states */
--error-light: #fca5a5    /* Hover/highlight */

/* Warning */
--warning-dark: #92400e   /* Dark amber */
--warning-base: #f59e0b   /* Warning states */
--warning-light: #fcd34d  /* Hover/highlight */

/* Info */
--info-dark: #1e3a8a      /* Dark blue */
--info-base: #3b82f6      /* Info states */
--info-light: #93c5fd     /* Hover/highlight */
```

### Gradient Definitions
```css
/* Primary gradient: Purple to Orange */
--gradient-primary: linear-gradient(135deg, #5a3d76 0%, #8f4e2a 100%);
--gradient-primary-hover: linear-gradient(135deg, #7a5a96 0%, #b8744d 100%);

/* Hero gradient: Deep to vibrant */
--gradient-hero: linear-gradient(180deg, #120a1a 0%, #1a0f0a 50%, #0a0a0b 100%);

/* Card gradient: Subtle elevation */
--gradient-card: linear-gradient(145deg, #1e1029 0%, #2d1810 100%);

/* Glow effect */
--gradient-glow: radial-gradient(ellipse at center, rgba(90, 61, 118, 0.3) 0%, transparent 70%);
```

---

## Typography

### Font Families

#### Display/Headings: **Space Grotesk**
Modern, geometric, slightly quirky without being gimmicky. Perfect for headlines.
- Weights: 400, 500, 600, 700
- Use for: H1, H2, H3, buttons, CTAs
- Fallback: system-ui, -apple-system, sans-serif

#### Body Text: **Inter**
Clean, highly readable, optimized for screens. Professional and modern.
- Weights: 400, 500, 600
- Use for: Body text, UI elements, form inputs
- Fallback: system-ui, -apple-system, sans-serif

#### Accent/Numbers: **JetBrains Mono** (optional)
Monospace for statistics, credit counts, numbered lists.
- Weight: 500
- Use sparingly for: Credit displays, stats, step numbers
- Fallback: 'Courier New', monospace

### Font Sizes (Mobile-First)

#### Mobile (< 768px)
```css
--text-xs: 0.75rem    /* 12px - captions, labels */
--text-sm: 0.875rem   /* 14px - small body text */
--text-base: 1rem     /* 16px - body text */
--text-lg: 1.125rem   /* 18px - large body */
--text-xl: 1.25rem    /* 20px - small headings */
--text-2xl: 1.5rem    /* 24px - H3 */
--text-3xl: 1.875rem  /* 30px - H2 */
--text-4xl: 2.25rem   /* 36px - H1 */
--text-5xl: 3rem      /* 48px - Hero headline */
```

#### Desktop (≥ 768px)
```css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px - H4 */
--text-3xl: 1.875rem  /* 30px - H3 */
--text-4xl: 2.25rem   /* 36px - H2 */
--text-5xl: 3rem      /* 48px - H1 */
--text-6xl: 3.75rem   /* 60px - Hero headline */
--text-7xl: 4.5rem    /* 72px - Large hero */
```

### Typography Scale
```css
h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--neutral-100);
}

h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--neutral-200);
}

h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 600;
  line-height: 1.3;
  color: var(--neutral-200);
}

body {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--neutral-300);
}

.lead {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--neutral-300);
}
```

---

## Spacing System

### Base Unit: 4px
```css
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
--space-32: 8rem     /* 128px */
```

### Section Spacing
```css
/* Mobile */
--section-padding-mobile: 3rem 1rem;   /* 48px vertical, 16px horizontal */
--section-gap-mobile: 2rem;             /* 32px between elements */

/* Desktop */
--section-padding-desktop: 6rem 2rem;  /* 96px vertical, 32px horizontal */
--section-gap-desktop: 3rem;            /* 48px between elements */
```

---

## Component Styles

### Buttons

#### Primary Button (CTA)
```css
.btn-primary {
  background: var(--gradient-primary);
  color: var(--neutral-100);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 4px 20px rgba(90, 61, 118, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--gradient-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(90, 61, 118, 0.6);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Mobile: Full width */
@media (max-width: 767px) {
  .btn-primary {
    width: 100%;
    padding: 1rem 2rem;
    font-size: 1.0625rem; /* 17px */
  }
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--neutral-200);
  border: 2px solid var(--neutral-600);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  padding: 0.75rem 1.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--neutral-800);
  border-color: var(--purple-400);
  color: var(--purple-200);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--neutral-300);
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.btn-ghost:hover {
  color: var(--orange-300);
}
```

### Cards

#### Standard Card
```css
.card {
  background: var(--neutral-800);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--purple-600);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
```

#### Elevated Card (Gallery Items)
```css
.card-elevated {
  background: var(--gradient-card);
  border: 1px solid var(--neutral-700);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-elevated:hover {
  border-color: var(--orange-500);
  box-shadow: 0 12px 40px rgba(143, 78, 42, 0.3);
}
```

### Inputs

#### Text Input
```css
.input {
  background: var(--neutral-800);
  border: 2px solid var(--neutral-700);
  color: var(--neutral-200);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  width: 100%;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: var(--purple-500);
  outline: none;
  box-shadow: 0 0 0 3px rgba(90, 61, 118, 0.2);
}

.input::placeholder {
  color: var(--neutral-500);
}
```

#### File Input (Custom)
```css
.file-input {
  background: var(--neutral-800);
  border: 2px dashed var(--neutral-600);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-input:hover {
  border-color: var(--purple-500);
  background: var(--neutral-750);
}
```

### Badges/Tags
```css
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Space Grotesk', sans-serif;
}

.badge-orange {
  background: rgba(143, 78, 42, 0.2);
  color: var(--orange-200);
  border: 1px solid var(--orange-600);
}

.badge-purple {
  background: rgba(90, 61, 118, 0.2);
  color: var(--purple-200);
  border: 1px solid var(--purple-600);
}
```

---

## Layout Patterns

### Container Widths
```css
--container-sm: 640px;   /* Small content */
--container-md: 768px;   /* Medium content */
--container-lg: 1024px;  /* Standard content */
--container-xl: 1280px;  /* Wide content */
--container-2xl: 1536px; /* Full width sections */
```

### Grid System
```css
/* Example Gallery Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
```

### Section Structure (Inspired by Kinetiq)
```css
.section {
  padding: var(--section-padding-mobile);
  position: relative;
}

@media (min-width: 768px) {
  .section {
    padding: var(--section-padding-desktop);
  }
}

/* Section with background glow */
.section-glow {
  position: relative;
}

.section-glow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: var(--gradient-glow);
  filter: blur(80px);
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
}
```

---

## Animation & Motion

### Transition Timing
```css
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 350ms;
--transition-slower: 500ms;

--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effects
```css
/* Lift on hover */
.hover-lift {
  transition: transform var(--transition-base) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

/* Glow on hover */
.hover-glow {
  transition: box-shadow var(--transition-base) var(--ease-out);
}

.hover-glow:hover {
  box-shadow: 0 0 30px rgba(143, 78, 42, 0.5);
}

/* Scale on hover */
.hover-scale {
  transition: transform var(--transition-base) var(--ease-out);
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### Loading Animations
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(90, 61, 118, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(143, 78, 42, 0.5);
  }
}
```

---

## Accessibility

### Focus States
```css
*:focus-visible {
  outline: 2px solid var(--purple-400);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--orange-400);
  outline-offset: 4px;
}
```

### Contrast Requirements
All text must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio
- Large text (18px+ or 14px+ bold): 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

### Touch Targets (Mobile)
- Minimum: 44x44px
- Recommended: 48x48px
- Spacing between: 8px minimum

---

## Icon Style

### Icon Library: Lucide React
Modern, consistent, open-source icons.

### Icon Sizing
```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

### Icon Colors
- Default: `var(--neutral-400)`
- Active: `var(--neutral-200)`
- Accent: `var(--orange-400)` or `var(--purple-400)`

---

## Special Effects

### Glassmorphism (Optional for Modals)
```css
.glass {
  background: rgba(26, 26, 29, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Text Gradients
```css
.text-gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Glow Text (for Hero)
```css
.text-glow {
  color: var(--neutral-100);
  text-shadow:
    0 0 20px rgba(90, 61, 118, 0.5),
    0 0 40px rgba(143, 78, 42, 0.3);
}
```

---

## Component-Specific Designs

### Hero Section
- Full viewport height on mobile (100vh)
- Centered content with max-width 1024px
- Gradient background with subtle glow effect
- Large headline with text gradient
- CTA button full-width on mobile, auto on desktop
- Scroll indicator at bottom (optional)

### Example Gallery
- 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- Card hover lifts and glows orange
- Lazy load images below fold
- WebP format with blur placeholder

### FAQ Accordion
- Collapsible sections with smooth animation
- Purple border on active/hover
- Icon rotation on expand (chevron down → up)
- Full-width touch targets on mobile

### Loading States
- Skeleton screens with pulse animation
- Gradient shimmer effect
- Spinning icon for inline loading
- Full-screen overlay for page transitions

---

## Responsive Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## Implementation Notes

### Tailwind CSS Configuration
Update `tailwind.config.js` with custom colors, fonts, spacing.

### Font Loading
Use `next/font` or `@fontsource` packages for Space Grotesk and Inter.

### Dark Mode
Default to dark mode, no light mode toggle initially.

### Performance
- Lazy load images below fold
- Use WebP/AVIF formats
- Minimize animations on lower-end devices
- Respect `prefers-reduced-motion`

---

## Design Inspiration Summary

**From Kinetiq:**
- Clean section-based layout
- Generous whitespace
- Numbered lists for steps
- Sticky navigation
- Multiple CTA opportunities

**Our Unique Spin:**
- Dark mode throughout
- Nostalgic orange/purple palette
- Halloween magic theme without cheese
- Sophisticated, not kitschy
- Modern fonts (not drippy Halloween fonts)

---

**Last Updated**: October 21, 2025
**Status**: Ready for Phase 2 implementation
