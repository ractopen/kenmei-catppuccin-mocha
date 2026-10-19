import { injectStyles } from './injector.js';
import { enforceDarkMode } from './observer.js';

export function init(css) {
  injectStyles(css);
  enforceDarkMode();

  document.addEventListener('DOMContentLoaded', () => {
    enforceDarkMode();
  });
}
