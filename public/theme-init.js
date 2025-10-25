(function () {
  const stored = localStorage.getItem('theme');
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const theme = stored || system;
  document.documentElement.dataset.theme = theme;
})();
