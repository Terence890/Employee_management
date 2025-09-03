
# Blueprint: WorkZen - Design System & Implementation Plan

This document outlines the design system, architecture, and implementation plan for the WorkZen application.

## 1. Overview

WorkZen is a modern, streamlined employee and department management application. It provides a clean, intuitive interface for administrators to manage company data with ease. The application is built with the latest Angular features, emphasizing performance, developer experience, and a stunning, professional user interface.

## 2. Design System

This design system ensures a consistent, accessible, and visually appealing experience across the application.

### 2.1. Color Palette

The color palette is designed to be energetic, clean, and professional. It supports both light and dark themes.

*   **Primary:** `#6D28D9` (Deep Violet) - Used for primary actions, links, and focus states.
*   **Secondary:** `#EDE9FE` (Light Violet) - Used for backgrounds, subtle highlights, and hover effects.
*   **Accent:** `#F59E0B` (Amber) - Used for warnings, notifications, and secondary actions.
*   **Background (Light):** `#F8FAFC` (Cool Gray 50)
*   **Background (Dark):** `#0F172A` (Slate 900)
*   **Text (Light):** `#0F172A` (Slate 900)
*   **Text (Dark):** `#F8FAFC` (Cool Gray 50)
*   **Success:** `#10B981` (Emerald 500)
*   **Error:** `#EF4444` (Red 500)

### 2.2. Typography

We use the "Inter" font family for its excellent readability and modern, professional feel.

*   **Font Family:** 'Inter', sans-serif
*   **Headings (h1, h2, h3):** Font weight 700 (Bold)
*   **Body Text:** Font weight 400 (Regular)
*   **Links & Buttons:** Font weight 500 (Medium)

### 2.3. UI Components

*   **Buttons:**
    *   Solid background (`Primary` color).
    *   Subtle shadow that deepens on hover to create a "lifting" effect.
    *   Slightly rounded corners (`6px` border-radius).
*   **Cards:**
    *   **Glassmorphism Effect:** The card uses a `backdrop-filter` to create a frosted glass look, blurring the background.
    *   Soft, multi-layered drop shadow to create depth.
    *   Slightly rounded corners (`12px` border-radius).
    *   Clean, spacious padding.
*   **Input Fields:**
    *   **Aligned Icons & Text:** Uses Flexbox for perfect alignment.
    *   **Refined Floating Label:** The label sits cleanly above the input field, avoiding any visual glitches.
    *   Minimalist design with a focus on usability.
    *   A clear border that changes color on focus (`Primary` color).

### 2.4. Visual Effects

*   **Background Texture:** A subtle noise texture is applied to the main background in dark mode to add a premium, tactile feel.
*   **Shadows:** We use layered shadows to give UI elements like cards and buttons a sense of depth and elevation.

## 3. Current Implementation Plan

### Phase 2: UI Polish & Glassmorphism (In Progress)

1.  **[COMPLETED]** **Blueprint:** Update the blueprint with the new UI refinements.
2.  **[ACTIVE]** **Glassmorphism Card:** Apply a `backdrop-filter` to the `.auth-card`.
3.  **Icon & Text Alignment:** Use Flexbox to align icons and text in input fields.
4.  **Refined Floating Label:** Reposition the floating label to eliminate the "ghost line".
5.  **Verification:** Run `ng build` to ensure no compilation errors.

### Previous Phases

*   **Phase 1: Foundation & Branding**
    *   Created the initial `blueprint.md`.
    *   Updated `src/styles.css` with a new color palette and typography.
    *   Refactored the Sign In and Sign Up pages.
