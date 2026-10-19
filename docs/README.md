<div align="center">

# Documentation

<p>
  <strong>Comprehensive guide, technical architecture, and customization manual.</strong>
</p>

<p>
  <a href="../README.md"><img src="https://img.shields.io/badge/back%20to-overview-cba6f7?style=for-the-badge&labelColor=181825" alt="Overview"></a>
  <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-89b4fa?style=for-the-badge&labelColor=181825" alt="License"></a>
</p>

</div>

<br>

## Table of Contents

- [Installation Methods](#installation-methods)
  - [Violentmonkey (Recommended)](#violentmonkey-recommended)
  - [Tampermonkey](#tampermonkey)
  - [Firefox Native userContent.css](#firefox-native-usercontentcss)
- [Visual Showcase](#visual-showcase)
- [Design Tokens](#design-tokens)
- [Architecture & Source Tree](#architecture--source-tree)
- [Customization](#customization)
  - [Fonts Configuration](#fonts-configuration)
  - [Pixel Shadows](#pixel-shadows)
- [Troubleshooting](#troubleshooting)

---

## Installation Methods

### Greasy Fork (Recommended)

1. Open the [Greasy Fork script page](https://greasyfork.org/en/scripts/601110-kenmei-catppuccin-mocha-pixel-hud).
2. Click **Install this script**.
3. Confirm installation in Violentmonkey / Tampermonkey. Userscript managers will automatically check Greasy Fork for updates.

### Violentmonkey Direct

1. Add the [Violentmonkey extension](https://violentmonkey.github.io/) to your browser.
2. Open the direct script URL:
   `https://raw.githubusercontent.com/ractopen/kenmei-catppuccin-mocha/main/kenmei-catppuccin-mocha.user.js`
3. Click **Confirm installation**.
4. Open [kenmei.co/dashboard](https://www.kenmei.co/dashboard).

### Tampermonkey

1. Open the Tampermonkey dashboard.
2. Select the **Utilities** tab.
3. Paste the raw script link into the **Install from URL** field and click **Install**.

### Firefox Native userContent.css

To apply styles directly within Firefox without any userscript manager:

1. Navigate to `about:support` in Firefox and click **Open Directory** next to Profile Folder.
2. Enter the `chrome` subfolder (create it if missing).
3. Open or create `userContent.css`.
4. Wrap the CSS content from `src/styles/*.css` within a domain selector:

```css
@-moz-document domain("kenmei.co") {
  /* Insert contents from src/styles/*.css here */
}
```

5. Go to `about:config`, toggle `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`.
6. Restart Firefox.

---

## Visual Showcase

<div align="center">
  <img src="../assets/dashboard.png" width="100%" alt="Dashboard View">
  <br><br>
  <img src="../assets/search-modal.png" width="100%" alt="Search Modal">
</div>

---

## Design Tokens

All elements map to the official Catppuccin Mocha palette:

| Token Name | Hex Value | Semantic Role in Kenmei |
| :--- | :--- | :--- |
| **Base** | `#1e1e2e` | Main page canvas background, modal surfaces |
| **Mantle** | `#181825` | Top navigation bar, card backgrounds, filter bars |
| **Crust** | `#11111b` | Stepped pixel drop-shadows, high-contrast badges |
| **Surface0** | `#313244` | Card outlines, hovered items, table borders |
| **Surface1** | `#45475a` | Standard button borders, input borders |
| **Surface2** | `#585b70` | Focus rings, shortcut badges (`kbd`) |
| **Text** | `#cdd6f4` | Primary text and headings |
| **Subtext0** | `#a6adc8` | Descriptions, time ago indicators, timestamps |
| **Subtext1** | `#bac2de` | Navigation links, secondary metadata |
| **Mauve** | `#cba6f7` | Primary buttons (`+ Add Manga`), active tabs, badges |
| **Green** | `#a6e3a1` | Read status checkmark badge, success highlights |
| **Peach** | `#fab387` | Notification indicators, score counters |
| **Blue** | `#89b4fa` | Anchor links, information chips |

---

## Architecture & Source Tree

The project separates concerns into modular components under `src/`:

```
src/
├── header.js           # Userscript metadata block
├── injector.js         # GM_addStyle wrapper with DOM fallback
├── observer.js         # MutationObserver keeping .dark enforced
├── index.js            # Entrypoint runtime coordinator
└── styles/
    ├── tokens.css      # Catppuccin Mocha palette & CSS custom property overrides
    ├── base.css        # Zero-radius geometry, typography, and scrollbars
    ├── navigation.css  # Top navigation bar, search trigger, and avatars
    ├── filters.css     # Filter controls, list search input, and checkboxes
    ├── cards.css       # Grid items, covers, status indicators, and badges
    └── overlays.css    # Modals, menus, dropdowns, and toast alerts
```

Running `npm run build` executes `build.js`, which reads and bundles all modules into the root `kenmei-catppuccin-mocha.user.js`.

---

## Customization

### Fonts Configuration

Default fonts prioritize `Minecraft` for retro headers and `Fira Code` for body copy. To customize fonts, modify `src/styles/base.css`:

```css
h1, h2, h3, h4, h5, h6,
.series-title,
.card-title,
.status-number {
  font-family: "JetBrains Mono", "Fira Code", monospace !important;
}
```

Rebuild via:
```bash
npm run build
```

### Pixel Shadows

Pixel drop shadows are styled without blur to match pixel desktop themes:

```css
box-shadow: 2px 2px 0 0 var(--ctp-crust) !important;
```

---

## Troubleshooting

### Light Mode Flashes
The script runs at `@run-at document-start` and injects styles before DOM elements render. Verify that your userscript extension has permission to run on all `kenmei.co` pages.

### Class Hydration
Kenmei is a client-side Vue application that may toggle classes during route transitions. `src/observer.js` continuously ensures that the `dark` class remains assigned to `<html>`.
