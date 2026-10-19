export function enforceDarkMode() {
  const root = document.documentElement;
  if (root && !root.classList.contains('dark')) {
    root.classList.add('dark');
  }

  const observer = new MutationObserver(() => {
    if (!root.classList.contains('dark')) {
      root.classList.add('dark');
    }
  });

  if (root) {
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}
