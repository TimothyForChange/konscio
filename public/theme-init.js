(function () {
  let theme = 'light';

  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    } else {
      const systemPrefersDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = systemPrefersDark ? 'dark' : 'light';
    }
  } catch (error) {
    const systemPrefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = systemPrefersDark ? 'dark' : 'light';
  }

  document.documentElement.dataset.theme = theme;
})();
