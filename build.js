const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const STYLES_DIR = path.join(SRC_DIR, 'styles');
const OUTPUT_FILE = path.join(ROOT_DIR, 'kenmei-catppuccin-mocha.user.js');

const STYLE_FILES = [
  'tokens.css',
  'base.css',
  'navigation.css',
  'filters.css',
  'cards.css',
  'overlays.css'
];

function build() {
  const header = fs.readFileSync(path.join(SRC_DIR, 'header.js'), 'utf8').trim();

  let combinedCss = '';
  for (const file of STYLE_FILES) {
    const filePath = path.join(STYLES_DIR, file);
    if (fs.existsSync(filePath)) {
      combinedCss += fs.readFileSync(filePath, 'utf8') + '\n';
    }
  }

  const bundledScript = `${header}

(function () {
  'use strict';

  const css = ${JSON.stringify(combinedCss)};

  function injectStyles(styles) {
    if (typeof GM_addStyle === 'function') {
      GM_addStyle(styles);
      return;
    }
    const style = document.createElement('style');
    style.id = 'kenmei-catppuccin-mocha-hud';
    style.textContent = styles;
    const root = document.head || document.documentElement;
    if (root) {
      root.appendChild(style);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        (document.head || document.documentElement).appendChild(style);
      });
    }
  }

  function enforceDarkMode() {
    const root = document.documentElement;
    if (root && !root.classList.contains('dark')) {
      root.classList.add('dark');
    }

    const observer = new MutationObserver(function () {
      if (!root.classList.contains('dark')) {
        root.classList.add('dark');
      }
    });

    if (root) {
      observer.observe(root, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }

  injectStyles(css);
  enforceDarkMode();

  document.addEventListener('DOMContentLoaded', function () {
    enforceDarkMode();
  });
})();
`;

  fs.writeFileSync(OUTPUT_FILE, bundledScript, 'utf8');
  console.log(`Built: ${path.relative(ROOT_DIR, OUTPUT_FILE)} (${bundledScript.length} bytes)`);
}

build();
