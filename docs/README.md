# Kenmei Catppuccin Mocha Documentation

Detailed setup instructions, architecture breakdown, and configuration options.

---

## Table of Contents

- [Installation](#installation)
  - [Violentmonkey](#violentmonkey)
  - [Tampermonkey](#tampermonkey)
  - [Firefox Native (userContent.css)](#firefox-native-usercontentcss)
- [Architecture & Source Layout](#architecture--source-layout)
- [Design Tokens](#design-tokens)
- [Customization](#customization)
  - [Changing Fonts](#changing-fonts)
  - [Modifying Shadow Depth](#modifying-shadow-depth)
- [Troubleshooting](#troubleshooting)

---

## Installation

### Violentmonkey

1. Install the [Violentmonkey extension](https://violentmonkey.github.io/) in Firefox, Chrome, or your preferred browser.
2. Click on the raw script link:
   `https://raw.githubusercontent.com/ractopen/kenmei-catppuccin-mocha/main/kenmei-catppuccin-mocha.user.js`
3. Violentmonkey will prompt you to confirm the installation.
4. Click **Confirm installation**.
5. Reload [kenmei.co/dashboard](https://www.kenmei.co/dashboard).

### Tampermonkey

1. Open the Tampermonkey dashboard.
2. Select the **Utilities** tab.
3. Paste the raw script URL into the **Install from URL** field and click **Install**.

### Firefox Native (userContent.css)

If you prefer applying styles natively without a userscript manager:

1. Open your Firefox profile directory (`about:support` -> Profile Folder).
2. Locate or create the `chrome` directory.
3. Append the contents of `src/styles/` inside a domain wrapper in `userContent.css`:

```css
@-moz-document domain("kenmei.co") {
  /* Paste combined styles from src/styles/*.css here */
}
```

4. Ensure `toolkit.legacyUserProfileCustomizations.stylesheets` is set to `true` in `about:config`.
5. Restart Firefox.

---

## Architecture & Source Layout

The repository maintains an unbundled source tree under `src/` to make review and targeted maintenance straightforward:

```
src/
├── header.js           # Userscript metadata block
├── injector.js         # GM_addStyle wrapper with DOM fallback
├── observer.js         # MutationObserver enforcing .dark state
├── index.js            # Runtime coordinator
└── styles/
    ├── tokens.css      # Catppuccin Mocha variables & Kenmei token bindings
    ├── base.css        # Geometry resets, typography, and scrollbars
    ├── navigation.css  # Top navigation bar, search trigger, and avatars
    ├── filters.css     # Filter controls, list search input, and checkboxes
    ├── cards.css       # Grid items, covers, status indicators, and badges
    └── overlays.css    # Modals, menus, dropdowns, and toast alerts
```

`build.js` concatenates these components into `kenmei-catppuccin-mocha.user.js` at the repository root.

---

## Design Tokens

All colors follow the official Catppuccin Mocha palette:

| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| Base | `#1e1e2e` | Main page canvas background, modal surfaces |
| Mantle | `#181825` | Navigation bar, card backgrounds, dropdown panels |
| Crust | `#11111b` | Drop shadows, deep contrast elements |
| Surface0 | `#313244` | Card outlines, secondary hover surfaces |
| Surface1 | `#45475a` | Input outlines, standard button borders |
| Surface2 | `#585b70` | Focus outlines, muted badges |
| Text | `#cdd6f4` | Primary text |
| Subtext0 | `#a6adc8` | Secondary labels, descriptions |
| Subtext1 | `#bac2de` | Navigation links, shortcut badges |
| Mauve | `#cba6f7` | Primary action buttons, active indicators, focus rings |
| Green | `#a6e3a1` | Completed / read status checkmarks |
| Peach | `#fab387` | Notification indicators, score counters |
| Blue | `#89b4fa` | Secondary links and info badges |

---

## Customization

### Changing Fonts

By default, the theme checks for `Minecraft` and falls back to `Fira Code`. If you prefer standard monospace fonts, adjust `src/styles/base.css`:

```css
h1, h2, h3, h4, h5, h6,
.series-title,
.card-title,
.status-number {
  font-family: "JetBrains Mono", "Fira Code", monospace !important;
}
```

Then run `npm run build` to update the root script.

### Modifying Shadow Depth

Shadow offsets are defined in `src/styles/cards.css` and `src/styles/overlays.css`. To adjust the retro stepped drop shadows:

```css
/* Custom 2px retro stepped shadow */
box-shadow: 2px 2px 0 0 var(--ctp-crust) !important;
```

---

## Troubleshooting

### White Flash During Initial Navigation
The script uses `@run-at document-start` and immediately attaches the stylesheet to `document.documentElement` to prevent light-theme flashes. Ensure your userscript manager has full access to `kenmei.co`.

### Dark Mode Class Desynchronization
Kenmei's Vue application manages dark mode dynamically. `src/observer.js` monitors class changes on `<html>` to maintain the `.dark` class across client-side route transitions.
