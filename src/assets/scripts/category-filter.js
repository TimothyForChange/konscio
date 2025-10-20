function generateSlug(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

document.addEventListener('DOMContentLoaded', () => {
  function showCategoryPanel(selectedCategory) {
    const buttons = document.querySelectorAll('.category-btn');
    const panels = document.querySelectorAll('.category-panel');

    for (const button of buttons) {
      if (button.dataset.category === selectedCategory) {
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        button.setAttribute('tabindex', '0');
      } else {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('tabindex', '-1');
      }
    }

    for (const panel of panels) {
      if (panel.id === `panel-${generateSlug(selectedCategory)}`) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    }
  }

  const categoryButtons = document.querySelectorAll('.category-btn');

  for (const button of categoryButtons) {
    button.addEventListener('click', (event) => {
      const target = event.target;
      showCategoryPanel(target.dataset.category);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showCategoryPanel(event.target.dataset.category);
      }
    });
  }
});
