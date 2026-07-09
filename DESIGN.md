---
name: dreamsteam-webapp
description: A functional dashboard to manage and execute exams
colors:
  primary: "#570000"
  primary-container: "#800000"
  secondary: "#0061a4"
  tertiary: "#0e1776"
  surface: "#fcf9f8"
  surface-dim: "#dcd9d9"
  surface-cream: "#F9F7F5"
  error: "#ba1a1a"
  success: "#10B981"
  warning: "#F59E0B"
typography:
  display:
    fontFamily: "var(--font-hanken-grotesk)"
  headline:
    fontFamily: "var(--font-hanken-grotesk)"
  body:
    fontFamily: "var(--font-hanken-grotesk)"
  label:
    fontFamily: "var(--font-jetbrains-mono)"
rounded:
  sm: "0.25rem"
  default: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
spacing:
  unit: "4px"
  gutter: "24px"
  margin-mobile: "16px"
  margin-desktop: "80px"
  max-width: "1280px"
components:
  glass-card:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
---

# Design System: dreamsteam-webapp

## 1. Overview

**Creative North Star: "The Modern Preparatory"**

Professional, modern, clear, and focused. It should feel like a premium, reliable tool for serious preparation. It favors clarity over decoration, ensuring data and actions are immediately obvious.

**Key Characteristics:**
- Focused execution: The exam-taking experience is front and center.
- Premium feel: High contrast, purposeful motion, clean typography.
- Professional, modern, clear, and focused.

## 2. Colors

A premium, restrained palette anchoring on deep reds and cool blues against warm creams.

### Primary
- **Deep Maroon** (#570000): Primary brand color and active actions.
- **Maroon Container** (#800000): Secondary emphasis.

### Secondary
- **Deep Azure** (#0061a4): Secondary actions and information accents.

### Tertiary
- **Navy Blue** (#0e1776): Additional accents and data visualization.

### Neutral
- **Surface Cream** (#F9F7F5): Main background color for warmth and readability.
- **Surface Dim** (#dcd9d9): Borders and dividers.

### Named Rules
**The Clarity Rule.** Accent colors are used for primary actions, current selection, and state indicators only, not decoration.

## 3. Typography

**Primary Sans:** Hanken Grotesk (with sans-serif fallback) for display, headline, body, and UI text
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** Clean, highly legible, and professional, using one sans family for a calmer product UI hierarchy during high-focus tasks.

### Hierarchy
- **Display** (bold, clamp(2.5rem, 5vw, 4rem), 1.1): Used for hero numbers and major landing page titles.
- **Headline** (semibold, 1.5rem to 2rem, 1.2): Used for page headers and section titles.
- **Title** (medium, 1.125rem, 1.3): Used for card titles and component headers.
- **Body** (regular, 1rem, 1.5): Used for standard prose and UI text.
- **Label** (medium, 0.875rem, normal): Used for data, numbers, and technical UI elements.

### Named Rules
**The Readability Rule.** High contrast for readability (WCAG AA). 

## 4. Elevation

The system relies on flat design with subtle shadows used only for interaction feedback.

### Shadow Vocabulary
- **Hover Lift** (`box-shadow: 0 10px 25px rgba(128, 0, 0, 0.08)`): Used when hovering over interactive cards.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus).

## 5. Components

### Cards / Containers
- **Corner Style:** 0.5rem (var(--radius-default)) to 1rem (var(--radius-lg))
- **Background:** Surface Cream or Glass Card effect
- **Shadow Strategy:** Flat at rest, Hover Lift on interaction
- **Border:** 1px solid rgba(255, 255, 255, 0.3) for glass cards

## 6. Do's and Don'ts

### Do:
- **Do** ensure data and actions are immediately obvious.
- **Do** maintain high contrast for readability.
- **Do** provide clear focus states for keyboard navigation.

### Don't:
- **Don't** build cluttered, enterprise-heavy dashboards with too many nested menus.
- **Don't** use "SaaS cream" monoculture with low-contrast gray text.
- **Don't** use sketchy or overly whimsical illustrations.
