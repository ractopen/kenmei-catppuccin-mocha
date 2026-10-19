export function injectStyles(css) {
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(css);
    return;
  }
  const style = document.createElement('style');
  style.id = 'kenmei-catppuccin-mocha-hud';
  style.textContent = css;
  const root = document.head || document.documentElement;
  if (root) {
    root.appendChild(style);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      (document.head || document.documentElement).appendChild(style);
    });
  }
}
